import type { AuthError, User } from "@supabase/supabase-js";

export interface AuthResponseSupabase {
  user: User | null;
  error: AuthError | null;
}
export interface SignupResponse extends AuthResponseSupabase {}
export interface LoginResponse extends AuthResponseSupabase {}