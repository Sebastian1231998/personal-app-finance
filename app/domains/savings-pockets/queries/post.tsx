import { supabase } from "~/domains/configuration/supabase"

export const createSavingPocket = async({description, wallet_balance_id}: {description:string, wallet_balance_id:string})=>{
    const { data, error } = await supabase
    .from('saving_pockets')
    .insert([
        { description: description, wallet_balance_id: wallet_balance_id },
    ])
    .select()

    return {
        data, 
        error
    }
}