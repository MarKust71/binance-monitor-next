import { LIMIT, OFFSET, useDbTradesStore } from '@/stores/db-trades-store'
import { getDbTrades } from '@/actions/spot/get-db-trades'

export const useDbTrades = () => {
  const trades = useDbTradesStore((state) => state.trades)
  const pagination = useDbTradesStore((state) => state.pagination)
  const isFetching = useDbTradesStore((state) => state.isFetching)
  const setTrades = useDbTradesStore((state) => state.setTrades)
  const setPagination = useDbTradesStore((state) => state.setPagination)
  const setIsFetching = useDbTradesStore((state) => state.setIsFetching)

  const getTrades = async (offset: number = OFFSET, limit: number = LIMIT) => {
    setIsFetching(true)
    const dbTrades = await getDbTrades(offset, limit)
    setIsFetching(false)

    setTrades(dbTrades.data)
    setPagination(dbTrades.pagination)
  }

  return { trades, getTrades, pagination, isFetching }
}
