export type ParsedBinanceTrade = {
  symbol: string
  id: number
  orderId: number
  price: number
  qty: number
  commission: number
  commissionAsset: string
  time: string
  quoteQty: number
  side?: 'SELL' | 'BUY'
}
