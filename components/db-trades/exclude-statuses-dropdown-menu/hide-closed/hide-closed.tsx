'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { useDbTrades } from '@/hooks/use-db-trades'
import { useMemo } from 'react'

export const HideClosed = () => {
  const {
    queryParams: { excludeStatuses },
    setQueryParams,
  } = useDbTrades()

  const checked = useMemo(
    () => excludeStatuses?.includes('closed'),
    [excludeStatuses]
  )

  const handleClick = () => {
    if (!excludeStatuses) return

    let newExcludeStatuses = [...excludeStatuses]

    if (checked) {
      newExcludeStatuses = newExcludeStatuses.filter((s) => s !== 'closed')
    } else {
      if (!newExcludeStatuses.includes('closed')) {
        newExcludeStatuses.push('closed')
      }
    }

    setQueryParams({ excludeStatuses: newExcludeStatuses })
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" checked={checked} onClick={handleClick} />

      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Hide closed
      </label>
    </div>
  )
}
