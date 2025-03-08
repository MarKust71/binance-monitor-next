'use server'

import { client } from '@/api/binance'

export const getBinanceCurrentAllOpenOrders = async () => {
  const response = await client.getCurrentAllOpenOrders()

  return response.data
}
