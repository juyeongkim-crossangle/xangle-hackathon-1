import { create } from "zustand";

export interface DexInfo {
  dex: string;
  baseSymbol: string;
  quoteSymbol: string;
  link: string;
}

export interface DexState {
  dexList: DexInfo[];
  selectedDex: DexInfo | null;
}

export interface DexActions {
  setDexList: (dexList: DexInfo[]) => void;
  setSelectedDex: (dex: DexInfo | null) => void;
  getDexBySymbols: (baseSymbol: string, quoteSymbol: string) => DexInfo[];
}

type DexStore = DexState & DexActions;

// 초기 DEX 데이터
const initialDexList: DexInfo[] = [
  { dex: "Cellana", baseSymbol: "amAPT", quoteSymbol: "APT", link: "0x1ef2be2a92" },
  { dex: "Thala", baseSymbol: "amAPT", quoteSymbol: "APT", link: "thala-1308" },
  { dex: "Liquidswap", baseSymbol: "amAPT", quoteSymbol: "APT", link: "liquidswap0j" },
  { dex: "PancakeSwap", baseSymbol: "amAPT", quoteSymbol: "APT", link: "pcs-639" },
  { dex: "PancakeSwap", baseSymbol: "THL", quoteSymbol: "APT", link: "pcs-439" },
  { dex: "Thala", baseSymbol: "THL", quoteSymbol: "APT", link: "thala-46" },
  { dex: "Liquidswap", baseSymbol: "THL", quoteSymbol: "APT", link: "liquidswap0j" },
  { dex: "PancakeSwap", baseSymbol: "MOVE", quoteSymbol: "APT", link: "pcs-342" },
  { dex: "PancakeSwap", baseSymbol: "Cake", quoteSymbol: "APT", link: "pcs-217" },
  { dex: "PancakeSwap", baseSymbol: "Cake", quoteSymbol: "USDC", link: "pcs-218" },
  { dex: "Liquidswap", baseSymbol: "doodoo", quoteSymbol: "APT", link: "liquidswap0j" },
  { dex: "Thala", baseSymbol: "WETH", quoteSymbol: "USDC", link: "thala-121" },
  { dex: "Liquidswap", baseSymbol: "USDC", quoteSymbol: "USDT", link: "liquidswap0j" },
  { dex: "Thala", baseSymbol: "USDC", quoteSymbol: "USDT", link: "thala-15" },
  { dex: "PancakeSwap", baseSymbol: "WETH", quoteSymbol: "USDC", link: "pcs-141" },
  { dex: "Liquidswap", baseSymbol: "WETH", quoteSymbol: "USDC", link: "liquidswap-14" },
  { dex: "PancakeSwap", baseSymbol: "USDC", quoteSymbol: "USDT", link: "pcs-123" },
  { dex: "Thala", baseSymbol: "THL", quoteSymbol: "USDC", link: "liquidswap0j" },
  { dex: "Cellana", baseSymbol: "stAPT", quoteSymbol: "APT", link: "0x7f4a49f78e" },
  { dex: "Liquidswap", baseSymbol: "stAPT", quoteSymbol: "APT", link: "liquidswap0j" },
  { dex: "PancakeSwap", baseSymbol: "stAPT", quoteSymbol: "USDC", link: "pcs-1128" },
  { dex: "Liquidswap", baseSymbol: "stAPT", quoteSymbol: "APT", link: "liquidswap0j" }
];

export const useDexStore = create<DexStore>((set, get) => ({
  dexList: initialDexList,
  selectedDex: null,

  setDexList: (dexList: DexInfo[]) => set({ dexList }),
  
  setSelectedDex: (dex: DexInfo | null) => set({ selectedDex: dex }),
  
  getDexBySymbols: (baseSymbol: string, quoteSymbol: string) => {
    const { dexList } = get();
    return dexList.filter(
      dex => 
        dex.baseSymbol === baseSymbol && 
        dex.quoteSymbol === quoteSymbol
    );
  }
})); 