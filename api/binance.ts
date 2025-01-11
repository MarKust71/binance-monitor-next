import { UMFutures } from '@binance/futures-connector'
import { Spot } from '@binance/connector'

const FUTURES_API_KEY = process.env.NEXT_PUBLIC_BINANCE_FUTURES_TEST_API_KEY
const FUTURES_API_SECRET =
  process.env.NEXT_PUBLIC_BINANCE_FUTURES_TEST_API_SECRET

export const client = new UMFutures(FUTURES_API_KEY, FUTURES_API_SECRET, {
  baseURL: process.env.NEXT_PUBLIC_BINANCE_FUTURES_TEST_API_URL,
})

// const SPOT_API_KEY = process.env.NEXT_PUBLIC_BINANCE_SPOT_API_KEY
// const SPOT_API_SECRET = process.env.NEXT_PUBLIC_BINANCE_SPOT_API_SECRET
const SPOT_API_KEY = process.env.NEXT_PUBLIC_BINANCE_SPOT_TEST_API_KEY
const SPOT_API_SECRET = process.env.NEXT_PUBLIC_BINANCE_SPOT_TEST_API_SECRET
const SPOT_API_URL = process.env.NEXT_PUBLIC_BINANCE_SPOT_TEST_API_URL

export const clientSpot = new Spot(SPOT_API_KEY, SPOT_API_SECRET, {
  testnet: false,
  baseURL: SPOT_API_URL,
})

/*
import {USDMClient} from "binance";

export const client = new USDMClient({
  api_key: API_KEY,
  api_secret: API_SECRET,
  baseUrl: 'https://testnet.binancefuture.com',
});
*/
