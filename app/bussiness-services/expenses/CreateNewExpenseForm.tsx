
import { useEffect, useState } from 'react';
import { Form, useNavigation, useRevalidator } from 'react-router';
import SelectCategory from '~/domains/categories/services/list/SelectListCategories';
import ErrorMessage from '~/shared/errors/ErrorMessage';
import { useStore } from '~/store/store';


const CreateNewExpenseForm = ({success, error, setOpen}:any) => {

  const revalidator = useRevalidator();
  const {wallet, expenseMovements, setExenseMovements, setWallet} = useStore()

  const fetcher = useNavigation();
  
  const buttomSubmitting = fetcher.state === "submitting" ? "Guardando...": "Guardar";

  useEffect(()=>{
    console.log("success", success)
    if(success){
       setExenseMovements(
        [{...success.movement}, ...expenseMovements])
       setWallet({
        ...wallet,
        balance: wallet?.balance! - success.amount
       })
       revalidator.revalidate()
       setOpen(false)
    }
  },[success])

  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            
            <button
              onClick={()=> setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Agregar Gasto</h2>

            <Form method="post" className="flex flex-col gap-4">

              <input
                type="text"
                className="input"
                name="description"
                placeholder="Descripción"
                required
              />

              <select
                name="movement_type"
                className="input"
                required
              >
                <option value="debit">Gasto</option>
              </select>

              <input
                type="number"
                step="0.01"
                className="input"
                name="amount"
                placeholder="Monto"
                required
              />

              <SelectCategory />

              <button
                type="submit"
                className="btn-primary"
              >
                {buttomSubmitting}
              </button>
              <input type="hidden" name="wallet_id" value={wallet?.wallet_id ?? ""} />
            </Form>
            {error && <div className='mt-2'>
                <ErrorMessage message='No se pudo crear el movimiento' />
            </div>
            }
          </div>
        </div>
  )
}

export default CreateNewExpenseForm