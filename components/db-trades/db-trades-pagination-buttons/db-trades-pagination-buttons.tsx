import { useDbTrades } from '@/hooks/use-db-trades'
import { DbTradesPaginationButton } from '@/components/db-trades/db-trades-pagination-button'

export const DbTradesPaginationButtons = () => {
  const { getTrades: getDbTrades, pagination } = useDbTrades()

  return (
    <div className={'flex justify-end gap-1'}>
      <DbTradesPaginationButton
        disabled={pagination.offset === 0}
        onClick={() => getDbTrades(0)}
      >
        {'|<'}
      </DbTradesPaginationButton>

      <DbTradesPaginationButton
        disabled={pagination.offset === 0}
        onClick={() =>
          getDbTrades(Math.max(pagination.offset - pagination.limit, 0))
        }
      >
        {'<'}
      </DbTradesPaginationButton>

      <DbTradesPaginationButton
        disabled={!pagination.has_next}
        onClick={() =>
          getDbTrades(
            Math.min(
              pagination.offset + pagination.limit,
              Math.floor(pagination.total / pagination.limit) * pagination.limit
            )
          )
        }
      >
        {'>'}
      </DbTradesPaginationButton>

      <DbTradesPaginationButton
        disabled={!pagination.has_next}
        onClick={() =>
          getDbTrades(
            Math.floor(pagination.total / pagination.limit) * pagination.limit
          )
        }
      >
        {'>|'}
      </DbTradesPaginationButton>
    </div>
  )
}
