import TableBlockchain from '@karpatkey-monorepo/reports/src/views/sections/BalanceOverviewItems/TableBlockchain'
import TableType from '@karpatkey-monorepo/reports/src/views/sections/BalanceOverviewItems/TableType'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import TabPanel from '@karpatkey-monorepo/shared/components/TabPanel'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import * as React from 'react'

interface BalanceOverviewProps {
  balanceOverviewType: any[]
  balanceOverviewBlockchain: any[]
}

const BalanceOverview = (props: BalanceOverviewProps) => {
  const { balanceOverviewType, balanceOverviewBlockchain } = props

  const [toggleType, setToggleType] = React.useState(1)

  const handleToggleOnChange = (event: React.MouseEvent<HTMLElement>, newToggleType: number) => {
    if (newToggleType === null) return
    if (newToggleType === toggleType) return
    setToggleType(newToggleType)
  }

  const Filter = (
    <ToggleButtonGroup
      value={toggleType}
      exclusive
      onChange={handleToggleOnChange}
      aria-label="Balance overview type"
    >
      <ToggleButton disableRipple value={1} sx={{ textTransform: 'none' }}>
        Type
      </ToggleButton>
      <ToggleButton disableRipple value={0} sx={{ textTransform: 'none' }}>
        Blockchain
      </ToggleButton>
    </ToggleButtonGroup>
  )

  return (
    <AnimatePresenceWrapper>
      <PaperSection
        id="Balance overview"
        title="Balance overview"
        subTitle="Funds by token category and type/blockchain"
        filter={Filter}
      >
        <BoxWrapperColumn>
          <TabPanel value={toggleType} index={1}>
            {balanceOverviewType.length > 0 ? (
              <TableType balanceOverviewType={balanceOverviewType} />
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

export default BalanceOverview
