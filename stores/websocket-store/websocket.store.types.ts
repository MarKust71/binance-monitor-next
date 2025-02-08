// Definicja typów dla stanu
export type WebSocketState = {
  socket: WebSocket | null // Obiekt WebSocket
  messages: string[] // Lista wiadomości
  isConnected: boolean // Status połączenia
  lastPrice: number // Ostatnia cena
  addMessage: (message: string) => void // Dodawanie wiadomości
  setConnected: (status: boolean) => void // Ustawienie statusu połączenia
  setSocket: (socket: WebSocket | null) => void // Ustawienie instancji WebSocket
  setLastPrice: (price: number) => void // Ustawienie ostatniej ceny
  sendMessage: (message: string) => void // Funkcja do wysyłania wiadomości
  clearMessages: () => void // Czyszczenie wiadomości
}
