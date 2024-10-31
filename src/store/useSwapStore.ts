import { TOKENS, TokenTypes } from "@/constant/tokens.constant";
import { RouteData } from "@/hooks/useHippo";
import { create } from "zustand";

export interface SwapState {
  sellAmount: number;
  buyAmount: number;
  sellToken: TokenTypes | null;
  buyToken: TokenTypes | null;
  slippage: number;
  offerList: Offer[]
  selectedOffer: Offer | null
}

export interface SwapActions {
  setSellAmount: (amount: number) => void;
  setBuyAmount: (amount: number) => void;
  setSellToken: (token: TokenTypes) => void;
  setBuyToken: (token: TokenTypes) => void;
  setSlippage: (value: number) => void;
  setOfferList: (offers: Offer[]) => void;
  setSelectedOffer: (offer: Offer) => void
}

export interface Offer {
    name: string, 
    amount: number, 
    usdValue: number, 
    gasFee: number, 
    difference: 'BEST' | number
    type: 'HIPPO' | 'PANORA'
    routeData?: RouteData
    isSimul: boolean
}

type SwapStore = SwapState & SwapActions;

export const useSwapStore = create<SwapStore>((set) => ({
  sellAmount: 0,
  setSellAmount: (amount: number) => set({ sellAmount: amount }),
  buyAmount: 0,
  setBuyAmount: (amount: number) => set({ buyAmount: amount }),
  sellToken: TOKENS[0],
  setSellToken: (token: TokenTypes) => set({ sellToken: token }),
  buyToken: TOKENS[1],
  setBuyToken: (token: TokenTypes) => set({ buyToken: token }),
  slippage: 0,
  setSlippage: (value: number) => set({ slippage: value }),

  offerList: [],
  setOfferList: (offers: Offer[]) => set({ offerList: offers }),

  selectedOffer: null,
  setSelectedOffer: (offer: Offer) => set({selectedOffer: offer})
}));