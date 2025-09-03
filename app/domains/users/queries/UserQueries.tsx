import { supabase } from "~/domains/configuration/supabase";

export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from("auth.users")
    .select("*")
    .eq("email", email)
    .single();

  return { user: data, error };
}