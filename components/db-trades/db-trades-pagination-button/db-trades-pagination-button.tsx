import { Button } from '@/components/ui/button'
import { DbTradesPaginationButtonTypes } from '@/components/db-trades/db-trades-pagination-button/db-trades-pagination-button.types'

export const DbTradesPaginationButton = ({
  children,
  disabled,
  onClick,
}: DbTradesPaginationButtonTypes) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className={
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      }
    >
      {children}
    </Button>
  )
}
