/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useTradeWebSocketStore } from '@/stores/trade-websocket-store'
import { Trade } from '@/components/trades/trades.types'

const SYMBOL = 'ETHUSDT'
const SOCKET = '@trade'

const url = process.env.NEXT_PUBLIC_BINANCE_SPOT_API_WSS
// const url = process.env.NEXT_PUBLIC_BINANCE_SPOT_TEST_API_WSS

export const useTradeWebsocket = () => {
  const isConnected = useTradeWebSocketStore((state) => state.isConnected)
  const lastPrice = useTradeWebSocketStore((state) => state.lastPrice)
  const socket = useTradeWebSocketStore((state) => state.socket)
  const lastTradeTime = useTradeWebSocketStore((state) => state.socket)

  const addMessage = useTradeWebSocketStore((state) => state.addMessage)
  const setConnected = useTradeWebSocketStore((state) => state.setConnected)
  const setLastPrice = useTradeWebSocketStore((state) => state.setLastPrice)
  const setlastTradeTime = useTradeWebSocketStore(
    (state) => state.setLastTradeTime
  )
  const setSocket = useTradeWebSocketStore((state) => state.setSocket)

  const disconnect = () => {
    if (socket) {
      console.log('Trade disconnecting...', socket)
      socket.close() // Zamknięcie połączenia
      setSocket(null)
    }
  }

  const reconnect = () => {
    console.log('Trade reconnecting...')
    disconnect()
    connect()
  }

  const connect = () => {
    console.log('Trade connecting...')
    try {
      const ws = new WebSocket(`${url}/ws/${SYMBOL.toLowerCase()}${SOCKET}`)

      ws.onopen = () => {
        console.log('TradeWebSocket connected')
        setConnected(true)
      }

      ws.onerror = (error: Event) => {
        console.error('TradeWebSocket error:', error)
      }

      ws.onclose = () => {
        console.log('TradeWebSocket closed')
        setConnected(false)
      }

      ws.onmessage = (event: MessageEvent<string>) => {
        addMessage(event.data)
        const { p, T }: Trade = JSON.parse(event.data)
        setLastPrice(parseFloat(p))
        setlastTradeTime(T)
      }

      setSocket(ws)
    } catch (error) {
      console.error('TradeWebSocket error:', error)
    }
  }

  useEffect(() => {
    connect()

    return () => {
      disconnect()
    }
  }, [url, setSocket, setConnected, addMessage, setLastPrice])

  return { isConnected, lastPrice, lastTradeTime, reconnect }
}
