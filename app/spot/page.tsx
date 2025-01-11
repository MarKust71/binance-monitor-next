/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useMemo, useState } from 'react'
import { account } from '@/actions/spot/account'
import { getMyTrades } from '@/actions/spot/get-my-trades'
import { getOrder } from '@/actions/spot/get-order'

type Trade = Record<string, string>
type MyTrades = Record<string, string>[]

const SYMBOL = 'ETHUSDT'
const ORDER_ID = 610308

const createBinanceWebSocket = (symbol: string, socket: string) => {
  const url = process.env.NEXT_PUBLIC_BINANCE_SPOT_TEST_API_WSS

  const ws = new WebSocket(url + `/ws/${symbol.toLowerCase()}${socket}`)

  ws.onopen = () => {
    console.log('connected')
  }

  ws.onclose = () => {
    console.log('disconnected')
  }

  return ws
}

const ws = createBinanceWebSocket('ETHUSDT', '@trade')

export default function Spot() {
  const [trade, setTrade] = useState<Trade>()
  const [myTrades, setMyTrades] = useState<MyTrades>()
  const [order, setOrder] = useState()

  ws.onmessage = (message: MessageEvent) => {
    setTrade(JSON.parse(message.data))
  }

  const profit = useMemo(() => {
    if (!trade || !myTrades) return

    const price = parseFloat(trade.p)
    const quantity = parseFloat(myTrades[0].qty)
    return {
      profit: (price - parseFloat(myTrades[0].price)) * quantity,
      profitPercentage:
        ((price - parseFloat(myTrades[0].price)) /
          parseFloat(myTrades[0].price)) *
        100,
    }
  }, [trade?.p, myTrades])

  useEffect(() => {
    const info = async () => {
      console.log('account...')
      const accountInfo = await account()
      console.log('account', accountInfo)

      console.log('myTrades...')
      const trades = await getMyTrades(SYMBOL)
      console.log('trades', trades)
      setMyTrades(trades)

      console.log('order...')
      const order = await getOrder(SYMBOL, { orderId: ORDER_ID })
      console.log('order', order)
      setOrder(order)
    }
    info()

    return () => {
      ws.close()
    }
  }, [])

  return (
    <>
      <h1>Spot</h1>
      <p>Ticker: price={trade?.p}</p>
      <p>Trades: {JSON.stringify(myTrades)}</p>
      <p>Order: {JSON.stringify(order)}</p>
      <p>Profit: {profit?.profit}</p>
      <p>Profit %: {profit?.profitPercentage}</p>
    </>
  )
}
