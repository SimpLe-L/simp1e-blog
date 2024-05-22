"use client"

import { IWallectConfig } from "@/types";
import { useState } from "react";

const WalletConnector: React.FC<IWallectConfig> = ({ config }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div
        className="py-[4px] px-[14px] text-[--basic-text] rounded-xl border-2 boder-solid boder-[--secondry-text] cursor-pointer"
        onClick={() => { setVisible(true) }}
      >
        {config.text || "CONNECT"}
      </div>
      {
        visible
          ?
          <div className="fixed z-999 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl flex flex-col gap-2">
            <div className="flex">
              <span className="">Ethereum network</span>
              <div className="flex flex-wrap gap-1">
              </div>
            </div>
            <div className="flex">
              <span className="">BitCoin network</span>
            </div>
          </div>
          :
          null
      }
    </>

  )
}

export default WalletConnector;