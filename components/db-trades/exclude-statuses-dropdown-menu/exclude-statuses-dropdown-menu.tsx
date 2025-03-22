import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  // DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
  DbTradeStatus,
  dbTradeStatuses,
} from '@/stores/db-trades-store/db.trades.store.types'
import { useDbTradesStore } from '@/stores/db-trades-store'

export const ExcludeStatusesDropdown = ({}) => {
  // TODO: find out why this doesn't work
  // const {
  //   queryParams: { excludeStatuses },
  //   setQueryParams,
  // } = useDbTrades()
  const {
    queryParams: { excludeStatuses },
    setQueryParams,
  } = useDbTradesStore()

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
    <DropdownMenu>
      {/*<DropdownMenuTrigger asChild>*/}
      <Button variant="outline" className="ml-auto">
        Included statuses
      </Button>
      {/*</DropdownMenuTrigger>*/}

      <DropdownMenuContent align="end">
        {dbTradeStatuses.map((status) => {
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
  )
}
