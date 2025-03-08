'use server'

import { client } from '@/api/binance'

export const getBinanceAccountInfo = async () => {
  const response = await client.getAccountInformationV3()

  return response.data
}
