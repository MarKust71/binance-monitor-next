import { useDbTradesStore } from '@/stores/db-trades-store'
import { fetchDbTrades } from '@/actions/spot/fetch-db-trades'
import { GetDbTradesParams } from './use-db-trades.types'

export const useDbTrades = () => {
  const trades = useDbTradesStore((state) => state.trades)
  const pagination = useDbTradesStore((state) => state.pagination)
  const isFetching = useDbTradesStore((state) => state.isFetching)
  const queryParams = useDbTradesStore((state) => state.queryParams)
  const setTrades = useDbTradesStore((state) => state.setTrades)
  const setPagination = useDbTradesStore((state) => state.setPagination)
  const setIsFetching = useDbTradesStore((state) => state.setIsFetching)
  const setQueryParams = useDbTradesStore((state) => state.setQueryParams)

  const getDbTrades = async ({
    offset,
    limit,
    customQueryParams,
  }: GetDbTradesParams) => {
    if (!isFetching) {
      setIsFetching(true)
      const dbTrades = await fetchDbTrades(
        offset ?? pagination.offset,
        limit ?? pagination.limit,
        customQueryParams ?? queryParams
      )
      setIsFetching(false)

      setTrades(dbTrades.data)
      setPagination(dbTrades.pagination)
      setQueryParams(customQueryParams ?? queryParams)
    }
  }

  return { trades, getDbTrades, pagination, isFetching }
}
