import CustomPopover from '@karpatkey-monorepo/shared/components/CustomPopover'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import FilterTextOption from '@karpatkey-monorepo/shared/components/Filter/FilterTextOption'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import * as React from 'react'
import Tooltip from '@mui/material/Tooltip'

interface FilterProps {
  id: string | undefined
  title?: string
  open: boolean
  anchorEl: any
  handleClose: () => void
  handleClear: () => void
  handleClick: (event: any) => void
  children: React.ReactNode
  blockchain?: Maybe<string>
  protocol?: Maybe<string>
  token?: Maybe<string>
  DAO?: Maybe<string>
  year?: Maybe<string>
  month?: Maybe<string>
  enableProtocol?: boolean
  enableBlockchain?: boolean
  enableToken?: boolean
  enableDAO?: boolean
  enableYear?: boolean
  enableMonth?: boolean
  position?: 'left' | 'right' | 'middle'
  tooltipText?: string
}

const Filter = (props: FilterProps) => {
  const {
    id,
    title = 'Filters',
    open,
    anchorEl,
    handleClose,
    children,
    handleClick,
    handleClear,
    blockchain,
    protocol,
    token,
    DAO,
    year,
    month,
    enableToken,
    enableBlockchain,
    enableProtocol,
    enableDAO,
    enableYear,
    enableMonth,
    position = 'middle',
    tooltipText
  } = props

  const isClearButtonEnabled = React.useMemo(() => {
    return (
      (enableBlockchain && blockchain) ||
      (enableProtocol && protocol) ||
      (enableToken && token) ||
      (enableDAO && DAO) ||
      (enableYear && year) ||
      (enableMonth && month)
    )
  }, [
    blockchain,
    DAO,
    enableBlockchain,
    enableDAO,
    enableMonth,
    enableProtocol,
    enableToken,
    enableYear,
    month,
    protocol,
    token,
    year
  ])

  return (
    <BoxWrapperRow gap={2}>
      <CustomTypography variant="filterTitle">{title}</CustomTypography>
      <BoxWrapperRow gap={2} onClick={handleClick} id={id || ''}>
        {enableBlockchain ? (
          <FilterTextOption
            title={blockchain || 'Blockchain'}
            {...(blockchain ? { fontWeight: 'extra-bold' } : {})}
          />
        ) : null}
        {enableProtocol ? (
          <FilterTextOption
            title={protocol || 'Protocol'}
            {...(protocol ? { fontWeight: 'extra-bold' } : {})}
          />
        ) : null}
        {enableToken ? (
          <FilterTextOption
            title={token || 'Token'}
            {...(token ? { fontWeight: 'extra-bold' } : {})}
          />
        ) : null}
        {enableDAO ? (
          <FilterTextOption title={DAO || 'DAO'} {...(DAO ? { fontWeight: 'extra-bold' } : {})} />
        ) : null}
        {enableMonth ? (
          <FilterTextOption
            title={month || 'Month'}
            {...(month ? { fontWeight: 'extra-bold' } : {})}
          />
        ) : null}
        {enableYear ? (
          <FilterTextOption
            title={year || 'Year'}
            {...(year ? { fontWeight: 'extra-bold' } : {})}
          />
        ) : null}
      </BoxWrapperRow>
      <Tooltip title={tooltipText} sx={{ ml: 1 }}>
        <HighlightOffIcon
          sx={{
            ...(isClearButtonEnabled
              ? { color: 'custom.black.primary' }
              : { color: 'custom.grey.secondary' }),
            cursor: 'pointer',
            width: 48,
            height: 48
          }}
          onClick={() => {
            if (isClearButtonEnabled) {
              handleClear()
            }
          }}
          fontSize={'small'}
        />
      </Tooltip>
      <CustomPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        position={position}
      >
        {children}
      </CustomPopover>
    </BoxWrapperRow>
  )
}
export default Filter
