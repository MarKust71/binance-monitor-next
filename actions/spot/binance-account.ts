'use server'

import { clientSpot } from '@/api/binance'
import { BinanceAccount } from './binance-account.types'

export const binanceAccount = async (): Promise<BinanceAccount> => {
  const response = await clientSpot.account()

  return response.data
}

// https://binance.github.io/binance-connector-node/module-Trade.html#account
// https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints#account-information-user_data
