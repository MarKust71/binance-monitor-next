import { tradesTableColumns } from './trades-table'
import { DataTable } from '@/components/data-table'
import { useBinanceTrades } from '@/hooks/use-binance-trades'

export const BinanceTrades = () => {
  const { trades } = useBinanceTrades()

  return (
    <div className={'my-2'}>
      <h3 className={'text-lg font-semibold'}>Binance Trades</h3>

      <DataTable columns={tradesTableColumns} data={trades} />
    </div>
  )
}
