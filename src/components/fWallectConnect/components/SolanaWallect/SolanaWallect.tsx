import AccountInfo from './AccountInfo';
import SelectWallet from './SelectWallet';
import { UseSolanaWallects } from './connector';


const SolanaWallect = () => {
  const { isConnected } = UseSolanaWallects();
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
export default SolanaWallect;