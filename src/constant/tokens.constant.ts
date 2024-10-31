export type TokenTypes = {
    symbol: string;
    name: string;
    icon: string;
    ca: string;
}

export const TOKENS: TokenTypes[] = [
    { symbol: 'ETH', name: 'Ethereum', icon: '🔹', ca:'0x85d3337c4ca94612f278c5164d2b21d0d83354648bf9555272b5f9d8f1f33b2a' },
    { symbol: 'BTC++', name: 'PieDAO BTC++', icon: '🟠', ca:'thala-51' },
    { symbol: 'UMA', name: 'UMA Voting Token v1', icon: '🔴', ca:'0x85d3337c4ca94612f278c5164d2b21d0d83354648bf9555272b5f9d8f1f33b2a'  },
    { symbol: 'MATH', name: 'MATH Token', icon: '🔢', ca:'thala-51' },
    { symbol: 'STAKE', name: 'STAKE', icon: '🥩', ca:'0x85d3337c4ca94612f278c5164d2b21d0d83354648bf9555272b5f9d8f1f33b2a'  },
]