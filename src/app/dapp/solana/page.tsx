"use client"

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { ContextProvider } from "./contexts/ContextProvider";
const SolanaToken = () => {
  return (
    <ContextProvider>
      <div className="flex flex-col h-full">
        <div className="w-full flex justify-center">
          <WalletMultiButton />
        </div>
        <div className="flex-[1] flex flex-wrap gap-2 mt-2">
          <div className="w-[260px] h-[450px] rounded-md border border-[#adadad]">

          </div>
          <div className="w-[260px] h-[450px] rounded-md border border-[#adadad]">

          </div>
          <div className="w-[260px] h-[450px] rounded-md border border-[#adadad]">
            
          </div>
        </div>
      </div>
    </ContextProvider>
  );
};

export default SolanaToken;
