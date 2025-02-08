import { Button } from '@/components/ui/button'
import { useDbTrades } from '@/hooks/use-db-trades'
import { useTrades } from '@/hooks/use-trades'

const SYMBOL = 'ETHUSDT'

export const ReFetchTradesButton = () => {
  const { getTrades } = useTrades()
  const { getTrades: getDbTrades, pagination } = useDbTrades()

  const handleClick = () => {
    getTrades(SYMBOL)
    getDbTrades(pagination.offset, pagination.limit)
  }

  return <Button onClick={handleClick}>Re-fetch trades</Button>
}
