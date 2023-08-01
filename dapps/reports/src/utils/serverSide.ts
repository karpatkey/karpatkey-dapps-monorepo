import Cache from '@karpatkey-monorepo/reports/src/services/classes/cache.class'
import { Filter } from '@karpatkey-monorepo/reports/src/types'
import { getDAO, getDAOByKeyName } from '@karpatkey-monorepo/shared/utils'
import {
  getBalanceOverviewByBlockchain,
  getBalanceOverviewByType
} from '@karpatkey-monorepo/shared/utils/mappers/balanceOverview'
import {
  getFarmingFundsByProtocol,
  getFarmingResultsDetailsByProtocol,
  getFarmingResultsFarmSwapsTotal
} from '@karpatkey-monorepo/shared/utils/mappers/farmingFunds'
import {
  getCapitalUtilization,
  getFarmingResults,
  getGlobalROI,
  getSummaryFundsByBlockchain,
  getSummaryFundsByProtocol,
  getSummaryFundsByTokenCategory,
  getSummaryFundsByType,
  getTotalFunds
} from '@karpatkey-monorepo/shared/utils/mappers/summary'
import {
  getTokenDetailByPosition,
  getTokenDetails,
  getTokenDetailsGrouped,
  getWalletTokenDetails
} from '@karpatkey-monorepo/shared/utils/mappers/tokenDetails'
import {
  getTreasuryVariationForThePeriod,
  getTreasuryVariationForThePeriodDetails,
  getTreasuryVariationHistory
} from '@karpatkey-monorepo/shared/utils/mappers/treasuryVariation'
import { AutocompleteOption } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import { MONTHS } from '@karpatkey-monorepo/shared/config/constants'

