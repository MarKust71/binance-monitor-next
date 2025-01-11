'use client'

import { useEffect, useState } from 'react'
import { account } from '@/actions/spot/account'
import { getMyTrades } from '@/actions/spot/get-my-trades'

type Trade = Record<string, string>

// const wss = process.env.NEXT_PUBLIC_BINANCE_SPOT_API_WSS
const wss = process.env.NEXT_PUBLIC_BINANCE_SPOT_TEST_API_WSS

const symbol = 'ETHUSDT'
const ws = new WebSocket(wss + `/ws/${symbol.toLowerCase()}@trade`)

ws.onopen = () => {
  console.log('connected')
}

ws.onclose = () => {
  console.log('disconnected')
}

export default function Spot() {
  const [trade, setTrade] = useState<Trade>()
  const [myTrades, setMyTrades] = useState()

  ws.onmessage = (message) => {
    // console.log(JSON.parse(message.data))
    setTrade(JSON.parse(message.data))
  }

  useEffect(() => {
    const info = async () => {
      console.log('account...')
      const accountInfo = await account()
      console.log('account', accountInfo)

      console.log('myTrades...')
      const trades = await getMyTrades('ETHUSDT')
      console.log('trades', trades)
      setMyTrades(trades)
    }
    info()

    return () => {
      ws.close()
    }
  }, [])

  return (
    <>
      <h1>Spot</h1>
      <p>Ticker: price={trade?.p}</p>
      <p>Trades: {JSON.stringify(myTrades)}</p>
    </>
  )
}
