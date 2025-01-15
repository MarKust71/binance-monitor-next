import { useEffect, useState } from 'react'

type Trade = Record<string, string>

const SYMBOL = 'ETHUSDT'

const createBinanceWebSocket = (symbol: string, socket: string) => {
  const url = process.env.NEXT_PUBLIC_BINANCE_SPOT_TEST_API_WSS

  const ws = new WebSocket(`${url}/ws/${symbol.toLowerCase()}${socket}`)

  ws.onopen = () => {
    console.log('connected')
  }

  ws.onclose = () => {
    console.log('disconnected')
  }

  return ws
}

const ws = createBinanceWebSocket(SYMBOL, '@trade')

export const Ticker = () => {
  const [trade, setTrade] = useState<Trade>()

  ws.onmessage = (message: MessageEvent) => {
    setTrade(JSON.parse(message.data))
  }

  useEffect(() => {
    return () => {
      ws.close()
    }
  }, [])

  return (
    <div>
      <p>Ticker: price={trade?.p}</p>
    </div>
  )
}
