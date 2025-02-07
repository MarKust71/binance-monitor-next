/* eslint-disable react-hooks/exhaustive-deps */
import { useWebSocketStore } from '@/stores/websocket-store'
import { useEffect, useMemo, useState } from 'react'
import { useTradesStore } from '@/stores/trades-store'
import { Trade } from '@/components/trades/trades.types'
import { getTrades } from '@/actions/spot/get-trades'
import { formatNumber } from '@/utils/format-number'

export const Ticker = () => {
  const [initPrice, setInitPrice] = useState(0)
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

  useEffect(() => {
    const init = async () => {
      const trades = await getTrades('ETHUSDT')
      const price = parseFloat(trades[0].price)
      setInitPrice(price)
      calculateProfit(price)
    }
    init()
  }, [])

  return (
    <div className={'mb-2'}>
      <p>Ticker: price = {formatNumber(price || initPrice)}</p>
    </div>
  )
}
