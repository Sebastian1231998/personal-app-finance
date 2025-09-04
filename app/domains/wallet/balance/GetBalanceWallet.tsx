import React, { useEffect } from 'react'
import { supabase } from '~/domains/configuration/supabase';
import ErrorMessage from '~/shared/errors/ErrorMessage';
import BalanceRender from '~/shared/theme/components/BalanceRender';
import { useWalletBalance } from '../queries/get';
import { useUser } from '@supabase/auth-helpers-react';
import type { Wallet } from '../interfaces';
import { useStore } from '~/store/store';



const GetBalanceWallet = () => {

  const { wallet } = useStore()
  const user = useUser()
  const { isError, isLoading } = useWalletBalance(user?.id!);


  if (isLoading) {
    return (
        <div className="flex flex-col gap-2">
         <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
        </div>
    );
  }

  if (isError) {
    return <ErrorMessage message="Hubo un error al cargar la wallet" />;
  }

  return (
    <BalanceRender 
      amount={wallet.balance ?? 0} 
      currency={wallet.currency ?? "USD"} 
    />
  );
};

export default GetBalanceWallet;