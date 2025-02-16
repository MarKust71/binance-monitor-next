import { DbTradesProps } from '@/components/db-trades/db-trades.types'
import { dbTradesTableColumns } from '@/components/db-trades/db-trades-table'
import { DataTable } from '@/components/data-table'
import { useWebSocketStore } from '@/stores/websocket-store'
import { formatNumber } from '@/utils/format-number'
import { useMemo } from 'react'
import { DbSide, DbTrade } from '@/stores/db-trades-store/db.trades.store.types'
import { CellContext } from '@tanstack/table-core'

export const DbTrades = ({ trades }: DbTradesProps) => {
  const lastPrice = useWebSocketStore((state) => state.lastPrice)

  const column = useMemo(
    () => ({
      accessorKey: 'price',
      header: () => <div className={'text-left'}>{'Price'}</div>,
      cell: (row: CellContext<DbTrade, unknown>) => {
        const priceValue = row.getValue() as number
        // const isClosed = row.row.getValue('is_closed') as boolean
        const status = row.row.getValue('status') as string
        const side = row.row.getValue('side') as DbSide
        const stopLoss = row.row.getValue('stop_loss') as number
        const takeProfit = row.row.getValue('take_profit') as number
        const price = formatNumber(priceValue)
        const profitPart = Math.round(
          (side === 'buy'
            ? (lastPrice - stopLoss) / (takeProfit - stopLoss)
            : (stopLoss - lastPrice) / (stopLoss - takeProfit)) * 100
        )

        if (status === 'closed') {
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
