import { DbTradeStatus } from '@/stores/db-trades-store/db.trades.store.types'

export type ExcludeStatusesDropdownProps = {
  excludeStatuses: DbTradeStatus[]
  toggleIncludeStatus: ({
    status,
    value,
  }: {
    status: DbTradeStatus
    value: boolean
  }) => void
}
