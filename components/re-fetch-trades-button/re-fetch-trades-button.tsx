import { Button } from '@/components/ui/button'
import { useDbTrades } from '@/hooks/use-db-trades'
import { useBinanceTrades } from '@/hooks/use-binance-trades'
import { useMemo } from 'react'

const SYMBOL = 'ETHUSDT'

export const ReFetchTradesButton = () => {
  const { getTrades, isFetching: isFetchingTrades } = useBinanceTrades()
  const { getDbTrades, isFetching: isFetchingDbTrades } = useDbTrades()

  const isFetching = useMemo(
    () => isFetchingTrades || isFetchingDbTrades,
    [isFetchingTrades, isFetchingDbTrades]
  )

  const handleClick = async () => {
    await getTrades(SYMBOL)
    await getDbTrades({})
  }

  return (
    <Button onClick={handleClick} disabled={isFetching}>
      {isFetching ? 'Fetching...' : 'Re-fetch trades'}
    </Button>
  )
}
