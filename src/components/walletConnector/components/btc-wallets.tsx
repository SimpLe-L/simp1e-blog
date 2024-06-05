import { useBtcConnectState } from '../hooks/hooks';
import AccountInfo from './btcWallect/account-info';
import SelectWallet from './btcWallect/select-wallet';


const BtcWallets = () => {
  const { connectInfo, setConnectInfo } = useBtcConnectState();
  const infos = {
    type: connectInfo.type,
    addr: connectInfo.addr
  }

  return (
    <div>
      {
        connectInfo.isConnected
          ? <AccountInfo accountInfo={infos} />
          : <SelectWallet setConnectInfo={setConnectInfo} />
      }
    </div>
  )
}

export default BtcWallets;