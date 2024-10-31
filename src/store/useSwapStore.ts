import { TokenTypes } from "@/constant/tokens.constant";
import { create } from "zustand";

interface SwapState {
  sellAmount: number;
  buyAmount: number;
  sellToken: TokenTypes | null;
  buyToken: TokenTypes | null;
  slippage: number;
}

interface SwapActions {
  setSellAmount: (amount: number) => void;
  setBuyAmount: (amount: number) => void;
  setSellToken: (token: TokenTypes) => void;
  setBuyToken: (token: TokenTypes) => void;
  setSlippage: (value: number) => void;
}

type SwapStore = SwapState & SwapActions;

export const useSwapStore = create<SwapStore>((set) => ({
  sellAmount: 0,
  setSellAmount: (amount: number) => set({ sellAmount: amount }),
  buyAmount: 0,
  setBuyAmount: (amount: number) => set({ buyAmount: amount }),
  sellToken: null,
  setSellToken: (token: TokenTypes) => set({ sellToken: token }),
  buyToken: null,
  setBuyToken: (token: TokenTypes) => set({ buyToken: token }),
  slippage: 0,
  setSlippage: (value: number) => set({ slippage: value }),
}));