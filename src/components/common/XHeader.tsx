import { Button } from "@/components/ui/button";

export default function XHeader() {
    return (
        <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            <span className="text-xl font-bold">LlamaSwap</span>
        </div>
        <Button variant="outline" className="bg-blue-500 text-white">Connect Wallet</Button>
        </header>
    )
}