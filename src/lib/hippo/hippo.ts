import { AptosClient, HexString } from "aptos";
import { TradeAggregator, MAINNET_CONFIG,  } from "@manahippo/hippo-sdk";
import { CoinInfo } from "@hippo-sdk/coin-list";
import { sendPayloadTx, TxnBuilderTypes } from "@manahippo/move-to-ts";

// 1. Aggregator 생성
export const createAggregator = async (fullNodeUrl?: 'https://fullnode.mainnet.aptoslabs.com/') => {
  const netConf = { ...MAINNET_CONFIG };
  if (fullNodeUrl) {
    netConf.fullNodeUrl = fullNodeUrl;
  }
  const client = new AptosClient(netConf.fullNodeUrl);
  
  // 기본 풀 사용
  const defaultAgg = new TradeAggregator(client, netConf);
  
  // 또는 온체인에서 풀 로드
  const onchainAgg = await TradeAggregator.create(client, netConf);
  
  return { defaultAgg, onchainAgg, client };
};

// 2. 견적 받기 관련 함수들
export const getHippoQuotesApis = {
  // 최적 견적 받기
  async getBestQuote(agg: TradeAggregator, inputAmt: number, xInfo: CoinInfo, yInfo: CoinInfo) {
    console.log("로컬에서 최적 견적 가져오는 중...");
    const quote = await agg.getBestQuote(inputAmt, xInfo, yInfo);
    console.log(quote, typeof quote);
    if (!quote) {
      console.log(`${xInfo.symbol}에서 ${yInfo.symbol}로의 견적을 찾을 수 없습니다`);
      return null;
    }
    return quote;
  },

  // 모든 견적 받기
  async getAllQuotes(agg: TradeAggregator, inputAmt: number, xInfo: CoinInfo, yInfo: CoinInfo) {
    console.log("로컬에서 견적들 가져오는 중...");
    const quotes = await agg.getQuotes(inputAmt, xInfo, yInfo);
    console.log("quotes: " + quotes, typeof quotes);
    if (quotes.length === 0) {
      console.log(`${xInfo.symbol}에서 ${yInfo.symbol}로의 견적을 찾을 수 없습니다`);
      return [];
    }
    return quotes;
  },

  // 고정 출력 견적 받기
  async getFixedOutputQuote(agg: TradeAggregator, outputAmt: number, xInfo: CoinInfo, yInfo: CoinInfo) {
    console.log("고정 출력 최적 견적 가져오는 중...");
    const quote = await agg.getBestQuoteWithFixedOutput(outputAmt, xInfo, yInfo);
    if (!quote) {
      console.log(`${xInfo.symbol}에서 ${yInfo.symbol}로의 견적을 찾을 수 없습니다`);
      return null;
    }
    return quote;
  },

  // API를 통한 견적 받기
  async getQuotesViaAPI(agg: TradeAggregator, inputAmt: number, xInfo: CoinInfo, yInfo: CoinInfo) {
    console.log("API에서 견적 가져오는 중...");
    const result = await agg.requestQuotesViaAPI(inputAmt, xInfo, yInfo);
    if (result.allRoutesCount === 0) {
      console.log(`${xInfo.symbol}에서 ${yInfo.symbol}로의 견적을 찾을 수 없습니다`);
      return null;
    }
    return result;
  }
};

// 3. 페이로드 생성 함수들
export const createPayload = {
  // 기본 스왑 페이로드
  makeSwapPayload(quote: any, inputAmt: number) {
    return quote.route?.makeSwapPayload(inputAmt, 0);
  },

  // 고정 출력 스왑 페이로드
  makeFixedOutputPayload(quote: any, outputAmt: number) {
    const maxInputAmt = quote.quote.inputUiAmt * 1.05;
    return quote.route.makeFixedOutputPayload(outputAmt, maxInputAmt);
  },

  // 수수료 포함 스왑 페이로드
  makeSwapWithFeesPayload(quote: any, inputAmt: number, feeToHex: HexString, feeBipsNumber: number) {
    return quote.route.makeSwapWithFeesPayload(inputAmt, 0, feeToHex, feeBipsNumber);
  }
};

// 4. 스왑 실행 함수들
export const executeSwap = {
  // 스왑 및 전송
  async swapAndTransfer(
    fromSymbol: string,
    toSymbol: string,
    inputAmt: number,
    toAddress: string,
    simulation: string,
    routeIdx: number,
    account: any
  ) {
    const agg = await createAggregator()

    const netConf = agg.onchainAgg.netConf;
    const client = agg.onchainAgg.client;

    const toAddressHex = new HexString(toAddress);
    const isSimulation = simulation === "true";

    const xInfo = agg.onchainAgg.coinListClient.getCoinInfoBySymbol(fromSymbol)[0];
    const yInfo = agg.onchainAgg.coinListClient.getCoinInfoBySymbol(toSymbol)[0];

    const quotes = await agg.onchainAgg.getQuotes(inputAmt, xInfo, yInfo);
    const quote = quotes[routeIdx];
    if (!quote) return;

    const maxGas = quote.route.gasUnits;

    const payload = createPayload.makeSwapPayload(quote.route, inputAmt);
    // const result = sendPayloadTx(client, account, payload, maxGas);
    const result = await sendPayloadTx(client, account, payload as TxnBuilderTypes.TransactionPayloadEntryFunction);
    console.log(result);
  }
};