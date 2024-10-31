import { create } from 'zustand';

interface WalletState {
  address: string | null;
  setAddress: (address: string | null) => void;

  publicKey: string | null;
  setPublicKey: (publicKey: string ) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  address: typeof window !== 'undefined' ? localStorage.getItem('walletAddress') : null,
  setAddress: (address: string | null) => {
    set({ address });

    if (typeof window !== 'undefined') {
      if (address) {
        localStorage.setItem('walletAddress', address);
      } else {
        localStorage.removeItem('walletAddress');
      }
    }
  },

  publicKey: null,
  setPublicKey: (key: string) => set({publicKey: key})
})); 