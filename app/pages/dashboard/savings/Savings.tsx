import React from 'react'
import { FaPlus } from 'react-icons/fa'
import MovementsList from '~/domains/movements/services/list/MovementsList'
import AddPocket from '~/domains/savings-pockets/services/add/AddPocket'
import SavingPocketsList from '~/domains/savings-pockets/services/list/SavingPocketsList'
import GetBalanceWallet from '~/domains/wallet/balance/GetBalanceWallet'
import { useStore } from '~/store/store'
import type { Route } from './+types/Savings'
import { createSavingPocket } from '~/domains/savings-pockets/queries/post'
import type { Pocket } from '~/domains/savings-pockets/interfaces'


export async function clientAction({
  request,
}: Route.ClientActionArgs) {
  
  let formData = await request.formData();

  const description = formData.get("description")?.toString() ?? ""
  const wallet_id = formData.get("wallet_id")?.toString() ?? ""

  const {data, error} = await createSavingPocket({ description, wallet_balance_id:wallet_id})
  if(error){
        return {
            success:null,
            error: true
        }
      }

    return {
        success: {
          pocket: data?.[0],
        },
        error:false
      }
}

const Savings = ({actionData}: {actionData:{success: {pocket: Pocket}, error: boolean }}) => {

  const {success, error} = actionData ?? {success: null, error: false}
  const {savingsMovements, setSavingsMovements} = useStore()
  return (
    <div className="p-6">
   
      <div className="bg-[var(--color-neutral)] text-[var(--color-dark)] p-4 rounded-lg shadow mb-6">
        <h2 className="font-semibold text-lg mb-3">Balance General</h2>
         <GetBalanceWallet  />
         <div>
          <h3 className="font-semibold mb-2">Bolsillos de Ahorro</h3>
          <div className="bg-[#D9D9D9] p-3 rounded-lg grid grid-cols-3 gap-3">
            <SavingPocketsList />
            <AddPocket success={success} error={error} />
          </div>
        </div>
      </div>

     <div>
        <h2 className="text-lg font-semibold mb-2">Ahorros</h2>
       <div className="space-y-2">
       <MovementsList movements={savingsMovements} setMovements={setSavingsMovements} movement_type='credit' limit={30} />
    </div>
      </div>
    </div>
  )
}

export default Savings