import { createClient } from '@supabase/supabase-js';
import { env } from '../config/env.js';

// Service-role key sirf backend me. Browser me KABHI nahi.
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
