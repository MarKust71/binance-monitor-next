import { CellContext } from '@tanstack/table-core'
import { DbSide, DbTrade } from '@/stores/db-trades-store/db.trades.store.types'
import { formatNumber } from '@/utils/format-number'
import { ProfitColumnProps } from '@/components/db-trades/custom-columns/profit-column/profit-column.types'

export const profitColumn = ({ lastPrice }: ProfitColumnProps) => ({
  accessorKey: 'profit',
  header: () => <div className={'text-right'}>{'Profit'}</div>,
  cell: (row: CellContext<DbTrade, unknown>) => {
    const value = row.getValue() as number
    const rest = row.row.getValue('rest_quantity') as number
    const openPrice = row.row.getValue('price') as number
    const side = row.row.getValue('side') as DbSide
    const profit =
      value + rest * (side === 'buy' ? 1 : -1) * (lastPrice - openPrice)
    const isNegative = profit < 0
    return (
      <div
        className={`font-bold text-right ${isNegative ? 'text-red-500' : 'text-green-600'}`}
      >
        {formatNumber(profit)}
      </div>
    )
  },
})
