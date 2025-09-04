import { create } from 'zustand'
import type { Movement } from '~/domains/movements/interfaces';
import type { Pocket } from '~/domains/savings-pockets/interfaces';
import type { Wallet } from '~/domains/wallet/interfaces'

export const useStore = create<{
  pocket: Pocket,
  pockets: Pocket[]
  wallet: Wallet;
  expenseMovements: Movement[]; 
  savingsMovements: Movement[]; 
  movements: Movement[]; 
  setWallet: (wallet: Wallet) => void;
  setExenseMovements: (expenseMovements:Movement[]) => void,
  setMovements: (movements:Movement[]) => void,
  setSavingsMovements: (savingsMovements:Movement[]) => void,
  setPockets: (pockets:Pocket[]) => void,
  setPocket: (pocket:Pocket) => void,
}>((set) => ({
  pockets: [] as Pocket[],
  pocket: {} as Pocket,
  expenseMovements: [] as Movement[],
  savingsMovements: [] as Movement[],
  movements: [] as Movement[],
  wallet: { wallet_id: null, balance: null, currency: null } as Wallet,
  setWallet: (wallet) => set(() => ({ wallet })),
  setExenseMovements: (expenseMovements) => set(() => ({ expenseMovements })),
  setMovements: (movements) => set(() => ({ movements })),
  setSavingsMovements: (savingsMovements) => set(() => ({ savingsMovements })),
  setPockets: (pockets) => set(() => ({ pockets })),
  setPocket: (pocket) => set(() => ({ pocket }))
}));