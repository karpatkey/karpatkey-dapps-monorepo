export const TITLE = 'karpatkey'

export const NONE = 'None'

export const ALLOWED_REPORTS: { reportName: Report; fileName: string }[] = [
  {
    reportName: 'getTreasuryFinancialMetrics' as unknown as Report,
    fileName: 'treasury-financial-metrics'
  },
  {
    reportName: 'getTokens' as unknown as Report,
    fileName: 'tokens'
  },
  {
    reportName: 'getTreasuryVariationMetricsDetail' as unknown as Report,
    fileName: 'treasury-variation-metrics-detail'
  },
  {
    reportName: 'getTreasuryFinancialPositions' as unknown as Report,
    fileName: 'treasury-financial-positions'
  },
  {
    reportName: 'getTreasuryHistoricVariation' as unknown as Report,
    fileName: 'treasury-historic-variation'
  },
  {
    reportName: 'getFinancialMetricAndVarDetail' as unknown as Report,
    fileName: 'financial-metric-and-var-detail'
  }
]

export type CHAIN = {
  id: number
  name: string
  short: string
  explorer: string
  logo: string
}

export type DAO_ADDRESS = {
  address: string
  chainId: number
  isSafe: boolean
}

export interface FILTER_DAO {
  id: number
  name: string
  icon: string
  keyName: DAO_NAME
  sinceMonth: number
  sinceYear: number
  addresses: DAO_ADDRESS[]
}

export const CHAINS: CHAIN[] = [
  {
    id: 1,
    name: 'Ethereum',
    short: 'eth',
    explorer: 'https://etherscan.io/address',
    logo: '/images/chains/ethereum.svg'
  },
  {
    id: 100,
    name: 'Gnosis Chain',
    short: 'gno',
    explorer: 'https://gnosisscan.io/address',
    logo: '/images/chains/gnosis.svg'
  }
]

export const enum DAO_NAME_KEY {
  'Gnosis DAO' = 0,
  'Gnosis LTD' = 1,
  'Balancer DAO' = 2,
  'ENS DAO' = 3,
  'CoW DAO' = 4,
  'karpatkey DAO' = 5,
  'Gnosis Guild' = 6,
  'Lido' = 7
}

export const FILTER_DAOS: FILTER_DAO[] = [
  {
    id: DAO_NAME_KEY['Gnosis DAO'],
    name: 'Gnosis',
    icon: '/images/protocols/gnosis.svg',
    keyName: 'Gnosis DAO',
    sinceMonth: 1,
    sinceYear: 2023,
    addresses: [
      {
        address: '0x849d52316331967b6ff1198e5e32a0eb168d039d',
        chainId: 1,
        isSafe: true
      },
      {
        address: '0x458cd345b4c05e8df39d0a07220feb4ec19f5e6f',
        chainId: 100,
        isSafe: true
      }
    ]
  },
  {
    id: DAO_NAME_KEY['Balancer DAO'],
    name: 'Balancer',
    icon: '/images/protocols/balancer.svg',
    keyName: 'Balancer DAO',
    sinceMonth: 2,
    sinceYear: 2023,
    addresses: [
      {
        address: '0x0efccbb9e2c09ea29551879bd9da32362b32fc89',
        chainId: 1,
        isSafe: true
      }
    ]
  },
  {
    id: DAO_NAME_KEY['ENS DAO'],
    name: 'ENS',
    icon: '/images/protocols/ens.svg',
    keyName: 'ENS DAO',
    sinceMonth: 3,
    sinceYear: 2023,
    addresses: [
      {
        address: '0x4f2083f5fbede34c2714affb3105539775f7fe64',
        chainId: 1,
        isSafe: true
      }
    ]
  },
  {
    id: DAO_NAME_KEY['CoW DAO'],
    name: 'CoW',
    icon: '/images/protocols/cow.svg',
    keyName: 'CoW DAO',
    sinceMonth: 2,
    sinceYear: 2023,
    addresses: [
      {
        address: '0x616de58c011f8736fa20c7ae5352f7f6fb9f0669',
        chainId: 1,
        isSafe: true
      },
      {
        address: '0x616de58c011f8736fa20c7ae5352f7f6fb9f0669',
        chainId: 100,
        isSafe: true
      }
    ]
  },
  {
    id: DAO_NAME_KEY['karpatkey DAO'],
    name: 'karpatkey',
    icon: '/images/protocols/karpatkey.svg',
    keyName: 'karpatkey DAO',
    sinceMonth: 1,
    sinceYear: 2023,
    addresses: [
      {
        address: '0x58e6c7ab55aa9012eacca16d1ed4c15795669e1c',
        chainId: 1,
        isSafe: true
      },
      {
        address: '0x54e191B01aA9C1F61AA5C3BCe8d00956F32D3E71',
        chainId: 100,
        isSafe: true
      }
    ]
  },
  {
    id: DAO_NAME_KEY['Lido'],
    name: 'Lido',
    icon: '/images/protocols/lido.svg',
    keyName: 'Lido',
    sinceMonth: 7,
    sinceYear: 2023,
    addresses: [
      // TODO: update theses addresses
      {
        address: '0x3e40d73eb977dc6a537af587d48316fee66e9c8c',
        chainId: 1,
        isSafe: false
      }
    ]
  }
]

