/* eslint-disable react-hooks/exhaustive-deps */
import { useMyAppWebSocketStore } from '@/stores/my-app-websocket-store'
import { useEffect } from 'react'
import { useBinanceTrades } from '@/hooks/use-binance-trades'
import { useDbTrades } from '@/hooks/use-db-trades'

const SYMBOL = 'ETHUSDT'

const url = process.env.NEXT_PUBLIC_MY_APP_WS_URL

export const useMyAppWebsocket = () => {
  const setSocket = useMyAppWebSocketStore((state) => state.setSocket)
  const setConnected = useMyAppWebSocketStore((state) => state.setConnected)
  const addMessage = useMyAppWebSocketStore((state) => state.addMessage)
  const sendMessage = useMyAppWebSocketStore((state) => state.sendMessage)
  const clearMessages = useMyAppWebSocketStore((state) => state.clearMessages)
  const isConnected = useMyAppWebSocketStore((state) => state.isConnected)
  const messages = useMyAppWebSocketStore((state) => state.messages)
  const socket = useMyAppWebSocketStore((state) => state.socket)
  const isConnecting = useMyAppWebSocketStore((state) => state.isConnecting)
  const setIsConnecting = useMyAppWebSocketStore(
    (state) => state.setIsConnecting
  )

  const { getTrades } = useBinanceTrades()
  const { getDbTrades, isFetching } = useDbTrades()

  const disconnect = () => {
    if (socket) {
      console.log('MyApp disconnecting...', socket)
      socket.close() // Zamknięcie połączenia
      setSocket(null)
    }
  }

  const reconnect = () => {
    setIsConnecting(true)
    console.log('MyApp reconnecting...')
    disconnect()
    connect()
    setIsConnecting(false)
  }

  const connect = () => {
    console.log('MyApp connecting...')
    try {
      const ws = new WebSocket(url as string)

      ws.onopen = () => {
        console.log('MyAppWebSocket connected')
        setConnected(true)
      }

      ws.onerror = (error: Event) => {
        console.error('MyAppWebSocket error:', error)
      }

      ws.onclose = () => {
        console.log('MyAppWebSocket closed')
        setConnected(false)
      }

      ws.onmessage = async (event: MessageEvent<string>) => {
        addMessage(event.data)
        console.log({ message: event.data })

        const { reason } = JSON.parse(event.data)
        console.log(`Received reason: ${reason} | isFetching: ${isFetching}`)
        if (!isFetching && reason) {
          await getTrades(SYMBOL)
          await getDbTrades({
            // offset: pagination.offset,
            // limit: pagination.limit,
          })
        }
      }

      setSocket(ws)
    } catch (error) {
      console.error('MyAppWebSocket error:', error)
    }
  }

  useEffect(() => {
    connect()

    return () => {
      disconnect()
    }
  }, [url, setSocket, setConnected, addMessage, sendMessage, clearMessages])

  return { isConnected, messages, reconnect, isConnecting }
}
