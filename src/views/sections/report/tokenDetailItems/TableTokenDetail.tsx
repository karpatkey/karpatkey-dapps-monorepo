import {
  formatCurrency,
  formatCurrencyWithPrecision,
  formatNumber,
  formatNumberWithPrecision,
  formatPercentage
} from 'src/utils/format'
import {
  BoxWrapperColumn,
  BoxWrapperRow,
  TableHeadCellCustom,
  TableEmptyCellCustom,
  TableCellCustom,
  EmptyData,
  CustomTypography
} from 'src/components'

import { TOKEN_COINGECKO_PRICE_URL } from 'src/config/constants'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box, Table, TableBody, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import * as React from 'react'
import { isYearAndMonthValid } from 'src/utils/params'
import { useApp } from 'src/contexts/app.context'

interface TableTokenDetailProps {
  filteredTokenDetails: any[]
}

export const TableTokenDetail = (props: TableTokenDetailProps) => {
  const { filteredTokenDetails } = props
  const [displayAll, setDisplayAll] = React.useState(false)

  const isDDay = isYearAndMonthValid()

  const { state } = useApp()
  const { currency } = state

  return (
    <BoxWrapperColumn gap={4}>
      <TableContainer component={Box}>
        <Table sx={{ width: '100%', minWidth: '1200px', overflow: 'scroll' }}>
          <TableHead>
            <TableRow>
              <TableHeadCellCustom sx={{ width: '30%' }} align="left">
                Token symbol
              </TableHeadCellCustom>
              <TableHeadCellCustom
                sx={{ width: '20%', paddingLeft: '20px', paddingRight: '20px' }}
                align="left"
              >
                {currency === 'USD' ? 'Price' : 'ETH Price'}
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Token balance
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '15%' }} align="left">
                {isDDay ? 'Share' : 'Allocation'}
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '15%' }} align="left">
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
                      <TableCellCustom sx={{ width: '30%' }} align="left">
                        <BoxWrapperColumn>
                          {row.tokenSymbol}
                          <CustomTypography variant="tableCellSubData">
                            {row.tokenCategory}
                          </CustomTypography>
                          <CustomTypography variant="tableCellSubData">
                            {row.blockchain.split('|').slice(0, 5).join('|')}
                          </CustomTypography>
                          {row.blockchain.split('|').length > 5 ? (
                            <CustomTypography variant="tableCellSubData">
                              {row.blockchain.split('|').slice(5).join('|')}
                            </CustomTypography>
                          ) : null}
                        </BoxWrapperColumn>
                      </TableCellCustom>
                      <TableCellCustom
                        sx={{ width: '20%', paddingLeft: '20px', paddingRight: '20px' }}
                        align="left"
                      >
                        <BoxWrapperRow gap={1} sx={{ justifyContent: 'flex-start' }}>
                          <Tooltip
                            title={
                              currency === 'USD'
                                ? formatCurrency(row?.price, 4)
                                : formatNumber(row?.price, 10)
                            }
                            sx={{ ml: 1 }}
                          >
                            <span>
                              {currency === 'USD'
                                ? formatCurrencyWithPrecision(row.price)
                                : formatNumberWithPrecision(+row.price?.toFixed(6))}
                            </span>
                          </Tooltip>
                          {TOKEN && (
                            <OpenInNewIcon
                              onClick={onClick}
                              sx={{ cursor: 'pointer', fontSize: '1rem !important' }}
                            />
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
                            {currency === 'USD'
                              ? formatCurrency(row.usdValue, 2)
                              : `${formatNumber(row.usdValue, 2)} ETH`}
                          </CustomTypography>
                        </BoxWrapperColumn>
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '15%' }} align="left">
                        {formatPercentage(row.allocation)}
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '15%' }} align="left">
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