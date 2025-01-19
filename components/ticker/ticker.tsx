/* eslint-disable react-hooks/exhaustive-deps */
import { useWebSocketStore } from '@/stores/websocket-store'
import { useEffect, useMemo } from 'react'
import { useTradesStore } from '@/stores/trades-store'
import { Trade } from '@/components/trades/trades.types'

export const Ticker = () => {
  const calculateProfit = useTradesStore((state) => state.calculateProfit)
  const messages = useWebSocketStore((state) => state.messages)
  const trade: Trade = useMemo(
    () => JSON.parse(messages[messages.length - 1] || '{}'),
    [messages]
  )
  const price = useMemo(() => parseFloat(trade.p), [trade])

  useEffect(() => {
    calculateProfit(price)
  }, [price])

  return (
    <div className={'mb-2'}>
      <p>Ticker: price = {price}</p>
    </div>
  )
}
