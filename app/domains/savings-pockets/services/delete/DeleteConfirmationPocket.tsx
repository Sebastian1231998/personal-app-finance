import { useState } from 'react'
import { useStore } from '~/store/store'
import { deletePocket } from '../../queries/delete'
import ErrorMessage from '~/shared/errors/ErrorMessage'

const DeleteConfirmationPocket = ({setOpen}: {setOpen: Function}) => {

    const {pocket, pockets, setPockets ,wallet,setWallet} = useStore()
    const [errorDelete, setErrorDelete] = useState(false);
    const [loading, setLoading] = useState(false)

    const deletePocketConfirmation = async()=>{
        setLoading(true)
        const {error} = await deletePocket(pocket.id)
        if(error){
           setLoading(false)
           setErrorDelete(true)
           return
        }

        const updatePockets = pockets.filter((pocketUpdate)=> pocketUpdate.id !== pocket.id)

        setWallet({
            ...wallet,
            balance: wallet?.balance! - pocket?.balance!
        })
        setPockets(updatePockets)
        setOpen(false)
        setLoading(false)
    }

  return (
   <div className="fixed inset-0 flex items-center justify-center bg-black bg-black/40 z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-4 text-center">
          ¿Eliminar "{pocket?.description}"?
        </h3>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-4">
          <button
            disabled={loading ? true: false}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={deletePocketConfirmation}
          >
            {loading ? 'Eliminado...':'Eliminar'}
          </button>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
            onClick={()=> setOpen(false)}
          >
            Cancelar
          </button>
          
        </div>
        {errorDelete && <div className='mt-2'><ErrorMessage message='No se pudo eliminar el bolsillo' /></div>}
      </div>
    </div>
  )
}

export default DeleteConfirmationPocket