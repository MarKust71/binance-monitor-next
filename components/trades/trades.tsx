import { ParsedTrade } from '@/utils/parse-trade/parse-trade.types'
import { TradesTable } from './trades-table'
import { tradesTableColumns } from './trades-table'

type TradesProps = {
  trades: ParsedTrade[]
}

export const Trades = ({ trades }: TradesProps) => {
  return (
    <div className={'my-2'}>
      <TradesTable columns={tradesTableColumns} data={trades} />
    </div>
  )
}
