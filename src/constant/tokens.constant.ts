export type TokenTypes = {
    symbol: string;
    name: string;
    icon: string;
    ca: string;
    dex: string;
}

export const TOKENS: TokenTypes[] = [
    { symbol: 'APT', name: 'Aptos', icon: '🔹', dex:'liquidswap-335', ca:'0x1::aptos_coin::AptosCoin' },
    { symbol: 'THL', name: 'Thala', icon: '🟠', dex:'thala-51', ca: '0x7fd500c11216f0fe3095d0c4b8aa4d64a4e2e04f83758462f2b127255643615::thl_coin::THL' },
    { symbol: 'USDT', name: 'USDT', icon: '🔴', ca:'0x357b0b74bc833e95a115ad22604854d6b0fca151cecd94111770e5d6ffc9dc2b', dex:'liquidswapv0p5-16'},
    { symbol: 'wETH', name: 'wETH', icon: '🔢', ca:'0xcc8a89c8dce9693d354449f1f73e60e14e347417854f029db5bc8e7454008abb', dex: 'thala-121' },
    { symbol: 'GUI', name: 'GUI', icon: '🥩', ca:'0xe4ccb6d39136469f376242c31b34d10515c8eaaa38092f804db8e08a8f53c5b2::assets_v1::EchoCoin002', dex: 'thala-1672'  },
]