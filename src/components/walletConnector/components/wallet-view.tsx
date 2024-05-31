import { useContext } from "react";
import { WalletType } from "../hooks/context";

import EvmWallets from "./evm-wallets";
import BtcWallets from "./btc-wallets";
import { NetworkType } from "@/utils/enum";


const WalletView = () => {

  const { type } = useContext(WalletType);

  return (
    <div>
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