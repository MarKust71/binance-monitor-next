'use client'

import { dbTradesTableColumns } from '@/components/db-trades/db-trades-table'
import { DataTable } from '@/components/data-table'
import { useBinanceTradeWebSocketStore } from '@/stores/binance-trade-websocket-store'
import { useMemo } from 'react'
import { ReFetchTradesButton } from '@/components/re-fetch-trades-button'
import { ReConnectWebsocketButton } from '@/components/re-connect-websocket-button'
import { DbTradesPaginationButtons } from '@/components/db-trades/db-trades-pagination-buttons'
import { useBinanceTradeWebsocket } from '@/hooks/use-binance-trade-websocket'
import { useMyAppWebsocket } from '@/hooks/use-my-app-websocket'
import { priceColumn } from '@/components/db-trades/custom-columns/price-column'
import { profitColumn } from '@/components/db-trades/custom-columns/profit-column'
import { HideClosed } from '@/components/db-trades/exclude-statuses-dropdown-menu/hide-closed'
import { useDbTrades } from '@/hooks/use-db-trades'

export const DbTrades = () => {
  const { isConnected: isTradeWebsocketConnected } = useBinanceTradeWebsocket()
  const { isConnected: isMyAppWebsocketConnected } = useMyAppWebsocket()
  const { trades } = useDbTrades()

  const lastPrice = useBinanceTradeWebSocketStore((state) => state.lastPrice)

  const isConnected = useMemo(
    () => isTradeWebsocketConnected && isMyAppWebsocketConnected,
    [isTradeWebsocketConnected, isMyAppWebsocketConnected]
  )

  const columns = useMemo(() => {
    const columns = [...dbTradesTableColumns]
    columns[4] = priceColumn({ lastPrice })
    columns[21] = profitColumn({ lastPrice })

    return columns
  }, [lastPrice])

  return (
    <header className={'my-2'}>
      <h3 className={'text-lg font-semibold'}>DB Trades</h3>

      <div className={'flex flex-row justify-between mb-2'}>
        <section className={'flex flex-row items-center justify-start gap-2'}>
          <ReFetchTradesButton />

          {!isConnected && <ReConnectWebsocketButton disabled={isConnected} />}
        </section>

        {trades && (
          <section className={'w-full flex flex-row justify-end gap-4'}>
            {/*<ExcludeStatusesDropdown />*/}
            <HideClosed />

            <DbTradesPaginationButtons />
          </section>
        )}
      </div>

      <DataTable columns={columns} data={trades} />
    </header>
  )
}
