import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSwapStore } from "@/store/useSwapStore"
import { Skeleton } from '@/components/ui/skeleton'

export default function SwapOfferCard() {

    const { buyToken, offerList, setSelectedOffer } = useSwapStore()
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleCardClick = (index: number) => {
        setActiveIndex(index);
        setSelectedOffer(offerList[index])
    };

    useEffect(()=>{
        setActiveIndex(0)
        setSelectedOffer(offerList[0])
    }, [offerList, setSelectedOffer])

    return (
        <Card className="bg-dark border-primary min-w-[405px]">
                        <CardHeader>
                            <CardTitle className="text-lg text-white">Select a route to perform a swap</CardTitle>
                            <p className="text-sm text-gray-400">Best route is selected based on net output after gas
                                fees.</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {offerList.length === 0 ? (
                                <div className="flex justify-center items-center w-full flex-col gap-4">
                                     <Skeleton  />
                                     <Skeleton  />
                                     <Skeleton />
                                </div>
                            ) : (
                                offerList.map((option, index) => (
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
                                            <div className="text-sm">{option.gasFee} fee amount</div>
                                            <div
                                                className={`text-sm ${option.type === 'HIPPO' ? 'text-green-400' : 'text-red-400'}`}>
                                                {option.type}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
    )
}