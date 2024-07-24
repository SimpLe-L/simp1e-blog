import { UseBtcWallects } from "./connector"
import { BtcWallectName } from "../utils/types";

const walletList: Array<{ title: string; icon: any; key: BtcWallectName }> = [
  {
    title: 'OKX Wallet',
    icon: "",
    key: 'OKX',
  },
  {
    title: 'Unisat Wallet',
    icon: "",
    key: 'Unisat',
  },
]

const SelectWallet = () => {
  const { connect } = UseBtcWallects()
  return (
    <div className="flex gap-[12px]">
      {
        walletList.map((wallet) => (
          <div className="border-solid border border-[#646cff] rounded-xl cursor-pointer text-[14px] font-bold flex items-center px-[8px] py-[12px]" key={wallet.key} onClick={async () => {
            await connect(wallet.key)
          }}>
            {wallet.title}
          </div>
        ))
      }
    </div>
  )
}

export default SelectWallet