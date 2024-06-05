import { BtcTypes } from "@/utils/enum";

const SelectWallet = ({ setConnectInfo }: { setConnectInfo: any }) => {

  const walletList = [
    {
      name: "Okx Wallet",
      id: BtcTypes.OKX
    },
    {
      name: "Unisat Wallet",
      id: BtcTypes.UNISAT
    }
  ];

  const manualConnect = async (type: string) => {
    let result: any;
    let tempType: string;
    if (type == BtcTypes.OKX) {
      result = await window.okxwallet.bitcoin.requestAccounts();
      tempType = BtcTypes.OKX;
    } else {
      result = await window.unisat.requestAccounts();
      tempType = BtcTypes.UNISAT;
    }
    setConnectInfo({
      isConnected: true,
      type: tempType,
      addr: result[0]
    })
  }

  return (
    <div className="rounded-2xl flex flex-col gap-2">
      {
        walletList.map(item => (
          <div className="h-[40px] text-[16px] font-bold flex items-center px-[18px] py-[8px]" key={item.id}>
            <button
              onClick={() => manualConnect(item.id)}
            >
              {item.name}
            </button>
          </div>
        ))
      }
    </div>
  )
}

export default SelectWallet;