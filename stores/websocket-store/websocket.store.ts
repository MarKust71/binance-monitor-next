import { create } from 'zustand'
import { WebSocketState } from './websocket.store.types'

export const useWebSocketStore = create<WebSocketState>((set) => ({
  socket: null,
  messages: [],
  isConnected: false,
  lastPrice: 0,

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  setConnected: (status) => set(() => ({ isConnected: status })),

  setSocket: (socket) => set(() => ({ socket })),

  setLastPrice: (price) => set(() => ({ lastPrice: price })),

  sendMessage: (message) =>
    set((state) => {
      if (state.socket && state.socket.readyState === WebSocket.OPEN) {
        state.socket.send(message)
      }
      return {}
    }),

  clearMessages: () => set(() => ({ messages: [] })),
}))
