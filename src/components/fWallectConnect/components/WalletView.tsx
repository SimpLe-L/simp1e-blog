import { useState } from "react";

import { WallectTypes } from "@/utils/enum"
import { combine } from "@/utils"
import EthereumWallect from "./EthereumWallect/EthereumWallect"
import SolanaWallect from "./SolanaWallect/SolanaWallect"
import BitcoinWallect from "./BitcoinWallect/BitcoinWallect"
// import { WagmiProvider } from 'wagmi';
// import { wagmiConfig } from './EthereumWallect/wagmi';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BtcConnectorProvider } from './BitcoinWallect/connector/index';
import { SolConnectorProvider } from './SolanaWallect/connector/index';
const wallectTabs = [
  {
    type: WallectTypes.ETH,
    id: 1
  },
  {
    type: WallectTypes.BTC,
    id: 2
  },
  {
    type: WallectTypes.SOL,
    id: 3
  }
]

const WalletView = ({ onHidden }: { onHidden: () => void }) => {

  const [activeTab, setActiveTab] = useState(WallectTypes.ETH);
  // const queryClient = new QueryClient();
  const handleTabClick = (type: WallectTypes) => {
    // 更新选中标签的索引
    setActiveTab(type);
  };
  // 关闭组件
  const closeModal = () => {
    onHidden();
  }
  const renderWallet = () => {
    switch (activeTab) {
      case WallectTypes.ETH:
        // return <WagmiProvider config={wagmiConfig}>
        //   <QueryClientProvider client={queryClient}>
        //     <EthereumWallect />
        //   </QueryClientProvider>
        // </WagmiProvider>;
        return <EthereumWallect />;
      case WallectTypes.SOL:
        return <SolConnectorProvider>
          <SolanaWallect />
        </SolConnectorProvider>;
      case WallectTypes.BTC:
        return <BtcConnectorProvider>
          <BitcoinWallect />
        </BtcConnectorProvider>;
      default:
        return null;
    }
  }
  return (
    <div className="fixed min-w-[580px] min-h-[380px] z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-[20px] rounded-2xl flex flex-col">
      <div className="flex justify-between w-full items-center">
        <div className="flex">
          {
            wallectTabs.map((item, index) => (
              <div
                key={item.id}
                className={combine("p-[8px] cursor-pointer", `${item.type == activeTab && 'text-[rgb(63,66,221)]'}`)}
                onClick={() => handleTabClick(item.type)}
              >
                {item.type}
              </div>
            ))
          }
        </div>
        <div className="w-4 h-4 rounded-lg cursor-pointer" onClick={closeModal}>x</div>
      </div>
      <div className="flex-[1]">
        {
          renderWallet()
        }
      </div>
    </div>
  )
}

export default WalletView;