import { TradesTable } from './trades-table'
import { tradesTableColumns } from './trades-table'
import { Button } from '@/components/ui/button'
import { TradesProps } from './trades.types'
import { useTrades } from '@/hooks/use-trades'

const SYMBOL = 'ETHUSDT'

export const Trades = ({ trades }: TradesProps) => {
  const { getTrades } = useTrades()

  return (
    <>
      <div className={'my-2'}>
        <TradesTable columns={tradesTableColumns} data={trades} />
      </div>

      <Button onClick={() => getTrades(SYMBOL)}>Re-fetch trades</Button>
    </>
  )
}
