import AccountInfo from './AccountInfo';
import SelectWallet from './SelectWallet';
import { UseBtcWallects } from './connector';

const BitcoinWallect = () => {
  const { isConnected } = UseBtcWallects();
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
export default BitcoinWallect;