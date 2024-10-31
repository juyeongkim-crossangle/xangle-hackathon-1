'use client'

import { useState, useEffect } from 'react'
import { Settings, Repeat } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import XHeader from '@/components/common/XHeader'

const tokens = [
    { symbol: 'ETH', name: 'Ethereum', icon: '🔹', ca:'0x85d3337c4ca94612f278c5164d2b21d0d83354648bf9555272b5f9d8f1f33b2a' },
    { symbol: 'BTC++', name: 'PieDAO BTC++', icon: '🟠', ca:'thala-51' },
    { symbol: 'UMA', name: 'UMA Voting Token v1', icon: '🔴', ca:'0x85d3337c4ca94612f278c5164d2b21d0d83354648bf9555272b5f9d8f1f33b2a'  },
    { symbol: 'MATH', name: 'MATH Token', icon: '🔢', ca:'thala-51' },
    { symbol: 'STAKE', name: 'STAKE', icon: '🥩', ca:'0x85d3337c4ca94612f278c5164d2b21d0d83354648bf9555272b5f9d8f1f33b2a'  },
]

const swapOptions = [
    { name: 'Odos', amount: '49,361.1348', usdValue: '6,094.6', gasFee: '21.7276', difference: 'BEST' },
    { name: 'CowSwap', amount: '49,094.2581', usdValue: '6,082.2', gasFee: '1.088', difference: '-0.20%' },
    { name: 'KyberSwap', amount: '49,105.9624', usdValue: '6,080', gasFee: '4.7294', difference: '-0.24%' },
    { name: 'ParaSwap', amount: '49,100.1287', usdValue: '6,079', gasFee: '5.0499', difference: '-0.26%' },
    { name: 'Matcha/0x', amount: '49,100.1287', usdValue: '6,078.9', gasFee: '5.1348', difference: '-0.26%' },
]

export default function Swap() {
    const [sellAmount, setSellAmount] = useState('10')
    const [buyAmount, setBuyAmount] = useState('49361.134845...')
    const [sellToken, setSellToken] = useState(tokens[0])
    const [buyToken, setBuyToken] = useState(tokens[4])
    const [slippage, setSlippage] = useState('0.5')
    const [iframeSrc, setIframeSrc] = useState(`https://dexscreener.com/aptos/${buyToken.ca}?embed=1&theme=dark&trades=0&info=0`)

    useEffect(() => {
        setIframeSrc(`https://dexscreener.com/aptos/${buyToken.ca}?embed=1&theme=dark&trades=0&info=0`)
    }, [buyToken])

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
            <XHeader />
            <div className="flex gap-10 justify-center">
                <div className='w-1/3'>
                    <iframe className='w-full h-full' src={iframeSrc} />
                </div>
                <div className="flex gap-6 flex-wrap w-2/3">
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Chain</CardTitle>
                            <div className="flex items-center space-x-2">
                                <Switch/>
                                <span className="text-sm text-gray-400">Hide IP</span>
                                <Button variant="ghost" size="icon">
                                    <Settings className="h-4 w-4"/>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Select defaultValue="ethereum">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select chain"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ethereum">Ethereum</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="space-y-4 mt-4">
                                <div className="space-y-2">
                                    <label className="text-sm">You sell</label>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="text"
                                            value={sellAmount}
                                            onChange={(e) => setSellAmount(e.target.value)}
                                            className="flex-grow"
                                        />
                                        <Select value={sellToken.symbol}
                                                onValueChange={(value) => setSellToken(tokens.find(t => t.symbol === value) || tokens[0])}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select token"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {tokens.map((token) => (
                                                    <SelectItem key={token.symbol} value={token.symbol}>
                                                        {token.icon} {token.symbol}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <Button variant="ghost" size="icon">
                                        <Repeat className="h-4 w-4"/>
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm">You buy</label>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="text"
                                            value={buyAmount}
                                            onChange={(e) => setBuyAmount(e.target.value)}
                                            className="flex-grow"
                                        />
                                        <Select value={buyToken.symbol}
                                                onValueChange={(value) => setBuyToken(tokens.find(t => t.symbol === value) || tokens[4])}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select token"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {tokens.map((token) => (
                                                    <SelectItem key={token.symbol} value={token.symbol}>
                                                        {token.icon} {token.symbol}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm">Swap Slippage</label>
                                    <div className="flex items-center space-x-2">
                                        {['0.1', '0.5', '1'].map((value) => (
                                            <Button
                                                key={value}
                                                variant={slippage === value ? "secondary" : "outline"}
                                                onClick={() => setSlippage(value)}
                                                className="flex-1"
                                            >
                                                {value}%
                                            </Button>
                                        ))}
                                        <Input
                                            type="text"
                                            value={slippage}
                                            onChange={(e) => setSlippage(e.target.value)}
                                            className="w-16 text-center"
                                        />
                                        <span className="text-sm">%</span>
                                    </div>
                                </div>

                                <Button className="w-full bg-blue-500 hover:bg-blue-600">Connect Wallet</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-lg">Select a route to perform a swap</CardTitle>
                            <p className="text-sm text-gray-400">Best route is selected based on net output after gas
                                fees.</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {swapOptions.map((option, index) => (
                                <div key={index}
                                     className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                                    <div>
                                        <div className="font-bold">{option.amount} {buyToken.symbol}</div>
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
                </div>
            </div>
        </div>
    )
}