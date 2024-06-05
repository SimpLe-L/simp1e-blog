import WalletConnector from "@/components/walletConnector"
import { IConfig } from "@/types";
import { NetworkType } from "@/utils/enum";

const walletConfig: IConfig = {
  text: "CONNECT",
  type: NetworkType.BTC
}

const DappPage = () => {
  return (
    <div className="w-full h-full p-[20px] flex items-center justify-center">
      <WalletConnector config={walletConfig} />
    </div>
  )
}

export default DappPage;