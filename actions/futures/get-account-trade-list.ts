'use server'

import { client } from '@/api/binance'

export const getAccountTradeList = async (symbol: string) => {
  const response = await client.getAccountTradeList(symbol)

  return response.data
}
