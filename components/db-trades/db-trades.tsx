'use client'

import { DbTradesProps } from '@/components/db-trades/db-trades.types'
import { dbTradesTableColumns } from '@/components/db-trades/db-trades-table'
import { DataTable } from '@/components/data-table'
import { useTradeWebSocketStore } from '@/stores/trade-websocket-store'
import { useMemo } from 'react'
import { ReFetchTradesButton } from '@/components/re-fetch-trades-button'
import { ReConnectWebsocketButton } from '@/components/re-connect-websocket-button'
import { DbTradesPaginationButtons } from '@/components/db-trades/db-trades-pagination-buttons'
import { useTradeWebsocket } from '@/hooks/use-trade-websocket'
import { useMyAppWebsocket } from '@/hooks/use-my-app-websocket'
import { priceColumn } from '@/components/db-trades/custom-columns/price-column'
import { profitColumn } from '@/components/db-trades/custom-columns/profit-column'
import { ExcludeStatusesDropdown } from '@/components/db-trades/exclude-statuses-dropdown-menu'

export const DbTrades = ({ trades }: DbTradesProps) => {
  const { isConnected: isTradeWebsocketConnected } = useTradeWebsocket()
  const { isConnected: isMyAppWebsocketConnected } = useMyAppWebsocket()

  const lastPrice = useTradeWebSocketStore((state) => state.lastPrice)

  const columns = useMemo(() => {
    const columns = [...dbTradesTableColumns]
    columns[4] = priceColumn({ lastPrice })
    columns[21] = profitColumn({ lastPrice })
    return columns
  }, [lastPrice])

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
          <ExcludeStatusesDropdown />

          {trades && <DbTradesPaginationButtons />}
        </div>
      </div>

      <DataTable columns={columns} data={trades} />
    </div>
  )
}
