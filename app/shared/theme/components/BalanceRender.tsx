import React from 'react'

interface BalanceRenderProps { 
  amount: number;
  currency: string;
}

const BalanceRender: React.FC<BalanceRenderProps> = ({ amount, currency }) => {
  const colorClass = amount >= 0 ? "text-green-500" : "text-red-500";

  return (
    <p className={`text-xl font-bold mb-4 ${colorClass}`}>
      {amount.toLocaleString()} {currency}
    </p>
  );
};

export default BalanceRender;
