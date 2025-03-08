'use server'

import { clientSpot } from '@/api/binance'
import { BinanceOrder } from './get-binance-order.types'

export const getBinanceOrder = async (
  symbol: string,
  options = {}
): Promise<BinanceOrder> => {
  const response = await clientSpot.getOrder(symbol, options)

  return response.data
}
