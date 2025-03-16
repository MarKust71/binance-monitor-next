// export type Trade = Record<string, string | number>

import { ParsedTrade } from '@/utils'

export type Trade = {
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

export type TradesProps = {
  trades: ParsedTrade[]
}
