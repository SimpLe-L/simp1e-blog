/*
 * @Description:  top nav
 * @Author: liaolei
 * @Date: 2024-05-16 17:07:59
 * @LastEditors: liaolei
 * @LastEditTime: 2024-05-16 17:21:47
 */
import Link from "next/link"

const navList = [
  {
    name: "首页",
    path: "/",
    id: 1
  },
  {
    name: "dapp",
    path: "/dapp",
    id: 2
  },
]

const Header = () => {
  return (
    <div className="h-16 bg-[--basic-header] flex justify-center">
      <div className="h-full flex items-center w-[920px] justify-between">
        {
          navList.map(item => {
            return <div className="p-[4px]" key={item.id}>
              <Link className="text-[--basic-text]" href={item.path}>{item.name}</Link>
            </div>
          })
        }
      </div>

    </div>
  )
}

export default Header;