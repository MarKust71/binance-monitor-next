'use client'

import { Ticker } from '@/components/ticker'
import { BinanceTrades } from '@/components/trades'
import { useBinanceTradeWebsocket } from '@/hooks/use-binance-trade-websocket'
import { useBinanceTrades } from '@/hooks/use-binance-trades'
import { useDbTrades } from '@/hooks/use-db-trades'
import { DbTrades } from '@/components/db-trades'

const SYMBOL = 'ETHUSDT'

export default function Spot() {
  const { isConnected: isTradeWebsocketConnected } = useBinanceTradeWebsocket()

  const { trades } = useBinanceTrades()
  const { trades: dbTrades } = useDbTrades()

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

      <BinanceTrades trades={trades} />
    </div>
  )
}
