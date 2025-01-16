'use client'

import { useEffect, useMemo, useState } from 'react'
import { account } from '@/actions/spot/account'
import { getMyTrades } from '@/actions/spot/get-my-trades'
import { getOrder } from '@/actions/spot/get-order'
import { Ticker } from '@/components/ticker'
import { Trades } from '@/components/trades'
import { Order } from '@/components/order'
import { Order as OrderType } from '@/components/order/order.types'
import { Trade } from '@/components/trades/trades.types'
import useWebSocketStore from '@/stores/websocket.store'
import { parseTrade } from '@/utils/parse-trade'

const SYMBOL = 'ETHUSDT'
const ORDER_ID = 1485757

export default function Spot() {
  const [myTrades, setMyTrades] = useState<Trade[]>([])
  const [order, setOrder] = useState<OrderType>({})

  const messages = useWebSocketStore((state) => state.messages)
  const message: Trade = JSON.parse(messages[messages.length - 1] || '{}')

  const parsedTrades = useMemo(() => {
    return myTrades.map((trade) => parseTrade(trade))
  }, [myTrades])

  const profit = useMemo(() => {
    if (!parsedTrades || !parsedTrades.length) return

    const price =
      typeof message.p === 'string' ? parseFloat(message.p) : message.p
    const quantity = parsedTrades[2].qty

    return {
      profit: (price - parsedTrades[2].price) * quantity,
      profitPercentage:
        ((price - parsedTrades[2].price) / parsedTrades[2].price) * 100,
    }
  }, [parsedTrades, message])

  useEffect(() => {
    const info = async () => {
      console.log('account...')
      const accountInfo = await account()
      console.log('account', accountInfo)

      console.log('trades...')
      const trades = await getMyTrades(SYMBOL)
      console.log('trades', trades)
      setMyTrades(trades)

      console.log('order...')
      const order = await getOrder(SYMBOL, { orderId: ORDER_ID })
      console.log('order', order)
      setOrder(order)
    }
    info()
  }, [])

  return (
    <>
      <h1>Spot</h1>

      <Ticker />

      <Trades trades={parsedTrades} />

      <Order order={order} />

      <p>Profit: {profit?.profit}</p>

      <p>Profit %: {profit?.profitPercentage}</p>
    </>
  )
}
