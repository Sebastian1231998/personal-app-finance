import type { PostgrestError } from "@supabase/supabase-js";



export interface ReponseListMovements{
    data: Movement[] | null
    error: PostgrestError | null;
}

export type Movement = {
        id: string;
        amount: number;
        description: string | null;
        created_at: string | null;
        movement_type: string;
        categories: {
            name: string;
        } | null;
}