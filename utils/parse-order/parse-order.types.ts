export type ParsedOrder = {
  symbol: string
  orderId: string
  price: number
  origQty: number
  executedQty: number
  cummulativeQuoteQty: number
  status: string
  type: string
  side: string
  icebergQty: number
  time: string
  updateTime: string
}
