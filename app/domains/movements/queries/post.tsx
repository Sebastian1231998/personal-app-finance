 import React from 'react'
import { supabase } from '~/domains/configuration/supabase';


export const createMovement = async ({
  wallet_id,
  amount,
  movement_type,
  category_id,
  description,
}: {
  wallet_id: string;
  amount: number;
  movement_type: string;
  category_id: string;
  description: string;
}) => {
  const { data, error } = await supabase
    .from("movements")
    .insert([
      {
        wallet_id,
        amount: amount,
        movement_type: (movement_type ?? '').toString(),
        category_id: (category_id ?? '').toString(),
        description: (description ?? '').toString(),
      },
    ])
    .select(`
      id,
      amount,
      description,
      created_at,
      movement_type,
      categories (
        name
      )
    `);

  return {
    data,
    error
  };
};