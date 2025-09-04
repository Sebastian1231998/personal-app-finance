import { supabase } from "~/domains/configuration/supabase";
import type { ReponseCategories } from "../interfaces";
import { useQuery } from "@tanstack/react-query";

export const getListCategories = async (): Promise<ReponseCategories> => {

  let { data: categories, error } = await supabase
  .from('categories')
  .select('*')

  console.log("INFO: loader getListCategories data:", categories, " error:", error);

  return { data: categories, error };
};
export function useCategories() {
  return useQuery<ReponseCategories>({
    queryKey: ["getListCategories"],
    queryFn: () => getListCategories(),
    staleTime: 1000 * 30,
    retry: 1, 
  });
}