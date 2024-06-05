import { useContext } from "react";
import { WalletType } from "../hooks/context";

import EvmWallets from "./evm-wallets";
import BtcWallets from "./btc-wallets";
import { NetworkType } from "@/utils/enum";


const WalletView = () => {

  const { type } = useContext(WalletType);

  return (
    <div className="fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-[20px] rounded-2xl flex">
      {
        type == NetworkType.EVM
          ?
          <EvmWallets />
          :
          <BtcWallets />
      }
    </div>
  )
}

export default WalletView;