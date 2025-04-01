import { useBinanceTradeWebsocket } from '@/hooks/use-binance-trade-websocket'
import { useMyAppWebsocket } from '@/hooks/use-my-app-websocket'

const SYMBOL = 'ETHUSDC'

export const WebsocketConnectionStatus = () => {
  const { isConnected: isTradeWebsocketConnected } = useBinanceTradeWebsocket()
  const { isConnected: isMyAppWebsocketConnected } = useMyAppWebsocket()

  return (
    <h1 className={'text-xl font-extrabold mb-2 flex flex-row gap-2'}>
      {`${SYMBOL} Spot`}
      {isTradeWebsocketConnected && isMyAppWebsocketConnected && (
        <span className={'text-green-500 font-bold text-sm'}>CONNECTED</span>
      )}
      {!(isTradeWebsocketConnected && isMyAppWebsocketConnected) && (
        <span className={'text-red-500 font-bold text-sm'}>DISCONNECTED</span>
      )}
    </h1>
  )
}
