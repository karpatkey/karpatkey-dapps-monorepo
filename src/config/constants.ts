import { Currency } from 'src/contexts/state'

export const DAO_DEFAULT = Number(process.env.REACT_DAO_DEFAULT || 5)

export const GOOGLE_PROJECT_ID = process.env.REACT_GOOGLE_PROJECT_ID
export const GOOGLE_CREDS = {
  client_id: process.env.REACT_GOOGLE_CLIENT_ID,
  client_email: process.env.REACT_GOOGLE_CLIENT_EMAIL,
  project_id: GOOGLE_PROJECT_ID,
  private_key: process.env?.REACT_GOOGLE_PRIVATE_KEY?.replace(new RegExp('\\\\n', 'g'), '\n')
}

export const DATA_WAREHOUSE_ENV = process.env.REACT_DATA_WAREHOUSE_ENV || 'production'

export const PASSWORD_PROTECT = process.env.PASSWORD_PROTECT

export const UNISWAP_PROTOCOL = 'UniswapV3'

export const APP_URL = process.env.APP_URL || 'karpatkey'

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
  },
  {
    reportName: 'getTreasuryFinancialMetricsWaterfall' as unknown as Report,
    fileName: 'treasury-financial-metrics-waterfall'
  },
  {
    reportName: 'getWaterfall1Report' as unknown as Report,
    fileName: 'waterfall1-report'
  },
  {
    reportName: 'getTotalFundsByTokenCategory' as unknown as Report,
    fileName: 'total-funds-by-token-category'
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
  order: number
  since: string
}

export interface FILTER_DAO {
  id: number
  name: string
  icon: string
  keyName: DAO_NAME
  sinceMonth: number
  sinceYear: number
  sinceYearToPeriod: {
    [key: number]: string
  }
  addresses: DAO_ADDRESS[]
  defaultCurrency: Currency
  currenciesAllowed: Currency[]
  shouldBeIncludedDashboardOne: boolean
  shouldBeIncludedDashboardTwo: boolean
  shouldBeIncludedNCAum: boolean
  shouldBeIncludedLastMonthDeFiResults: boolean
  isEnabled: boolean
  datesAllowed?: {
    label: string
    month: number
    year: number
    id: string
  }[]
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
    logo: '/images/protocols/gnosis.svg'
  },
  {
    id: 42161,
    name: 'Arbitrum',
    short: 'arb1',
    explorer: 'https://arbiscan.io/address',
    logo: '/images/protocols/arbitrum.svg'
  },
  {
    id: 43114,
    name: 'Avalanche',
    short: 'ava',
    explorer: 'https://subnets.avax.network/c-chain/address',
    logo: '/images/protocols/avalanche.svg'
  },
  {
    id: 10,
    name: 'Optimism',
    short: 'oeth',
    explorer: 'https://optimistic.etherscan.io/address',
    logo: '/images/protocols/optimism.svg'
  },
  {
    id: 137,
    name: 'Polygon',
    short: 'matic',
    explorer: 'https://polygonscan.com/address',
    logo: '/images/protocols/polygon.svg'
  },
  {
    id: 8453,
    name: 'Base',
    short: 'base',
    explorer: 'https://basescan.org/address',
    logo: '/images/protocols/base.svg'
  },
  {
    id: 1088,
    name: 'Metis',
    short: 'met',
    explorer: 'https://explorer.metis.io/address',
    logo: '/images/protocols/metis.svg'
  },
  {
    id: 56,
    name: 'Binance',
    short: 'bnb',
    explorer: 'https://bscscan.com/address',
    logo: '/images/protocols/binance.svg'
  }
]

export const enum DAO_NAME_KEY {
  'Gnosis DAO' = 1,
  'Gnosis LTD' = 2,
  'Balancer DAO' = 3,
  'ENS DAO' = 4,
  'CoW DAO' = 5,
  'karpatkey DAO' = 6,
  'Gnosis Guild' = 7,
  'Lido' = 8,
  'Aave DAO' = 9,
  'Safe<>Gnosis' = 10,
  'Safe' = 11
}

export const getDAONumberByName = (daoName: string): number => {
  switch (daoName) {
    case 'Gnosis DAO':
      return DAO_NAME_KEY['Gnosis DAO']
    case 'Gnosis LTD':
      return DAO_NAME_KEY['Gnosis LTD']
    case 'Balancer DAO':
      return DAO_NAME_KEY['Balancer DAO']
    case 'ENS DAO':
      return DAO_NAME_KEY['ENS DAO']
    case 'CoW DAO':
      return DAO_NAME_KEY['CoW DAO']
    case 'karpatkey DAO':
      return DAO_NAME_KEY['karpatkey DAO']
    case 'Gnosis Guild':
      return DAO_NAME_KEY['Gnosis Guild']
    case 'Lido':
      return DAO_NAME_KEY['Lido']
    case 'Aave':
      return DAO_NAME_KEY['Aave DAO']
    case 'Safe<>Gnosis':
      return DAO_NAME_KEY['Safe<>Gnosis']
    case 'Safe':
      return DAO_NAME_KEY['Safe']
    default:
      return -1
  }
}

