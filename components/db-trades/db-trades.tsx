import { DbTradesProps } from '@/components/db-trades/db-trades.types'
import { dbTradesTableColumns } from '@/components/db-trades/db-trades-table'
import { DataTable } from '@/components/data-table'
import { useWebSocketStore } from '@/stores/websocket-store'
import { formatNumber } from '@/utils/format-number'
import { useMemo } from 'react'
import { DbTrade } from '@/stores/db-trades-store/db.trades.store.types'
import { CellContext } from '@tanstack/table-core'

export const DbTrades = ({ trades }: DbTradesProps) => {
  const lastPrice = useWebSocketStore((state) => state.lastPrice)

  const column = useMemo(
    () => ({
      accessorKey: 'price',
      header: () => <div className={'text-left'}>{'Price'}</div>,
      cell: (row: CellContext<DbTrade, unknown>) => {
        const priceValue = row.getValue() as number
        const isClosed = row.row.getValue('is_closed') as boolean
        const price = formatNumber(priceValue)
        if (isClosed) {
          return <div>{price}</div>
        } else {
          return (
            <div
              className={`${
                lastPrice > priceValue ? 'bg-red-100' : 'bg-green-200'
              }`}
            >
              {price}
            </div>
          )
        }
      },
    }),
    [lastPrice]
  )

  const columns = useMemo(() => {
    const columns = [...dbTradesTableColumns]
    columns[4] = column
    return columns
  }, [column])

  return (
    <div className={'my-2'}>
      <h3 className={'text-lg font-semibold'}>DB Trades</h3>

      <DataTable columns={columns} data={trades} />
      {/*<pre>{JSON.stringify(trades, null, 2)}</pre>*/}
    </div>
  )
}
