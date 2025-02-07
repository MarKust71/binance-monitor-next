export type Order = {
  symbol: string // 'LTCBTC'
  orderId: number // 1
  orderListId: number // -1 // This field will always have a value of -1 if not an order list.
  clientOrderId: string // 'myOrder1'
  price: string // '0.1'
  origQty: string // '1.0'
  executedQty: string // '0.0'
  cummulativeQuoteQty: string // '0.0'
  status: string // 'NEW'
  timeInForce: string // 'GTC'
  type: string // 'LIMIT'
  side: string // 'BUY'
  stopPrice: string // '0.0'
  icebergQty: string // '0.0'
  time: number // 1499827319559
  updateTime: number // 1499827319559
  isWorking: boolean // true
  workingTime: number // 1499827319559
  origQuoteOrderQty: string // '0.000000'
  selfTradePreventionMode: string // 'NONE'
}
