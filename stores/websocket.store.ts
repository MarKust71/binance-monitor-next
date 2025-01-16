import { create } from 'zustand'
import { WebSocketState } from '@/stores/websocket.store.types'

const useWebSocketStore = create<WebSocketState>((set) => ({
  socket: null,
  messages: [],
  isConnected: false,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setConnected: (status) => set(() => ({ isConnected: status })),
  setSocket: (socket) => set(() => ({ socket })),
  sendMessage: (message) =>
    set((state) => {
      if (state.socket && state.socket.readyState === WebSocket.OPEN) {
        state.socket.send(message)
      }
      return {}
    }),
  clearMessages: () => set(() => ({ messages: [] })),
}))

export default useWebSocketStore
