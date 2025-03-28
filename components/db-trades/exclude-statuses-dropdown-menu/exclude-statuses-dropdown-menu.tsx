import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { DropdownMenuCheckboxItems } from '@/components/db-trades/exclude-statuses-dropdown-menu/dropdown-menu-checkbox-items'

export const ExcludeStatusesDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Included statuses
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItems />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
