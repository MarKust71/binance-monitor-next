/* eslint-disable react-hooks/exhaustive-deps */
import { useWebSocketStore } from '@/stores/websocket-store'
import { useEffect, useState } from 'react'
import { useTradesStore } from '@/stores/trades-store'
import { getTrades } from '@/actions/spot/get-trades'
import { formatNumber } from '@/utils/format-number'

export const Ticker = () => {
  const [initPrice, setInitPrice] = useState(0)
  const calculateProfit = useTradesStore((state) => state.calculateProfit)
  const lastPrice = useWebSocketStore((state) => state.lastPrice)

  useEffect(() => {
    calculateProfit(lastPrice)
  }, [lastPrice])

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
      <p>Ticker: price = {formatNumber(lastPrice || initPrice)}</p>
    </div>
  )
}
