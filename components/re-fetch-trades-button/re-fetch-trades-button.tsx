import { Button } from '@/components/ui/button'
import { useDbTrades } from '@/hooks/use-db-trades'
import { useTrades } from '@/hooks/use-trades'

const SYMBOL = 'ETHUSDT'

export const ReFetchTradesButton = () => {
  const { getTrades, isFetching: isFetchingTrades } = useTrades()
  const {
    getTrades: getDbTrades,
    pagination,
    isFetching: isFetchingDbTrades,
  } = useDbTrades()

  const handleClick = () => {
    getTrades(SYMBOL)
    getDbTrades(pagination.offset, pagination.limit)
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isFetchingTrades || isFetchingDbTrades}
    >
      {isFetchingTrades || isFetchingDbTrades
        ? 'Fetching...'
        : 'Re-fetch trades'}
    </Button>
  )
}
