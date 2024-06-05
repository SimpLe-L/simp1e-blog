import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { formatAddress } from "@/utils";

const AccountInfo = () => {
  const { address, connector } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })
  return (
    <div className="flex justify-between items-center flex-col p-[20px] bg-white rounded-xl">
      <div className="flex flex-col items-center gap-[8px] mb-[8px]">
        {ensAvatar ? (
          <img alt="ENS Avatar" className="bg-[#1b1b1f] rounded-[100%] w=-[38px] h-[38px]" src={ensAvatar} />
        ) : (
          <div className="bg-[#1b1b1f] rounded-[100%] w-[38px] h-[38px]" />
        )}
        <div className="flex flex-col gap-[4px]">
          {address && (
            <div className="font-normal whitespace-nowrap text-center">
              {formatAddress(address)}
            </div>
          )}
          <div className="text-[12px] opacity-[0.7] font-normal">
            已链接 {connector?.name} 钱包
          </div>
        </div>
      </div>
      <button className="bg-[#646cff] border-solid border border-[#646cff] text-white font-medium text-[14px] h-[38px] px-[20px] py-0 rounded-md transition" onClick={() => disconnect()} type="button">
        Disconnect
      </button>
    </div>
  )
}

export default AccountInfo;