import { create } from 'zustand'
import { TradeWebSocketState } from './trade-websocket.store.types'

export const useTradeWebSocketStore = create<TradeWebSocketState>((set) => ({
  socket: null,
  messages: [],
  isConnected: false,
  lastPrice: 0,
  lastTradeTime: 0,

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  setConnected: (status) => set(() => ({ isConnected: status })),

  setSocket: (socket) => set(() => ({ socket })),

  setLastPrice: (price) => set(() => ({ lastPrice: price })),

  setLastTradeTime: (time) => set(() => ({ lastTradeTime: time })),

  sendMessage: (message) =>
    set((state) => {
      if (state.socket && state.socket.readyState === WebSocket.OPEN) {
        state.socket.send(message)
      }
      return {}
    }),

  clearMessages: () => set(() => ({ messages: [] })),
}))
