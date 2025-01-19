/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect } from 'react'
import { Ticker } from '@/components/ticker'
import { Trades } from '@/components/trades'
import { useWebSocket } from '@/hooks/use-websocket'
import { useTradesStore } from '@/stores/trades-store'
import { useTrades } from '@/hooks/use-trades'

const SYMBOL = 'ETHUSDT'
const SOCKET = '@trade'

export default function Spot() {
  useWebSocket({ symbol: SYMBOL, socket: SOCKET })

  const { getTrades } = useTrades()

  const trades = useTradesStore((state) => state.trades)

  useEffect(() => {
    const info = async () => {
      // console.log('account...')
      // const accountInfo = await account()

      getTrades(SYMBOL)
    }
    info()
  }, [])

  return (
    <div className={'p-2'}>
      <h1
        className={'mb-2 w-full text-xl font-extrabold'}
      >{`${SYMBOL} Spot`}</h1>

      <Ticker />

      <Trades trades={trades} />
    </div>
  )
}
