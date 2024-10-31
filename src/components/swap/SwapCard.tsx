import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Settings, Repeat } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useSwapStore } from "@/store/useSwapStore"
import { TOKENS } from "@/constant/tokens.constant"

export default function SwapCard() {

    const {
        sellAmount, setSellAmount,
        buyAmount, setBuyAmount,
        sellToken, setSellToken,
        buyToken, setBuyToken,
        slippage, setSlippage
    } = useSwapStore()
    
    return (
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
                                        <Select value={sellToken?.symbol}
                                                onValueChange={(value) => setSellToken(TOKENS.find(t => t.symbol === value) || TOKENS[0])}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select token"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {TOKENS.map((token) => (
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
                                        <Select value={buyToken?.symbol}
                                                onValueChange={(value) => setBuyToken(TOKENS?.find(t => t.symbol === value) || TOKENS[4])}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select token"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {TOKENS.map((token) => (
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
                                        {[0.1, 0.5, 1].map((value) => (
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
    )
        
}