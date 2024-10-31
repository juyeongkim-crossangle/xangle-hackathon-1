import React from 'react';
import { Button } from '@/components/ui/button';
import { connectWallet, disconnectWallet } from '@/lib/account/petra';
import { useWalletStore } from '@/store/walletStore';


export default function XHeader() {
    const { address, setAddress } = useWalletStore();

    const handleConnect = async () => {
      const account = await connectWallet();
      if (account) {
        console.log('connect succes', account)
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
        <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            <span className="text-xl font-bold">LlamaSwap</span>
        </div>
        <Button 
            variant="outline" 
            className="bg-blue-500 text-white" 
            onClick={address ? handleDisconnect : handleConnect}
        > 
            {address ? 'Disconnect Wallet' : 'Connect Wallet'}
        </Button>
        </header>
    )
}
