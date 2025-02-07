/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect } from 'react'
import { Ticker } from '@/components/ticker'
import { Trades } from '@/components/trades'
import { useWebSocket } from '@/hooks/use-websocket'
import { useTrades } from '@/hooks/use-trades'
import { useDbTrades } from '@/hooks/use-db-trades'
import { DbTrades } from '@/components/db-trades'
import { ReFetchTradesButton } from '@/components/re-fetch-trades-button'

const SYMBOL = 'ETHUSDT'
const SOCKET = '@trade'

export default function Spot() {
  useWebSocket({ symbol: SYMBOL, socket: SOCKET })

  const { getTrades, trades } = useTrades()
  const { getTrades: getDbTrades, trades: dbTrades } = useDbTrades()

  useEffect(() => {
    const info = async () => {
      // console.log('account...')
      // const accountInfo = await account()

      getTrades(SYMBOL)
      getDbTrades()
    }
    info()
  }, [])

  return (
    <div className={'p-2'}>
      <h1
        className={'mb-2 w-full text-xl font-extrabold'}
      >{`${SYMBOL} Spot`}</h1>

      <Ticker />

      <ReFetchTradesButton />

      <Trades trades={trades} />

      <DbTrades trades={dbTrades} />
    </div>
  )
}
