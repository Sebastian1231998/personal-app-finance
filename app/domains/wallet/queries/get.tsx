import React, { useEffect } from 'react'
import { supabase } from '~/domains/configuration/supabase';
import type { ResponseGetWalletBalance, Wallet } from '../interfaces';
import { useQuery } from '@tanstack/react-query';
import { useStore } from '~/store/store';

export const getBalanceWalletView = async (userId: string):Promise<ResponseGetWalletBalance> => {
   let { data, error } = await supabase
    .from('wallet_general_balance_view')
    .select('wallet_id ,balance, currency')
    .eq('user_id', userId).single()

    console.log("INFO: loader GetBalanceWallet data:", data, " error:", error);

    return {data , error}
}

export function useWalletBalance(userId: string) {

  const { wallet, setWallet } = useStore()
    const query = useQuery<ResponseGetWalletBalance>({
    queryKey: ["walletBalance", userId],
    queryFn: () => getBalanceWalletView(userId),
    enabled: !!userId,
    retry: 1,
    staleTime: 0, 
  });

  useEffect(() => {
      if (query?.data?.data) {
        const newWallet: Wallet = {
          wallet_id: query?.data?.data.wallet_id ?? null,
          balance: query?.data?.data.balance ?? 0,
          currency: query?.data?.data.currency ?? "USD",
        };
        setWallet(newWallet);
      }
    }, [query?.data?.data]);

  return query
}