export const TOKEN_COINGECKO_PRICE_URL = [
  {
    tokenName: 'DAI',
    url: 'https://www.coingecko.com/en/coins/dai'
  },
  {
    tokenName: 'WETH',
    url: 'https://www.coingecko.com/en/coins/weth'
  },
  {
    tokenName: 'GNO',
    url: 'https://www.coingecko.com/en/coins/gnosis'
  },
  {
    tokenName: 'stETH',
    url: 'https://www.coingecko.com/en/coins/lido-staked-ether'
  },
  {
    tokenName: 'USDT',
    url: 'https://www.coingecko.com/en/coins/tether'
  },
  {
    tokenName: 'USDC',
    url: 'https://www.coingecko.com/en/coins/usd-coin'
  },
  {
    tokenName: 'WBTC',
    url: 'https://www.coingecko.com/en/coins/wrapped-bitcoin'
  },
  {
    tokenName: 'Aura',
    url: 'https://www.coingecko.com/en/coins/aura-finance'
  },
  {
    tokenName: 'Cow',
    url: 'https://www.coingecko.com/en/coins/cow-protocol'
  },
  {
    tokenName: 'Agve',
    url: 'https://www.coingecko.com/en/coins/agave-token'
  },
  {
    tokenName: 'Bal',
    url: 'https://www.coingecko.com/en/coins/balancer'
  },
  {
    tokenName: 'ETH',
    url: 'https://www.coingecko.com/en/coins/ethereum'
  },
  {
    tokenName: 'CRV',
    url: 'https://www.coingecko.com/en/coins/curve-dao-token'
  },
  {
    tokenName: 'NOTE',
    url: 'https://www.coingecko.com/en/coins/notional-finance'
  },
  {
    tokenName: 'CVX',
    url: 'https://www.coingecko.com/en/coins/convex-finance'
  },
  {
    tokenName: 'auraBAL',
    url: 'https://www.coingecko.com/en/coins/aura-bal'
  },
  {
    tokenName: 'COMP',
    url: 'https://www.coingecko.com/en/coins/compound'
  },
  {
    tokenName: 'XDAI',
    url: 'https://www.coingecko.com/en/coins/xdai'
  },
  {
    tokenName: 'wstETH',
    url: 'https://www.coingecko.com/en/coins/wrapped-steth'
  },
  {
    tokenName: 'EURe',
    url: 'https://www.coingecko.com/en/coins/monerium-eur-money'
  },
  {
    tokenName: 'AAVE',
    url: 'https://www.coingecko.com/en/coins/aave'
  },
  {
    tokenName: 'ENS',
    url: 'https://www.coingecko.com/en/coins/ethereum-name-service'
  },
  {
    tokenName: 'sETH2',
    url: 'https://www.coingecko.com/en/coins/seth2'
  },
  {
    tokenName: 'RPL',
    url: 'https://www.coingecko.com/en/coins/rocket-pool'
  },
  {
    tokenName: 'LDO',
    url: 'https://www.coingecko.com/en/coins/lido-dao'
  },
  {
    tokenName: 'rETH2',
    url: 'https://www.coingecko.com/en/coins/reth2'
  },
  {
    tokenName: 'WXDAI',
    url: 'https://www.coingecko.com/en/coins/wrapped-xdai'
  },
  {
    tokenName: 'MATIC',
    url: 'https://www.coingecko.com/en/coins/polygon'
  },
  {
    tokenName: 'GHO',
    url: 'https://www.coingecko.com/en/coins/gho'
  },
  {
    tokenName: 'rETH',
    url: 'https://www.coingecko.com/en/coins/rocket-pool-eth'
  },
  {
    tokenName: 'ankrETH',
    url: 'https://www.coingecko.com/en/coins/ankr-staked-eth'
  },
  {
    tokenName: 'FLX',
    url: 'https://www.coingecko.com/en/coins/reflexer-ungovernance-token'
  },
  {
    tokenName: 'PNK',
    url: 'https://www.coingecko.com/en/coins/kleros'
  },
  {
    tokenName: 'agEUR',
    url: 'https://www.coingecko.com/en/coins/ageur'
  },
  {
    tokenName: 'ICHI',
    url: 'https://www.coingecko.com/en/coins/ichi'
  },
  {
    tokenName: 'GIV',
    url: 'https://www.coingecko.com/en/coins/giveth'
  },
  {
    tokenName: 'GEN',
    url: 'https://www.coingecko.com/en/coins/daostack'
  },
  {
    tokenName: 'GTC',
    url: 'https://www.coingecko.com/en/coins/gitcoin'
  },
  {
    tokenName: 'UNCX',
    url: 'https://www.coingecko.com/en/coins/uncx-network'
  },
  {
    tokenName: 'RPL',
    url: 'https://www.coingecko.com/en/coins/rocket-pool'
  },
  {
    tokenName: 'SWISE',
    url: 'https://www.coingecko.com/en/coins/stakewise'
  },
  {
    tokenName: 'RAD',
    url: 'https://www.coingecko.com/en/coins/radworks'
  },
  {
    tokenName: 'RDN',
    url: 'https://www.coingecko.com/en/coins/raiden-network'
  },
  {
    tokenName: 'IDLE',
    url: 'https://www.coingecko.com/en/coins/idle'
  },
  {
    tokenName: 'SUSHI',
    url: 'https://www.coingecko.com/en/coins/sushi'
  },
  {
    tokenName: 'USDP',
    url: 'https://www.coingecko.com/en/coins/pax-dollar'
  },
  {
    tokenName: 'StaFI (FIS)',
    url: 'https://www.coingecko.com/en/coins/stafi'
  },
  {
    tokenName: 'cvxCRV',
    url: 'https://www.coingecko.com/en/coins/convex-crv'
  },
  {
    tokenName: 'bb-a-USDT',
    url: 'https://www.coingecko.com/en/coins/balancer-boosted-aave-usdt'
  },
  {
    tokenName: 'MKR',
    url: 'https://www.coingecko.com/en/coins/maker'
  },
  {
    tokenName: 'FRAX',
    url: 'https://www.coingecko.com/en/coins/frax'
  },
  {
    tokenName: 'bb-a-DAI',
    url: 'https://www.coingecko.com/en/coins/balancer-boosted-aave-dai'
  },
  {
    tokenName: 'FXS',
    url: 'https://www.coingecko.com/en/coins/frax-share'
  },
  {
    tokenName: 'cvxFXS',
    url: 'https://www.coingecko.com/en/coins/convex-fxs'
  },
  {
    tokenName: 'SWPR',
    url: 'https://www.coingecko.com/en/coins/swapr'
  },
  {
    tokenName: 'LUSD',
    url: 'https://www.coingecko.com/en/coins/liquity-usd'
  },
  {
    tokenName: 'bb-a-USDC',
    url: 'https://www.coingecko.com/en/coins/balancer-boosted-aave-usdc'
  },
  {
    tokenName: 'bb-a-USDC(v3)',
    url: 'https://www.coingecko.com/en/coins/balancer-boosted-aave-usdc'
  },
  {
    tokenName: 'ELK',
    url: 'https://www.coingecko.com/en/coins/elk-finance'
  }
]

export const OTHERS_SUMMARY_LIMIT = 2

export const OTHERS_WALLET_LIMIT = 3

export const MONTHS = [
  { label: 'January', id: 1 },
  { label: 'February', id: 2 },
  { label: 'March', id: 3 },
  { label: 'April', id: 4 },
  { label: 'May', id: 5 },
  { label: 'June', id: 6 },
  { label: 'July', id: 7 },
  { label: 'August', id: 8 },
  { label: 'September', id: 9 },
  { label: 'October', id: 10 },
  { label: 'November', id: 11 },
  { label: 'December', id: 12 }
]

export const MIN_ALLOWED_ALLOCATION = 0.00009
