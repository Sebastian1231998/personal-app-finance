import React from 'react'
import { FaUndo } from 'react-icons/fa';
import { useListMovements } from '../../queries/get';
import { useUser } from '@supabase/auth-helpers-react';
import ErrorMessage from '~/shared/errors/ErrorMessage';
import { useStore } from '~/store/store';
import type { Movement } from '../../interfaces';

const MovementsList = ( props: { movements: Movement[], setMovements:Function, limit?: number; movement_type?: string }) => {

  const {movements, setMovements} = props

  const {wallet} = useStore()
  const { data, error, isLoading } = useListMovements(wallet?.wallet_id!, setMovements , props)
  const list = data?.data

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex justify-between p-3 bg-white rounded-lg shadow animate-pulse items-center"
          >
            {/* Columna izquierda */}
            <div className="flex flex-col gap-2 w-3/4">
              <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
              <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
              <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
            </div>
            {/* Columna derecha */}
            <div className="flex flex-col gap-2 items-end w-1/4">
              <div className="h-4 w-12 bg-gray-300 rounded"></div>
              <div className="h-4 w-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <ErrorMessage message="Hubo un error al cargar los movimientos" />
  }

  if (!list || list.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow text-gray-500">
        <p className="text-lg font-medium mb-2">No hay movimientos</p>
        <p className="text-sm">Aún no has registrado ningún movimiento en tu cuenta.</p>
      </div>
    )
  }

  return (
    <>
      {movements.map((m) => {
        const fechaFormateada = new Date(m.created_at ?? "").toLocaleDateString("es-CO")

        return (
          <div key={m.id} className="flex justify-between p-3 bg-white rounded-lg shadow items-center">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <p className="font-medium">{m.description}</p>
                {m.movement_type === "debit" && (
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs">Gasto</span>
                )}
                {m.movement_type === "credit" && (
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">Ahorro</span>
                )}
                {m.movement_type === "reversal-debit" && (
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">Reverso Gasto</span>
                )}
                {m.movement_type === "reversal-credit" && (
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs">Reverso Ahorro</span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">{m.categories?.name}</p>
              <p className="text-xs text-gray-400 mt-1">{fechaFormateada}</p>
            </div>

            <div className="flex items-center gap-2">
              <p
                className={
                  m.movement_type === "debit"
                    ? "text-red-500 font-bold"
                    : m.movement_type === "credit"
                    ? "text-green-500 font-bold"
                    : m.movement_type === "reversal-debit"
                    ? "text-green-500 font-bold"
                    : "text-red-500 font-bold"
                }
              >
                {m.movement_type === "debit" || m.movement_type === "reversal-credit" ? "-" : "+"}
                {m.amount?.toLocaleString() ?? "0"} {wallet.currency}
              </p>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default MovementsList
