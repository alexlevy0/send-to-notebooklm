import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const LIMITS = {
  free: { daily: 10, monthly: 200 },
  pro: { daily: Infinity, monthly: Infinity },
  lifetime: { daily: Infinity, monthly: Infinity },
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LimitResponse {
  allowed: boolean;
  isPro: boolean;
  remaining?: {
    daily: number;
    monthly: number;
  };
  limit?: {
    daily: number;
    monthly: number;
  };
  reason?: 'daily_limit' | 'monthly_limit';
  resetAt?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Check if SUPABASE_URL and ANON_KEY are set
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

    if (!supabaseUrl || !supabaseAnonKey) {
       console.error("Missing Supabase environment variables");
       return new Response(
        JSON.stringify({ error: 'Internal Server Error: Missing Configuration' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const supabaseClient = createClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get Auth User
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Get User Tier
    const { data: userData, error: dbError } = await supabaseClient
      .from('users')
      .select('tier')
      .eq('id', user.id)
      .single();

    if (dbError && dbError.code !== 'PGRST116') { // PGRST116 is "Row not found", might happen if user not yet in DB
      console.error('DB Error:', dbError);
      throw dbError;
    }

    const tier = userData?.tier || 'free';
    const limits = LIMITS[tier as keyof typeof LIMITS];

    // Check Pro/Lifetime
    if (tier === 'pro' || tier === 'lifetime') {
      const response: LimitResponse = {
        allowed: true,
        isPro: true,
        remaining: { daily: Infinity, monthly: Infinity },
      };
      return new Response(
        JSON.stringify(response),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check Daily Usage
    const today = new Date().toISOString().split('T')[0];
    const { data: dailyData } = await supabaseClient
      .from('daily_usage')
      .select('captures_count')
      .eq('user_id', user.id)
      .eq('date', today)
      .single();

    const todayCount = dailyData?.captures_count || 0;

    // Check Monthly Usage
    const monthStart = new Date();
    monthStart.setDate(1);
    const monthStartStr = monthStart.toISOString().split('T')[0];
    
    const { data: monthlyData } = await supabaseClient
      .from('daily_usage')
      .select('captures_count')
      .eq('user_id', user.id)
      .gte('date', monthStartStr);

    const monthlyCount = monthlyData?.reduce((sum, d: any) => sum + d.captures_count, 0) || 0;

    // Default response (Allowed)
    const response: LimitResponse = {
      allowed: true,
      isPro: false,
      remaining: {
        daily: Math.max(0, limits.daily - todayCount),
        monthly: Math.max(0, limits.monthly - monthlyCount),
      },
      limit: { daily: limits.daily, monthly: limits.monthly },
    };

    // Verify Daily Limit
    if (todayCount >= limits.daily) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      response.allowed = false;
      response.reason = 'daily_limit';
      response.resetAt = tomorrow.toISOString();
      
      return new Response(
        JSON.stringify(response),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Verify Monthly Limit
    if (monthlyCount >= limits.monthly) {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      nextMonth.setDate(1);
      nextMonth.setHours(0, 0, 0, 0);

       response.allowed = false;
       response.reason = 'monthly_limit';
       response.resetAt = nextMonth.toISOString();

      return new Response(
        JSON.stringify(response),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error in check-limit:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
