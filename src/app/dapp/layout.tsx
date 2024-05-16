/*
 * @Description:  dapp page
 * @Author: liaolei
 * @Date: 2024-05-16 14:53:33
 * @LastEditors: liaolei
 * @LastEditTime: 2024-05-16 15:22:05
 */
import AsideComponent from "./components/aside";

const DappLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full">
      <div className="flex-[1]">
        <AsideComponent />
      </div>
      <div className="flex-[4]">
        {children}
      </div>
    </div>
  )
}

export default DappLayout;