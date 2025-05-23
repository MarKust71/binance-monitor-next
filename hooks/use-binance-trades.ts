import { useBinanceTradesStore } from '@/stores/binance-trades-store'
import { getBinanceMyTrades } from '@/actions/spot/get-binance-my-trades'
import { ParsedBinanceTrade, parseBinanceTrade } from '@/utils'
import { getBinanceOrder } from '@/actions/spot/get-binance-order'

export const useBinanceTrades = () => {
  const trades = useBinanceTradesStore((state) => state.trades)
  const isFetching = useBinanceTradesStore((state) => state.isFetching)

  const setIsFetching = useBinanceTradesStore((state) => state.setIsFetching)
  const setTrades = useBinanceTradesStore((state) => state.setTrades)
  const calculateProfit = useBinanceTradesStore(
    (state) => state.calculateProfit
  )

  const getTrades = async (symbol: string) => {
    setIsFetching(true)

    const myTrades = await getBinanceMyTrades(symbol)
    setIsFetching(false)

    const parsedTrades = myTrades.map((trade) => parseBinanceTrade(trade))

    const orders = await Promise.all(
      parsedTrades.map((trade: ParsedBinanceTrade) =>
        getBinanceOrder(trade.symbol as string, { orderId: trade.orderId })
      )
    )

    const sides = orders.map((order) => ({
      orderId: order.orderId,
      side: order.side,
    }))

    const parsedTradesWithSides = parsedTrades.map(
      (trade: ParsedBinanceTrade, index: number) => ({
        ...trade,
        side: sides[index].side,
      })
    )

    setTrades(parsedTradesWithSides as ParsedBinanceTrade[])
  }

  return { trades, getTrades, isFetching, calculateProfit }
}
