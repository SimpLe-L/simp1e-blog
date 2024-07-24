"use client"

import { IWallectConfig } from "@/types";
import { useState } from "react";
import WalletView from "./components/WalletView";

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
        &&
        <WalletView onHidden={() => setVisible(false)} />
      }
    </>
  )
}

export default WalletConnector;