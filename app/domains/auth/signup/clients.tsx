import { supabase } from "~/domains/configuration/supabase"
import type { SignupResponse } from "../interfaces"


export const signupClient = async (
  email: string,
  password: string
): Promise<SignupResponse> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://localhost:5173/dashboard",
    },
  });

  return {
    user: data.user,
    error,
  };
};