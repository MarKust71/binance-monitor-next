import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  // TODO: uncomment
  // DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { dbTradeStatuses } from '@/stores/db-trades-store/db.trades.store.types'
import { ExcludeStatusesDropdownProps } from '@/components/db-trades/exclude-statuses-dropdown-menu/exclude-statuses-dropdown-menu.types'

export const ExcludeStatusesDropdown = ({
  excludeStatuses,
  toggleIncludeStatus,
}: ExcludeStatusesDropdownProps) => (
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
            checked={!excludeStatuses.includes(status)}
            onCheckedChange={(value) => toggleIncludeStatus({ status, value })}
          >
            {status}
          </DropdownMenuCheckboxItem>
        )
      })}
    </DropdownMenuContent>
  </DropdownMenu>
)
