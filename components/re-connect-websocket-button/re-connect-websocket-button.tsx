import { Button } from '@/components/ui/button'
import { ReConnectWebsocketButtonType } from '@/components/re-connect-websocket-button/re-connect-websocker-button.types'
import { useMyAppWebsocket } from '@/hooks/use-my-app-websocket'
import { useBinanceTradeWebsocket } from '@/hooks/use-binance-trade-websocket'

export const ReConnectWebsocketButton = ({
  disabled,
}: ReConnectWebsocketButtonType) => {
  const { reconnect: myAppWebsocketReconnect } = useMyAppWebsocket()
  const { reconnect: tradeWebsocketReconnect } = useBinanceTradeWebsocket()

  const handleClick = () => {
    myAppWebsocketReconnect()
    tradeWebsocketReconnect()
  }

  return (
    <Button disabled={disabled} onClick={handleClick}>
      Re-connect websockets
    </Button>
  )
}
