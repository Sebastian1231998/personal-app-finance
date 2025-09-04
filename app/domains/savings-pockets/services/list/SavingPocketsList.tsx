import React, { useEffect, useState } from 'react'
import { useSavingPocketsByWalletId } from '../../queries/get';
import ErrorMessage from '~/shared/errors/ErrorMessage';
import { useStore } from '~/store/store';
import { BiTrash } from 'react-icons/bi';
import FormCreateSaving from '~/bussiness-services/savings/FormCreateSaving';
import DeleteConfirmationPocket from '../delete/DeleteConfirmationPocket';

const SavingPocketsList = () => {
  const { wallet, pockets, setPocket } = useStore()
  const { isError, isLoading } = useSavingPocketsByWalletId(wallet?.wallet_id!);
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  if (isError) {
    return <ErrorMessage message="Hubo un error al cargar los bolsillos de ahorro" />;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-gray-200 animate-pulse h-20 rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      {pockets?.map((pocket) => (
        <div
        key={pocket.id}
        className="relative bg-white text-[var(--color-dark)] p-4 rounded-lg flex flex-col items-center shadow-sm"
      >
        {/* Basurita en la esquina superior izquierda */}
        <button
          className="absolute top-2 left-2 p-1 rounded hover:bg-red-100 transition"
          onClick={() => {setPocket(pocket); setOpenDelete(true)}}
        >
          <BiTrash className="w-5 h-5 text-red-500" />
        </button>

        <h4 className="font-medium text-sm text-center mt-2">{pocket?.description}</h4>
        <p className="font-bold mt-1 text-sm">
          {pocket?.balance?.toLocaleString()} {wallet.currency}
        </p>

        {/* Botón Añadir saldo más sutil */}
        <button
          className="mt-3 bg-green-200 text-green-800 px-4 py-1 rounded hover:bg-green-300 transition"
          onClick={() => { setPocket(pocket); setOpen(true)}}
        >
          Añadir saldo
        </button>
      </div>
      ))}
      {open && <FormCreateSaving setOpen={setOpen} />}
      {openDelete && <DeleteConfirmationPocket setOpen={setOpenDelete} />}
    </>
  );
};

export default SavingPocketsList;