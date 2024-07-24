import { ConnectorNotFoundError } from '../../utils/errors'
import { SolWallectName } from '../../utils/types'
import { Connector, ConnectorOptions, DisconnectHandler } from '../../utils/types'

export class OkxWallect implements Connector {
  name: SolWallectName
  onDisconnect?: DisconnectHandler

  constructor(options?: ConnectorOptions) {
    this.name = 'OKX'
    this.onDisconnect = options?.onDisconnect
  }

  // 获取链接器
  getProvider() {
    if (typeof window === 'undefined') return
    if (typeof (window as any).okxwallet.solana === 'undefined') {
      throw new ConnectorNotFoundError()
    }

    return (window as any).okxwallet.solana
  }
  // 钱包链接方法
  async connect() {
    try {
      const provider = this.getProvider()

      if (provider.on) {
        provider.on(
          'connect',
          () => { },
        )
        provider.on('disconnect', async () => {
          provider.removeAllListeners()
          this.onDisconnect?.()
        })
      }

      const accounts = await provider.connect();
      // console.log(await provider.connect());

      return { address: accounts.publicKey.toBase58(), publicKey: accounts.publicKey }
    } catch (error) {
      console.log('connector error: ', error)
      throw error
    }
  }

  disconnect(): void {
    const provider = this.getProvider()
    provider.disconnect()
  }

  // signMessage: (message?: string) => Promise<string> = (message) => {
  //   const provider = this.getProvider()
  //   const { address } = provider.selectedAccount
  //   return provider.signMessage(message, { from: address }) as Promise<string>
  // }

}