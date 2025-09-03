import { supabase } from "~/domains/configuration/supabase";
import type { LoginResponse, SignupResponse } from "../interfaces";


export const loginClient = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  return {
    user: data.user,
    error,
  };
};