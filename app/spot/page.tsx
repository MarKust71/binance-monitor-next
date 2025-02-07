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
import { Button } from '@/components/ui/button'

const SYMBOL = 'ETHUSDT'
const SOCKET = '@trade'

export default function Spot() {
  useWebSocket({ symbol: SYMBOL, socket: SOCKET })

  const { getTrades, trades } = useTrades()
  const { getTrades: getDbTrades, trades: dbTrades, pagination } = useDbTrades()

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

      <div className={'flex justify-between'}>
        <Button
          disabled={pagination.offset === 0}
          onClick={() =>
            getDbTrades(Math.max(pagination.offset - pagination.limit, 0))
          }
          className={
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          }
        >
          Previous
        </Button>
        <Button
          disabled={!pagination.has_next}
          onClick={() =>
            getDbTrades(
              Math.min(
                pagination.offset + pagination.limit,
                pagination.total - pagination.limit
              )
            )
          }
          className={
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          }
        >
          Next
        </Button>
      </div>
    </div>
  )
}
