import { ParsedBinanceTrade } from '@/utils'

export type BinanceTrade = {
  E: number // Event time
  M: boolean // Ignore
  T: number // Trade time
  e: string // Event type
  m: boolean // Is the buyer the market maker?
  p: string // Price
  q: string // Quantity
  s: string // Symbol
  t: number // Trade ID
}

export type BinanceTradesProps = {
  trades: ParsedBinanceTrade[]
}
