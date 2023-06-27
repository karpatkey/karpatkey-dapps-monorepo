import FundsContainer from '@karpatkey-monorepo/reports/src/views/sections/FarmingFundsItems/FundsContainer'
import ResultsContainer from '@karpatkey-monorepo/reports/src/views/sections/FarmingFundsItems/ResultsContainer'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import numbro from 'numbro'
import * as React from 'react'

interface FarmingFundsProps {
  totalFarmingResultsFarmSwaps: number
  farmingFundsByProtocol: any[]
  farmingResultsDetailsByProtocol: any[]
}

const FarmingFunds = (props: FarmingFundsProps) => {
  const {
    farmingFundsByProtocol: funds,
    farmingResultsDetailsByProtocol: fundsDetails,
    totalFarmingResultsFarmSwaps: totalFarmSwaps
  } = props

  return (
    <>
      <AnimatePresenceWrapper>
        <FundsContainer {...{ funds }} />
      </AnimatePresenceWrapper>
      <AnimatePresenceWrapper>
        <ResultsContainer {...{ fundsDetails }} />
        <PaperSection subTitle="Farming results from Farm-Swaps">
          <CustomTypography variant="farmSwapsValue">
            {numbro(totalFarmSwaps || 0).formatCurrency({
              spaceSeparated: false,
              mantissa: 0,
              thousandSeparated: true
            })}
          </CustomTypography>
        </PaperSection>
      </AnimatePresenceWrapper>
    </>
  )
}

export default FarmingFunds
