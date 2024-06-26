import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  Theme
} from '@mui/material'
import * as React from 'react'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import { formatCurrency, formatNumber, formatPercentage } from 'src/utils/format'
import {
  BoxWrapperColumn,
  BoxWrapperRow,
  TableHeadCellCustom,
  TableFooterCellCustom,
  TableEmptyCellCustom,
  TableCellCustom,
  EmptyData,
  CustomTypography,
  UniswapHelpText
} from 'src/components'
import { UNISWAP_PROTOCOL } from 'src/config/constants'
import { isFeatureFlagOne } from 'src/utils/params'
import { useApp } from 'src/contexts/app.context'
import useMediaQuery from '@mui/material/useMediaQuery'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { debounce } from 'lodash'

interface TableFundsProps {
  funds: any
  totals: any
}

export const CustomTypo = styled(CustomTypography)(({ theme }) => ({
  fontFamily: 'IBM Plex Mono',
  fontStyle: 'normal',
  fontWeight: '700 !important',
  color: `custom.black.primary`,
  textOverflow: 'ellipsis',
  whiteSpace: 'wrap',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    fontSize: '11px',
    lineHeight: '14px'
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '16px',
    lineHeight: '20px'
  }
}))

const TableFunds = React.memo((props: TableFundsProps) => {
  const { funds, totals } = props
  const [displayAll, setDisplayAll] = React.useState(false)

  const isDDay = isFeatureFlagOne()

  const { state } = useApp()
  const { currency } = state

  const isMD = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  const [isScrollable, setIsScrollable] = React.useState({
    top: false,
    bottom: false,
    left: false,
    right: false
  })

  const checkScrollable = debounce(() => {
    const element = tableContainerRef.current
    if (!element) return

    setIsScrollable({
      top: element.scrollTop > 0,
      bottom: !(element.scrollHeight - element.scrollTop - 1 < element.clientHeight),
      left: element.scrollLeft > 0,
      right: element.scrollLeft < element.scrollWidth - element.clientWidth - 1
    })
  }, 250)

  React.useEffect(() => {
    checkScrollable()
    window.addEventListener('resize', checkScrollable)
    return () => {
      window.removeEventListener('resize', checkScrollable)
    }
  }, [])

  React.useEffect(() => {
    const element = tableContainerRef.current
    if (!element) return

    element.addEventListener('scroll', checkScrollable)
    return () => {
      element.removeEventListener('scroll', checkScrollable)
    }
  }, [])

  const firstRowRef = React.useRef<HTMLElement>(null)
  const lastRowRef = React.useRef<HTMLElement>(null)
  const [firstRowHeight, setFirstRowHeight] = React.useState(0)
  const [lastRowHeight, setLastRowHeight] = React.useState(0)
  React.useEffect(() => {
    if (firstRowRef.current) {
      setFirstRowHeight(firstRowRef.current.clientHeight + 20)
    }
    if (lastRowRef.current) {
      setLastRowHeight(lastRowRef.current.clientHeight + 20)
    }
  }, [])

  return (
    <>
      {isMD && (
        <TableContainer component={Box} sx={{ width: '100%', overflowX: 'auto' }}>
          <Table sx={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <TableHead>
              <TableRow>
                <TableHeadCellCustom
                  sx={{
                    width: isDDay ? '33%' : '25%',
                    position: 'sticky',
                    left: 0,
                    zIndex: 1,
                    backgroundColor: 'background.paper'
                  }}
                  align="left"
                >
                  <CustomTypo>Position</CustomTypo>
                </TableHeadCellCustom>
                <TableHeadCellCustom sx={{ width: isDDay ? '33%' : '25%' }} align="right">
                  <CustomTypo>{isDDay ? 'DeFi funds' : 'Farming funds'}</CustomTypo>
                </TableHeadCellCustom>
                {!isDDay ? (
                  <TableHeadCellCustom sx={{ width: '25%' }} align="right">
                    <CustomTypo>Unclaimed rewards</CustomTypo>
                  </TableHeadCellCustom>
                ) : null}
                <TableHeadCellCustom sx={{ width: isDDay ? '33%' : '25%' }} align="right">
                  <BoxWrapperRow sx={{ justifyContent: 'flex-end' }} gap={0}>
                    <CustomTypo>{isDDay ? 'DeFi results' : 'Farming results'}</CustomTypo>
                    <Tooltip
                      enterTouchDelay={0}
                      title={
                        isDDay
                          ? 'DeFi results include fees, rebasing, pool token variation and rewards from DeFi positions'
                          : 'Farming results include results from fees, rebasing, pool token variation and rewards'
                      }
                      sx={{
                        ml: 1,
                        cursor: 'pointer'
                      }}
                    >
                      <InfoIcon />
                    </Tooltip>
                  </BoxWrapperRow>
                </TableHeadCellCustom>
              </TableRow>
            </TableHead>
            <TableBody>
              {funds.length === 0 ? (
                <TableRow>
                  <TableEmptyCellCustom colSpan={5}>
                    <EmptyData />
                  </TableEmptyCellCustom>
                </TableRow>
              ) : (
                <>
                  {funds.map((row: any, index: number) => {
                    if (!displayAll && index > 4) return null

                    const lastOne = funds.length - 1 === index

                    return (
                      <TableRow key={index}>
                        <TableCellCustom
                          sx={{
                            ...(lastOne ? { borderBottom: 'none' } : {}),
                            width: isDDay ? '25%' : '20%',
                            position: 'sticky',
                            left: 0,
                            zIndex: 1,
                            backgroundColor: 'background.paper'
                          }}
                          align="left"
                        >
                          <BoxWrapperRow
                            sx={{ overflowWrap: 'anywhere', justifyContent: 'flex-start' }}
                          >
                            <BoxWrapperColumn>
                              <CustomTypo>{row.position}</CustomTypo>
                              <CustomTypography
                                variant="tableCellSubData"
                                sx={{
                                  fontSize: {
                                    xs: '11px',
                                    md: '16px'
                                  },
                                  fontWeight: '400 !important'
                                }}
                              >
                                {row.protocol}
                              </CustomTypography>
                              <CustomTypography
                                variant="tableCellSubData"
                                sx={{
                                  fontSize: {
                                    xs: '11px',
                                    md: '16px'
                                  },
                                  fontWeight: '400 !important',
                                  fontStyle: 'italic'
                                }}
                              >
                                {row.blockchain}
                              </CustomTypography>
                            </BoxWrapperColumn>
                            {row.protocol === UNISWAP_PROTOCOL ? <UniswapHelpText /> : null}
                          </BoxWrapperRow>
                        </TableCellCustom>
                        <TableCellCustom
                          sx={{
                            width: isDDay ? '25%' : '20%',
                            ...(lastOne ? { borderBottom: 'none' } : {})
                          }}
                          align="right"
                        >
                          <BoxWrapperColumn>
                            <CustomTypo>
                              {currency === 'USD'
                                ? formatCurrency(row.funds || 0)
                                : formatNumber(row.funds, 0)}
                            </CustomTypo>
                            {row?.allocation > 0 ? (
                              <CustomTypography
                                variant="tableCellSubData"
                                sx={{
                                  fontSize: {
                                    xs: '11px',
                                    md: '16px'
                                  },
                                  fontWeight: '400 !important'
                                }}
                              >
                                {formatPercentage(row.allocation / 100)}
                              </CustomTypography>
                            ) : null}
                          </BoxWrapperColumn>
                        </TableCellCustom>
                        {!isDDay ? (
                          <TableCellCustom
                            sx={{ width: '20%', ...(lastOne ? { borderBottom: 'none' } : {}) }}
                            align="right"
                          >
                            <CustomTypo sx={{ fontWeight: '400 !important' }}>
                              {currency === 'USD'
                                ? formatCurrency(row.unclaimed || 0)
                                : formatNumber(row.unclaimed, 0)}
                            </CustomTypo>
                          </TableCellCustom>
                        ) : null}
                        <TableCellCustom
                          sx={{
                            width: isDDay ? '25%' : '20%',
                            ...(lastOne ? { borderBottom: 'none' } : {})
                          }}
                          align="right"
                        >
                          <CustomTypo>
                            {currency === 'USD'
                              ? formatCurrency(row.results || 0)
                              : formatNumber(row.results, 1)}
                          </CustomTypo>
                        </TableCellCustom>
                      </TableRow>
                    )
                  })}

                  {funds.length > 5 ? (
                    <TableRow>
                      <TableCellCustom colSpan={4} align="center" sx={{ borderBottom: 'none' }}>
                        <BoxWrapperRow gap={1}>
                          <CustomTypography
                            variant="tableCellSubData"
                            sx={{
                              cursor: 'pointer',
                              align: 'center',
                              fontSize: {
                                xs: '12px',
                                md: '16px'
                              }
                            }}
                            onClick={() => setDisplayAll(!displayAll)}
                          >
                            {!displayAll
                              ? `${funds.length > 4 ? 5 : funds.length} of ${funds.length}`
                              : `${funds.length} of ${funds.length}`}
                          </CustomTypography>
                          <CustomTypography
                            variant="tableCellSubData"
                            sx={{
                              cursor: 'pointer',
                              textDecoration: 'underline',
                              align: 'center',
                              fontWeight: '700 !important',
                              fontSize: {
                                xs: '12px',
                                md: '16px'
                              }
                            }}
                            onClick={() => setDisplayAll(!displayAll)}
                          >
                            {displayAll ? 'View less' : 'View all'}
                          </CustomTypography>
                        </BoxWrapperRow>
                      </TableCellCustom>
                    </TableRow>
                  ) : null}

                  <TableRow>
                    <TableFooterCellCustom
                      colSpan={1}
                      align="left"
                      sx={{
                        position: 'sticky',
                        left: 0,
                        zIndex: 1,
                        backgroundColor: 'background.paper'
                      }}
                    >
                      <CustomTypo>Total</CustomTypo>
                    </TableFooterCellCustom>
                    <TableFooterCellCustom sx={{ width: isDDay ? '33%' : '25%' }} align="right">
                      <CustomTypo>
                        {currency === 'USD'
                          ? formatCurrency(totals?.fundsTotal || 0)
                          : formatNumber(totals?.fundsTotal || 0, 0)}
                      </CustomTypo>
                    </TableFooterCellCustom>
                    {!isDDay ? (
                      <TableFooterCellCustom sx={{ width: isDDay ? '33%' : '25%' }} align="right">
                        <CustomTypo>
                          {currency === 'USD'
                            ? formatCurrency(totals?.unclaimedTotal || 0)
                            : formatNumber(totals?.unclaimedTotal || 0, 0)}
                        </CustomTypo>
                      </TableFooterCellCustom>
                    ) : null}
                    <TableFooterCellCustom sx={{ width: isDDay ? '33%' : '25%' }} align="right">
                      <CustomTypo>
                        {currency === 'USD'
                          ? formatCurrency(totals?.resultsTotal || 0)
                          : formatNumber(totals?.resultsTotal || 0, 1)}
                      </CustomTypo>
                    </TableFooterCellCustom>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!isMD && (
        <Box
          sx={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block',
            whiteSpace: 'nowrap'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: `${firstRowHeight}px`,
              margin: 0,
              padding: 0,
              left: '50%',
              animation: 'jumpInfiniteUp 1.2s infinite',
              display: isScrollable.top ? 'block' : 'none',
              zIndex: 2
            }}
          >
            <ArrowUpwardIcon style={{ fontSize: '20px', color: '#232323' }} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              margin: 0,
              padding: 0,
              left: `10px`,
              animation: 'jumpInfiniteHorizontalLeft 1.5s infinite',
              display: isScrollable.left ? 'block' : 'none',
              zIndex: 2
            }}
          >
            <ArrowBackIcon style={{ fontSize: '20px', color: '#232323' }} />
          </Box>
          <TableContainer
            component={Box}
            ref={tableContainerRef}
            sx={{ width: '100%', height: '600px', overflow: 'auto', bgcolor: 'background.paper' }}
          >
            <Box sx={{ maxHeight: '600px' }}>
              <Table
                stickyHeader
                sx={{ borderCollapse: 'separate', borderSpacing: 0, transform: 'translateZ(0)' }}
              >
                <TableHead sx={{ bgcolor: 'background.paper' }}>
                  <TableRow>
                    <TableHeadCellCustom
                      ref={firstRowRef}
                      sx={{
                        width: isDDay ? '33%' : '25%',
                        align: 'left',
                        position: 'sticky',
                        left: 0,
                        backgroundColor: 'background.paper',
                        zIndex: 2,
                        padding: '0.6rem 0 0.6rem 0.5rem'
                      }}
                      align="left"
                    >
                      <CustomTypo>Position</CustomTypo>
                    </TableHeadCellCustom>
                    <TableHeadCellCustom
                      sx={{
                        width: isDDay ? '33%' : '25%',
                        zIndex: 1,
                        padding: '0.6rem 0 0.6rem 0.5rem'
                      }}
                      align="right"
                    >
                      <CustomTypo>{isDDay ? 'DeFi funds' : 'Farming funds'}</CustomTypo>
                    </TableHeadCellCustom>
                    {!isDDay ? (
                      <TableHeadCellCustom
                        sx={{ width: '25%', zIndex: 1, padding: '0.6rem 0 0.6rem 0.5rem' }}
                        align="right"
                      >
                        <CustomTypo>Unclaimed rewards</CustomTypo>
                      </TableHeadCellCustom>
                    ) : null}
                    <TableHeadCellCustom
                      sx={{
                        width: isDDay ? '33%' : '25%',
                        zIndex: 1,
                        padding: '0.6rem 0.5rem 0.6rem 0'
                      }}
                      align="right"
                    >
                      <BoxWrapperRow sx={{ justifyContent: 'flex-end' }} gap={0}>
                        <CustomTypo>{isDDay ? 'DeFi results' : 'Farming results'}</CustomTypo>
                        <Tooltip
                          enterTouchDelay={0}
                          title={
                            isDDay
                              ? 'DeFi results include fees, rebasing, pool token variation and rewards from DeFi positions'
                              : 'Farming results include results from fees, rebasing, pool token variation and rewards'
                          }
                          sx={{
                            ml: 1,
                            cursor: 'pointer'
                          }}
                        >
                          <InfoIcon />
                        </Tooltip>
                      </BoxWrapperRow>
                    </TableHeadCellCustom>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {funds.length === 0 ? (
                    <TableRow>
                      <TableEmptyCellCustom colSpan={5}>
                        <EmptyData />
                      </TableEmptyCellCustom>
                    </TableRow>
                  ) : (
                    <>
                      {funds.map((row: any, index: number) => {
                        const lastOne = funds.length - 1 === index

                        return (
                          <TableRow key={index} sx={{ zIndex: -20 }}>
                            <TableCellCustom
                              sx={{
                                ...(lastOne ? { borderBottom: 'none' } : {}),
                                width: isDDay ? '25%' : '20%',
                                align: 'left',
                                position: 'sticky',
                                left: 0,
                                zIndex: 1,
                                backgroundColor: 'background.paper',
                                padding: '0.6rem 0 0.6rem 0.5rem'
                              }}
                            >
                              <BoxWrapperRow
                                sx={{ overflowWrap: 'anywhere', justifyContent: 'flex-start' }}
                              >
                                <BoxWrapperColumn>
                                  <CustomTypo>{row.position}</CustomTypo>
                                  <CustomTypography
                                    variant="tableCellSubData"
                                    sx={{
                                      fontSize: {
                                        xs: '11px',
                                        md: '16px'
                                      },
                                      fontWeight: '400 !important',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'wrap',
                                      overflow: 'hidden'
                                    }}
                                  >
                                    {row.protocol}
                                  </CustomTypography>
                                  <CustomTypography
                                    variant="tableCellSubData"
                                    sx={{
                                      fontSize: {
                                        xs: '11px',
                                        md: '16px'
                                      },
                                      fontWeight: '400 !important',
                                      fontStyle: 'italic'
                                    }}
                                  >
                                    {row.blockchain}
                                  </CustomTypography>
                                </BoxWrapperColumn>
                                {row.protocol === UNISWAP_PROTOCOL ? <UniswapHelpText /> : null}
                              </BoxWrapperRow>
                            </TableCellCustom>
                            <TableCellCustom
                              sx={{
                                ...(lastOne ? { borderBottom: 'none' } : {}),
                                width: isDDay ? '25%' : '20%',
                                padding: '0.6rem 0 0.6rem 0.5rem'
                              }}
                              align="right"
                            >
                              <BoxWrapperColumn>
                                <CustomTypo>
                                  {currency === 'USD'
                                    ? formatCurrency(row.funds || 0)
                                    : formatNumber(row.funds, 0)}
                                </CustomTypo>
                                {row?.allocation > 0 ? (
                                  <CustomTypography
                                    variant="tableCellSubData"
                                    sx={{
                                      fontSize: {
                                        xs: '11px',
                                        md: '16px'
                                      },
                                      fontWeight: '400 !important'
                                    }}
                                  >
                                    {formatPercentage(row.allocation / 100)}
                                  </CustomTypography>
                                ) : null}
                              </BoxWrapperColumn>
                            </TableCellCustom>
                            {!isDDay ? (
                              <TableCellCustom
                                sx={{
                                  width: '20%',
                                  ...(lastOne ? { borderBottom: 'none' } : {}),
                                  padding: '0.6rem 0 0.6rem 0.5rem'
                                }}
                                align="right"
                              >
                                <CustomTypo sx={{ fontWeight: '400 !important' }}>
                                  {currency === 'USD'
                                    ? formatCurrency(row.unclaimed || 0)
                                    : formatNumber(row.unclaimed, 0)}
                                </CustomTypo>
                              </TableCellCustom>
                            ) : null}
                            <TableCellCustom
                              sx={{
                                width: isDDay ? '25%' : '20%',
                                ...(lastOne ? { borderBottom: 'none' } : {}),
                                padding: '0.6rem 0.5rem 0.6rem 0'
                              }}
                              align="right"
                            >
                              <CustomTypo>
                                {currency === 'USD'
                                  ? formatCurrency(row.results || 0)
                                  : formatNumber(row.results, 1)}
                              </CustomTypo>
                            </TableCellCustom>
                          </TableRow>
                        )
                      })}
                    </>
                  )}
                  {Object.values(totals).length === 0 ? null : (
                    <TableRow>
                      <TableFooterCellCustom
                        ref={lastRowRef}
                        sx={{
                          position: 'sticky',
                          zIndex: 1,
                          backgroundColor: 'background.paper',
                          align: 'left',
                          left: 0,
                          bottom: 0,
                          padding: '0.6rem 0 0.6rem 0.5rem'
                        }}
                        colSpan={1}
                        align="left"
                      >
                        <CustomTypo>Total</CustomTypo>
                      </TableFooterCellCustom>
                      <TableFooterCellCustom
                        sx={{
                          width: isDDay ? '33%' : '25%',
                          position: 'sticky',
                          bottom: 0,
                          zIndex: 1,
                          backgroundColor: 'background.paper',
                          padding: '0.6rem 0 0.6rem 0.5rem'
                        }}
                        align="right"
                      >
                        <CustomTypo>
                          {currency === 'USD'
                            ? formatCurrency(totals?.fundsTotal || 0)
                            : formatNumber(totals?.fundsTotal || 0, 0)}
                        </CustomTypo>
                      </TableFooterCellCustom>
                      {!isDDay ? (
                        <TableFooterCellCustom
                          sx={{
                            width: isDDay ? '33%' : '25%',
                            position: 'sticky',
                            bottom: 0,
                            zIndex: 1,
                            backgroundColor: 'background.paper',
                            padding: '0.6rem 0.5rem 0.6rem 0'
                          }}
                          align="right"
                        >
                          <CustomTypo>
                            {currency === 'USD'
                              ? formatCurrency(totals?.unclaimedTotal || 0)
                              : formatNumber(totals?.unclaimedTotal || 0, 0)}
                          </CustomTypo>
                        </TableFooterCellCustom>
                      ) : null}
                      <TableFooterCellCustom
                        sx={{
                          width: isDDay ? '33%' : '25%',
                          position: 'sticky',
                          bottom: 0,
                          zIndex: 1,
                          backgroundColor: 'background.paper',
                          padding: '0.6rem 0.5rem 0.6rem 0'
                        }}
                        align="right"
                      >
                        <CustomTypo>
                          {currency === 'USD'
                            ? formatCurrency(totals?.resultsTotal || 0)
                            : formatNumber(totals?.resultsTotal || 0, 1)}
                        </CustomTypo>
                      </TableFooterCellCustom>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </TableContainer>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              margin: 0,
              padding: 0,
              right: '10px',
              animation: 'jumpInfiniteHorizontalRight 1.2s infinite',
              display: isScrollable.right ? 'block' : 'none',
              zIndex: 2
            }}
          >
            <ArrowForwardIcon style={{ fontSize: '20px', color: '#232323' }} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: `${lastRowHeight}px`,
              margin: 0,
              padding: 0,
              left: '50%',
              animation: 'jumpInfiniteDown 1.5s infinite',
              display: isScrollable.bottom ? 'block' : 'none',
              zIndex: 2
            }}
          >
            <ArrowDownwardIcon style={{ fontSize: '20px', color: '#232323' }} />
          </Box>
        </Box>
      )}
    </>
  )
})

TableFunds.displayName = 'TableFunds'

export default TableFunds
