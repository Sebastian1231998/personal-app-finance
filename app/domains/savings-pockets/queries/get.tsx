import { supabase } from "~/domains/configuration/supabase";
import type { ResponseGetSavingPockets } from "../interfaces";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useStore } from "~/store/store";

export const getSavingPocketsByWalletId = async (walletId: string):Promise<ResponseGetSavingPockets> => {
   let { data, error } = await supabase
    .from('saving_pockets')
    .select('id, description, balance, wallet_balance_id')
    .eq('wallet_balance_id', walletId)

    console.log("INFO: loader getSavingPocketsByWalletId data:", data, " error:", error);

    return {data , error}
}

export function useSavingPocketsByWalletId(walletId: string) {

  const { setPockets } = useStore()
  const query =  useQuery<ResponseGetSavingPockets>({
    queryKey: ["savingPocketsByWalletId", walletId],
    queryFn: () => getSavingPocketsByWalletId(walletId),
    enabled: !!walletId,
    staleTime: 1000 * 30,
    retry: 1, 
  });


  useEffect(()=>{
    if(query?.data?.data){
      setPockets(query?.data?.data)
    }

  },[query?.data?.data])

  return query
}