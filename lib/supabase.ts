import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Key missing. Backend features will be disabled.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export class LimitReachedError extends Error {
  constructor(
    public reason: 'daily_limit' | 'monthly_limit',
    public resetAt: string,
    public remaining: { daily: number; monthly: number }
  ) {
    super(`Limit reached: ${reason}`);
    this.name = 'LimitReachedError';
  }
}

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

// Helper to ensure we have a user
async function ensureAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) return session;

  console.log('No session, attempting anonymous sign-in...');
  const { data, error } = await supabase.auth.signInAnonymously();
  
  if (error) {
    console.error('Anonymous sign-in failed:', error);
    // Fallback: If anonymous auth is disabled, we might need real auth.
    // For this MVP, we re-throw to block usage if we can't identify the user.
    throw error;
  }
  
  return data.session;
}

export async function checkLimit(): Promise<UsageInfo> {
  try {
    await ensureAuth();
  } catch (e: any) {
    return {
      allowed: false,
      isPro: false,
      error: `Authentication failed: ${e.message}. Please enable Anonymous Sign-ins in Supabase.`
    };
  }

  const { data, error } = await supabase.rpc('check_limit');

  if (error) {
    console.error('Error checking limit:', error);
    // If it's a true limit reached (caught inside RPC? no, RPC returns JSON)
    // If RPC failed (e.g. network), we block.
    return {
      allowed: false,
      isPro: false,
      error: error.message
    };
  }

  // Parse result explicitly
  const result = data as UsageInfo;
  return result;
}

export async function incrementUsage(): Promise<void> {
  const { error } = await supabase.rpc('increment_capture_count');

  if (error) {
    console.error('Error incrementing usage:', error);
    throw new Error(error.message);
  }
}
