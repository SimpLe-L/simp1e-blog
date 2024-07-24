import { ConnectorNotFoundError } from '../../utils/errors'
import { BtcWallectName } from '../../utils/types'
import { Connector, ConnectorOptions, DisconnectHandler, AccountsChangedHandler } from '../../utils/types'

export class UnisatWallect implements Connector {
  name: BtcWallectName
  onAccountsChanged?: AccountsChangedHandler
  onDisconnect?: DisconnectHandler

  constructor(options?: ConnectorOptions) {
    this.name = 'Unisat'
    this.onAccountsChanged = options?.onAccountsChanged
    this.onDisconnect = options?.onDisconnect
  }

  getProvider() {
    if (typeof window === 'undefined') return
    if (typeof (window as any).unisat === 'undefined') {
      throw new ConnectorNotFoundError()
    }

    return (window as any).unisat
  }

  async connect() {
    try {
      const provider = this.getProvider()

      if (provider.on) {
        provider.on('accountsChanged', async (accounts: string[]) => {
          if (!!accounts && accounts.length > 0) {
            const publicKey: string = await provider.getPublicKey()
            this.onAccountsChanged?.(accounts[0], publicKey)
            console.log(publicKey, accounts[0]);

          } else {
            provider.removeAllListeners()
            this.onDisconnect?.()
          }
        })
        // provider.on('networkChanged', (network: Network) => {
        //   this.onNetworkChanged?.(network)
        // })
      }

      const accounts: string[] = await provider.requestAccounts()
      const publicKey: string = await provider.getPublicKey()
      // const network: Network = await provider.getNetwork()

      return { address: accounts[0], publicKey }
    } catch (error) {
      console.log('connnector error: ', error)
      throw error
    }
  }

  // Unisat does not provide a disconnect method at this time
  disconnect(): void { }

  signMessage: (message?: string) => Promise<string> = (message) => {
    const provider = this.getProvider()
    return provider.signMessage(message) as Promise<string>
  }
}
