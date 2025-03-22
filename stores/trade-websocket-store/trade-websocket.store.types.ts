// Definicja typów dla stanu
export type TradeWebSocketState = {
  socket: WebSocket | null // Obiekt WebSocket
  messages: string[] // Lista wiadomości
  isConnected: boolean // Status połączenia
  lastPrice: number // Ostatnia cena
  lastTradeTime: number // Czas ostatniego trade'u (event)
  addMessage: (message: string) => void // Dodawanie wiadomości
  setConnected: (status: boolean) => void // Ustawienie statusu połączenia
  setSocket: (socket: WebSocket | null) => void // Ustawienie instancji WebSocket
  setLastPrice: (price: number) => void // Ustawienie ostatniej ceny
  setLastTradeTime: (time: number) => void // Ustawienie czsu ostatniego trade'u
  sendMessage: (message: string) => void // Funkcja do wysyłania wiadomości
  clearMessages: () => void // Czyszczenie wiadomości
  isConnecting: boolean // Status łączenia
  setIsConnecting: (status: boolean) => void // Ustawienie statusu łączenia
}
