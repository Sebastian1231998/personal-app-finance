import { useState } from 'react'

import CreateNewExpenseForm from '~/bussiness-services/expenses/CreateNewExpenseForm'

import MovementsList from '~/domains/movements/services/list/MovementsList'
import GetBalanceWallet from '~/domains/wallet/balance/GetBalanceWallet'
import type { Route } from './+types/Expenses';
import { useStore } from '~/store/store';

import type { Movement } from '~/domains/movements/interfaces';
import { createMovement } from '~/domains/movements/queries/post';


export async function clientAction({
  request,
}: Route.ClientActionArgs) {
  
  let formData = await request.formData();

  const description = formData.get("description")?.toString() ?? ""
  const amount = parseFloat(formData.get("amount")?.toString() ?? "0")
  const movement_type = formData.get("movement_type")?.toString() ?? ""
  const category_id = formData.get("categories")?.toString() ?? ""
  const wallet_id = formData.get("wallet_id")?.toString() ?? ""

  const {data, error} = await createMovement({description, movement_type, category_id, wallet_id, amount })

  if(error){
        return {
            success:null,
            error: true
        }
      }

    return {
        success: {
          movement: data?.[0],
          amount: amount
        },
        error:false
      }
}

const Expenses = ({actionData}: {actionData:{success: {movement: Movement, amount: number}, error: boolean }} ) => {

  const {success=null, error=false} = actionData ?? {success:null, error:false}
  const [open, setOpen] = useState(false)

  const {expenseMovements, setExenseMovements} = useStore()
  return (
   <div className="p-6">

    <div className="bg-[var(--color-neutral)] text-[var(--color-dark)] p-4 rounded-lg shadow mb-6">
        <h2 className="font-semibold text-lg mb-3">Balance General</h2>
        <GetBalanceWallet />
    </div>

    <div className="mb-4">
        <button onClick={()=> setOpen(true)} className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg shadow hover:bg-[var(--color-primary-light)]">
        + Crear Gasto
        </button>
    </div>

    {open && <CreateNewExpenseForm success={success} error={error} setOpen={setOpen} />}

    <div>
        <h2 className="text-lg font-semibold mb-2">Gastos Recientes</h2>
        <div className="space-y-2">
           <MovementsList movements={expenseMovements} setMovements={setExenseMovements} movement_type='debit' limit={30} />
        </div>
    </div>
    </div>
  )
}

export default Expenses