import { configureChains, createClient } from 'wagmi'
import { goerli, mainnet, gnosis, gnosisChiado, arbitrumGoerli } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

export const { chains, provider, webSocketProvider } = configureChains(
  [goerli, mainnet, gnosis, gnosisChiado, arbitrumGoerli],
  [
    infuraProvider({ apiKey: '4b3de7362dc14a1f91c4e8efc4bed76b' }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: chain.id === 10200 ? `https://rpc.chiadochain.net` : '',
      }),
    }),
    publicProvider()
  ],
)

export const WagmiClient = createClient({
  autoConnect: true,
  provider,
  connectors: [
    new MetaMaskConnector({ chains }),
  ], webSocketProvider
})