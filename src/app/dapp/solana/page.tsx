"use client"

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { ContextProvider } from "./contexts/ContextProvider";
import CreateToken from "./components/CreateToken"
import TokenInfo from "./components/TokenInfo"
import CombineFun from "./components/TokenInfo"

const SolanaToken = () => {
  return (
    <ContextProvider>
      <div className="flex flex-col h-full p-2">
        <div className="w-full flex justify-center space-y-1">
          <WalletMultiButton />
        </div>
        <div className="flex-[1] flex flex-wrap gap-2 mt-2">
          <div className="w-[260px] h-fit rounded-md border border-[#adadad] p-1">
            <CreateToken />
          </div>
          <div className="w-[260px] h-fit rounded-md border border-[#adadad]">
            <TokenInfo />
          </div>
          <div className="w-[260px] h-fit rounded-md border border-[#adadad]">
            <CombineFun />
          </div>
        </div>
      </div>
    </ContextProvider>
  );
};

export default SolanaToken;
