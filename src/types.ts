export interface IMenuItem {
  path: string;
  icon?: JSX.Element;
  title: string;
}

export interface IWallectConfig {
  config: {
    text?: string
  }
}