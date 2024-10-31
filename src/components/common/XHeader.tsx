import React from 'react';
import { Button } from '@/components/ui/button';
import { connectWallet, disconnectWallet } from '@/lib/account/petra';
import { useWalletStore } from '@/store/useWalletStore';


export default function XHeader() {
    const { address, setAddress, setPublicKey } = useWalletStore();

    const handleConnect = async () => {
      const account = await connectWallet();
      if (account) {
    
        setAddress(account.address);
        setPublicKey(account.publicKey)
      }
    };

    const handleDisconnect = async () => {
      const success = await disconnectWallet();
      if (success) {
        setAddress(null);
      }
    };


    return (
        <header className="flex justify-between items-center mb-8 w-full">
        <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="XaasSwap Logo" className="w-6 h-6" />
            <span className="text-xl font-bold">XaasSwap</span>
        </div>
        <Button
            variant="outline"
            className="bg-dark text-primary border-primary"
            onClick={address ? handleDisconnect : handleConnect}
        >
            {address ? 'Disconnect Wallet' : 'Connect Wallet'}
        </Button>
        </header>
    )
}
