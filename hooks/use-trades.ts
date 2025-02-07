import { useTradesStore } from '@/stores/trades-store'
import { getMyTrades } from '@/actions/spot/get-my-trades'
import { ParsedTrade, parseTrade } from '@/utils'
import { getOrder } from '@/actions/spot/get-order'

export const useTrades = () => {
  const trades = useTradesStore((state) => state.trades)
  const setTrades = useTradesStore((state) => state.setTrades)

  const getTrades = async (symbol: string) => {
    const myTrades = await getMyTrades(symbol)

    const parsedTrades = myTrades.map((trade) => parseTrade(trade))

    const orders = await Promise.all(
      parsedTrades.map((trade: ParsedTrade) =>
        getOrder(trade.symbol as string, { orderId: trade.orderId })
      )
    )

    const sides = orders.map((order) => ({
      orderId: order.orderId,
      side: order.side,
    }))

    const parsedTradesWithSides = parsedTrades.map(
      (trade: ParsedTrade, index: number) => ({
        ...trade,
        side: sides[index].side,
      })
    )

    setTrades(parsedTradesWithSides as ParsedTrade[])
  }

  return { trades, getTrades }
}
