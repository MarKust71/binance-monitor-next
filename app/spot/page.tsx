'use client'

import { Ticker } from '@/components/ticker'
import { BinanceTrades } from '@/components/trades'
import { DbTrades } from '@/components/db-trades'
import { WebsocketConnectionStatus } from '@/components/websocket-connection-status'

export default function Spot() {
  return (
    <div className={'p-2'}>
      <WebsocketConnectionStatus />

      <Ticker />

      <DbTrades />

      <BinanceTrades />
    </div>
  )
}
