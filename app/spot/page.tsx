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
import { useMyAppWebsocket } from '@/hooks/use-my-app-websocket'
import { DbTradesPaginationButtons } from '@/components/db-trades/db-trades-pagination-buttons'
import { ReConnectWebsocketButton } from '@/components/re-connect-websocket-button'

const SYMBOL = 'ETHUSDT'

export default function Spot() {
  const { isConnected: isTradeWebsocketConnected } = useTradeWebsocket()
  const { isConnected: isMyAppWebsocketConnected } = useMyAppWebsocket()

  const { getTrades, trades } = useBinanceTrades()
  const { getTrades: getDbTrades, trades: dbTrades } = useDbTrades()

  useEffect(() => {
    const info = () => {
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

      <div className={'flex flex-row items-center justify-start gap-2'}>
        <ReFetchTradesButton />

        {(!isTradeWebsocketConnected || !isMyAppWebsocketConnected) && (
          <ReConnectWebsocketButton
            disabled={isTradeWebsocketConnected && isMyAppWebsocketConnected}
          />
        )}
      </div>

      <DbTrades trades={dbTrades} />

      <DbTradesPaginationButtons />

      <Trades trades={trades} />
    </div>
  )
}
