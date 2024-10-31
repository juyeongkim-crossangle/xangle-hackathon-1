import { Offer, useSwapStore } from "@/store/useSwapStore";
import { createAggregator, getHippoQuotesApis } from '@/lib/hippo/hippo'
import { useWalletStore } from "@/store/useWalletStore";

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

const MAINNET_CONFIG = {
    fullNodeUrl: "https://fullnode.mainnet.aptoslabs.com/v1",
    // 기타 필요한 설정들...
};

export const useHippo = () =>{
    const { sellAmount, sellToken, buyToken } = useSwapStore()
    const { getAllQuotes } = getHippoQuotesApis
    const { address } = useWalletStore()

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
            const result = await getAllQuotes(defaultAgg, sellAmount, xInfo[0], yInfo[0])
            // const quote = await defaultAgg.getBestQuote(buyAmount, xInfo[0], yInfo[0]);
            return sortRoutesByBestCriteria(result)
    }

    function toOfferList(routes: RouteData[]): Offer[]{
        return routes.map((route, index)=>({
            name: route.quote.outputSymbol,
            amount: route.quote.outputUiAmt, // 수량
            usdValue: Math.floor(route.quote.avgPrice * route.quote.outputUiAmt) , // 가격
            gasFee: Math.floor(route.quote.gasUnits),
            difference: 'BEST',
            type: 'HIPPO',
            routeIndex: index
        }))
    }

    return {
        sortRoutesByBestCriteria,
        getHippoQuotes,
        toOfferList
    }
}