'use server'

import { clientSpot } from '@/api/binance'
import { BinanceTrade } from './get-binance-trades.types'

export const getBinanceTrades = async (
  symbol: string
): Promise<BinanceTrade[]> => {
  const response = await clientSpot.trades(symbol, { limit: 1 })

  return response.data
}
