'use server'

import axios from 'axios'
import { FetchDbTrades } from '@/actions/spot/fetch-db-trades.types'
import { LIMIT, OFFSET } from '@/stores/db-trades-store'
import { DbTradeQueryParams } from '@/stores/db-trades-store/db.trades.store.types'

const API_URL = process.env.NEXT_PUBLIC_MY_APP_API_URL

export const fetchDbTrades = async (
  offset: number = OFFSET,
  limit: number = LIMIT,
  queryParams: Partial<DbTradeQueryParams>
): Promise<FetchDbTrades> => {
  const excludeStatusesArray = queryParams.excludeStatuses
  try {
    const url = `${API_URL}/trades?offset=${offset}&limit=${limit}${excludeStatusesArray?.map((status) => `&exclude_status=${status}`).join('')}`
    const response = await axios.get(url, {
      headers: { 'Content-Type': 'application/json' },
    })

    return response.data
  } catch (error) {
    console.error('Error fetching trades:', error)

    return {} as FetchDbTrades
  }
}
