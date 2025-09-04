
import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/domains/configuration/supabase";
import type { ReponseListMovements } from "../interfaces";

export const getListMovements = async (
  walletId: string,
  options?: { limit?: number; movement_type?: string }
): Promise<ReponseListMovements> => {

  let query = supabase
  .from('movements')
  .select(`
    id,
    amount,
    description,
    created_at,
    movement_type,
    categories (
      name
    )
  `)
  .eq('wallet_id', walletId)
  .order('created_at', { ascending: false });

  if (options?.movement_type) {
    query = query.eq('movement_type', options.movement_type);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data: movements, error } = await query;

  console.log("INFO: loader getListMovements data:", movements, " error:", error);

  return { data: movements, error };
};

import { useEffect } from "react";

export function useListMovements(walletId: string, setMovements: Function, options?: { limit?: number; movement_type?: string} ) {
  const queryResult = useQuery<ReponseListMovements>({
    queryKey: [`getListMovements_${options?.movement_type}`, walletId],
    queryFn: () => getListMovements(walletId, options),
    enabled: !!walletId,
    retry: 1,
  });

  useEffect(() => {
    if (queryResult.data?.data) {
       if(setMovements) setMovements(queryResult.data.data);
    }
  }, [queryResult.data]);

  return queryResult;
}