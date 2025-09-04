import React from 'react'
import { supabase } from '~/domains/configuration/supabase'

export const updateBalancePocket = async(pocketId: string ,amount: number)=>{
    const { data: pocketData, error: getError } = await supabase
    .from('saving_pockets')
    .select('balance')
    .eq('id', pocketId)
    .single();

    if (getError) {
        return {
            error: getError
        }
    }

    const newBalance = (pocketData?.balance ?? 0) + amount;

    const { data, error } = await supabase
    .from('saving_pockets')
    .update({ balance: newBalance })
    .eq('id', pocketId)
    .select();


    return {
        data: data,
        error: error,
    }
}
