/* eslint-disable react-hooks/exhaustive-deps */
import { useDbTradesStore } from '@/stores/db-trades-store'
import { fetchDbTrades } from '@/actions/spot/fetch-db-trades'
import { useEffect } from 'react'

export const useDbTrades = () => {
  const trades = useDbTradesStore((state) => state.trades)
  const pagination = useDbTradesStore((state) => state.pagination)
  const isFetching = useDbTradesStore((state) => state.isFetching)
  const queryParams = useDbTradesStore((state) => state.queryParams)
  const setTrades = useDbTradesStore((state) => state.setTrades)
  const setPagination = useDbTradesStore((state) => state.setPagination)
  const setIsFetching = useDbTradesStore((state) => state.setIsFetching)
  const setQueryParams = useDbTradesStore((state) => state.setQueryParams)

  const getDbTrades = async () => {
    const { offset, limit } = useDbTradesStore.getState().pagination
    const queryParams = useDbTradesStore.getState().queryParams
    const isFetching = useDbTradesStore.getState().isFetching

    if (!isFetching) {
      setIsFetching(true)
      const dbTrades = await fetchDbTrades(offset, limit, queryParams)
      setIsFetching(false)

      setPagination(dbTrades.pagination)
      setTrades(dbTrades.data)
    }
  }

  useEffect(() => {
    getDbTrades()
  }, [queryParams, pagination.offset, pagination.limit])

  return {
    getDbTrades,
    isFetching,
    pagination,
    queryParams,
    setPagination,
    setQueryParams,
    trades,
  }
}
