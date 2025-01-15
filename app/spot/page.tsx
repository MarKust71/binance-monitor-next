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

const SYMBOL = 'ETHUSDT'
const ORDER_ID = 1456312

export default function Spot() {
  const [myTrades, setMyTrades] = useState<Trade[]>([])
  const [order, setOrder] = useState<OrderType>({})

  const profit = useMemo(() => {
    if (!myTrades || !myTrades.length) return

    // const price = parseFloat(trade.p)
    const price = 3435.58
    const quantity = parseFloat(myTrades[0].qty)

    return {
      profit: (price - parseFloat(myTrades[2].price)) * quantity,
      profitPercentage:
        ((price - parseFloat(myTrades[2].price)) /
          parseFloat(myTrades[2].price)) *
        100,
    }
  }, [myTrades])

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

      <Trades trades={myTrades} />

      <Order order={order} />

      <p>Profit: {profit?.profit}</p>

      <p>Profit %: {profit?.profitPercentage}</p>
    </>
  )
}
