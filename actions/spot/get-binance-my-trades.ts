'use server'

import { clientSpot } from '@/api/binance'
import { BinanceMyTrade } from './get-binance-my-trade.types'

export const getBinanceMyTrades = async (
  symbol: string
): Promise<BinanceMyTrade[]> => {
  const response = await clientSpot.myTrades(symbol)

  return response.data
}
