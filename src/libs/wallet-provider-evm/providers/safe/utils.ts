const isServerSide = () => {
  return typeof window === 'undefined'
}

const isInIframe = () => {
  if (isServerSide()) return false
  return window !== window.parent
}

export async function matchIsInSafeAppContext(): Promise<boolean> {
  if (!isInIframe()) {
    return false
  }

  const { default: SafeAppsSDK } = await import('@safe-global/safe-apps-sdk')

  const sdk = new SafeAppsSDK()

  const safeInfo = await Promise.race([
    sdk.safe.getInfo(),
    new Promise<undefined>((resolve) => {
      setTimeout(resolve, 500)
    }),
  ])

  return safeInfo !== undefined
}
