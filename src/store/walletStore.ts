import { create } from 'zustand';

interface WalletState {
  address: string | null;
  setAddress: (address: string | null) => void;
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
})); 