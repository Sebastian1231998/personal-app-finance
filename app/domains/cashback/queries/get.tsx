import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/domains/configuration/supabase"
import type { ReponseCashback } from "../interfaces";


export const getCashback = async(walletId:string): Promise<ReponseCashback> =>{

    let { data: cashback, error } = await supabase
            .from('cashback')
            .select('*')
            .eq("wallet_id", walletId).single()

    return {
        data: cashback,
        error
    }
}

export function useCashback(walletId: string) {
    const query = useQuery<ReponseCashback>({
    queryKey: ["walletBalance", walletId],
    queryFn: () => getCashback(walletId),
    enabled: !!walletId,
    retry: 1,
    staleTime: 0, 
  });

  return query
}