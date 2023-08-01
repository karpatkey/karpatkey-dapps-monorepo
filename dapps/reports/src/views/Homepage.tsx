import { ActionKind, useFilter } from '@karpatkey-monorepo/reports/src/contexts/filter.context'
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
    monthSelected,
    daoSelected,
    yearSelected,
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
    walletTokenDetail,
    yearOptions,
    monthOptions,
    daoOptions
  } = props

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { state, dispatch } = useFilter()

  React.useEffect(() => {
    dispatch({
      type: ActionKind.UPDATE,
      payload: {
        value: { monthSelected, daoSelected, yearSelected, yearOptions, monthOptions, daoOptions },
        error: null
      }
    })
  }, [monthSelected, daoSelected, yearSelected, yearOptions, monthOptions, daoOptions, dispatch])

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

  return (
    <BoxContainerWrapper>
      <Hero />
      <Summary
        totalFunds={totalFunds}
        capitalUtilization={capitalUtilization}
        globalROI={globalROI}
        farmingResults={farmingResults}
        fundsByTokenCategory={fundsByTokenCategory}
        fundsByType={fundsByType}
        fundsByBlockchain={fundsByBlockchain}
        balanceOverviewType={balanceOverviewType}
      />
      <BalanceOverview
        balanceOverviewType={balanceOverviewType}
        balanceOverviewBlockchain={balanceOverviewBlockchain}
      />
      <TreasuryVariation {...treasuryVariationProps} />
      <FarmingFunds {...farmingFundsResultsProps} />
      <TokenDetails
        tokenDetails={tokenDetails}
        tokenDetailsGrouped={tokenDetailsGrouped}
        tokenDetailByPosition={tokenDetailByPosition}
        walletTokenDetail={walletTokenDetail}
      />
    </BoxContainerWrapper>
  )
}

export default HomepageContent
