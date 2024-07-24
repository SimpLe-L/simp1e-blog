import { useEffect, useState } from 'react';
import { useAccount, useDisconnect, useBalance } from 'wagmi';
import { formatUnits } from 'viem';
// import { signMessage } from "wagmi/actions";
import { formatAddress } from "@/utils";
// import { wagmiConfig } from './wagmi';

const AccountInfo = () => {
  const { address, connector } = useAccount()
  const { disconnect } = useDisconnect()
  // const { signMessage } = useSignMessage();

  // useEffect(() => {
  //   (async () => {
  //     const signedMessage = await signMessage(wagmiConfig, { message: '查询余额' });
  //     if (signedMessage) {
  //       console.log(balanceData);
  //       if (balanceData.data) {
  //         console.log(formatUnits(balanceData.data.value, balanceData.data.decimals))
  //         setBalance(formatUnits(balanceData.data.value, balanceData.data.decimals));
  //       }

  //     }
  //   })();
  // }, []);


  return (
    <div className="flex justify-between items-center flex-col p-[20px] bg-white rounded-xl">
      <div className="flex flex-col items-center gap-[8px] mb-[8px]">
        {/* <div>余额：{balance}</div> */}
        <div className="flex flex-col gap-[4px]">
          {address && (
            <div className="font-normal whitespace-nowrap text-center">
              {formatAddress(address)}
            </div>
          )}
        </div>
      </div>
      <button className="bg-[#646cff] border-solid border border-[#646cff] text-white font-medium text-[14px] h-[38px] px-[20px] py-0 rounded-md transition" onClick={() => disconnect()} type="button">
        Disconnect
      </button>
    </div>
  )
}

export default AccountInfo;