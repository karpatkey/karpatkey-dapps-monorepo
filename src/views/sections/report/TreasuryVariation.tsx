import {
  AnimatePresenceWrapper,
  EmptyData,
  TabPanel,
  PaperSection,
  Waterfall
} from 'src/components'
import { FILTER_DAO, FILTER_DAOS } from 'src/config/constants'
import { getDAO } from 'src/utils'
import InfoIcon from '@mui/icons-material/Info'
import { Theme, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'
import * as React from 'react'
import { isFeatureFlagOne, isFeatureFlagThree } from 'src/utils/params'
import { useApp } from 'src/contexts/app.context'
import useMediaQuery from '@mui/material/useMediaQuery'

interface TreasuryVariationProps {
  treasuryVariationData: any[]
  historicVariationData: any[]
  treasuryVariationForThePeriodDetailData: any[]
}

interface FilterProps {
  toggleType: number
  handleToggleOnChange: (event: React.MouseEvent<HTMLElement>, newToggleType: number) => void
  helpText: string
}
const Filter = ({ toggleType, handleToggleOnChange, helpText }: FilterProps) => (
  <ToggleButtonGroup
    value={toggleType}
    exclusive
    onChange={handleToggleOnChange}
    aria-label="Balance overview type"
    sx={{ height: 'fit-content' }}
  >
    <ToggleButton
      disableRipple
      value={0}
      sx={{
        textTransform: 'none',
        fontSize: { xs: '14px !important', md: '18px !important' },
        lineHeight: { xs: '16px !important', md: '20px !important' },
        padding: { xs: '8px !important', md: '12px !important' }
      }}
    >
      Selected period
    </ToggleButton>
    <ToggleButton
      disableRipple
      value={1}
      sx={{
        textTransform: 'none',
        fontSize: { xs: '14px !important', md: '18px !important' },
        lineHeight: { xs: '16px !important', md: '20px !important' },
        padding: { xs: '8px !important', md: '12px !important' }
      }}
    >
      Year to period
      <Tooltip title={helpText} enterTouchDelay={0} sx={{ ml: 1 }}>
        <InfoIcon />
      </Tooltip>
    </ToggleButton>
  </ToggleButtonGroup>
)

export const TreasuryVariation = (props: TreasuryVariationProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { treasuryVariationData, historicVariationData, treasuryVariationForThePeriodDetailData } =
    props

  const { state } = useApp()
  const { DAO: filterDAO, currency, year } = state
  const DAO: Maybe<FILTER_DAO> = getDAO(filterDAO) || null

  const [toggleType, setToggleType] = React.useState(0)

  const isFeatureFlagOneVar = isFeatureFlagOne()
  const isFeatureFlagThreeVar = isFeatureFlagThree()

  const handleToggleOnChange = (event: React.MouseEvent<HTMLElement>, newToggleType: number) => {
    if (newToggleType === null) return
    if (newToggleType === toggleType) return
    setToggleType(newToggleType)
  }

  // Get actual year
  const yearNow = new Date().getFullYear()
  const sinceText =
    FILTER_DAOS.find((dao) => dao.id === filterDAO)?.sinceYearToPeriod[year || yearNow] ??
    `January ${yearNow}`

  const helpText = DAO ? `Treasury variation since ${sinceText}` : ''

  const isMD = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  return (
    <>
      <AnimatePresenceWrapper>
        <PaperSection
          id="Treasury variation"
          title="Treasury variation"
          subTitle={
            currency === 'USD' ? 'Treasury variation summary' : 'Treasury variation summary (ETH)'
          }
          helpInfo={
            isFeatureFlagOneVar
              ? 'Balance variation for the period (also year to period), results separated into Operations and DeFi results'
              : 'Balance variation for the period (also year to period), results separated into Non Farming and Farming Results.'
          }
          filter={
            <Filter
              toggleType={toggleType}
              handleToggleOnChange={handleToggleOnChange}
              helpText={helpText}
            />
          }
        >
          <TabPanel value={toggleType} index={0}>
            {treasuryVariationData?.length > 0 ? (
              <Waterfall
                data={treasuryVariationData}
                barSize={isMD ? 150 : 40}
                bottom={isMD ? (isFeatureFlagThreeVar ? 80 : 20) : 80}
              />
            ) : (
              <EmptyData />
            )}
          </TabPanel>
          <TabPanel value={toggleType} index={1}>
            {historicVariationData?.length > 0 ? (
              <Waterfall
                data={historicVariationData}
                barSize={isMD ? 150 : 40}
                bottom={isMD ? (isFeatureFlagThreeVar ? 80 : 20) : 80}
              />
            ) : (
              <EmptyData />
            )}
          </TabPanel>
        </PaperSection>
      </AnimatePresenceWrapper>
      {isMD ? (
        <AnimatePresenceWrapper>
          <PaperSection
            subTitle={
              currency === 'USD'
                ? 'Treasury variation for the period (detail)'
                : 'Treasury variation for the period (detail) (ETH)'
            }
          >
            {treasuryVariationForThePeriodDetailData?.length > 0 ? (
              <Waterfall data={treasuryVariationForThePeriodDetailData} bottom={100} />
            ) : (
              <EmptyData />
            )}
          </PaperSection>
        </AnimatePresenceWrapper>
      ) : null}
    </>
  )
}
