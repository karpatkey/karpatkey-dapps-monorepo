import Filters from '@karpatkey-monorepo/reports/src/components/Filters/Menu'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import LogoKarpatkey from '@karpatkey-monorepo/shared/components/LogoKarpatkey'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import React from 'react'

export const HEADER_HEIGHT = 100

interface HeaderProps {
  showFilters?: boolean
}

const Header = ({ showFilters = false }: HeaderProps) => {
  return (
    <AnimatePresenceWrapper>
      <BoxWrapperRow
        sx={{
          backgroundColor: 'background.default',
          justifyContent: 'space-between',
          paddingX: '26px',
          height: HEADER_HEIGHT
        }}
      >
        <LogoKarpatkey />
        {showFilters ? <Filters /> : null}
      </BoxWrapperRow>
    </AnimatePresenceWrapper>
  )
}

export default Header