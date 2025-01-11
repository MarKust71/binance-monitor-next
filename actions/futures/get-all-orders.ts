'use server'

import { client } from '@/api/binance'

export const getAllOrders = async (symbol: string) => {
  try {
    const response = await client.getAllOrders(symbol)

    return response.data
  } catch (error) {
    console.error('queryCurrentOpenOrder', error)

    return []
  }
}
