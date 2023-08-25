import type { SafeAppProvider } from '@safe-global/safe-apps-provider'
import type SafeAppsSDK from '@safe-global/safe-apps-sdk'
import type { Opts } from '@safe-global/safe-apps-sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { AbstractConnectorArguments, ConnectorUpdate } from '@web3-react/types'

export class NoSafeContextError extends Error {
  public constructor() {
    super('The app is loaded outside safe context')
    this.name = NoSafeContextError.name
    Object.setPrototypeOf(this, NoSafeContextError.prototype)
  }
}

interface SafeConstructorArgs extends AbstractConnectorArguments {
  options?: Opts
}

export class SafeConnector extends AbstractConnector {
  public sdk: SafeAppsSDK | undefined

  private provider: SafeAppProvider | undefined

  private readonly options: Opts | undefined

  public constructor({ supportedChainIds, options }: SafeConstructorArgs) {
    super({ supportedChainIds })
    this.options = options
  }

  private static get serverSide() {
    return typeof window === 'undefined'
  }

  public static get inIframe() {
    if (SafeConnector.serverSide) return false

    return window !== window.parent;
  }

  private async initialize(): Promise<void> {
    const { default: SafeAppsSDK } = await import('@safe-global/safe-apps-sdk')
    this.sdk = new SafeAppsSDK(this.options)

    const safe = await Promise.race([
      this.sdk.safe.getInfo(),
      new Promise<undefined>((resolve) => setTimeout(resolve, 500)),
    ])

    if (safe !== undefined) {
      const { SafeAppProvider } = await import('@safe-global/safe-apps-provider')
      this.provider = new SafeAppProvider(safe, this.sdk)
    }
  }

  public async activate(): Promise<ConnectorUpdate<string | number>> {
    if (!SafeConnector.inIframe) throw new NoSafeContextError()

    await this.initialize()

    if (!this.provider) throw new NoSafeContextError()

    const account = await this.sdk!.safe.getInfo().then(({ safeAddress }) => safeAddress)

    return {
      account,
      chainId: this.provider.chainId,
      provider: this.provider,
    }
  }

  public async deactivate(): Promise<void> {
    if (!this.provider) throw new NoSafeContextError()

    return this.provider.disconnect()
  }

  public async getAccount(): Promise<string | null> {
    const safeInfo = await this.sdk!.safe.getInfo()

    return safeInfo.safeAddress || null
  }

  public async getChainId(): Promise<number | string> {
    if (!this.provider) throw new NoSafeContextError()

    return Promise.resolve(this.provider.chainId)
  }

  public async getProvider(): Promise<SafeAppProvider> {
    if (!this.provider) throw new NoSafeContextError()

    return Promise.resolve(this.provider)
  }
}
