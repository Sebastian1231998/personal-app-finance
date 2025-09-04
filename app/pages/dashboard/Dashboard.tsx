


import React from "react";
import GetBalanceCaskback from "~/domains/cashback/balance/GetBalanceCaskback";

import MovementsList from "~/domains/movements/services/list/MovementsList";

import GetBalanceWallet from "~/domains/wallet/balance/GetBalanceWallet";
import { useStore } from "~/store/store";


const Dashboard = () => {
  
  const {movements, setMovements} = useStore() 
  
  return (
    <div className="p-6">
   
      <div className="bg-[var(--color-neutral)] text-[var(--color-dark)] p-4 rounded-lg shadow mb-6">
        <h2 className="font-semibold text-lg mb-3">Balance General</h2>
         <GetBalanceWallet/>
      </div>

      <div className="bg-[var(--color-neutral)] text-[var(--color-dark)] p-4 rounded-lg shadow mb-6">
      <h2 className="font-semibold text-lg mb-2">Cashback</h2>
      <p className="text-sm text-[var(--color-dark-muted)] mb-3">
        Por cada movimiento que generes en la app, acumulas cashback.
      </p>
      <GetBalanceCaskback />
    </div>

     <div>
        <h2 className="text-lg font-semibold mb-2">Movimientos Recientes</h2>
       <div className="space-y-2">
       <MovementsList movements={movements} setMovements={setMovements} limit={10} />
    </div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);