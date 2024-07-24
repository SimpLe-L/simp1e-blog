import { useAccount } from 'wagmi';
import AccountInfo from './AccountInfo';
import SelectWallet from './SelectWallet';


const EthereumWallect = () => {
  const { isConnected } = useAccount();
  return (
    <div className='h-full'>
      {
        isConnected
          ? <AccountInfo />
          : <SelectWallet />
      }
    </div>
  )
};
export default EthereumWallect;