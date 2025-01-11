'use server'

import { clientSpot } from '@/api/binance'

export const getMyTrades = async (symbol: string) => {
  const response = await clientSpot.myTrades(symbol)

  return response.data
}
