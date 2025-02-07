'use server'

import { clientSpot } from '@/api/binance'
import { Trade } from './get-trades.types'

export const getTrades = async (symbol: string): Promise<Trade[]> => {
  const response = await clientSpot.trades(symbol, { limit: 1 })

  return response.data
}
