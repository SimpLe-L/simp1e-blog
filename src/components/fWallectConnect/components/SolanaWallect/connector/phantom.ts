import { ConnectorNotFoundError } from '../../utils/errors'
import { SolWallectName } from '../../utils/types'
import { Connector, ConnectorOptions, DisconnectHandler, AccountsChangedHandler } from '../../utils/types'

export class PhantomWallect implements Connector {
  name: SolWallectName
  onAccountsChanged?: AccountsChangedHandler
  onDisconnect?: DisconnectHandler

  constructor(options?: ConnectorOptions) {
    this.name = 'Phantom'
    this.onAccountsChanged = options?.onAccountsChanged
    this.onDisconnect = options?.onDisconnect
  }

  getProvider() {
    if (typeof window === 'undefined') return
    if (typeof (window as any).phantom === 'undefined') {

      throw new ConnectorNotFoundError()
    }
    return (window as any).phantom?.solana;
  }

  async connect() {
    try {
      const provider = this.getProvider()
      // let accounts = "";
      let publicKey = "";
      if (provider.on) {
        console.log(provider);
        provider.on(
          'connect',
          () => {
            // console.log(publicKey);
            // accounts = publicKey.toBase58()
            // publicKey = publicKey
          }
        )
        provider.on('disconnect', async () => {
          provider.removeAllListeners()
          this.onDisconnect?.()
        })
      }

      const accounts = await provider.connect();
      // const publicKey: string = await provider.getPublicKey()
      // const network: Network = await provider.getNetwork()

      return { address: accounts.publicKey.toBase58(), publicKey: accounts.publicKey }
    } catch (error) {
      console.log('connnector error: ', error)
      throw error
    }
  }

  // Unisat does not provide a disconnect method at this time
  disconnect(): void {
    const provider = this.getProvider()
    provider.disconnect()
  }

  signMessage: (message?: string) => Promise<string> = (message) => {
    const provider = this.getProvider()
    const encodedMessage = new TextEncoder().encode(message);
    return provider.signMessage(encodedMessage, "utf8") as Promise<string>
  }
}
