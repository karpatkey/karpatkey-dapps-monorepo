import { formatCurrency } from '@karpatkey-monorepo/reports/src/utils/format'
import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import TableFooterCellCustom from '@karpatkey-monorepo/shared/components/Table/TableFooterCellCustom'
import TableHeadCellCustom from '@karpatkey-monorepo/shared/components/Table/TableHeadCellCustom'
import { BoxProps, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import Box from '@mui/material/Box'
import * as React from 'react'

type TableBlockchainProps = {
  balanceOverviewBlockchain: { funds: number; row: string; column: string }[]
} & BoxProps

const TableBlockchain = (props: TableBlockchainProps) => {
  const { balanceOverviewBlockchain = [] } = props

  const balanceOverviewBlockchainSorted = balanceOverviewBlockchain
    .reduce((acc: any, cur: any) => {
      if (!acc.includes(cur.column)) {
        acc.push(cur.column)
      }
      return acc
    }, [])
    .sort((a: any, b: any) => a.localeCompare(b))

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

  const columnWidthPercentage = 100 / ((balanceOverviewBlockchainSorted?.length ?? 0) + 2) + '%'

  return (
    <TableContainer component={Box}>
      <Table sx={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableHeadCellCustom sx={{ width: columnWidthPercentage }} align="left">
              Token category
            </TableHeadCellCustom>
            {balanceOverviewBlockchainSorted.map((blockchainName: any, index: number) => (
              <TableHeadCellCustom key={index} sx={{ width: columnWidthPercentage }} align="left">
                {blockchainName}
              </TableHeadCellCustom>
            ))}
            <TableHeadCellCustom sx={{ width: columnWidthPercentage }} align="left">
              Total
            </TableHeadCellCustom>
          </TableRow>
        </TableHead>
        <TableBody>
          {balanceOverviewBlockchainFlattenedAndSortedByTotal.map((item: any, index: number) => {
            const { category, total = 0 } = item
            return (
              <TableRow key={index}>
                <TableCellCustom sx={{ width: columnWidthPercentage }} align="left">
                  {category}
                </TableCellCustom>
                {balanceOverviewBlockchainSorted.map((blockchainName: any, index: number) => {
                  const value = item[blockchainName] ?? 0
                  return (
                    <TableCellCustom key={index} sx={{ width: columnWidthPercentage }} align="left">
                      {formatCurrency(Math.round(value))}
                    </TableCellCustom>
                  )
                })}
                <TableCellCustom sx={{ width: columnWidthPercentage }} align="left">
                  {formatCurrency(Math.round(total || 0))}
                </TableCellCustom>
              </TableRow>
            )
          })}
          <TableRow>
            <TableFooterCellCustom sx={{ width: columnWidthPercentage }} align="left">
              Total
            </TableFooterCellCustom>
            {balanceOverviewBlockchainSorted.map((blockchainName: any, index: number) => {
              const total = totals[blockchainName] ?? 0
              return (
                <TableFooterCellCustom
                  key={index}
                  sx={{ width: columnWidthPercentage }}
                  align="left"
                >
                  {formatCurrency(Math.round(total))}
                </TableFooterCellCustom>
              )
            })}
            <TableFooterCellCustom sx={{ width: columnWidthPercentage }} align="left">
              {formatCurrency(totals['total'] || 0)}
            </TableFooterCellCustom>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableBlockchain
