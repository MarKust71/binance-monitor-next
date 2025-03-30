/* eslint-disable react-hooks/exhaustive-deps */
import { useBinanceTradeWebSocketStore } from '@/stores/binance-trade-websocket-store'
import { useEffect, useState } from 'react'
import { getBinanceTrades } from '@/actions/spot/get-binance-trades'
import { formatNumber } from '@/utils/format-number'
import { useBinanceTrades } from '@/hooks/use-binance-trades'
import { formatDateTimeFromTimestamp } from '@/utils/format-date-time'

export const Ticker = () => {
  const [initPrice, setInitPrice] = useState(0)
  const lastPrice = useBinanceTradeWebSocketStore((state) => state.lastPrice)
  const lastTradeTime = useBinanceTradeWebSocketStore(
    (state) => state.lastTradeTime
  )
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
      <p>
        {`Ticker: price = `}
        <span className={'font-bold'}>
          {`${formatNumber(lastPrice || initPrice)} `}
        </span>
        {`at `}
        <span className={'font-bold'}>
          {`${formatDateTimeFromTimestamp(lastTradeTime)}`}
        </span>
      </p>
    </div>
  )
}
