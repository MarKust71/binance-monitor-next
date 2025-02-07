export type Account = {
  makerCommission: number // 15
  takerCommission: number // 15
  buyerCommission: number // 0
  sellerCommission: number // 0
  commissionRates: {
    maker: string // '0.00150000'
    taker: string // '0.00150000'
    buyer: string // '0.00000000'
    seller: string // '0.00000000'
  }
  canTrade: boolean // true
  canWithdraw: boolean // true
  canDeposit: boolean // true
  brokered: boolean // false
  requireSelfTradePrevention: boolean // false
  preventSor: boolean // false
  updateTime: number // 123456789
  accountType: string // 'SPOT'
  balances: [
    {
      asset: string // 'BTC'
      free: string // '4723846.89208129'
      locked: string // '0.00000000'
    },
    {
      asset: string // 'LTC'
      free: string // '4763368.68006011'
      locked: string // '0.00000000'
    },
  ]
  permissions: string[] // ['SPOT']
  uid: number // 354937868
}
