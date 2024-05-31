import WalletConnector from "@/components/walletConnector"

const walletConfig = {
  text: "CONNECT",
}

const DappPage = () => {
  return (
    <div className="w-full h-full p-[20px] flex items-center justify-center">
      <WalletConnector config={walletConfig} />
    </div>
  )
}

export default DappPage;