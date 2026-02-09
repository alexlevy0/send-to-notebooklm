import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Key missing. Backend features will be disabled.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UsageInfo {
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
  error?: string;
}

export async function checkLimit(): Promise<UsageInfo> {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    // If not logged in (to Supabase), we default to "Free" behavior tracking by IP/device? 
    // Actually, for this MVP we might require Auth or just create anonymous user.
    // For now, let's assume we need to be logged in, or we just rely on `check_limit` handling null auth (which it returns error for).
    // Let's rely on RPC.
  }

  const { data, error } = await supabase.rpc('check_limit');

  if (error) {
    console.error('Error checking limit:', error);
    // Fail safe: allow if error? Or block?
    // Let's block to prevent abuse, but log.
    return {
      allowed: false,
      isPro: false,
      error: error.message
    };
  }

  return data as UsageInfo;
}

export async function incrementUsage(): Promise<void> {
  const { error } = await supabase.rpc('increment_capture_count');

  if (error) {
    console.error('Error incrementing usage:', error);
    throw new Error(error.message);
  }
}
