/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { DbTradesProps } from '@/components/db-trades/db-trades.types'
import { dbTradesTableColumns } from '@/components/db-trades/db-trades-table'
import { DataTable } from '@/components/data-table'
import { useTradeWebSocketStore } from '@/stores/trade-websocket-store'
import { formatNumber } from '@/utils/format-number'
import { useMemo } from 'react'
import {
  DbSide,
  DbTrade,
  DbTradeStatus,
} from '@/stores/db-trades-store/db.trades.store.types'
import { CellContext } from '@tanstack/table-core'
import { ReFetchTradesButton } from '@/components/re-fetch-trades-button'
import { ReConnectWebsocketButton } from '@/components/re-connect-websocket-button'
import { DbTradesPaginationButtons } from '@/components/db-trades/db-trades-pagination-buttons'
import { useTradeWebsocket } from '@/hooks/use-trade-websocket'
import { useMyAppWebsocket } from '@/hooks/use-my-app-websocket'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useDbTrades } from '@/hooks/use-db-trades'

const statuses: DbTradeStatus[] = [
  'open',
  'partial',
  'safe',
  'take_profit',
  'closed',
  'none',
]

export const DbTrades = ({ trades }: DbTradesProps) => {
  const { isConnected: isTradeWebsocketConnected } = useTradeWebsocket()
  const { isConnected: isMyAppWebsocketConnected } = useMyAppWebsocket()

  const {
    queryParams: { excludeStatuses },
    setQueryParams,
  } = useDbTrades()

  const lastPrice = useTradeWebSocketStore((state) => state.lastPrice)

  const priceColumn = useMemo(
    () => ({
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
    }),
    [lastPrice]
  )

  const profitColumn = useMemo(
    () => ({
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
    }),
    [lastPrice]
  )

  const columns = useMemo(() => {
    const columns = [...dbTradesTableColumns]
    columns[4] = priceColumn
    columns[21] = profitColumn
    return columns
  }, [priceColumn])

  const toggleIncludeStatus = ({
    status,
    value,
  }: {
    status: DbTradeStatus
    value: boolean
  }) => {
    if (!excludeStatuses) return

    let newExcludeStatuses = [...excludeStatuses]

    if (value) {
      // Chcemy **uwzględnić** ten status => usuwamy go z wykluczonych
      newExcludeStatuses = newExcludeStatuses.filter((s) => s !== status)
    } else {
      // Chcemy **wykluczyć** ten status => dodajemy go, jeśli jeszcze go nie ma
      if (!newExcludeStatuses.includes(status)) {
        newExcludeStatuses.push(status)
      }
    }

    setQueryParams({ excludeStatuses: newExcludeStatuses })
  }

  return (
    <div className={'my-2'}>
      <h3 className={'text-lg font-semibold'}>DB Trades</h3>

      <div className={'flex flex-row justify-between mb-2'}>
        <div className={'flex flex-row items-center justify-start gap-2'}>
          <ReFetchTradesButton />

          {(!isTradeWebsocketConnected || !isMyAppWebsocketConnected) && (
            <ReConnectWebsocketButton
              disabled={isTradeWebsocketConnected && isMyAppWebsocketConnected}
            />
          )}
        </div>

        <div className={'w-full flex flex-row justify-end gap-4'}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Included statuses
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {statuses.map((status) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={status}
                    className=""
                    checked={!excludeStatuses?.includes(status)}
                    onCheckedChange={(value) =>
                      toggleIncludeStatus({ status, value })
                    }
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {trades && <DbTradesPaginationButtons />}
        </div>
      </div>

      <DataTable columns={columns} data={trades} />
    </div>
  )
}
