import { useState } from 'react';
import { connectWallet, disconnectWallet } from '../lib/account/petra';

export const WalletConnect = () => {
  const [address, setAddress] = useState<string | null>(null);

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

  return (
    <div>
      {!address ? (
        <button onClick={handleConnect}>지갑 연결</button>
      ) : (
        <>
          <p>연결된 주소: {address}</p>
          <button onClick={handleDisconnect}>연결 해제</button>
        </>
      )}
    </div>
  );
}; 