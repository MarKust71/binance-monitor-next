/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useTradeWebSocketStore } from '@/stores/trade-websocket-store'
import { Trade } from '@/components/trades/trades.types'

type UseWebSocketParams = {
  symbol: string
  socket: string
}

const url = process.env.NEXT_PUBLIC_BINANCE_SPOT_API_WSS
// const url = process.env.NEXT_PUBLIC_BINANCE_SPOT_TEST_API_WSS

export const useTradeWebsocket = ({ symbol, socket }: UseWebSocketParams) => {
  const setSocket = useTradeWebSocketStore((state) => state.setSocket)
  const setConnected = useTradeWebSocketStore((state) => state.setConnected)
  const addMessage = useTradeWebSocketStore((state) => state.addMessage)
  const setLastPrice = useTradeWebSocketStore((state) => state.setLastPrice)
  const isConnected = useTradeWebSocketStore((state) => state.isConnected)
  const lastPrice = useTradeWebSocketStore((state) => state.lastPrice)

  useEffect(() => {
    const ws = new WebSocket(`${url}/ws/${symbol.toLowerCase()}${socket}`)

    ws.onopen = () => {
      console.log('WebSocket connected')
      setConnected(true)
    }

    ws.onmessage = (event: MessageEvent<string>) => {
      addMessage(event.data)
      const trade: Trade = JSON.parse(event.data)
      const price = parseFloat(trade.p)
      setLastPrice(price)
    }

    ws.onerror = (error: Event) => {
      console.error('WebSocket error:', error)
    }

    ws.onclose = () => {
      console.log('WebSocket closed')
      setConnected(false)
    }

    setSocket(ws)

    return () => {
      ws.close() // Zamknięcie połączenia
      setSocket(null)
    }
  }, [url, setSocket, setConnected, addMessage, setLastPrice])

  return { isConnected, lastPrice }
}
