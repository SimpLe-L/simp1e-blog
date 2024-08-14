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

export interface INftProperties {
  owner: `0x${string}`;
  tokenId: bigint;
  level: number;
  faId: bigint;
  moId: bigint;
  uri: string;
}
