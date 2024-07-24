import { formatAddress } from "@/utils";
import { UseSolanaWallects } from "./connector";

const AccountInfo = () => {
  const { address, disconnect } = UseSolanaWallects();
  return (
    <div className="flex justify-between items-center flex-col p-[20px] bg-white rounded-xl">
      <div className="flex flex-col items-center gap-[8px] mb-[8px]">
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

export default AccountInfo