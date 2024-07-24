export type BtcWallectName = 'Unisat' | 'OKX'
export type SolWallectName = 'Phantom' | 'OKX'
export type AccountsChangedHandler = (address: string, publicKey: string) => void
// export type NetworkChangedHandler = (network: Network) => void
export type DisconnectHandler = () => void

export interface ConnectorOptions {
  onAccountsChanged?: AccountsChangedHandler
  // onNetworkChanged?: NetworkChangedHandler
  onDisconnect?: DisconnectHandler
}

export interface Connection {
  address: string
  publicKey: string
  // network: Network
}

export interface Connector {
  name: BtcWallectName | SolWallectName
  getProvider(): unknown
  connect(options?: ConnectorOptions): Promise<Connection>
  disconnect(): void
  signMessage?: (message?: string) => Promise<string>
}

export interface State {
  isConnected: boolean
  address?: string
  publicKey?: string
  connectorName?: BtcWallectName
}

export type Action =
  | { type: 'connect failed' }
  | { type: 'connected'; connectorName: BtcWallectName; address: string; publicKey: string; }
  | { type: 'account changed'; address: string; publicKey: string }
  | { type: 'disconnected' }