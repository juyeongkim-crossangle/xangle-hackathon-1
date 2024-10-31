import { AptosAccount } from "aptos";

// Petra 지갑 응답 타입 정의
interface PetraWallet {
  connect: () => Promise<{ address: string }>;
  account: () => Promise<{ wallet: AptosAccount }>;
  // account: () => AptosAccount;
  disconnect: () => Promise<void>;
}

interface Window {
  aptos?: PetraWallet;
}

// Petra 지갑 가져오기
export const getAptosWallet = (): PetraWallet | null => {
  if (typeof window !== 'undefined' && window.aptos) {
    return window.aptos;
  }
  return null;
};

// 지갑 연결 함수
export const connectWallet = async (): Promise<{ wallet: AptosAccount } | null> => {
  try {
    const wallet = getAptosWallet();
    if (!wallet) {
      window.open('https://petra.app/', '_blank');
      return null;
    }

    // PetraWallet 인 wallet 을 AptosAccount 로 변환
    const aptosAccount = new AptosAccount(wallet.account().wallet.address);
    
    wallet.connect().then((response) => {
      console.log(response);
      response.address
    });
    

    const response = await wallet.connect();
    const account = await wallet.account();

    response.
    
    
    return wallet;
  } catch (error) {
    console.error('지갑 연결 실패:', error);
    return null;
  }
};

// 지갑 연결 해제 함수
export const disconnectWallet = async (): Promise<boolean> => {
  try {
    const wallet = getAptosWallet();
    if (!wallet) return false;

    await wallet.disconnect();
    return true;
  } catch (error) {
    console.error('지갑 연결 해제 실패:', error);
    return false;
  }
}; 