export const FILTER_DAOS: FILTER_DAO[] = [
  {
    id: DAO_NAME_KEY['Gnosis DAO'],
    name: 'Gnosis',
    icon: '/images/protocols/gnosis.svg',
    keyName: 'Gnosis DAO',
    sinceMonth: 7,
    sinceYear: 2023,
    sinceYearToPeriod: {
      2023: 'January 2023',
      2024: 'January 2024'
    },
    shouldBeIncludedDashboardOne: true,
    shouldBeIncludedDashboardTwo: false,
    shouldBeIncludedNCAum: true,
    shouldBeIncludedLastMonthDeFiResults: true,
    isEnabled: true,
    addresses: [
      {
        address: '0x849d52316331967b6ff1198e5e32a0eb168d039d',
        chainId: 1,
        isSafe: true,
        order: 1,
        since: '1_2023'
      },
      {
        address: '0x458cd345b4c05e8df39d0a07220feb4ec19f5e6f',
        chainId: 100,
        isSafe: true,
        order: 2,
        since: '1_2023'
      },
      {
        address: '0x5B6e1AcD8494092C166b390C17f09694B9dDb42C',
        chainId: 42161,
        isSafe: true,
        order: 3,
        since: '2_2024'
      },
      {
        address: '0x210Ff2E26599D7146753bCBbC93afEdf82d2802F',
        chainId: 10,
        isSafe: true,
        order: 4,
        since: '2_2024'
      },
      {
        address: '0x7CE63a765341bc274fD5C5c4d80B17AC26f2062f',
        chainId: 56,
        isSafe: true,
        order: 5,
        since: '2_2024'
      },
      {
        address: '0x3115F77805FE59Ef9a31d5b38C68C171665CBB53',
        chainId: 137,
        isSafe: true,
        order: 6,
        since: '2_2024'
      },
      {
        address: '0x6bbe78ee9e474842dbd4ab4987b3cefe88426a92',
        chainId: 100,
        isSafe: true,
        order: 7,
        since: '2_2024'
      },
      {
        address: '0x1c7828DAdAdE12a848f36BE8E2d3146462ABfF68',
        chainId: 100,
        isSafe: true,
        order: 8,
        since: '3_2024'
      },
      {
        address: '0x2923c1b5313f7375fdaee80b7745106debc1b53e',
        chainId: 1,
        isSafe: true,
        order: 9,
        since: '5_2024'
      }
    ],
    defaultCurrency: 'USD' as Currency,
    currenciesAllowed: ['USD', 'ETH'] as Currency[],
    datesAllowed: [
      {
        label: 'July',
        month: 7,
        year: 2023,
        id: '7_2023'
      },
      {
        label: 'August',
        month: 8,
        year: 2023,
        id: '8_2023'
      },
      {
        label: 'September',
        month: 9,
        year: 2023,
        id: '9_2023'
      },
      {
        label: 'October',
        month: 10,
        year: 2023,
        id: '10_2023'
      },
      {
        label: 'November',
        month: 11,
        year: 2023,
        id: '11_2023'
      },
      {
        label: 'December',
        month: 12,
        year: 2023,
        id: '12_2023'
      },
      {
        label: 'January',
        month: 1,
        year: 2024,
        id: '1_2024'
      },
      {
        label: 'February',
        month: 2,
        year: 2024,
        id: '2_2024'
      },
      {
        label: 'March',
        month: 3,
        year: 2024,
        id: '3_2024'
      },
      {
        label: 'April',
        month: 4,
        year: 2024,
        id: '4_2024'
      },
      {
        label: 'May',
        month: 5,
        year: 2024,
        id: '5_2024'
      },
      {
        label: 'Jun',
        month: 6,
        year: 2024,
        id: '6_2024'
      }
    ]
  },
  {
    id: DAO_NAME_KEY['Gnosis LTD'],
    name: 'Gnosis LTD',
    icon: '/images/protocols/gnosis.svg',
    keyName: 'Gnosis LTD',
    sinceMonth: 7,
    sinceYear: 2023,
    sinceYearToPeriod: {
      2023: 'January 2023',
      2024: 'January 2024'
    },
    shouldBeIncludedDashboardOne: false,
    shouldBeIncludedDashboardTwo: false,
    shouldBeIncludedNCAum: false,
    shouldBeIncludedLastMonthDeFiResults: false,
    isEnabled: false,
    addresses: [
      // TODO: update theses addresses
      {
        address: '0x3e40d73eb977dc6a537af587d48316fee66e9c8c',
        chainId: 1,
        isSafe: false,
        order: 1,
        since: '1_2023'
      }
    ],
    defaultCurrency: 'USD' as Currency,
    currenciesAllowed: ['USD', 'ETH'] as Currency[],
    datesAllowed: [
      {
        label: 'July',
        month: 7,
        year: 2023,
        id: '7_2023'
      },
      {
        label: 'August',
        month: 8,
        year: 2023,
        id: '8_2023'
      },
      {
        label: 'September',
        month: 9,
        year: 2023,
        id: '9_2023'
      },
      {
        label: 'October',
        month: 10,
        year: 2023,
        id: '10_2023'
      },
      {
        label: 'November',
        month: 11,
        year: 2023,
        id: '11_2023'
      },
      {
        label: 'December',
        month: 12,
        year: 2023,
        id: '12_2023'
      },
      {
        label: 'January',
        month: 1,
        year: 2024,
        id: '1_2024'
      },
      {
        label: 'February',
        month: 2,
        year: 2024,
        id: '2_2024'
      },
      {
        label: 'March',
        month: 3,
        year: 2024,
        id: '3_2024'
      },
      {
        label: 'April',
        month: 4,
        year: 2024,
        id: '4_2024'
      },
      {
        label: 'May',
        month: 5,
        year: 2024,
        id: '5_2024'
      },
      {
        label: 'Jun',
        month: 6,
        year: 2024,
        id: '6_2024'
      }
    ]
  },
  {
    id: DAO_NAME_KEY['Balancer DAO'],
    name: 'Balancer',
    icon: '/images/protocols/balancer.svg',
    keyName: 'Balancer DAO',
    sinceMonth: 7,
    sinceYear: 2023,
    sinceYearToPeriod: {
      2023: 'February 2023',
      2024: 'January 2024'
    },
    shouldBeIncludedDashboardOne: true,
    shouldBeIncludedDashboardTwo: false,
    shouldBeIncludedNCAum: true,
    shouldBeIncludedLastMonthDeFiResults: true,
    isEnabled: true,
    addresses: [
      {
        address: '0x0efccbb9e2c09ea29551879bd9da32362b32fc89',
        chainId: 1,
        isSafe: true,
        order: 1,
        since: '2_2023'
      }
    ],
    defaultCurrency: 'USD' as Currency,
    currenciesAllowed: ['USD', 'ETH'] as Currency[],
    datesAllowed: [
      {
        label: 'July',
        month: 7,
        year: 2023,
        id: '7_2023'
      },
      {
        label: 'August',
        month: 8,
        year: 2023,
        id: '8_2023'
      },
      {
        label: 'September',
        month: 9,
        year: 2023,
        id: '9_2023'
      },
      {
        label: 'October',
        month: 10,
        year: 2023,
        id: '10_2023'
      },
      {
        label: 'November',
        month: 11,
        year: 2023,
        id: '11_2023'
      },
      {
        label: 'December',
        month: 12,
        year: 2023,
        id: '12_2023'
      },
      {
        label: 'January',
        month: 1,
        year: 2024,
        id: '1_2024'
      },
      {
        label: 'February',
        month: 2,
        year: 2024,
        id: '2_2024'
      },
      {
        label: 'March',
        month: 3,
        year: 2024,
        id: '3_2024'
      },
      {
        label: 'April',
        month: 4,
        year: 2024,
        id: '4_2024'
      },
      {
        label: 'May',
        month: 5,
        year: 2024,
        id: '5_2024'
      },
      {
        label: 'Jun',
        month: 6,
        year: 2024,
        id: '6_2024'
      }
    ]
  },
  {
    id: DAO_NAME_KEY['ENS DAO'],
    name: 'ENS',
    icon: '/images/protocols/ens.svg',
    keyName: 'ENS DAO',
    sinceMonth: 7,
    sinceYear: 2023,
    sinceYearToPeriod: {
      2023: 'March 2023',
      2024: 'January 2024'
    },
    shouldBeIncludedDashboardOne: true,
    shouldBeIncludedDashboardTwo: false,
    shouldBeIncludedNCAum: true,
    shouldBeIncludedLastMonthDeFiResults: true,
    isEnabled: true,
    addresses: [
      {
        address: '0x4f2083f5fbede34c2714affb3105539775f7fe64',
        chainId: 1,
        isSafe: true,
        order: 1,
        since: '3_2023'
      }
    ],
    defaultCurrency: 'USD' as Currency,
    currenciesAllowed: ['USD', 'ETH'] as Currency[],
    datesAllowed: [
      {
        label: 'July',
        month: 7,
        year: 2023,
        id: '7_2023'
      },
      {
        label: 'August',
        month: 8,
        year: 2023,
        id: '8_2023'
      },
      {
        label: 'September',
        month: 9,
        year: 2023,
        id: '9_2023'
      },
      {
        label: 'October',
        month: 10,
        year: 2023,
        id: '10_2023'
      },
      {
        label: 'November',
        month: 11,
        year: 2023,
        id: '11_2023'
      },
      {
        label: 'December',
        month: 12,
        year: 2023,
        id: '12_2023'
      },
      {
        label: 'January',
        month: 1,
        year: 2024,
        id: '1_2024'
      },
      {
        label: 'February',
        month: 2,
        year: 2024,
        id: '2_2024'
      },
      {
        label: 'March',
        month: 3,
        year: 2024,
        id: '3_2024'
      },
      {
        label: 'April',
        month: 4,
        year: 2024,
        id: '4_2024'
      },
      {
        label: 'May',
        month: 5,
        year: 2024,
        id: '5_2024'
      },
      {
        label: 'Jun',
        month: 6,
        year: 2024,
        id: '6_2024'
      }
    ]
  },
  {
    id: DAO_NAME_KEY['CoW DAO'],
    name: 'CoW Protocol',
    icon: '/images/protocols/cow.svg',
    keyName: 'CoW DAO',
    sinceMonth: 7,
    sinceYear: 2023,
    sinceYearToPeriod: {
      2023: 'February 2023',
      2024: 'January 2024'
    },
    shouldBeIncludedDashboardOne: true,
    shouldBeIncludedDashboardTwo: false,
    shouldBeIncludedNCAum: true,
    shouldBeIncludedLastMonthDeFiResults: true,
    isEnabled: true,
    addresses: [
      {
        address: '0x616de58c011f8736fa20c7ae5352f7f6fb9f0669',
        chainId: 1,
        isSafe: true,
        order: 1,
        since: '2_2023'
      },
      {
        address: '0x616de58c011f8736fa20c7ae5352f7f6fb9f0669',
        chainId: 100,
        isSafe: true,
        order: 2,
        since: '2_2023'
      },
      {
        address: '0xbeef5afe88ef73337e5070ab2855d37dbf5493a4',
        chainId: 1,
        isSafe: true,
        order: 3,
        since: '2_2024'
      },
      {
        address: '0x324e12107ec7a89e94dd1c07b7d8781406db3e1d',
        chainId: 1,
        isSafe: true,
        order: 4,
        since: '3_2024'
      },
      {
        address: '0x301076c36E034948A747BB61bAB9CD03f62672e3',
        chainId: 1,
        isSafe: true,
        order: 5,
        since: '4_2024'
      },
      {
        address: '0x9ac1b015378B086496f529Be50d5979447De1730',
        chainId: 42161,
        isSafe: true,
        order: 6,
        since: '5_2024'
      },
      {
        address: '0x9009b4411d0e1171cc042b77d7701f46b737fdb9',
        chainId: 100,
        isSafe: true,
        order: 7,
        since: '5_2024'
      }
    ],
    defaultCurrency: 'USD' as Currency,
    currenciesAllowed: ['USD', 'ETH'] as Currency[],
    datesAllowed: [
      {
        label: 'July',
        month: 7,
        year: 2023,
        id: '7_2023'
      },
      {
        label: 'August',
        month: 8,
        year: 2023,
        id: '8_2023'
      },
      {
        label: 'September',
        month: 9,
        year: 2023,
        id: '9_2023'
      },
      {
        label: 'October',
        month: 10,
        year: 2023,
        id: '10_2023'
      },
      {
        label: 'November',
        month: 11,
        year: 2023,
        id: '11_2023'
      },
      {
        label: 'December',
        month: 12,
        year: 2023,
        id: '12_2023'
      },
      {
        label: 'January',
        month: 1,
        year: 2024,
        id: '1_2024'
      },
      {
        label: 'February',
        month: 2,
        year: 2024,
        id: '2_2024'
      },
      {
        label: 'March',
        month: 3,
        year: 2024,
        id: '3_2024'
      },
      {
        label: 'April',
        month: 4,
        year: 2024,
        id: '4_2024'
      },
      {
        label: 'May',
        month: 5,
        year: 2024,
        id: '5_2024'
      },
      {
        label: 'Jun',
        month: 6,
        year: 2024,
        id: '6_2024'
      }
    ]
  },
  {
    id: DAO_NAME_KEY['karpatkey DAO'],
    name: 'karpatkey',
    icon: '/images/protocols/karpatkey.svg',
    keyName: 'karpatkey DAO',
    sinceMonth: 7,
    sinceYear: 2023,
    sinceYearToPeriod: {
      2023: 'January 2023',
      2024: 'January 2024'
    },
    shouldBeIncludedDashboardOne: true,
    shouldBeIncludedDashboardTwo: false,
    shouldBeIncludedNCAum: true,
    shouldBeIncludedLastMonthDeFiResults: true,
    isEnabled: true,
    addresses: [
      {
        address: '0x58e6c7ab55aa9012eacca16d1ed4c15795669e1c',
        chainId: 1,
        isSafe: true,
        order: 1,
        since: '1_2023'
      },
      {
        address: '0x54e191B01aA9C1F61AA5C3BCe8d00956F32D3E71',
        chainId: 100,
        isSafe: true,
        order: 2,
        since: '1_2023'
      },
      {
        address: '0xFD322Dd727419D1e437686Ba11ED562F8A8Ad573',
        chainId: 42161,
        isSafe: true,
        order: 3,
        since: '1_2024'
      },
      {
        address: '0x568240DefD76d42fcf6a3347ba4f5B0ABDC4a11A',
        chainId: 1,
        isSafe: true,
        order: 4,
        since: '1_2024'
      },
      {
        address: '0x6CF63938f2CD5DFEBbDE0010bb640ed7Fa679693',
        chainId: 1,
        isSafe: true,
        order: 5,
        since: '1_2024'
      },
      {
        address: '0x720642ec9b04e56b296075ae95c262bf58b1eaeb',
        chainId: 8453,
        isSafe: true,
        order: 6,
        since: '5_2024'
      },
      {
        address: '0x720642ec9b04e56b296075ae95c262bf58b1eaeb',
        chainId: 10,
        isSafe: true,
        order: 7,
        since: '5_2024'
      }
    ],
    defaultCurrency: 'USD' as Currency,
    currenciesAllowed: ['USD', 'ETH'] as Currency[],
    datesAllowed: [
      {
        label: 'July',
        month: 7,
        year: 2023,
        id: '7_2023'
      },
      {
        label: 'August',
        month: 8,
        year: 2023,
        id: '8_2023'
      },
      {
        label: 'September',
        month: 9,
        year: 2023,
        id: '9_2023'
      },
      {
        label: 'October',
        month: 10,
        year: 2023,
        id: '10_2023'
      },
      {
        label: 'November',
        month: 11,
        year: 2023,
        id: '11_2023'
      },
      {
        label: 'December',
        month: 12,
        year: 2023,
        id: '12_2023'
      },
      {
        label: 'January',
        month: 1,
        year: 2024,
        id: '1_2024'
      },
      {
        label: 'February',
        month: 2,
        year: 2024,
        id: '2_2024'
      },
      {
        label: 'March',
        month: 3,
        year: 2024,
        id: '3_2024'
      },
      {
        label: 'April',
        month: 4,
        year: 2024,
        id: '4_2024'
      },
      {
        label: 'May',
        month: 5,
        year: 2024,
        id: '5_2024'
      },
      {
        label: 'Jun',
        month: 6,
        year: 2024,
        id: '6_2024'
      }
    ]
  },
  {
    id: DAO_NAME_KEY['Gnosis Guild'],
    name: 'Gnosis Guild',
    icon: '/images/protocols/gnosis.svg',
    keyName: 'Gnosis Guild',
    sinceMonth: 7,
    sinceYear: 2023,
    sinceYearToPeriod: {
      2023: 'January 2023',
      2024: 'January 2024'
    },
    shouldBeIncludedDashboardOne: false,
    shouldBeIncludedDashboardTwo: false,
    shouldBeIncludedNCAum: false,
    shouldBeIncludedLastMonthDeFiResults: false,
    isEnabled: false,
    addresses: [
      // TODO: update theses addresses
      {
        address: '0x3e40d73eb977dc6a537af587d48316fee66e9c8c',
        chainId: 1,
        isSafe: false,
        order: 1,
        since: '1_2023'
      }
    ],
    defaultCurrency: 'USD' as Currency,
    currenciesAllowed: ['USD', 'ETH'] as Currency[],
    datesAllowed: [
      {
        label: 'July',
        month: 7,
        year: 2023,
        id: '7_2023'
      },
      {
        label: 'August',
        month: 8,
        year: 2023,
        id: '8_2023'
      },
      {
        label: 'September',
        month: 9,
        year: 2023,
        id: '9_2023'
      },
      {
        label: 'October',
        month: 10,
        year: 2023,
        id: '10_2023'
      },
      {
        label: 'November',
        month: 11,
        year: 2023,
        id: '11_2023'
      },
      {
        label: 'December',
        month: 12,
        year: 2023,
        id: '12_2023'
      },
      {
        label: 'January',
        month: 1,
        year: 2024,
        id: '1_2024'
      },
      {
        label: 'February',
        month: 2,
        year: 2024,
        id: '2_2024'
      },
      {
        label: 'March',
        month: 3,
        year: 2024,
        id: '3_2024'
      },
      {
        label: 'April',
        month: 4,
        year: 2024,
        id: '4_2024'
      },
      {
        label: 'May',
        month: 5,
        year: 2024,
        id: '5_2024'
      },
      {
        label: 'Jun',
        month: 6,
        year: 2024,
        id: '6_2024'
      }
    ]
  },
  {
    id: DAO_NAME_KEY['Lido'],
    name: 'Lido',
    icon: '/images/protocols/lido.svg',
    keyName: 'Lido',
    sinceMonth: 11,
    sinceYear: 2023,
    sinceYearToPeriod: {
      2023: 'July 2023',
      2024: 'January 2024'
    },
    shouldBeIncludedDashboardOne: false,
    shouldBeIncludedDashboardTwo: true,
    shouldBeIncludedNCAum: false,
    shouldBeIncludedLastMonthDeFiResults: false,
    isEnabled: true,
    addresses: [
      {
        address: '0x3e40d73eb977dc6a537af587d48316fee66e9c8c',
        chainId: 1,
        isSafe: false,
        order: 1,
        since: '7_2023'
      }
    ],
    defaultCurrency: 'ETH' as Currency,
    currenciesAllowed: ['ETH'] as Currency[],
    datesAllowed: [
      {
        label: 'November',
        month: 11,
        year: 2023,
        id: '11_2023'
      },
      {
        label: 'December',
        month: 12,
        year: 2023,
        id: '12_2023'
      },
      {
        label: 'January',
        month: 1,
        year: 2024,
        id: '1_2024'
      },
      {
        label: 'February',
        month: 2,
        year: 2024,
        id: '2_2024'
      },
      {
        label: 'March',
        month: 3,
        year: 2024,
        id: '3_2024'
      },
      {
        label: 'April',
        month: 4,
        year: 2024,
        id: '4_2024'
      },
      {
        label: 'May',
        month: 5,
        year: 2024,
        id: '5_2024'
      },
      {
        label: 'Jun',
        month: 6,
        year: 2024,
        id: '6_2024'
      }
    ]
  },
  {
    id: DAO_NAME_KEY['Aave DAO'],
    name: 'Aave',
    icon: '/images/protocols/aave.svg',
    keyName: 'Aave DAO',
    sinceMonth: 12,
    sinceYear: 2023,
    sinceYearToPeriod: {
      2023: 'December 2023',
      2024: 'January 2024'
    },
    shouldBeIncludedDashboardOne: true,
    shouldBeIncludedDashboardTwo: false,
    shouldBeIncludedNCAum: true,
    shouldBeIncludedLastMonthDeFiResults: true,
    isEnabled: true,
    addresses: [
      {
        address: '0x464c71f6c2f760dda6093dcb91c24c39e5d6e18c',
        chainId: 1,
        isSafe: false,
        order: 2,
        since: '12_2023'
      },
      {
        address: '0x25f2226b597e8f9514b3f68f00f494cf4f286491',
        chainId: 1,
        isSafe: false,
        order: 1,
        since: '12_2023'
      },
      {
        address: '0x205e795336610f5131be52f09218af19f0f3ec60',
        chainId: 1,
        isSafe: true,
        order: 3,
        since: '12_2023'
      },
      {
        address: '0x3e652e97ff339b73421f824f5b03d75b62f1fb51',
        chainId: 100,
        isSafe: false,
        order: 10,
        since: '12_2023'
      },
      {
        address: '0x053d55f9b5af8694c503eb288a1b7e552f590710',
        chainId: 42161,
        isSafe: false,
        order: 6,
        since: '12_2023'
      },
      {
        address: '0xb2289e329d2f85f1ed31adbb30ea345278f21bcf',
        chainId: 10,
        isSafe: false,
        order: 7,
        since: '12_2023'
      },
      {
        address: '0xe8599f3cc5d38a9ad6f3684cd5cea72f10dbc383',
        chainId: 137,
        isSafe: false,
        order: 5,
        since: '12_2023'
      },
      {
        address: '0x5ba7fd868c40c16f7adfae6cf87121e13fc2f7a0',
        chainId: 43114,
        isSafe: false,
        order: 4,
        since: '12_2023'
      },
      {
        address: '0xba9424d650a4f5c80a0da641254d1acce2a37057',
        chainId: 8453,
        isSafe: false,
        order: 9,
        since: '12_2023'
      },
      {
        address: '0xb5b64c7e00374e766272f8b442cd261412d4b118',
        chainId: 1088,
        isSafe: false,
        order: 8,
        since: '12_2023'
      },
      {
        address: '0xa9e777D56C0Ad861f6a03967E080e767ad8D39b6',
        chainId: 42161,
        isSafe: true,
        order: 11,
        since: '4_2024'
      }
    ],
    defaultCurrency: 'USD' as Currency,
    currenciesAllowed: ['USD', 'ETH'] as Currency[],
    datesAllowed: [
      {
        label: 'December',
        month: 12,
        year: 2023,
        id: '12_2023'
      },
      {
        label: 'January',
        month: 1,
        year: 2024,
        id: '1_2024'
      },
      {
        label: 'February',
        month: 2,
        year: 2024,
        id: '2_2024'
      },
      {
        label: 'March',
        month: 3,
        year: 2024,
        id: '3_2024'
      },
      {
        label: 'April',
        month: 4,
        year: 2024,
        id: '4_2024'
      },
      {
        label: 'May',
        month: 5,
        year: 2024,
        id: '5_2024'
      },
      {
        label: 'Jun',
        month: 6,
        year: 2024,
        id: '6_2024'
      }
    ]
  },
  {
    id: DAO_NAME_KEY['Safe<>Gnosis'],
    name: 'Safe<>Gnosis',
    icon: '/images/protocols/safe-gnosis.svg',
    keyName: 'Safe<>Gnosis',
    sinceMonth: 4,
    sinceYear: 2024,
    sinceYearToPeriod: {
      2024: 'April 2024'
    },
    shouldBeIncludedDashboardOne: true,
    shouldBeIncludedDashboardTwo: false,
    shouldBeIncludedNCAum: true,
    shouldBeIncludedLastMonthDeFiResults: true,
    isEnabled: true,
    addresses: [
      {
        address: '0xd28b432f06cb64692379758b88b5fcdfc4f56922',
        chainId: 1,
        isSafe: true,
        order: 1,
        since: '4_2024'
      },
      {
        address: '0x0c6eeb232800fb86215438c4f7ae032b5463586c',
        chainId: 100,
        isSafe: true,
        order: 2,
        since: '4_2024'
      },
      {
        address: '0x027e1cbf2c299cba5eb8a2584910d04f1a8aa403',
        chainId: 1,
        isSafe: true,
        order: 3,
        since: '4_2024'
      }
    ],
    defaultCurrency: 'USD' as Currency,
    currenciesAllowed: ['USD', 'ETH'] as Currency[],
    datesAllowed: [
      {
        label: 'April',
        month: 4,
        year: 2024,
        id: '4_2024'
      },
      {
        label: 'May',
        month: 5,
        year: 2024,
        id: '5_2024'
      },
      {
        label: 'Jun',
        month: 6,
        year: 2024,
        id: '6_2024'
      }
    ]
  },
  {
    id: DAO_NAME_KEY['Safe'],
    name: 'Safe',
    icon: '/images/protocols/safe.svg',
    keyName: 'Safe',
    sinceMonth: 4,
    sinceYear: 2024,
    sinceYearToPeriod: {
      2024: 'April 2024'
    },
    shouldBeIncludedDashboardOne: false,
    shouldBeIncludedDashboardTwo: true,
    shouldBeIncludedNCAum: false,
    shouldBeIncludedLastMonthDeFiResults: false,
    isEnabled: true,
    addresses: [
      {
        address: '0x0b00b3227a5f3df3484f03990a87e02ebad2f888',
        chainId: 1,
        isSafe: true,
        order: 1,
        since: '4_2024'
      },
      {
        address: '0x1d4f25bc16b68c50b78e1040bc430a8097fd6f45',
        chainId: 1,
        isSafe: true,
        order: 2,
        since: '4_2024'
      }
    ],
    defaultCurrency: 'USD' as Currency,
    currenciesAllowed: ['USD', 'ETH'] as Currency[],
    datesAllowed: [
      {
        label: 'April',
        month: 4,
        year: 2024,
        id: '4_2024'
      },
      {
        label: 'May',
        month: 5,
        year: 2024,
        id: '5_2024'
      },
      {
        label: 'Jun',
        month: 6,
        year: 2024,
        id: '6_2024'
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
  },
  {
    tokenName: 'SNX',
    url: 'https://www.coingecko.com/en/coins/synthetix-network-token'
  },
  {
    tokenName: 'WAVAX',
    url: 'https://www.coingecko.com/en/coins/wrapped-avax'
  },
  {
    tokenName: 'LINK',
    url: 'https://www.coingecko.com/en/coins/chainlink'
  },
  {
    tokenName: 'WMATIC',
    url: 'https://www.coingecko.com/en/coins/wmatic'
  },
  {
    tokenName: 'TUSD',
    url: 'https://www.coingecko.com/en/coins/true-usd'
  },
  {
    tokenName: 'BUSD',
    url: 'https://www.coingecko.com/en/coins/busd'
  },
  {
    tokenName: 'DPI',
    url: 'https://www.coingecko.com/en/coins/defi-pulse-index'
  },
  {
    tokenName: 'BTC.b',
    url: 'https://www.coingecko.com/en/coins/bitcoin-avalanche-bridged-btc-b'
  },
  {
    tokenName: 'AMPL',
    url: 'https://www.coingecko.com/en/coins/ampleforth'
  },
  {
    tokenName: 'METIS',
    url: 'https://www.coingecko.com/en/coins/metis-token'
  },
  {
    tokenName: '1INCH',
    url: 'https://www.coingecko.com/en/coins/1inch'
  },
  {
    tokenName: 'stMatic',
    url: 'https://www.coingecko.com/en/coins/lido-staked-matic'
  },
  {
    tokenName: 'sUSD',
    url: 'https://www.coingecko.com/en/coins/susd'
  },
  {
    tokenName: 'gUSD',
    url: 'https://www.coingecko.com/en/coins/gemini-dollar'
  },
  {
    tokenName: 'miMatic',
    url: 'https://www.coingecko.com/en/coins/mai'
  },
  {
    tokenName: 'cbETH',
    url: 'https://www.coingecko.com/en/coins/coinbase-wrapped-staked-eth'
  },
  {
    tokenName: 'GHST',
    url: 'https://www.coingecko.com/en/coins/aavegotchi'
  },
  {
    tokenName: 'EURS',
    url: 'https://www.coingecko.com/en/coins/stasis-eurs'
  },
  {
    tokenName: 'USDbC',
    url: 'https://www.coingecko.com/en/coins/bridged-usd-coin-base'
  },
  {
    tokenName: 'jEUR',
    url: 'https://www.coingecko.com/en/coins/jarvis-synthetic-euro'
  },
  {
    tokenName: 'MANA',
    url: 'https://www.coingecko.com/en/coins/decentraland'
  },
  {
    tokenName: 'BAT',
    url: 'https://www.coingecko.com/en/coins/basic-attention-token'
  },
  {
    tokenName: 'ENJ',
    url: 'https://www.coingecko.com/en/coins/enjin-coin'
  },
  {
    tokenName: 'UNI',
    url: 'https://www.coingecko.com/en/coins/uniswap'
  },
  {
    tokenName: 'MaticX',
    url: 'https://www.coingecko.com/en/coins/stader-maticx'
  },
  {
    tokenName: 'RAI',
    url: 'https://www.coingecko.com/en/coins/rai'
  },
  {
    tokenName: 'OP',
    url: 'https://www.coingecko.com/en/coins/optimism'
  },
  {
    tokenName: 'ZRX',
    url: 'https://www.coingecko.com/en/coins/0x'
  },
  {
    tokenName: 'KNC',
    url: 'https://www.coingecko.com/en/coins/kyber-network-crystal'
  },
  {
    tokenName: 'FEI',
    url: 'https://www.coingecko.com/en/coins/fei-usd'
  },
  {
    tokenName: 'REN',
    url: 'https://www.coingecko.com/en/coins/ren'
  },
  {
    tokenName: 'YFI',
    url: 'https://www.coingecko.com/en/coins/yearn-finance'
  },
  {
    tokenName: 'crvUSD',
    url: 'https://www.coingecko.com/en/coins/crvusd'
  },
  {
    tokenName: 'UST',
    url: 'https://www.coingecko.com/en/coins/terrausd-wormhole'
  },
  {
    tokenName: 'xSUSHI',
    url: 'https://www.coingecko.com/en/coins/xsushi'
  },
  {
    tokenName: 'STG',
    url: 'https://www.coingecko.com/en/coins/stargate-finance'
  }
]

export const OTHERS_SUMMARY_LIMIT = 2

export const OTHERS_WALLET_LIMIT = 3

export const MONTHS = [
  { label: 'January', short: 'Jan', id: 1 },
  { label: 'February', short: 'Feb', id: 2 },
  { label: 'March', short: 'Mar', id: 3 },
  { label: 'April', short: 'Apr', id: 4 },
  { label: 'May', short: 'May', id: 5 },
  { label: 'June', short: 'Jun', id: 6 },
  { label: 'July', short: 'Jul', id: 7 },
  { label: 'August', short: 'Aug', id: 8 },
  { label: 'September', short: 'Sep', id: 9 },
  { label: 'October', short: 'Oct', id: 10 },
  { label: 'November', short: 'Nov', id: 11 },
  { label: 'December', short: 'Dec', id: 12 }
]

export const MIN_ALLOWED_ALLOCATION = 0.00009
