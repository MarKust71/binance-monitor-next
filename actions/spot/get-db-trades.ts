'use server'

import axios from 'axios'
import { GetDbTrades } from '@/actions/spot/get-db-trades.types'

const API_URL = process.env.NEXT_PUBLIC_MY_API_URL

export const getDbTrades = async (): Promise<GetDbTrades> => {
  try {
    const response = await axios.get(`${API_URL}/trades`, {
      headers: { 'Content-Type': 'application/json' },
    })

    return response.data
  } catch (error) {
    console.error('Error fetching trades:', error)

    return {} as GetDbTrades
  }
}
