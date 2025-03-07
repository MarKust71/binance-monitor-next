/* eslint-disable react-hooks/exhaustive-deps */
import { useMyAppWebSocketStore } from '@/stores/my-app-websocket-store'
import { useEffect } from 'react'

const url = process.env.NEXT_PUBLIC_MY_APP_WS_URL

export const useMyAppWebsocket = () => {
  const setSocket = useMyAppWebSocketStore((state) => state.setSocket)
  const setConnected = useMyAppWebSocketStore((state) => state.setConnected)
  const addMessage = useMyAppWebSocketStore((state) => state.addMessage)
  const sendMessage = useMyAppWebSocketStore((state) => state.sendMessage)
  const clearMessages = useMyAppWebSocketStore((state) => state.clearMessages)
  const isConnected = useMyAppWebSocketStore((state) => state.isConnected)
  const messages = useMyAppWebSocketStore((state) => state.messages)

  useEffect(() => {
    const ws = new WebSocket(url as string)

    ws.onopen = () => {
      console.log('WebSocket connected')
      setConnected(true)
    }

    ws.onerror = (error: Event) => {
      console.error('WebSocket error:', error)
    }

    ws.onclose = () => {
      console.log('WebSocket closed')
      setConnected(false)
    }

    ws.onmessage = (event: MessageEvent<string>) => {
      addMessage(event.data)
      console.log({ message: event.data })
    }

    setSocket(ws)

    return () => {
      ws.close() // Zamknięcie połączenia
      setSocket(null)
    }
  }, [url, setSocket, setConnected, addMessage, sendMessage, clearMessages])

  return { isConnected, messages }
}
