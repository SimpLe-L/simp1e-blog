import MenuItem from "./menu";

const menuList = [
  {
    menuName: "web3相关",
    list: [
      {
        title: "钱包整合",
        path: "/dapp",
      },
      {
        title: "投票",
        path: "/dapp/vote",
      },
      {
        title: "众筹",
        path: "/dapp/rowdfunding",
      },
      {
        title: "NFT Market",
        path: "/dapp/nft",
      },
      {
        title: "ERC20代币",
        path: "/dapp/erc20",
      },
      {
        title: "质押挖矿",
        path: "/dapp/staking",
      }
    ]
  }
]

const SideBar = () => {
  return (
    <div className="p-[20px] h-full border-solid border-r border-[#2e374a]">
      <div>
        {menuList.map((menu) => (
          <div key={menu.menuName} className="flex flex-col gap-2">
            <div className="text-[--basic-text] font-bold">{menu.menuName}</div>
            {menu.list.map((item) => (
              <MenuItem item={item} key={item.title} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBar;