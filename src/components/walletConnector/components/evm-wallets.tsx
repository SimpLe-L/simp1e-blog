import { useAccount } from 'wagmi';
import AccountInfo from './evmWallect/account-info';
import SelectWallet from './evmWallect/select-wallet';

const EvmWallets = () => {
  const { isConnected } = useAccount();
  return (
    <div>
      {
        isConnected
          ? <AccountInfo />
          : <SelectWallet />
      }
    </div>
  )
}

export default EvmWallets;