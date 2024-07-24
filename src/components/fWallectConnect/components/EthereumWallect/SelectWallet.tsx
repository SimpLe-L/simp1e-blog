import { useState } from "react";
import { useChainId, useConnect, useSwitchChain } from 'wagmi';
// import { signMessage } from "wagmi";
// import { wagmiConfig } from './wagmi';

import type { Connector } from 'wagmi';
const SelectWallet = () => {

  const { connectors, connect } = useConnect();
  const { chains, switchChain } = useSwitchChain();
  console.log("rrrr", chains);

  const chainId = useChainId();


  // const [cachedConnector, setCachedConnector] = useState<any>(null);
  const [wallectList, setWallectList] = useState(false);

  const chainSelect = (chainId: number) => {
    switchChain({ chainId: chainId });
    setWallectList(true);
  }

  const handleConnect = async (connector: Connector) => {
    connect({ connector, chainId });
    setWallectList(false);
  }

  return (
    <div className="h-full flex gap-2">
      {
        wallectList &&
        <div className="fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-[20px] rounded-2xl flex flex-col border-solid border border-[#adadad]">
          {
            connectors.map(connector => (
              <div className="h-[40px] text-[16px] font-bold flex items-center px-[18px] py-[8px]" key={connector.uid}>
                <button
                  // onClick={() => connetWallet(connector)}
                  onClick={() => handleConnect(connector)}
                >
                  {connector.name}
                </button>
              </div>
            ))
          }
        </div>

      }
      {
        chains.map((chain) => (
          <div className="border-solid border border-[#646cff] rounded-xl cursor-pointer text-[14px] font-bold flex items-center px-[8px] py-[12px]" key={chain.id} onClick={() => chainSelect(chain.id)}>
            {chain.name}
          </div>
        ))
      }
    </div>
  )
}

export default SelectWallet;