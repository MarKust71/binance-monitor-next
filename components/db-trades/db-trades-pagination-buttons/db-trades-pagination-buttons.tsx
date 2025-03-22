import { useDbTrades } from '@/hooks/use-db-trades'
import { DbTradesPaginationButton } from '@/components/db-trades/db-trades-pagination-button'

export const DbTradesPaginationButtons = () => {
  const { getDbTrades, pagination } = useDbTrades()

  return (
    <div className={'flex flex-row justify-end gap-1'}>
      <DbTradesPaginationButton
        disabled={pagination.offset === 0}
        onClick={() => getDbTrades({ offset: 0 })}
      >
        {'|<'}
      </DbTradesPaginationButton>

      <DbTradesPaginationButton
        disabled={pagination.offset === 0}
        onClick={() =>
          getDbTrades({
            offset: Math.max(pagination.offset - pagination.limit, 0),
          })
        }
      >
        {'<'}
      </DbTradesPaginationButton>

      <DbTradesPaginationButton
        disabled={!pagination.has_next}
        onClick={() =>
          getDbTrades({
            offset: Math.min(
              pagination.offset + pagination.limit,
              Math.floor(pagination.total / pagination.limit) * pagination.limit
            ),
          })
        }
      >
        {'>'}
      </DbTradesPaginationButton>

      <DbTradesPaginationButton
        disabled={!pagination.has_next}
        onClick={() =>
          getDbTrades({
            offset:
              Math.floor(pagination.total / pagination.limit) *
              pagination.limit,
          })
        }
      >
        {'>|'}
      </DbTradesPaginationButton>
    </div>
  )
}
