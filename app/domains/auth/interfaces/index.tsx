import type { AuthError, PostgrestError, User } from "@supabase/supabase-js";

export interface AuthResponseSupabase {
  user: User | null;
  error: AuthError | null;
  errorWalletCreation?: PostgrestError  | null;
}
export interface SignupResponse extends AuthResponseSupabase {}
export interface LoginResponse extends AuthResponseSupabase {}