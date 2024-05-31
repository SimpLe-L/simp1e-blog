import { useContext } from "react";
import { WalletType } from "./hooks/context";

const SelectWallet = () => {

  const { type } = useContext(WalletType);
  console.log(type);

  return (
    <div className="fixed z-999 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl flex flex-col gap-2">
      <div className="flex">
        <span className="">Ethereum network</span>
        <div className="flex flex-wrap gap-1">
        </div>
      </div>
      <div className="flex">
        <span className="">BitCoin network</span>
      </div>
    </div>
  )
}

export default SelectWallet;