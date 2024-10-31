import Panora, { PanoraConfig } from "@panoraexchange/swap-sdk"
import { Offer, useSwapStore } from "@/store/useSwapStore"
import { useWalletStore } from "@/store/useWalletStore"
import { useToast } from "./use-toast";

// export type PanoraQuote = {
//     chainId: string;
//     fromTokenAddress: string;
//     toTokenAddress: string;
//     fromTokenAmount: string;
//     expectedOutput: string;
//     estimatedGas: string;
//     priceImpact: string;
// }

export type PanoraQuote = {
    quotes: Array<{
        toTokenAmount: string;
        toTokenAmountUSD: string;
        priceImpact: string;
        feeAmount: string;
    }>;
}

export const usePanora = () => {
    const { sellAmount, sellToken, buyToken } = useSwapStore()
    const { address } = useWalletStore()
    const { toast } = useToast()

    const config: PanoraConfig = {
        apiKey: "a4^KV_EaTf4MW#ZdvgGKX#HUD^3IFEAOV_kzpIE^3BQGA8pDnrkT7JcIy#HNlLGi",
        rpcUrl: "https://fullnode.mainnet.aptoslabs.com/v1"
      }
    const client = new Panora(config);

    const getPanoraQuotes = async () => {
        if (sellAmount <= 0) return

        try {                 
                 // @ts-ignore  
          const response = await client.ExactInSwapQuote({
            chainId: "1",
                   // @ts-ignore
            fromTokenAddress: sellToken?.ca,
                   // @ts-ignore
            toTokenAddress: buyToken?.ca,
                   // @ts-ignore
            fromTokenAmount: sellAmount,
                   // @ts-ignore
            toWalletAddress: address || "",
            slippagePercentage: "1",
                   // @ts-ignore
            integratorFeeAddress: address || "",
            integratorFeePercentage: "1",
            getTransactionData: "rawTransaction"
          });
          
          console.log('Swap Quote Response:', response);
          return response
        } catch (error) {
          console.error('Error getting swap quote:', error);
        }
      };

    const toOfferList = (response: PanoraQuote): Offer[] => {
        if (!response.quotes || response.quotes.length === 0) {
            return [];
        }
       // @ts-ignore
        return response.quotes.map((quote, index) => ({
            name: buyToken?.symbol || "",
            amount: parseFloat(quote.toTokenAmount),
            usdValue: parseFloat(quote.toTokenAmountUSD),
            gasFee: parseFloat(quote.feeAmount),
            difference: 'BEST',
            priceImpact: parseFloat(quote.priceImpact),
            type: 'PANORA',
            routeIndex: index
        }));
    }


    const swapPanora = async () => {
      const response = await client.ExactInSwap(
        {
          chainId: "1",
                 // @ts-ignore
          fromTokenAddress: sellToken?.ca,
                 // @ts-ignore
          toTokenAddress: buyToken?.ca,
                 // @ts-ignore
          fromTokenAmount: sellAmount,
                 // @ts-ignore
          toWalletAddress: address,
                 // @ts-ignore
          slippagePercentage: "1",
                 // @ts-ignore
          integratorFeeAddress: address,
          integratorFeePercentage: "1",
        },
        "0xe68115cc0ca110424d128ac716bd11b9da9e902c2228be554ce0f1adffff0bfb"
      )
      toast({
        title: "Swap Success",
      })
      console.log('response :',response)
    }

    return {
        getPanoraQuotes,
        toOfferList,
        swapPanora
    }
}
