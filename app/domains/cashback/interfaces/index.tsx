import type { PostgrestError } from "@supabase/supabase-js";

export interface ReponseCashback{
    data: CashsbackWallet | null
    error: PostgrestError | null;
}

export type CashsbackWallet = {
    balance: number | null;
    created_at: string | null;
    id: string;
    wallet_id: string | null;
} | null