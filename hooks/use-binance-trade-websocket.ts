/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useBinanceTradeWebSocketStore } from '@/stores/binance-trade-websocket-store'
import { BinanceTrade } from '@/components/trades/binance-trades.types'

const SYMBOL = 'ETHUSDT'
const SOCKET = '@trade'

const url = process.env.NEXT_PUBLIC_BINANCE_SPOT_API_WSS
// const url = process.env.NEXT_PUBLIC_BINANCE_SPOT_TEST_API_WSS

export const useBinanceTradeWebsocket = () => {
  const isConnected = useBinanceTradeWebSocketStore(
    (state) => state.isConnected
  )
  const lastPrice = useBinanceTradeWebSocketStore((state) => state.lastPrice)
  const socket = useBinanceTradeWebSocketStore((state) => state.socket)
  const lastTradeTime = useBinanceTradeWebSocketStore((state) => state.socket)

  const addMessage = useBinanceTradeWebSocketStore((state) => state.addMessage)
  const setConnected = useBinanceTradeWebSocketStore(
    (state) => state.setConnected
  )
  const setLastPrice = useBinanceTradeWebSocketStore(
    (state) => state.setLastPrice
  )
  const setlastTradeTime = useBinanceTradeWebSocketStore(
    (state) => state.setLastTradeTime
  )
  const setSocket = useBinanceTradeWebSocketStore((state) => state.setSocket)
  const isConnecting = useBinanceTradeWebSocketStore(
    (state) => state.isConnecting
  )
  const setIsConnecting = useBinanceTradeWebSocketStore(
    (state) => state.setIsConnecting
  )

  const disconnect = () => {
    if (socket) {
      console.log('Trade disconnecting...', socket)
      socket.close() // Zamknięcie połączenia
      setSocket(null)
    }
  }

  const reconnect = () => {
    setIsConnecting(true)
    console.log('Trade reconnecting...')
    disconnect()
    connect()
    setIsConnecting(false)
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
        const { p, T }: BinanceTrade = JSON.parse(event.data)
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

  return { isConnected, lastPrice, lastTradeTime, reconnect, isConnecting }
}
