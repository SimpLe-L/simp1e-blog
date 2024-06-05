import { useEffect, useState } from "react";
import { BtcTypes } from "@/utils/enum";

export const useBtcConnectState = () => {

  const [connectInfo, setConnectInfo] = useState({ isConnected: false, type: "", addr: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let okxConnected = await window.okxwallet.bitcoin.getAccounts();
        let unisatConnected = await window.unisat.getAccounts();

        if (okxConnected[0]) {
          setConnectInfo({
            isConnected: true,
            type: BtcTypes.OKX,
            addr: okxConnected[0]
          });
        } else if (unisatConnected[0]) {
          setConnectInfo({
            isConnected: true,
            type: BtcTypes.UNISAT,
            addr: unisatConnected[0]
          });
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchData();
  }, []);

  return {
    connectInfo,
    setConnectInfo
  };
};