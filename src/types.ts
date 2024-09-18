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


export interface IResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

export type campaignResArr = {
  owner: `0x${string}`;
  title: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  image: string;
  pId: number;
}[] | []

export type campaignRes = {
  owner: `0x${string}`;
  title: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  image: string;
  pId: number;
}

export type CampaignWithoutId = Omit<campaignRes, 'pId'> & {
  // 添加点击函数
  // handleNavigate: (campaign: campaignRes) => void;
  handleClick: any;
};

export type DonationsArr = {
  donator: `0x${string}`;
  donation: string;
}[] | []

export type DonationRes = {
  donator: `0x${string}`;
  donation: string;
}

