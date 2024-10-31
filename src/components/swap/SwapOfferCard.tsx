import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSwapStore } from "@/store/useSwapStore"

export default function SwapOfferCard() {

    const { buyToken, offerList } = useSwapStore()
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleCardClick = (index: number) => {
        setActiveIndex(index);
    };

    useEffect(()=>{
        setActiveIndex(0)
    }, [offerList])

    return (
        <Card className="bg-dark border-primary min-w-[405px]">
                        <CardHeader>
                            <CardTitle className="text-lg text-white">Select a route to perform a swap</CardTitle>
                            <p className="text-sm text-gray-400">Best route is selected based on net output after gas
                                fees.</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {offerList.map((option, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleCardClick(index)}
                                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer text-white ${
                                        activeIndex === index ? 'bg-background border border-primary' : 'bg-dark/20'
                                    }`}
                                >
                                    <div>
                                        <div className="font-bold">{option.amount} {buyToken?.symbol}</div>
                                        <div className="text-sm text-gray-400">≈ ${option.usdValue} after gas fees</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm">${option.gasFee} via {option.name}</div>
                                        <div
                                            className={`text-sm ${option.difference === 'BEST' ? 'text-green-400' : 'text-red-400'}`}>
                                            {option.difference}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
    )
}