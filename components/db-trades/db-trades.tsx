import { DbTradesProps } from '@/components/db-trades/db-trades.types'
import { dbTradesTableColumns } from '@/components/db-trades/db-trades-table'
import { DataTable } from '@/components/data-table'

export const DbTrades = ({ trades }: DbTradesProps) => {
  return (
    <div className={'my-2'}>
      <h3 className={'text-lg font-semibold'}>DB Trades</h3>

      <DataTable columns={dbTradesTableColumns} data={trades} />
      {/*<pre>{JSON.stringify(trades, null, 2)}</pre>*/}
    </div>
  )
}