export const getCommonServerSideProps = async (params: Filter) => {
  const { monthSelected, yearSelected, daoSelected } = params

  // Step 1: Create a BigQuery client
  const cache = Cache.getInstance()

  // Step 2: Query the data
  const variationMetricsDetail = await cache.getReport(
    'getTreasuryVariationMetricsDetail' as unknown as Report
  )
  const financialMetrics = await cache.getReport('getTreasuryFinancialMetrics' as unknown as Report)
  const financialPositions = await cache.getReport(
    'getTreasuryFinancialPositions' as unknown as Report
  )
  const historicVariation = await cache.getReport(
    'getTreasuryHistoricVariation' as unknown as Report
  )

  const financialMetricAndVarDetail = await cache.getReport(
    'getFinancialMetricAndVarDetail' as unknown as Report
  )

  // Step 3: Get filter data like daoName, periodType and period
  const DAO = getDAO(daoSelected)
  const daoKeyName = DAO?.keyName
  const METRIC_PERIOD_TYPE = 'month'
  const metricPeriod = yearSelected && monthSelected ? `${yearSelected}_${monthSelected}` : null

  // Obtain filters for the dropdowns
  const filters = variationMetricsDetail.reduce(
    (
      acc: any,
      {
        dao,
        year_month,
        date_type
      }: {
        dao: string
        year_month: string
        date_type: string
      }
    ) => {
      if (date_type !== METRIC_PERIOD_TYPE) return acc
      const DAO = getDAOByKeyName(dao as unknown as DAO_NAME)
      if (!DAO) return acc

      const [yearString, monthString] = year_month.split('_')
      const year = parseInt(yearString)
      const month = parseInt(monthString)

      if (!acc[DAO.keyName]) {
        acc[DAO.keyName] = {}
      }
      if (!acc[DAO.keyName][year]) {
        acc[DAO.keyName][year] = [month]
      }
      if (!acc[DAO.keyName][year].includes(month)) {
        acc[DAO.keyName][year].push(month)
      }
      return acc
    },
    {}
  )

  const daoOptions: Maybe<AutocompleteOption> = Object.keys(filters).reduce(
    (acc: any, daoKeyName: string) => {
      const DAO = getDAOByKeyName(daoKeyName as unknown as DAO_NAME)
      if (!DAO) return acc

      const daoFound = acc.find((option: AutocompleteOption) => option.id === DAO.keyName)
      if (!daoFound) {
        acc.push({
          id: DAO.keyName,
          label: DAO.name,
          logo: DAO.icon
        })
      }
      return acc
    },
    []
  )

  const yearOptions: Maybe<AutocompleteOption> = Object.keys(filters).reduce(
    (acc: any, daoKeyName: string) => {
      const DAO = getDAOByKeyName(daoKeyName as unknown as DAO_NAME)
      if (!DAO) return acc

      const years = Object.keys(filters[daoKeyName])
      years.forEach((year: string) => {
        const yearFound = acc.find((option: AutocompleteOption) => option.id === year)
        if (!yearFound) {
          acc.push({
            id: year,
            label: year
          })
        }
      })
      return acc
    },
    []
  )

  const monthOptions: Maybe<AutocompleteOption> = Object.keys(filters).reduce(
    (acc: any, daoKeyName: string) => {
      const DAO = getDAOByKeyName(daoKeyName as unknown as DAO_NAME)
      if (!DAO) return acc

      const years = Object.keys(filters[daoKeyName])
      years.forEach((year: string) => {
        const months = filters[daoKeyName][year]
        months.forEach((month: string) => {
          const monthFound = acc.find((option: AutocompleteOption) => option.id === month)
          if (!monthFound) {
            const monthItem = MONTHS.find((m: any) => m.id === month)

            acc.push({
              id: month,
              label: monthItem?.label
            })
          }
        })
      })
      return acc
    },
    []
  )

  // Step 4: Apply filters to the data by common params, like daoName, periodType and period
  const variationMetricsDetailFiltered = variationMetricsDetail.filter((row: any) => {
    return (
      row.date_type === METRIC_PERIOD_TYPE &&
      row.dao === daoKeyName &&
      row.year_month === metricPeriod
    )
  })

  const financialPositionsFiltered = financialPositions.filter((row: any) => {
    return (
      row.date_type === METRIC_PERIOD_TYPE &&
      row.dao === daoKeyName &&
      row.year_month === metricPeriod
    )
  })

  const historicVariationFiltered = historicVariation.filter((row: any) => {
    return (
      row.date_type === METRIC_PERIOD_TYPE &&
      row.dao === daoKeyName &&
      row.year_month === metricPeriod
    )
  })

  const financialMetricsFiltered = financialMetrics.filter((row: any) => {
    return (
      row.date_type === METRIC_PERIOD_TYPE &&
      row.dao === daoKeyName &&
      row.year_month === metricPeriod
    )
  })

  const financialMetricAndVarDetailFiltered = financialMetricAndVarDetail.filter((row: any) => {
    return (
      row.date_type === METRIC_PERIOD_TYPE &&
      row.dao === daoKeyName &&
      row.year_month === metricPeriod
    )
  })

  // #####################################################

  // #### Summary blocks ####

  // Funds by token category
  const fundsByTokenCategory = getSummaryFundsByTokenCategory(variationMetricsDetailFiltered)

  // Funds by type
  const fundsByType = getSummaryFundsByType(variationMetricsDetailFiltered)

  // Funds by blockchain
  const fundsByBlockchain = getSummaryFundsByBlockchain(variationMetricsDetailFiltered)

  // Funds by protocol
  const fundsByProtocol = getSummaryFundsByProtocol(financialPositionsFiltered)

  // Summary blocks
  const totalFunds = getTotalFunds(variationMetricsDetailFiltered)
  const capitalUtilization = getCapitalUtilization(financialMetricsFiltered)
  const farmingResults = getFarmingResults(financialMetricsFiltered)
  const globalROI = getGlobalROI(financialMetricAndVarDetailFiltered)

  // #### Balance Overview block ####
  // Funds by token category / Type
  const balanceOverviewType = getBalanceOverviewByType(variationMetricsDetailFiltered)

  // Funds by token category / Blockchain
  const balanceOverviewBlockchain = getBalanceOverviewByBlockchain(variationMetricsDetailFiltered)

  // #### Treasury variation ####
  // For the period
  const treasuryVariationData = getTreasuryVariationForThePeriod(financialMetricsFiltered)

  // In this year
  const historicVariationData = getTreasuryVariationHistory(historicVariationFiltered)

  // For the period, detail
  const treasuryVariationForThePeriodDetailData =
    getTreasuryVariationForThePeriodDetails(financialMetricsFiltered)

  // #### Farming Funds / Results
  // Farming funds / Results by protocol
  const farmingFundsByProtocol = getFarmingFundsByProtocol(financialPositionsFiltered)

  // Farming result from farm swaps
  const totalFarmingResultsFarmSwaps = getFarmingResultsFarmSwapsTotal(financialMetricsFiltered)

  // Farming results details by protocol
  const farmingResultsDetailsByProtocol =
    getFarmingResultsDetailsByProtocol(financialMetricsFiltered)

  // Token detail
  const tokenDetails = getTokenDetails(variationMetricsDetailFiltered)
  const tokenDetailsGrouped = getTokenDetailsGrouped(variationMetricsDetailFiltered)

  // Token detail by position
  const tokenDetailByPosition = getTokenDetailByPosition(financialMetricAndVarDetailFiltered)

  // Wallet token detail
  const walletTokenDetail = getWalletTokenDetails(variationMetricsDetailFiltered)

  return {
    daoOptions,
    yearOptions,
    monthOptions,
    totalFunds,
    capitalUtilization,
    farmingResults,
    globalROI,
    fundsByTokenCategory,
    fundsByType,
    fundsByBlockchain,
    fundsByProtocol,
    balanceOverviewType,
    balanceOverviewBlockchain,
    treasuryVariationData,
    historicVariationData,
    treasuryVariationForThePeriodDetailData,
    farmingFundsByProtocol,
    farmingResultsDetailsByProtocol,
    totalFarmingResultsFarmSwaps,
    tokenDetails,
    tokenDetailsGrouped,
    tokenDetailByPosition,
    walletTokenDetail
  }
}
