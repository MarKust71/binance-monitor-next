import { create } from 'zustand'
import { MyAppWebSocketState } from './my-app-websocket.store.types'

export const useMyAppWebSocketStore = create<MyAppWebSocketState>((set) => ({
  socket: null,
  messages: [],
  isConnected: false,
  isConnecting: false,

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

  setIsConnecting: (status) => set(() => ({ isConnected: status })),
}))
