/* eslint-disable react-hooks/exhaustive-deps */
import { DbTradesProps } from '@/components/db-trades/db-trades.types'
import { dbTradesTableColumns } from '@/components/db-trades/db-trades-table'
import { DataTable } from '@/components/data-table'
import { useTradeWebSocketStore } from '@/stores/trade-websocket-store'
import { formatNumber } from '@/utils/format-number'
import { useMemo } from 'react'
import { DbSide, DbTrade } from '@/stores/db-trades-store/db.trades.store.types'
import { CellContext } from '@tanstack/table-core'
import { useDbTrades } from '@/hooks/use-db-trades'

export const DbTrades = ({ trades }: DbTradesProps) => {
  const lastPrice = useTradeWebSocketStore((state) => state.lastPrice)
  const { getTrades, pagination } = useDbTrades()

  const column = useMemo(
    () => ({
      accessorKey: 'price',
      header: () => <div className={'text-left'}>{'Price'}</div>,
      cell: (row: CellContext<DbTrade, unknown>) => {
        const priceValue = row.getValue() as number
        const status = row.row.getValue('status') as string
        const isClosed = status === 'closed'
        const isPartial = status === 'partial'
        const side = row.row.getValue('side') as DbSide
        const stopLoss = row.row.getValue('stop_loss') as number
        const takeProfit = row.row.getValue('take_profit') as number
        const takeProfitPartial = row.row.getValue(
          'take_profit_partial'
        ) as number
        const price = formatNumber(priceValue)
        const profitPart = Math.round(
          (side === 'buy'
            ? (lastPrice - stopLoss) / (takeProfit - stopLoss)
            : (stopLoss - lastPrice) / (stopLoss - takeProfit)) * 100
        )

        if (!isClosed) {
          if (side === 'buy') {
            if (
              priceValue <= stopLoss ||
              priceValue >= takeProfit ||
              (!isPartial && priceValue >= takeProfitPartial)
            ) {
              console.log('Re-fetching trades...')
              getTrades(pagination.offset, pagination.limit)
            }
          }

          if (side === 'sell') {
            if (
              priceValue >= stopLoss ||
              priceValue <= takeProfit ||
              (!isPartial && priceValue <= takeProfitPartial)
            ) {
              console.log('Re-fetching trades...')
              getTrades(pagination.offset, pagination.limit)
            }
          }
        }

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
