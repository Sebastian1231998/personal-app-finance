import type { PostgrestError } from "@supabase/supabase-js";

export interface ReponseCategories{
    data: {
        id: string;
        name: string;
        type: string | null;
    }[] | null,
    error: PostgrestError | null;
}