import { Button } from '@/components/ui/button'
import { getDbTrades } from '@/actions/spot/get-db-trades'
import { getTrades } from '@/actions/spot/get-trades'

const SYMBOL = 'ETHUSDT'

export const ReFetchTradesButton = () => {
  const handleClick = () => {
    getTrades(SYMBOL)
    getDbTrades()
  }

  return <Button onClick={handleClick}>Re-fetch trades</Button>
}
