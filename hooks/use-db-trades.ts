import { LIMIT, OFFSET, useDbTradesStore } from '@/stores/db-trades-store'
import { getDbTrades } from '@/actions/spot/get-db-trades'

export const useDbTrades = () => {
  const trades = useDbTradesStore((state) => state.trades)
  const pagination = useDbTradesStore((state) => state.pagination)
  const setTrades = useDbTradesStore((state) => state.setTrades)
  const setPagination = useDbTradesStore((state) => state.setPagination)

  const getTrades = async (offset: number = OFFSET, limit: number = LIMIT) => {
    const dbTrades = await getDbTrades(offset, limit)

    setTrades(dbTrades.data)
    setPagination(dbTrades.pagination)
  }

  return { trades, getTrades, pagination }
}
