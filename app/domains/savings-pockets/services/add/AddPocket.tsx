import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import FormAddNewPocket from './FormAddNewPocket'
import type { Pocket } from '../../interfaces'

const AddPocket = ({success, error}: {success: {pocket: Pocket}, error: boolean}) => {

  const [open, setOpen] = useState(false)

  return (
    <>

     { open && <FormAddNewPocket success={success} error={error} setOpen={setOpen} /> }
      <div onClick={() => setOpen(true)} className="bg-white text-[var(--color-dark)] p-2 rounded-lg flex flex-col items-center justify-center shadow-sm border-2 border-dashed border-gray-400 cursor-pointer hover:bg-gray-100">
          <FaPlus className="text-lg" />
          <p className="font-medium text-sm mt-1">Agregar</p>
      </div>
    </>
   
  )
}

export default AddPocket