import { useState } from "react";
import { Form } from "react-router";
import SelectCategory from "~/domains/categories/services/list/SelectListCategories";
import { supabase } from "~/domains/configuration/supabase";
import type { Movement } from "~/domains/movements/interfaces";
import { createMovement } from "~/domains/movements/queries/post";
import { updateBalancePocket } from "~/domains/savings-pockets/queries/put";
import ErrorMessage from "~/shared/errors/ErrorMessage";
import { useStore } from "~/store/store";



const FormCreateSaving = ({setOpen}:any) => {

  const [error, setError] = useState(false)
  const [messageError, setMessageError] = useState('No se pudo crear el movimiento')
  const [loading, setLoading] = useState(false)
  
  const {wallet, pocket, pockets ,savingsMovements, setSavingsMovements, setWallet, setPockets} = useStore()

  const [saving, setSaving] = useState({
    description:'',
    movement_type: 'credit',
    amount: 0,
    categories: ''
  })

  const onChange = (e: any)=>{
    setSaving({
        ...saving,
        [e.target.name]:e.target.value
    })
  }

  const createMovementSaving = async (e: any) => {
    console.log("Iniciando creación de movimiento");
    setLoading(true);
    e.preventDefault();

    if (saving.description === "" || saving.amount === 0 || saving.categories === "") {
      console.log("Error: Campos vacíos", { saving });
      setError(true);
      setMessageError("Los campos no pueden estar vacíos");
      setLoading(false);
      return;
    }

    console.log("Llamando RPC para crear movimiento y actualizar pocket", {
      wallet_id: wallet?.wallet_id,
      amount: saving.amount,
      description: saving.description,
      movement_type: saving.movement_type,
      category_id: saving.categories,
      pocket_id: pocket.id
    });

    const { error } = await supabase.rpc('add_movement_and_update_pocket', {
      p_wallet_id: wallet?.wallet_id ?? "",
      p_amount: saving.amount,
      p_description: saving.description,
      p_movement_type: saving.movement_type,
      p_category_id: saving.categories,
      p_pocket_id: pocket.id
    });

    if (error) {
      console.error("Error RPC:", error);
      setError(true);
      setMessageError("No se pudo crear el movimiento");
      setLoading(false);
      return;
    }

    console.log("RPC ejecutada correctamente, construyendo nuevo movimiento");

    const newMovement: Movement = {
      id: crypto.randomUUID(),
      amount: saving.amount,
      description: saving.description,
      movement_type: saving.movement_type,
      created_at: new Date().toISOString(),
      categories: {
        name: "Movimiento creado"
      }
    };

    const updatedPockets = pockets.map((p) =>
      p.id === pocket.id
        ? { ...p, balance: p?.balance! + parseFloat(saving.amount.toString()) }
        : p
    );

    setSavingsMovements([newMovement, ...savingsMovements]);

    setWallet({ ...wallet, balance: parseFloat(wallet?.balance!.toString()) + parseFloat(saving.amount.toString()) });

    setPockets(updatedPockets);

    setOpen(false);
    setLoading(false);
    console.log("Proceso completado");
  };


  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            
            <button
              onClick={()=> setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Agregar Ahorro</h2>

            <form className="flex flex-col gap-4">

              <input
                type="text"
                className="input"
                name="description"
                onChange={onChange}
                placeholder="Descripción"
                required
              />

              <select
                name="movement_type"
                className="input"
                onChange={onChange}
                required
                value={"credit"}
              >
                <option value="credit">Ahorro</option>
              </select>

              <input
                type="number"
                step="0.01"
                className="input"
                name="amount"
                onChange={onChange}
                placeholder="Monto"
                required
              />

              <SelectCategory onChange={onChange} />

              <button
                type="submit"
                className="btn-primary"
                onClick={createMovementSaving}
                disabled={loading}
              >
                {loading ? 'Añadiendo...': 'Añadir ahorro'}
              </button>
              <input type="hidden" name="wallet_id" value={wallet?.wallet_id ?? ""} />
            </form>
            {error && <div className='mt-2'>
                <ErrorMessage message={messageError} />
            </div>
            }
          </div>
        </div>
  )
}

export default FormCreateSaving