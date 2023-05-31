import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import TableHeadCellCustom from '@karpatkey-monorepo/shared/components/Table/TableHeadCellCustom'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import numbro from 'numbro'
import * as React from 'react'

interface TableTokenDetailProps {
  filteredTokenDetails: any[]
}

const TableTokenDetail = (props: TableTokenDetailProps) => {
  const { filteredTokenDetails } = props
  return (
    <BoxWrapperColumn gap={4}>
      <TableContainer component={Box}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableHeadCellCustom align="left">Token symbol</TableHeadCellCustom>
              <TableHeadCellCustom align="left">Price</TableHeadCellCustom>
              <TableHeadCellCustom align="right">Token balance</TableHeadCellCustom>
              <TableHeadCellCustom align="right">Allocation</TableHeadCellCustom>
              <TableHeadCellCustom align="right">Price variation</TableHeadCellCustom>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTokenDetails.length === 0 && (
              <TableRow>
                <TableCellCustom align="center" colSpan={5}>
                  No data available
                </TableCellCustom>
              </TableRow>
            )}
            {filteredTokenDetails.map((row: any, index: number) => {
              return (
                <TableRow key={index} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                  <TableCellCustom align="left">
                    <BoxWrapperColumn>
                      {row.tokenSymbol}
                      <CustomTypography variant="tableCellSubData">
                        {row.tokenCategory}
                      </CustomTypography>
                    </BoxWrapperColumn>
                  </TableCellCustom>
                  <TableCellCustom align="left">
                    <BoxWrapperRow gap={1} sx={{ justifyContent: 'flex-start' }}>
                      {numbro(row.priceAvg).formatCurrency({
                        spaceSeparated: false,
                        mantissa: 0,
                        thousandSeparated: true
                      })}
                      <OpenInNewIcon fontSize={'small'} />
                    </BoxWrapperRow>
                  </TableCellCustom>
                  <TableCellCustom align="right">
                    {numbro(row.balance).formatCurrency({
                      spaceSeparated: false,
                      mantissa: 2,
                      thousandSeparated: true
                    })}
                  </TableCellCustom>
                  <TableCellCustom align="right">
                    {numbro(row.allocation).format({
                      output: 'percent',
                      spaceSeparated: false,
                      mantissa: 2
                    })}
                  </TableCellCustom>
                  <TableCellCustom align="right">
                    <BoxWrapperRow gap={1} sx={{ justifyContent: 'flex-end' }}>
                      {numbro(row.priceVariation).format({
                        output: 'percent',
                        spaceSeparated: false,
                        mantissa: 2
                      })}
                      {row.priceVariation > 0 ? (
                        <ArrowUpwardIcon fontSize={'small'} />
                      ) : (
                        <ArrowDownwardIcon fontSize={'small'} />
                      )}
                    </BoxWrapperRow>
                  </TableCellCustom>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </BoxWrapperColumn>
  )
}

export default TableTokenDetail
