import { BoxProps, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import Box from '@mui/material/Box'
import * as React from 'react'
import { formatCurrency, formatNumber } from 'src/utils/format'
import {
  CustomTypography,
  TableCellCustom,
  TableFooterCellCustom,
  TableHeadCellCustom
} from 'src/components'
import { useApp } from 'src/contexts/app.context'
import { styled } from '@mui/material/styles'

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

type TableBlockchainProps = {
  balanceOverviewBlockchain: { funds: number; row: string; column: string }[]
} & BoxProps

export const TableBlockchain = (props: TableBlockchainProps) => {
  const { balanceOverviewBlockchain = [] } = props

  const { state } = useApp()
  const { currency } = state

  const balanceOverviewBlockchainFlattened = balanceOverviewBlockchain.reduce(
    (acc: any, cur: any) => {
      const category = cur.row
      const blockchain = cur.column
      const itemFound = acc.find((item: any) => item.category === cur.row)

      if (itemFound) {
        itemFound[blockchain] = cur?.funds ?? 0
        itemFound.total += cur?.funds ?? 0
        return acc
      }

      acc.push({
        category,
        [blockchain]: cur?.funds ?? 0,
        total: cur?.funds ?? 0
      })

      return acc
    },
    []
  )

  const balanceOverviewBlockchainFlattenedAndSortedByTotal =
    balanceOverviewBlockchainFlattened.sort((a: any, b: any) => b.total - a.total)

  const totals = balanceOverviewBlockchainFlattenedAndSortedByTotal.reduce((acc: any, cur: any) => {
    Object.keys(cur).forEach((column: any) => {
      if (column !== 'category') {
        acc[column] = acc[column] || 0
        acc[column] += cur[column]
      }
    })
    return acc
  }, {})

  const columns = Object.keys(totals)
    .filter((column: any) => column !== 'total')
    .sort((a, b) => totals[b] - totals[a])

  const columnWidthPercentage = 100 / ((columns?.length ?? 0) + 2) + '%'

  return (
    <TableContainer component={Box} sx={{ width: '100%', overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCellCustom sx={{ width: columnWidthPercentage }} align="left">
              <CustomTypo>Token category</CustomTypo>
            </TableHeadCellCustom>
            {columns.map((blockchainName: any, index: number) => (
              <TableHeadCellCustom key={index} sx={{ width: columnWidthPercentage }} align="right">
                <CustomTypo>{blockchainName}</CustomTypo>
              </TableHeadCellCustom>
            ))}
            <TableHeadCellCustom sx={{ width: columnWidthPercentage }} align="right">
              <CustomTypo>Total</CustomTypo>
            </TableHeadCellCustom>
          </TableRow>
        </TableHead>
        <TableBody>
          {balanceOverviewBlockchainFlattenedAndSortedByTotal.map((item: any, index: number) => {
            const { category, total = 0 } = item
            return (
              <TableRow key={index}>
                <TableCellCustom sx={{ width: columnWidthPercentage }} align="left">
                  <CustomTypo>{category}</CustomTypo>
                </TableCellCustom>
                {columns.map((blockchainName: any, index: number) => {
                  const value = item[blockchainName] ?? 0
                  return (
                    <TableCellCustom
                      key={index}
                      sx={{ width: columnWidthPercentage }}
                      align="right"
                    >
                      <CustomTypo sx={{ fontWeight: '400 !important' }}>
                        {currency === 'USD' ? formatCurrency(value) : formatNumber(value, 0)}
                      </CustomTypo>
                    </TableCellCustom>
                  )
                })}
                <TableCellCustom sx={{ width: columnWidthPercentage }} align="right">
                  <CustomTypo>
                    {currency === 'USD' ? formatCurrency(total || 0) : formatNumber(total || 0, 0)}
                  </CustomTypo>
                </TableCellCustom>
              </TableRow>
            )
          })}
          <TableRow>
            <TableFooterCellCustom sx={{ width: columnWidthPercentage }} align="left">
              <CustomTypo>Total</CustomTypo>
            </TableFooterCellCustom>
            {columns.map((blockchainName: any, index: number) => {
              const total = totals[blockchainName] ?? 0
              return (
                <TableFooterCellCustom
                  key={index}
                  sx={{ width: columnWidthPercentage }}
                  align="right"
                >
                  <CustomTypo>
                    {currency === 'USD' ? formatCurrency(total) : formatNumber(total, 0)}
                  </CustomTypo>
                </TableFooterCellCustom>
              )
            })}
            <TableFooterCellCustom sx={{ width: columnWidthPercentage }} align="right">
              <CustomTypo>
                {currency === 'USD'
                  ? formatCurrency(totals['total'] || 0)
                  : formatNumber(totals['total'] || 0, 0)}
              </CustomTypo>
            </TableFooterCellCustom>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
