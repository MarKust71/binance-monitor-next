import { useDbTradesStore } from '@/stores/db-trades-store'
import { getDbTrades } from '@/actions/spot/get-db-trades'

export const useDbTrades = () => {
  const trades = useDbTradesStore((state) => state.trades)
  const setTrades = useDbTradesStore((state) => state.setTrades)

  const getTrades = async (offset: number = 0, limit: number = 10) => {
    const dbTrades = await getDbTrades(offset, limit)

    setTrades(dbTrades.data)
  }

  return { trades, getTrades }
}
