'use server'

import { clientSpot } from '@/api/binance'

export const account = async () => {
  const response = await clientSpot.account()

  return response.data
}
