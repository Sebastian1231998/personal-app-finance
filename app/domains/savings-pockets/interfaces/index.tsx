import type { PostgrestError } from "@supabase/supabase-js";

export interface ResponseGetSavingPockets{
    data: Pocket[] | null
    error: PostgrestError | null;
}


export type Pocket = {
    balance: number | null;
    description: string;
    id: string;
    wallet_balance_id: string;
}