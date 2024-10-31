import { create } from 'zustand';
import { AptosAccount } from "aptos";

interface WalletState {
  address: string | null;
  setAddress: (address: string | null) => void;
  account: AptosAccount | null;
  setAccount: (account: AptosAccount | null) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  address: localStorage.getItem('walletAddress'),
  setAddress: (address: string | null) => {
    set({ address });

    if (address) {
      localStorage.setItem('walletAddress', address);
    } else {
      localStorage.removeItem('walletAddress');
    }
  },
  account: null,
  setAccount: (account: AptosAccount | null) => {
    set({ account });
  }
})); 