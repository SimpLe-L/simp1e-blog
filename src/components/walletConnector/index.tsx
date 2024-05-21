import { IWallectConfig } from "@/types";

const WalletConnector: React.FC<IWallectConfig> = ({ config }) => {
  return (
    <div>
      {config.text || "CONNECT"}
    </div>
  )
}

export default WalletConnector;