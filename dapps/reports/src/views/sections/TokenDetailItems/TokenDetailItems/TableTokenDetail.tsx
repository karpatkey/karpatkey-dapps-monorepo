import {
  formatCurrency,
  formatCurrencyWithPrecision,
  formatNumber,
  formatPercentage
} from '@karpatkey-monorepo/reports/src/utils/format'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import TableEmptyCellCustom from '@karpatkey-monorepo/shared/components/Table/TableEmptyCellCustom'
import TableHeadCellCustom from '@karpatkey-monorepo/shared/components/Table/TableHeadCellCustom'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { TOKEN_COINGECKO_PRICE_URL } from '@karpatkey-monorepo/shared/config/constants'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box, Table, TableBody, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import * as React from 'react'

interface TableTokenDetailProps {
  filteredTokenDetails: any[]
}

const TableTokenDetail = (props: TableTokenDetailProps) => {
  const { filteredTokenDetails } = props
  const [displayAll, setDisplayAll] = React.useState(false)

  return (
    <BoxWrapperColumn gap={4}>
      <TableContainer component={Box}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Token symbol
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Price
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Token balance
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Allocation
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Price variation
              </TableHeadCellCustom>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTokenDetails.length === 0 ? (
              <TableRow>
                <TableEmptyCellCustom colSpan={5}>
                  <EmptyData />
                </TableEmptyCellCustom>
              </TableRow>
            ) : (
              <>
                {filteredTokenDetails.map((row: any, index: number) => {
                  if (!displayAll && index > 4) return null

                  const TOKEN = TOKEN_COINGECKO_PRICE_URL.find(
                    (item) => item.tokenName.toLowerCase() === row.tokenSymbol.toLowerCase()
                  )
                  const onClick = () => {
                    if (TOKEN) {
                      window.open(TOKEN.url, '_blank')
                    }
                  }

                  return (
                    <TableRow key={index} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                      <TableCellCustom sx={{ width: '20%' }} align="left">
                        <BoxWrapperColumn>
                          {row.tokenSymbol}
                          <CustomTypography variant="tableCellSubData">
                            {row.tokenCategory}
                          </CustomTypography>
                          <CustomTypography variant="tableCellSubData">
                            {row.blockchain}
                          </CustomTypography>
                        </BoxWrapperColumn>
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '20%' }} align="left">
                        <BoxWrapperRow
                          gap={1}
                          sx={{ justifyContent: 'flex-start' }}
                          title={row.priceAvg}
                        >
                          {formatCurrencyWithPrecision(row.priceAvg)}
                          {TOKEN && (
                            <Tooltip title={formatCurrency(row.priceAvg, 4)} sx={{ ml: 1 }}>
                              <OpenInNewIcon
                                onClick={onClick}
                                sx={{ cursor: 'pointer', fontSize: '1rem !important' }}
                              />
                            </Tooltip>
                          )}
                        </BoxWrapperRow>
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '20%' }} align="left">
                        <BoxWrapperColumn
                          sx={{
                            minWidth: 'max-content',
                            width: '125px',
                            maxWidth: '100%',
                            alignItems: 'flex-end'
                          }}
                        >
                          {formatNumber(row.balance)}
                          <CustomTypography variant="tableCellSubData">
                            {formatCurrency(row.usdValue, 2)}
                          </CustomTypography>
                        </BoxWrapperColumn>
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '20%' }} align="left">
                        {formatPercentage(row.allocation)}
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '20%' }} align="left">
                        <BoxWrapperRow gap={1} sx={{ justifyContent: 'flex-start' }}>
                          {formatPercentage(row.priceVariation) === '0.00%' ? (
                            <Tooltip
                              title={formatPercentage(row.priceVariation, 10)}
                              sx={{ ml: 1 }}
                            >
                              <span>{formatPercentage(row.priceVariation)}</span>
                            </Tooltip>
                          ) : (
                            formatPercentage(row.priceVariation)
                          )}

                          {row.priceVariation > 0 ? (
                            <ArrowUpwardIcon sx={{ fontSize: '1rem !important' }} />
                          ) : !row.priceVariation ? null : (
                            <ArrowDownwardIcon sx={{ fontSize: '1rem !important' }} />
                          )}
                        </BoxWrapperRow>
                      </TableCellCustom>
                    </TableRow>
                  )
                })}

                {filteredTokenDetails.length > 5 ? (
                  <TableRow>
                    <TableCellCustom colSpan={5} align="center">
                      <BoxWrapperRow gap={1}>
                        <CustomTypography
                          variant="tableCellSubData"
                          sx={{ cursor: 'pointer', align: 'center' }}
                          onClick={() => setDisplayAll(!displayAll)}
                        >
                          {!displayAll
                            ? `${
                                filteredTokenDetails.length > 4 ? 5 : filteredTokenDetails.length
                              } of ${filteredTokenDetails.length}`
                            : `${filteredTokenDetails.length} of ${filteredTokenDetails.length}`}
                        </CustomTypography>
                        <CustomTypography
                          variant="tableCellSubData"
                          sx={{
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            align: 'center',
                            fontWeight: '700 !important'
                          }}
                          onClick={() => setDisplayAll(!displayAll)}
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
  )
}

export default TableTokenDetail
