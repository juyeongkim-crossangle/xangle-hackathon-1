import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useSwapStore } from "@/store/useSwapStore"
import { TOKENS } from "@/constant/tokens.constant"
import { useWalletStore } from "@/store/useWalletStore"
import { connectWallet, disconnectWallet } from "@/lib/account/petra"
import { useHippo } from "@/hooks/useHippo"
import { usePanora } from "@/hooks/usePanora"
import { useCallback, useEffect } from "react"


export default function SwapCard() {

    const {
        sellAmount, setSellAmount,
        buyAmount, setBuyAmount,
        sellToken, setSellToken,
        buyToken, setBuyToken,
        slippage, setSlippage,
        setOfferList, selectedOffer
    } = useSwapStore()

    const { address, setAddress } = useWalletStore();
    const { getHippoQuotes, toOfferList: toHippoOfferList, swapHippo } = useHippo()
    const { getPanoraQuotes, toOfferList: toPanoraOfferList, swapPanora } = usePanora()


    const handleConnect = async () => {
      const account = await connectWallet();
      if (account) {
        setAddress(account.address);
      }
    };

    const handleDisconnect = async () => {
      const success = await disconnectWallet();
      if (success) {
        setAddress(null);
      }
    };


    const handleGetQuotes = useCallback(async () => {
        const hippoQuotes = await getHippoQuotes()
        const panoraQuotes = await getPanoraQuotes()

        if(hippoQuotes.length === 0 && !panoraQuotes) {
            setOfferList([])
            setBuyAmount(0)
            return
        }

        const offerList = [
            ...(panoraQuotes ? toPanoraOfferList(panoraQuotes) : []),
            ...toHippoOfferList(hippoQuotes)?.slice(0, 3),
        ].sort((a,b)=> b.amount - a.amount)

        
        // @ts-ignore
        setOfferList(offerList)
    }, [getHippoQuotes, sellAmount, setBuyAmount, setOfferList, toHippoOfferList])

    const handleSwap = async () => {
        if (!selectedOffer) {
            console.error("No offer selected")
            return
        }

        try {
            if (selectedOffer.type === 'HIPPO') {
                console.log('Selected type:', selectedOffer.type)
                swapHippo()
                
                // 여기에 HIPPO 스왑 로직 추가
            } else if (selectedOffer.type === 'PANORA') {
                console.log('Selected type:', selectedOffer.type)
                // 여기에 PANORA 스왑 로직 추가
                swapPanora()
            }
        } catch (error) {
            console.error('Swap failed:', error)
        }
    }

    useEffect(()=>{
        setOfferList([])
        handleGetQuotes()
    }, [sellAmount, buyToken])

    useEffect(()=>{
        if(!selectedOffer) return
        setBuyAmount(selectedOffer.amount)
    }, [selectedOffer, setBuyAmount])

    return (
        <Card className="bg-dark border-primary text-white min-w-[405px]">
                        <CardContent className="h-full p-4">
                            <div className="flex flex-col gap-4 h-full">
                                <div className="space-y-2">
                                    <label className="text-sm">You sell</label>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="number"
                                            value={sellAmount}
                                            onChange={(e) => {
                                                       // @ts-ignore
                                                setSellAmount(e.target.value)
                                            }}
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

                                <div className="space-y-2">
                                    <label className="text-sm">You buy</label>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="number"
                                            value={buyAmount}
                                            onChange={(e) => {
                                                       // @ts-ignore
                                                setBuyAmount(e.target.value)
                                            }}
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
                                                   // @ts-ignore
                                            onChange={(e) => setSlippage(e.target.value)}
                                            className="w-16 text-center"
                                        />
                                        <span className="text-sm">%</span>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    className="bg-dark text-primary border-primary mt-auto w-full"
                                    onClick={address ? handleSwap : handleConnect}
                                >
                                    {address ? 'Swap' : 'Connect Wallet'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
    )
        
}