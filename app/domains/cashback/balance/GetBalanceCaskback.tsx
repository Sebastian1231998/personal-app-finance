import React from 'react'
import { useStore } from '~/store/store';
import { useCashback } from '../queries/get';
import ErrorMessage from '~/shared/errors/ErrorMessage';
import BalanceRender from '~/shared/theme/components/BalanceRender';

const GetBalanceCaskback = () => {

  const { wallet } = useStore()
  const { data, isError, isLoading } = useCashback(wallet?.wallet_id!);


  if (isLoading) {
    return (
        <div className="flex flex-col gap-2">
         <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
        </div>
    );
  }

  if (isError) {
    return <ErrorMessage message="No se pudo obtener el cashback" />;
  }

  return (
    <BalanceRender 
      amount={data?.data?.balance ?? 0} 
      currency={wallet.currency ?? "USD"} 
    />
  );
};

export default GetBalanceCaskback;