import { useWebSocket } from '@/hooks/use-websocket'
import useWebSocketStore from '@/stores/websocket.store'

type Trade = Record<string, string>

const symbol = 'ETHUSDT'
const socket = '@trade'

export const Ticker = () => {
  useWebSocket({ symbol, socket })

  const messages = useWebSocketStore((state) => state.messages)
  const trade: Trade = JSON.parse(messages[messages.length - 1] || '{}')

  return (
    <div>
      <p>Ticker: price={trade.p}</p>
    </div>
  )
}
