export interface IMenuItem {
  path: string;
  icon?: JSX.Element;
  title: string;
}
type WalletType = "evm" | "btc";
export interface IWallectConfig {
  config: {
    text?: string
  }
}
