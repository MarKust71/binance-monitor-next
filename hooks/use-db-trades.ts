/* eslint-disable react-hooks/exhaustive-deps */
import { useDbTradesStore } from '@/stores/db-trades-store'
import { fetchDbTrades } from '@/actions/spot/fetch-db-trades'
import { GetDbTradesParams } from './use-db-trades.types'
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

  useEffect(() => {
    getDbTrades({
      offset: pagination.offset,
      limit: pagination.limit,
      customQueryParams: queryParams,
    })
  }, [queryParams])

  // useEffect(() => {
  //   console.log({ isFetching })
  // }, [isFetching])

  return {
    trades,
    getDbTrades,
    pagination,
    isFetching,
    queryParams,
    setQueryParams,
  }
}
