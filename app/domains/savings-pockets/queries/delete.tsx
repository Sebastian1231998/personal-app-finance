import { supabase } from "~/domains/configuration/supabase";


export const deletePocket = async(pocketId:string)=>{
    const {error} = await supabase.rpc("delete_pocket_with_movement", { p_pocket_id: pocketId });
    return {error}
}