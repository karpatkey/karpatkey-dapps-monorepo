import { formatCurrency, formatNumber, formatPercentage } from 'src/utils/format'
import {
  BoxWrapperColumn,
  BoxWrapperRow,
  TableHeadCellCustom,
  TableEmptyCellCustom,
  TableCellCustom,
  EmptyData,
  CustomTypography
} from 'src/components'
import {
  Box,
  BoxProps,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Theme
} from '@mui/material'
import * as React from 'react'
import { useApp } from 'src/contexts/app.context'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { debounce } from 'lodash'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

interface TableWalletTokenDetailProps {
  filteredWalletTokenDetail: any[]
  expandCallback: (value: number) => void
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
    lineHeight: '16px'
  }
}))

export const TableWalletTokenDetail = (props: TableWalletTokenDetailProps & BoxProps) => {
  const { filteredWalletTokenDetail, expandCallback, ...moreProps } = props
  const [displayAll, setDisplayAll] = React.useState(false)

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
      setLastRowHeight(lastRowRef.current.clientHeight - 20)
    }
  }, [])

  const customRowHeight = React.useRef<HTMLDivElement>(null)

  return (
    <>
      {isMD && (
        <BoxWrapperColumn gap={4} {...moreProps}>
          <TableContainer component={Box} sx={{ width: '100%', overflowX: 'auto' }}>
            <Table sx={{ borderCollapse: 'separate', borderSpacing: 0 }}>
              <TableHead>
                <TableRow>
                  <TableHeadCellCustom
                    sx={{
                      width: '33%',
                      position: 'sticky',
                      left: 0,
                      zIndex: 1,
                      backgroundColor: 'background.paper'
                    }}
                    align="left"
                  >
                    <CustomTypo>Token symbol</CustomTypo>
                  </TableHeadCellCustom>
                  <TableHeadCellCustom sx={{ width: '33%' }} align="right">
                    <CustomTypo>Share</CustomTypo>
                  </TableHeadCellCustom>
                  <TableHeadCellCustom sx={{ width: '33%' }} align="right">
                    <CustomTypo>Token balance</CustomTypo>
                  </TableHeadCellCustom>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredWalletTokenDetail.length === 0 ? (
                  <TableRow>
                    <TableEmptyCellCustom colSpan={3}>
                      <EmptyData />
                    </TableEmptyCellCustom>
                  </TableRow>
                ) : (
                  <>
                    {filteredWalletTokenDetail.map((row: any, index: number) => {
                      if (!displayAll && index > 4) return null

                      // check if is the first row
                      const isTheFirstRow = index === 0

                      return (
                        <TableRow key={index} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                          <TableCellCustom
                            sx={{
                              width: '33%',
                              position: 'sticky',
                              left: 0,
                              zIndex: 1,
                              backgroundColor: 'background.paper'
                            }}
                            align="left"
                            ref={isTheFirstRow ? customRowHeight : null}
                          >
                            <BoxWrapperColumn>
                              <CustomTypo>{row.tokenSymbol}</CustomTypo>
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
                                {row.blockchain}
                              </CustomTypography>
                            </BoxWrapperColumn>
                          </TableCellCustom>
                          <TableCellCustom sx={{ width: '33%' }} align="right">
                            <CustomTypo>{formatPercentage(row.allocation)}</CustomTypo>
                          </TableCellCustom>
                          <TableCellCustom sx={{ width: '33%' }} align="right">
                            <BoxWrapperColumn>
                              <CustomTypo>{formatNumber(row.tokenBalance)}</CustomTypo>
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
                                {currency === 'USD'
                                  ? formatCurrency(row.usdValue, 2)
                                  : `${formatNumber(row.usdValue, 2)} ETH`}
                              </CustomTypography>
                            </BoxWrapperColumn>
                          </TableCellCustom>
                        </TableRow>
                      )
                    })}
                    {filteredWalletTokenDetail.length > 5 ? (
                      <TableRow>
                        <TableCellCustom colSpan={3} align="center">
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
                              onClick={() => {
                                setDisplayAll(!displayAll)
                                if (customRowHeight.current) {
                                  const value = !displayAll
                                    ? customRowHeight.current.clientHeight *
                                        filteredWalletTokenDetail.length +
                                      100
                                    : 520
                                  expandCallback(value)
                                }
                              }}
                            >
                              {!displayAll
                                ? `${
                                    filteredWalletTokenDetail.length > 4
                                      ? 5
                                      : filteredWalletTokenDetail.length
                                  } of ${filteredWalletTokenDetail.length}`
                                : `${filteredWalletTokenDetail.length} of ${filteredWalletTokenDetail.length}`}
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
                              onClick={() => {
                                setDisplayAll(!displayAll)
                                if (customRowHeight.current) {
                                  const value = !displayAll
                                    ? customRowHeight.current.clientHeight *
                                        filteredWalletTokenDetail.length +
                                      100
                                    : 520
                                  expandCallback(value)
                                }
                              }}
                            >
                              {displayAll ? 'View less' : 'View all'}
                            </CustomTypography>
                          </BoxWrapperRow>
                        </TableCellCustom>
                      </TableRow>
                    ) : null}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </BoxWrapperColumn>
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
              animation: 'jumpInfiniteHorizontalLeft 1.2s infinite',
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
                <TableHead>
                  <TableRow>
                    <TableHeadCellCustom
                      ref={firstRowRef}
                      sx={{
                        width: '33%',
                        position: 'sticky',
                        align: 'left',
                        left: 0,
                        backgroundColor: 'background.paper',
                        zIndex: 2
                      }}
                      align="left"
                    >
                      <CustomTypo>Token symbol</CustomTypo>
                    </TableHeadCellCustom>
                    <TableHeadCellCustom sx={{ width: '33%' }} align="right">
                      <CustomTypo>Share</CustomTypo>
                    </TableHeadCellCustom>
                    <TableHeadCellCustom sx={{ width: '33%' }} align="right">
                      <CustomTypo>Token balance</CustomTypo>
                    </TableHeadCellCustom>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredWalletTokenDetail.length === 0 ? (
                    <TableRow>
                      <TableEmptyCellCustom colSpan={3}>
                        <EmptyData />
                      </TableEmptyCellCustom>
                    </TableRow>
                  ) : (
                    <>
                      {filteredWalletTokenDetail.map((row: any, index: number) => {
                        const lastOne = filteredWalletTokenDetail.length - 1 === index

                        return (
                          <TableRow key={index} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                            <TableCellCustom
                              ref={lastOne ? lastRowRef : null}
                              sx={{
                                width: '33%',
                                maxWidth: '100px',
                                position: 'sticky',
                                left: 0,
                                zIndex: 1,
                                backgroundColor: 'background.paper'
                              }}
                              align="left"
                            >
                              <BoxWrapperColumn>
                                <CustomTypo>{row.tokenSymbol}</CustomTypo>
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
                                  {row.blockchain}
                                </CustomTypography>
                              </BoxWrapperColumn>
                            </TableCellCustom>
                            <TableCellCustom sx={{ width: '33%' }} align="right">
                              <CustomTypo>{formatPercentage(row.allocation)}</CustomTypo>
                            </TableCellCustom>
                            <TableCellCustom sx={{ width: '33%' }} align="right">
                              <BoxWrapperColumn>
                                <CustomTypo>{formatNumber(row.tokenBalance)}</CustomTypo>
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
                                  {currency === 'USD'
                                    ? formatCurrency(row.usdValue, 2)
                                    : `${formatNumber(row.usdValue, 2)} ETH`}
                                </CustomTypography>
                              </BoxWrapperColumn>
                            </TableCellCustom>
                          </TableRow>
                        )
                      })}
                    </>
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
              animation: 'jumpInfiniteDown 1.2s infinite',
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
}
