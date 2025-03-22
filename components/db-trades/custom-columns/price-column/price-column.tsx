import { CellContext } from '@tanstack/table-core'
import {
  DbSide,
  DbTrade,
  DbTradeStatus,
} from '@/stores/db-trades-store/db.trades.store.types'
import { formatNumber } from '@/utils/format-number'
import { PriceColumnProps } from '@/components/db-trades/custom-columns/price-column/price-column.types'

export const priceColumn = ({ lastPrice }: PriceColumnProps) => ({
  accessorKey: 'price',
  header: () => <div className={'text-left'}>{'Price'}</div>,
  cell: (row: CellContext<DbTrade, unknown>) => {
    const priceValue = row.getValue() as number
    const status = row.row.getValue('status') as DbTradeStatus
    const isClosed = status === 'closed'
    const side = row.row.getValue('side') as DbSide
    const stopLoss = row.row.getValue('stop_loss') as number
    const takeProfit = row.row.getValue('take_profit') as number
    const price = formatNumber(priceValue)
    const profitPart = Math.round(
      (side === 'buy'
        ? (lastPrice - stopLoss) / (takeProfit - stopLoss)
        : (stopLoss - lastPrice) / (stopLoss - takeProfit)) * 100
    )

    if (isClosed) {
      return <div>{price}</div>
    } else {
      return (
        <div className={'relative'}>
          <div className={'absolute flex inset-0 z-0 w-full'}>
            <div
              style={{ width: `${profitPart}%` }}
              className={'bg-green-200'}
            />
            <div
              style={{ width: `${100 - profitPart}%` }}
              className={'bg-red-100'}
            />
          </div>
          <div className={'relative z-10'}>{price}</div>
        </div>
      )
    }
  },
})
