'use client'

import { useState, useEffect } from 'react'
import XHeader from '@/components/common/XHeader'
import { useSwapStore } from '@/store/useSwapStore'
import SwapCard from '@/components/swap/SwapCard'
import SwapOfferCard from '@/components/swap/SwapOfferCard'
import { WalletConnect } from '@/components/WalletConnect'


export default function Swap() {
    const {
        buyToken,
    } = useSwapStore()
    const [iframeSrc, setIframeSrc] = useState(`https://dexscreener.com/aptos/${buyToken?.ca}?embed=1&theme=dark&trades=0&info=0`)

    useEffect(() => {
        setIframeSrc(`https://dexscreener.com/aptos/${buyToken?.ca}?embed=1&theme=dark&trades=0&info=0`)
    }, [buyToken])

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
            <XHeader />
            <div className="flex gap-10 justify-center">
                <div className='w-1/3'>
                    <iframe className='w-full h-full' src={iframeSrc} />
                </div>
                <div className="flex gap-6 flex-wrap w-2/3">
                    <SwapCard />
                    <SwapOfferCard />
                </div>
            </div>
        </div>
    )
}