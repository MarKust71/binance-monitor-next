/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useWebSocketStore } from '@/stores/websocket-store'
import { Trade } from '@/components/trades/trades.types'

type UseWebSocketParams = {
  symbol: string
  socket: string
}

const url = process.env.NEXT_PUBLIC_BINANCE_SPOT_API_WSS
// const url = process.env.NEXT_PUBLIC_BINANCE_SPOT_TEST_API_WSS

export const useWebSocket = ({ symbol, socket }: UseWebSocketParams): void => {
  const setSocket = useWebSocketStore((state) => state.setSocket)
  const setConnected = useWebSocketStore((state) => state.setConnected)
  const addMessage = useWebSocketStore((state) => state.addMessage)
  const setLastPrice = useWebSocketStore((state) => state.setLastPrice)

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
}
