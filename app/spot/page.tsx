/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect } from 'react'
import { Ticker } from '@/components/ticker'
import { Trades } from '@/components/trades'
import { useTradeWebsocket } from '@/hooks/use-trade-websocket'
import { useBinanceTrades } from '@/hooks/use-binance-trades'
import { useDbTrades } from '@/hooks/use-db-trades'
import { DbTrades } from '@/components/db-trades'

const SYMBOL = 'ETHUSDT'

export default function Spot() {
  const { isConnected: isTradeWebsocketConnected } = useTradeWebsocket()

  const { getTrades, trades } = useBinanceTrades()
  const { getDbTrades, trades: dbTrades } = useDbTrades()

  useEffect(() => {
    const info = async () => {
      await getTrades(SYMBOL)
      await getDbTrades({})
    }
    info()
  }, [])

  return (
    <div className={'p-2'}>
      <h1 className={'text-xl font-extrabold mb-2 flex flex-row gap-2'}>
        {`${SYMBOL} Spot`}
        {isTradeWebsocketConnected && (
          <span className={'text-green-500 font-bold text-sm'}>CONNECTED</span>
        )}
        {!isTradeWebsocketConnected && (
          <span className={'text-red-500 font-bold text-sm'}>DISCONNECTED</span>
        )}
      </h1>

      <Ticker />

      <DbTrades trades={dbTrades} />

      <Trades trades={trades} />
    </div>
  )
}
