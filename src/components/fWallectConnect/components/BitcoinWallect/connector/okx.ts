import { ConnectorNotFoundError } from '../../utils/errors'
import { BtcWallectName } from '../../utils/types'
import { Connector, ConnectorOptions, DisconnectHandler } from '../../utils/types'

export class OkxWallect implements Connector {
  name: BtcWallectName
  onDisconnect?: DisconnectHandler

  constructor(options?: ConnectorOptions) {
    this.name = 'OKX'
    this.onDisconnect = options?.onDisconnect
  }

  // 获取链接器
  getProvider() {
    if (typeof window === 'undefined') return
    if (typeof (window as any).okxwallet.bitcoin === 'undefined') {
      throw new ConnectorNotFoundError()
    }

    return (window as any).okxwallet.bitcoin
  }
  // 钱包链接方法
  async connect() {
    try {
      const provider = this.getProvider()

      if (provider.on) {
        provider.on(
          'connect',
          async ({ address, compressedPublicKey }: { address: string; compressedPublicKey: string }) => {
            // if (address && compressedPublicKey) {
            //   this.onAccountsChanged?.(address, compressedPublicKey)
            // }
          },
        )
        provider.on('disconnect', async () => {
          provider.removeAllListeners()
          this.onDisconnect?.()
        })
      }

      const { address, compressedPublicKey }: { address: string; compressedPublicKey: string } =
        await provider.connect()

      return { address, publicKey: compressedPublicKey }
    } catch (error) {
      console.log('connector error: ', error)
      throw error
    }
  }

  disconnect(): void {
    const provider = this.getProvider()
    provider.disconnect()
  }

  signMessage: (message?: string) => Promise<string> = (message) => {
    const provider = this.getProvider()
    const { address } = provider.selectedAccount
    return provider.signMessage(message, { from: address }) as Promise<string>
  }

}