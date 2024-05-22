import WalletConnector from "@/components/walletConnector"

const config = {

}

const DappPage = () => {
  return (
    <div className="w-full h-full p-[20px] flex items-center justify-center">
      <WalletConnector config={config} />
    </div>
  )
}

export default DappPage;