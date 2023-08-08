import { ReportProps } from '@karpatkey-monorepo/reports/src/types'
import BalanceOverview from '@karpatkey-monorepo/reports/src/views/sections/BalanceOverview'
import FarmingFunds from '@karpatkey-monorepo/reports/src/views/sections/FarmingFunds'
import Hero from '@karpatkey-monorepo/reports/src/views/sections/Hero'
import Summary from '@karpatkey-monorepo/reports/src/views/sections/Summary'
import TokenDetails from '@karpatkey-monorepo/reports/src/views/sections/TokenDetails'
import TreasuryVariation from '@karpatkey-monorepo/reports/src/views/sections/TreasuryVariation'
import BoxContainerWrapper from '@karpatkey-monorepo/shared/components/Wrappers/BoxContainerWrapper'
import * as React from 'react'

const HomepageContent = (props: ReportProps) => {
  const {
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
    totalFarmingResultsFarmSwaps,
    farmingFundsByProtocol,
    farmingResultsDetailsByProtocol,
    tokenDetails,
    tokenDetailsGrouped,
    tokenDetailByPosition,
    walletTokenDetail
  } = props

  const farmingFundsResultsProps = {
    totalFarmingResultsFarmSwaps,
    farmingFundsByProtocol,
    farmingResultsDetailsByProtocol,
    fundsByProtocol
  }

  const treasuryVariationProps = {
    treasuryVariationData,
    historicVariationData,
    treasuryVariationForThePeriodDetailData
  }

  const tokenDetailsProps = {
    tokenDetails,
    tokenDetailsGrouped,
    tokenDetailByPosition,
    walletTokenDetail,
  }

  const balanceOverviewProps = {
    balanceOverviewType,
    balanceOverviewBlockchain,
  }

  const summaryProps = {
    totalFunds,
    capitalUtilization,
    globalROI,
    farmingResults,
    fundsByTokenCategory,
    fundsByType,
    fundsByBlockchain,
    balanceOverviewType,
  }

  return (
    <BoxContainerWrapper>
      <Hero />
      <Summary {...summaryProps} />
      <BalanceOverview {...balanceOverviewProps} />
      <TreasuryVariation {...treasuryVariationProps} />
      <FarmingFunds {...farmingFundsResultsProps} />
      <TokenDetails {...tokenDetailsProps} />
    </BoxContainerWrapper>
  )
}

export default HomepageContent
