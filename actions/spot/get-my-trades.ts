'use server'

import { clientSpot } from '@/api/binance'
import { MyTrade } from './get-my-trade.types'

export const getMyTrades = async (symbol: string): Promise<MyTrade[]> => {
  const response = await clientSpot.myTrades(symbol)

  return response.data
}
