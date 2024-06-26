import { TableBlockchain } from 'src/views/sections/report/balanceOverviewItems/TableBlockchain'
import { TableType } from 'src/views/sections/report/balanceOverviewItems/TableType'
import { TableTypeDDay } from 'src/views/sections/report/balanceOverviewItems/TableTypeDDay'
import {
  AnimatePresenceWrapper,
  BoxWrapperColumn,
  EmptyData,
  PaperSection,
  TabPanel
} from 'src/components'
import { BoxProps, ToggleButton, ToggleButtonGroup } from '@mui/material'
import * as React from 'react'
import { isFeatureFlagOne } from 'src/utils/params'
import { useApp } from 'src/contexts/app.context'

type BalanceOverview = { balanceOverviewType: any; balanceOverviewBlockchain: any } & BoxProps

interface FilterProps {
  toggleType: number
  handleToggleOnChange: (event: React.MouseEvent<HTMLElement>, newToggleType: number) => void
}
const Filter = ({ toggleType, handleToggleOnChange }: FilterProps) => (
  <ToggleButtonGroup
    value={toggleType}
    exclusive
    onChange={handleToggleOnChange}
    aria-label="Balance overview type"
    sx={{ height: 'fit-content' }}
  >
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
      Type
    </ToggleButton>
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
      Blockchain
    </ToggleButton>
  </ToggleButtonGroup>
)

export const BalanceOverview = (props: BalanceOverview) => {
  const { balanceOverviewType, balanceOverviewBlockchain } = props

  const { state } = useApp()
  const { currency } = state

  const [toggleType, setToggleType] = React.useState(1)

  const isDDay = isFeatureFlagOne()

  const handleToggleOnChange = (event: React.MouseEvent<HTMLElement>, newToggleType: number) => {
    if (newToggleType === null) return
    if (newToggleType === toggleType) return
    setToggleType(newToggleType)
  }

  return (
    <AnimatePresenceWrapper>
      <PaperSection
        id="Balance overview"
        title="Balance overview"
        subTitle={`Funds by token category and type/blockchain ${
          currency === 'ETH' ? '(ETH)' : ''
        }`}
        filter={<Filter toggleType={toggleType} handleToggleOnChange={handleToggleOnChange} />}
      >
        <BoxWrapperColumn>
          <TabPanel value={toggleType} index={1}>
            {balanceOverviewType.length > 0 ? (
              isDDay ? (
                <TableTypeDDay balanceOverviewType={balanceOverviewType} />
              ) : (
                <TableType balanceOverviewType={balanceOverviewType} />
              )
            ) : (
              <EmptyData />
            )}
          </TabPanel>
          <TabPanel value={toggleType} index={0}>
            {balanceOverviewBlockchain.length > 0 ? (
              <TableBlockchain balanceOverviewBlockchain={balanceOverviewBlockchain} />
            ) : (
              <EmptyData />
            )}
          </TabPanel>
        </BoxWrapperColumn>
      </PaperSection>
    </AnimatePresenceWrapper>
  )
}
