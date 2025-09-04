import type { PostgrestError } from "@supabase/supabase-js";


export interface ResponseGetWalletBalance{
    data: Wallet | null
    error: PostgrestError | null;
}
 

export type Wallet = {
    wallet_id: string | null;
    balance: number | null;
    currency: string | null;
}
