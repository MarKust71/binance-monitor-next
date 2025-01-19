/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect } from 'react'
import { getMyTrades } from '@/actions/spot/get-my-trades'
import { getOrder } from '@/actions/spot/get-order'
import { Ticker } from '@/components/ticker'
import { Trades } from '@/components/trades'
import { ParsedTrade, parseTrade } from '@/utils/parse-trade'
import { useWebSocket } from '@/hooks/use-websocket'
import { useTradesStore } from '@/stores/trades-store'

const SYMBOL = 'ETHUSDT'
const SOCKET = '@trade'

export default function Spot() {
  useWebSocket({ symbol: SYMBOL, socket: SOCKET })

  const setTrades = useTradesStore((state) => state.setTrades)
  const storeTrades = useTradesStore((state) => state.trades)

  useEffect(() => {
    const info = async () => {
      // console.log('account...')
      // const accountInfo = await account()

      console.log('trades...')
      const trades = await getMyTrades(SYMBOL)
      const parsedTrades = trades.map(
        (trade: Record<string, string | number>) => parseTrade(trade)
      )
      const orders = await Promise.all(
        parsedTrades.map((trade: ParsedTrade) =>
          getOrder(trade.symbol as string, { orderId: trade.orderId })
        )
      )
      const sides = orders.map((order) => ({
        orderId: order.orderId,
        side: order.side,
      }))

      const parsedTradesWithSides = parsedTrades.map(
        (trade: ParsedTrade, index: number) => ({
          ...trade,
          side: sides[index].side,
        })
      )

      setTrades(parsedTradesWithSides)
    }
    info()
  }, [])

  return (
    <div className={'p-2'}>
      <h1
        className={'mb-2 w-full text-xl font-extrabold'}
      >{`${SYMBOL} Spot`}</h1>

      <Ticker />

      <Trades trades={storeTrades} />
    </div>
  )
}
