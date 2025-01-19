'use server'

import { clientSpot } from '@/api/binance'

export const getTrades = async (symbol: string) => {
  const response = await clientSpot.trades(symbol, { limit: 1 })

  return response.data
}
