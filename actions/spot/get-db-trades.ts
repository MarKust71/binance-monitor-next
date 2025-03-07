'use server'

import axios from 'axios'
import { GetDbTrades } from '@/actions/spot/get-db-trades.types'

const API_URL = process.env.NEXT_PUBLIC_MY_APP_API_URL

export const getDbTrades = async (
  offset: number = 0,
  limit: number = 10
): Promise<GetDbTrades> => {
  try {
    const url = `${API_URL}/trades?offset=${offset}&limit=${limit}`
    const response = await axios.get(url, {
      headers: { 'Content-Type': 'application/json' },
    })

    return response.data
  } catch (error) {
    console.error('Error fetching trades:', error)

    return {} as GetDbTrades
  }
}
