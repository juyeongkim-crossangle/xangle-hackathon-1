import { Offer, useSwapStore } from "@/store/useSwapStore";
import { createAggregator, getHippoQuotesApis } from '@/lib/hippo/hippo'

export type HippoQuote = {
    inputSymbol: string;
    outputSymbol: string;
    inputUiAmt: string;
    outputUiAmt: number;
    avgPrice: number;
    priceImpact: number;
    gasUnits: number;
};

export type Route = {
    tokens: string[];
    steps: any[]; // steps의 구조에 따라 타입을 구체화할 수 있습니다.
};

export type RouteData = {
    route: Route;
    quote: HippoQuote;
    innerStepQuotes: HippoQuote[];
};


export const useHippo = () =>{
    const { sellAmount, sellToken, buyToken } = useSwapStore()
    const { getAllQuotes } = getHippoQuotesApis

    function sortRoutesByBestCriteria(routes: RouteData[]): RouteData[] {
        return routes.sort((a, b) => {
            // outputUiAmt 내림차순
            if (b.quote.outputUiAmt !== a.quote.outputUiAmt) {
                return b.quote.outputUiAmt - a.quote.outputUiAmt;
            }
            // avgPrice 오름차순
            if (a.quote.avgPrice !== b.quote.avgPrice) {
                return a.quote.avgPrice - b.quote.avgPrice;
            }
            // priceImpact 오름차순
            if (a.quote.priceImpact !== b.quote.priceImpact) {
                return a.quote.priceImpact - b.quote.priceImpact;
            }
            // gasUnits 오름차순
            return a.quote.gasUnits - b.quote.gasUnits;
        });
    }

    async function getHippoQuotes(){
            const {defaultAgg} = await createAggregator()
            const xInfo = await defaultAgg.coinListClient.getCoinInfoBySymbol(sellToken?.symbol);
            const yInfo = await defaultAgg.coinListClient.getCoinInfoBySymbol(buyToken?.symbol);
            // console.log('xInfo :',xInfo)
            // console.log('yInfo :',yInfo)
            // console.log('defaultAgg :',defaultAgg)
            const result = await getAllQuotes(defaultAgg, sellAmount, xInfo[0], yInfo[0])
            // const quote = await defaultAgg.getBestQuote(buyAmount, xInfo[0], yInfo[0]);
            return sortRoutesByBestCriteria(result)
    }



    function toOfferList(routes: RouteData[]): Offer[]{
        return routes.map((route)=>({
            name: route.quote.outputSymbol,
            amount: route.quote.outputUiAmt,
            usdValue: route.quote.avgPrice,
            gasFee: route.quote.gasUnits,
            difference: 'BEST'
        }))
    }

    return {
        sortRoutesByBestCriteria,
        getHippoQuotes,
        toOfferList
    }
}