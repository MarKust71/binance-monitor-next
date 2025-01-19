// export type Trade = Record<string, string | number>

import { ParsedTrade } from '@/utils'

export type Trade = {
  E: number
  M: boolean
  T: number
  e: string
  m: boolean
  p: string
  q: string
  s: string
  t: number
}

export type TradesProps = {
  trades: ParsedTrade[]
}
