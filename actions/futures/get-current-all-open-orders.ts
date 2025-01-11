'use server'

import { client } from '@/api/binance'

export const getCurrentAllOpenOrders = async () => {
  const response = await client.getCurrentAllOpenOrders()

  return response.data
}
