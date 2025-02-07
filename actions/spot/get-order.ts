'use server'

import { clientSpot } from '@/api/binance'
import { Order } from './get-order.types'

export const getOrder = async (
  symbol: string,
  options = {}
): Promise<Order> => {
  const response = await clientSpot.getOrder(symbol, options)

  return response.data
}
