import { Action, SolWallectName, State } from '../../utils/types'
import { Connector, ConnectorOptions } from '../../utils/types'
import { PhantomWallect } from './phantom'
import { OkxWallect } from './okx'
import { createContext, useCallback, useContext, useMemo, useReducer } from 'react'

type Dispatch = (action: Action) => void
type SolProviderProps = { children: React.ReactNode }

const ConnectorContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

const solReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'connect failed': {
      return {
        ...state,
        connectorName: undefined,
      }
    }

    case 'connected': {
      return {
        isConnected: true,
        connectorName: action.connectorName,
        address: action.address,
        publicKey: action.publicKey,
      }
    }

    case 'disconnected': {
      return {
        isConnected: false,
        connectorName: undefined,
        address: undefined,
        publicKey: undefined,
      }
    }

    case 'account changed': {
      return { ...state, address: action.address, publicKey: action.publicKey }
    }


    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}

export const SolConnectorProvider = ({ children }: SolProviderProps) => {
  const [state, dispatch] = useReducer(solReducer, {
    isConnected: false,
    connectorName: undefined,
    address: undefined,
    publicKey: undefined,
  })

  return <ConnectorContext.Provider value={{ state, dispatch }}>{children}</ConnectorContext.Provider>
}

export const UseSolanaWallects = () => {

  const ctx: any = useContext(ConnectorContext)
  // 初始化参数
  const defaultConnectorOptions: ConnectorOptions = useMemo(
    () => ({
      onAccountsChanged: (address, publicKey) => {
        ctx.dispatch({
          type: 'account changed',
          address,
          publicKey,
        })
      },
      onDisconnect: () => {
        ctx.dispatch({ type: 'disconnected' })
      },
    }),
    [ctx.state],
  )
  const walletMap: Record<SolWallectName, Connector> = useMemo(
    () => ({
      Phantom: new PhantomWallect(defaultConnectorOptions),
      OKX: new OkxWallect(defaultConnectorOptions),
    }),
    [defaultConnectorOptions],
  )

  const connector = useMemo(() => {
    return walletMap[ctx.state.connectorName as SolWallectName]
  }, [walletMap, ctx.state.connectorName])

  const disconnect = useCallback(() => {
    ctx.dispatch({ type: 'disconnected' })
    connector.disconnect()
  }, [connector])

  const connect = useCallback(
    async (connectorName: SolWallectName) => {
      try {
        if (ctx.state.isConnected) {
          disconnect()
        }

        // ctx.dispatch({
        //   type: 'on connect',
        //   connectorName,
        // })

        const { address, publicKey } = await walletMap[connectorName].connect()

        ctx.dispatch({
          type: 'connected',
          connectorName,
          address,
          publicKey
        })
      } catch (error) {
        ctx.dispatch({ type: 'connect failed' })
        throw error
      }
    },
    [walletMap, disconnect],
  )

  // const signMessage = useCallback(
  //   async (message?: string) => {
  //     return connector.signMessage(message)
  //   },
  //   [connector],
  // )

  return { ...ctx.state, connect, disconnect, connector }
}