'use server'

import { clientSpot } from '@/api/binance'

export const getOrder = async (symbol: string, options = {}) => {
  const response = await clientSpot.getOrder(symbol, options)

  return response.data
}
