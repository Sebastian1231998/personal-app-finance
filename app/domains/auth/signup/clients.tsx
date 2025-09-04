import { supabase } from "~/domains/configuration/supabase"
import type { SignupResponse } from "../interfaces"
import { getCurrencyByCountry } from "~/domains/currencies/useGetCurrencyByCountry";


export const signupClient = async (
  email: string,
  password: string
): Promise<SignupResponse> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/dashboard`,
    },
  });

  if (error || !data.user) {
    return {
      user: null,
      error,
      errorWalletCreation: null,
    };
  }

  const { error: walletError } = await supabase
    .from("wallet")
    .insert({ user_id: data.user.id, currency: getCurrencyByCountry().currency});

  return {
    user: data.user,
    error: null,
    errorWalletCreation: walletError,
  };
};