export interface IMenuItem {
  path: string;
  icon?: JSX.Element;
  title: string;
}
type WalletType = "evm" | "btc";
export interface IConfig {
  text?: string,
  type: WalletType
}
export interface IWallectConfig {
  config: IConfig
}
