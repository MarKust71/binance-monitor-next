import { DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu'
import {
  DbTradeStatus,
  dbTradeStatuses,
} from '@/stores/db-trades-store/db.trades.store.types'
import { useDbTrades } from '@/hooks/use-db-trades'

export const DropdownMenuCheckboxItems = () => {
  const {
    queryParams: { excludeStatuses },
    setQueryParams,
  } = useDbTrades()

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
    <>
      {dbTradeStatuses.map((status: DbTradeStatus) => {
        return (
          <DropdownMenuCheckboxItem
            key={status}
            className=""
            checked={!excludeStatuses?.includes(status)}
            onCheckedChange={(value) => toggleIncludeStatus({ status, value })}
          >
            {status}
          </DropdownMenuCheckboxItem>
        )
      })}
    </>
  )
}
