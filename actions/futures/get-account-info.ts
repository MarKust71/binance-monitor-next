'use server'

import { client } from '@/api/binance'

export const getAccountInfo = async () => {
  const response = await client.getAccountInformationV3()

  return response.data
}
