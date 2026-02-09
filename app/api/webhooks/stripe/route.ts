import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

// Initialize Supabase Admin (Service Role) to bypass RLS and update user tiers
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error(`❌ Webhook Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      // Get customer details
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;

      // We stored the user's Supabase UUID in client_reference_id or metadata
      // Ideally, pass `client_reference_id: user.id` when creating the checkout session/link?
      // OR, if using Payment Links, we can't easily pass dynamic client_reference_id unless we append ?client_reference_id={uuid} to the URL.
      // Let's assume the client appends it: https://buy.stripe.com/...?client_reference_id=123

      const userId = session.client_reference_id;

      if (userId) {
        console.log(
          `✅ Payment successful for user ${userId}. Upgrading to PRO...`,
        );

        // Update user tier in Supabase
        const { error } = await supabaseAdmin
          .from("users")
          .update({
            tier: "pro",
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);

        if (error) {
          console.error("❌ Failed to update user tier:", error);
          return new NextResponse("Database Error", { status: 500 });
        }
      } else {
        console.warn(
          "⚠️ No client_reference_id found in session. User not upgraded.",
        );
      }
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse(null, { status: 200 });
}
