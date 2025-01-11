'use client'

import { useEffect, useState } from 'react'
import { getAccountInfo } from '@/actions/futures/get-account-info'
import { getAccountTradeList } from '@/actions/futures/get-account-trade-list'
import { getAllOrders } from '@/actions/futures/get-all-orders'
import { getCurrentAllOpenOrders } from '@/actions/futures/get-current-all-open-orders'

type Trade = Record<string, string>

export default function Futures() {
  const [trade, setTrade] = useState<Trade>()

  const wss = process.env.NEXT_PUBLIC_BINANCE_FUTURES_TEST_API_WSS

  const symbol = 'BTCUSDT'
  const ws = new WebSocket(wss + `/ws/${symbol.toLowerCase()}@markPrice`)

  ws.onopen = () => {
    console.log('connected')
  }

  ws.onclose = () => {
    console.log('disconnected')
  }

  ws.onmessage = (message) => {
    // console.log(JSON.parse(message.data))
    setTrade(JSON.parse(message.data))
  }

  useEffect(() => {
    const info = async () => {
      console.log('getAccountInfo...')
      const accountInfo = await getAccountInfo()
      console.log('getAccountInfo', accountInfo)

      console.log('getAccountTradeList...')
      const tradeList = await getAccountTradeList(symbol)
      console.log('getAccountTradeList', tradeList)

      console.log('getAllOrders...')
      const orders = await getAllOrders(symbol)
      console.log('getAllOrders', orders)

      console.log('getCurrentAllOpenOrders...')
      const currentOrders = await getCurrentAllOpenOrders()
      console.log('getCurrentAllOpenOrders', currentOrders)
    }
    info()

    return () => {
      ws.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h1>Futures</h1>
      <p>
        Ticker: markPrice={trade?.p} indexPrice={trade?.i}
      </p>
    </>
  )
}
