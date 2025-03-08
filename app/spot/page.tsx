/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect } from 'react'
import { Ticker } from '@/components/ticker'
import { Trades } from '@/components/trades'
import { useTradeWebsocket } from '@/hooks/use-trade-websocket'
import { useBinanceTrades } from '@/hooks/use-binance-trades'
import { useDbTrades } from '@/hooks/use-db-trades'
import { DbTrades } from '@/components/db-trades'
import { ReFetchTradesButton } from '@/components/re-fetch-trades-button'
import { Button } from '@/components/ui/button'
import { useMyAppWebsocket } from '@/hooks/use-my-app-websocket'

const SYMBOL = 'ETHUSDT'
const SOCKET = '@trade'

export default function Spot() {
  const { isConnected: isTradeWebsocketConnected } = useTradeWebsocket({
    symbol: SYMBOL,
    socket: SOCKET,
  })
  const { isConnected: isMyAppWebsocketConnected } = useMyAppWebsocket()

  const { getTrades, trades } = useBinanceTrades()
  const { getTrades: getDbTrades, trades: dbTrades, pagination } = useDbTrades()

  useEffect(() => {
    console.log(`MyAppWebSocket connected: ${isMyAppWebsocketConnected}`)
  }, [isMyAppWebsocketConnected])

  useEffect(() => {
    const info = () => {
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
        className={
          'text-xl font-extrabold mb-2 flex flex-row justify-start gap-2'
        }
      >
        {`${SYMBOL} Spot`}
        {isTradeWebsocketConnected && (
          <div className={'text-green-500 font-bold text-sm'}>CONNECTED</div>
        )}
        {!isTradeWebsocketConnected && (
          <div className={'text-red-500 font-bold text-sm'}>DISCONNECTED</div>
        )}
      </h1>

      <Ticker />

      <ReFetchTradesButton />

      <Trades trades={trades} />

      <DbTrades trades={dbTrades} />

      <div className={'flex justify-end gap-1'}>
        <Button
          disabled={pagination.offset === 0}
          onClick={() => getDbTrades(0)}
          className={
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          }
        >
          {'|<'}
        </Button>

        <Button
          disabled={pagination.offset === 0}
          onClick={() =>
            getDbTrades(Math.max(pagination.offset - pagination.limit, 0))
          }
          className={
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          }
        >
          {'<'}
        </Button>

        <Button
          disabled={!pagination.has_next}
          onClick={() =>
            getDbTrades(
              Math.min(
                pagination.offset + pagination.limit,
                Math.floor(pagination.total / pagination.limit) *
                  pagination.limit
              )
            )
          }
          className={
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          }
        >
          {'>'}
        </Button>

        <Button
          disabled={!pagination.has_next}
          onClick={() =>
            getDbTrades(
              Math.floor(pagination.total / pagination.limit) * pagination.limit
            )
          }
          className={
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          }
        >
          {'>|'}
        </Button>
      </div>
    </div>
  )
}
