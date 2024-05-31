"use client"

import { IWallectConfig } from "@/types";
import { useState } from "react";
import WalletView from "./components/wallet-view";
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from './wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WalletType } from "./hooks/context";
import { NetworkType } from "@/utils/enum";

const WalletConnector: React.FC<IWallectConfig> = ({ config }) => {
  const [visible, setVisible] = useState(false);
  const queryClient = new QueryClient();

  const [type, setType] = useState(NetworkType.EVM);
  console.log("ttt");

  return (
    <>
      <div
        className="py-[4px] px-[14px] text-[--basic-text] rounded-xl border-2 boder-solid boder-[--secondry-text] cursor-pointer"
        onClick={() => { setVisible(true) }}
      >
        {config.text || "CONNECT"}
      </div>
      {
        visible
        &&
        <WalletType.Provider value={{ type: type }}>
          <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
              <WalletView />
            </QueryClientProvider>
          </WagmiProvider>
        </WalletType.Provider>
      }
    </>
  )
}

export default WalletConnector;