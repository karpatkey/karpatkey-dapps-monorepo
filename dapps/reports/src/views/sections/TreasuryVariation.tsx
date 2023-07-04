import Waterfall from '@karpatkey-monorepo/reports/src/components/Charts/Waterfall'
import { useFilter } from '@karpatkey-monorepo/reports/src/contexts/filter.context'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import TabPanel from '@karpatkey-monorepo/shared/components/TabPanel'
import { FILTER_DAO, MONTHS } from '@karpatkey-monorepo/shared/config/constants'
import { getDAO } from '@karpatkey-monorepo/shared/utils'
import HelpIcon from '@mui/icons-material/Help'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Tooltip from '@mui/material/Tooltip'
import * as React from 'react'

interface TreasuryVariationProps {
  treasuryVariationData: any[]
  historicVariationData: any[]
  treasuryVariationForThePeriodDetailData: any[]
}

const TreasuryVariation = (props: TreasuryVariationProps) => {
  const { treasuryVariationData, historicVariationData, treasuryVariationForThePeriodDetailData } =
    props

  const { state } = useFilter()
  const filterValue = state.value
  const DAO: Maybe<FILTER_DAO> = getDAO(filterValue.dao) || null

  const [toggleType, setToggleType] = React.useState(0)

  const handleChange = (event: React.MouseEvent<HTMLElement>, newToggleType: number) => {
    const value = newToggleType !== null ? newToggleType : toggleType === 0 ? 1 : 0
    setToggleType(value)
  }

  const DAO_MONTH = MONTHS.find((month) => month.id === DAO?.sinceMonth)
  const helpText = DAO ? `Treasury variation since ${DAO_MONTH?.label}-${DAO.sinceYear}` : ''

  const filter = (
    <ToggleButtonGroup
      value={toggleType}
      exclusive
      onChange={handleChange}
      aria-label="Balance overview type"
    >
      <ToggleButton disableRipple value={0} sx={{ textTransform: 'none' }}>
        Selected period
      </ToggleButton>
      <ToggleButton disableRipple value={1} sx={{ textTransform: 'none' }}>
        Year to period
        <Tooltip title={helpText} sx={{ ml: 1 }}>
          <HelpIcon />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  )

  return (
    <>
      <AnimatePresenceWrapper>
        <PaperSection
          id="Treasury variation"
          title="Treasury variation"
          subTitle="Treasury variation summary"
          filter={filter}
        >
          <TabPanel value={toggleType} index={0}>
            {treasuryVariationData.length > 0 ? (
              <Waterfall data={treasuryVariationData} barSize={150} />
            ) : (
              <EmptyData />
            )}
          </TabPanel>
          <TabPanel value={toggleType} index={1}>
            {historicVariationData.length > 0 ? (
              <Waterfall data={historicVariationData} barSize={150} />
            ) : (
              <EmptyData />
            )}
          </TabPanel>
        </PaperSection>
      </AnimatePresenceWrapper>
      <AnimatePresenceWrapper>
        <PaperSection subTitle="Treasury variation for the period (detail)">
          {treasuryVariationForThePeriodDetailData.length > 0 ? (
            <Waterfall data={treasuryVariationForThePeriodDetailData} />
          ) : (
            <EmptyData />
          )}
        </PaperSection>
      </AnimatePresenceWrapper>
    </>
  )
}

export default TreasuryVariation
