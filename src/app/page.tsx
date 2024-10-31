'use client'

import { useState, useEffect } from 'react'
import XHeader from '@/components/common/XHeader'
import { useSwapStore } from '@/store/useSwapStore'
import SwapCard from '@/components/swap/SwapCard'
import SwapOfferCard from '@/components/swap/SwapOfferCard'
import { WalletConnect } from '@/components/WalletConnect'

export default function Swap() {
    const { buyToken } = useSwapStore()
    const [iframeSrc, setIframeSrc] = useState(`https://dexscreener.com/aptos/${buyToken?.dex}?embed=1&theme=dark&trades=0&info=0`)

    useEffect(() => {
        setIframeSrc(`https://dexscreener.com/aptos/${buyToken?.dex}?embed=1&theme=dark&trades=0&info=0`)
    }, [buyToken])

    return (
        <div className="min-h-screen text-gray-100 p-4 flex flex-col items-center">
            <XHeader />
            <div className='flex gap-10 w-full'>
                <div className="flex gap-10 justify-center w-full">
                <div className='w-2/3'>
                    <iframe className='w-full h-full' src={iframeSrc} />
                </div>
                <div className="flex gap-4 flex-wrap w-1/3 justify-center">
                    <SwapCard />
                    <SwapOfferCard />
                </div>
                {/* <div>
                    <WalletConnect />
                </div> */}
                </div>
            </div>
            
        </div>
    )
}