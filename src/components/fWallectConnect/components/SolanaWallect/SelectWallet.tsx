import { UseSolanaWallects } from "./connector"
import { SolWallectName } from "../utils/types";

const walletList: Array<{ title: string; icon: any; key: SolWallectName }> = [
  {
    title: 'OKX Wallet',
    icon: "",
    key: 'OKX',
  },
  {
    title: 'Phantom Wallet',
    icon: "",
    key: 'Phantom',
  },
]

const SelectWallet = () => {
  const { connect } = UseSolanaWallects()
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