import { useState } from "react";
import { useChainId, useConnect, useSwitchChain } from 'wagmi';
// import type { Connector } from 'wagmi';
const SelectWallet = () => {

  const { connectors, connect } = useConnect()
  // const { chains, switchChain } = useSwitchChain();
  // const chainId = useChainId();

  // const [cachedConnector, setCachedConnector] = useState<any>(null);
  // const [selectChains, setSelectChains] = useState(false);

  // const connetWallet: (connector: Connector) => void = connector => {
  //   setCachedConnector(connector);
  //   setSelectChains(true);
  // }
  // const chainSelect = (chainId: number) => {
  //   switchChain({ chainId: chainId });
  //   connect({ connector: cachedConnector, chainId });
  //   setSelectChains(false);
  // }

  return (
    <div className="rounded-2xl flex flex-col gap-2">
      {
        connectors.map(connector => (
          <div className="h-[40px] text-[16px] font-bold flex items-center px-[18px] py-[8px]" key={connector.uid}>
            <button
              // onClick={() => connetWallet(connector)}
              onClick={() => connect({ connector })}
            >
              {connector.name}
            </button>
          </div>
        ))
      }
      {/* {
        selectChains
        &&
        <div className="fixed z-12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] max-h-[500px] bg-white text-[#232946] rounded-[24px] flex flex-col p-[6px]">
          {chains.map((chain) => (
            <button key={chain.id} onClick={() => chainSelect(chain.id)}>
              {chain.name}
            </button>
          ))}
        </div>
      } */}
    </div>
  )
}

export default SelectWallet;