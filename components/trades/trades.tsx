import { tradesTableColumns } from './trades-table'
import { TradesProps } from './trades.types'
import { DataTable } from '@/components/data-table'

export const Trades = ({ trades }: TradesProps) => {
  return (
    <div className={'my-2'}>
      <h3 className={'text-lg font-semibold'}>Binance Trades</h3>

      <DataTable columns={tradesTableColumns} data={trades} />
    </div>
  )
}
