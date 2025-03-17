import { useDbTradesStore } from '@/stores/db-trades-store'
import { fetchDbTrades } from '@/actions/spot/fetch-db-trades'
import { GetDbTradesParams } from './use-db-trades.types'

export const useDbTrades = () => {
  const trades = useDbTradesStore((state) => state.trades)
  const pagination = useDbTradesStore((state) => state.pagination)
  const isFetching = useDbTradesStore((state) => state.isFetching)
  const setTrades = useDbTradesStore((state) => state.setTrades)
  const setPagination = useDbTradesStore((state) => state.setPagination)
  const setIsFetching = useDbTradesStore((state) => state.setIsFetching)

  const getDbTrades = async ({ offset, limit }: GetDbTradesParams) => {
    if (!isFetching) {
      setIsFetching(true)
      const dbTrades = await fetchDbTrades(
        offset ?? pagination.offset,
        limit ?? pagination.limit
      )
      setIsFetching(false)

      setTrades(dbTrades.data)
      setPagination(dbTrades.pagination)
    }
  }

  return { trades, getDbTrades, pagination, isFetching }
}
