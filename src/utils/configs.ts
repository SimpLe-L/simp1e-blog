// import { http, createConfig } from 'wagmi'
// import { base, mainnet, optimism, sepolia } from 'wagmi/chains'
// import { injected, walletConnect } from 'wagmi/connectors'

import { http, createConfig } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'

// const projectId = ''
const projectId = 'a60155477140bb3311aa47cbae29e423'

// export const wagmiConfig = createConfig({
//   chains: [mainnet, base, optimism],
//   // connectors: [
//   //   injected(),
//   //   walletConnect({ projectId }),
//   //   // metaMask(),
//   //   // safe(),
//   // ],
//   transports: {
//     [mainnet.id]: http(),
//     [base.id]: http(),
//     [optimism.id]: http()
//   },
// })

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
