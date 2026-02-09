import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-neutral-900 font-sans items-center justify-center p-6 text-center space-y-8">
      <div className="size-24 rounded-full bg-green-100 flex items-center justify-center">
        <CheckCircle className="size-12 text-green-600" />
      </div>

      <div className="space-y-4 max-w-md">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Payment Successful!
        </h1>
        <p className="text-lg text-neutral-600">
          Thank you for upgrading to Pro. Your account now has{" "}
          <strong>unlimited captures</strong>.
        </p>
      </div>

      <div className="pt-4">
        <Button
          asChild
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
