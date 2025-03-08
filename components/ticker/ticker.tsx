/* eslint-disable react-hooks/exhaustive-deps */
import { useTradeWebSocketStore } from '@/stores/trade-websocket-store'
import { useEffect, useState } from 'react'
import { getBinanceTrades } from '@/actions/spot/get-binance-trades'
import { formatNumber } from '@/utils/format-number'
import { useBinanceTrades } from '@/hooks/use-binance-trades'

export const Ticker = () => {
  const [initPrice, setInitPrice] = useState(0)
  const lastPrice = useTradeWebSocketStore((state) => state.lastPrice)
  const { calculateProfit } = useBinanceTrades()

  useEffect(() => {
    calculateProfit(lastPrice)
  }, [lastPrice])

  useEffect(() => {
    const init = async () => {
      const trades = await getBinanceTrades('ETHUSDT')
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
