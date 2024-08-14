import WalletConnector from "@/components/fWallectConnect"
import { IConfig } from "@/types";
import { NetworkType } from "@/utils/enum";

const walletConfig: IConfig = {
  text: "CONNECT",
  type: NetworkType.EVM
}

const DappPage = () => {
  return (
    <div className="w-full h-full p-[20px] flex items-center justify-center">
      <WalletConnector config={walletConfig} />
      {/* <WalletConnector /> */}
    </div>
  )
}

export default DappPage;