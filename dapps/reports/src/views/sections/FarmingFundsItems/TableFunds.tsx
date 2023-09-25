import { formatCurrency, formatPercentage } from '@karpatkey-monorepo/reports/src/utils/format'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import TableEmptyCellCustom from '@karpatkey-monorepo/shared/components/Table/TableEmptyCellCustom'
import TableFooterCellCustom from '@karpatkey-monorepo/shared/components/Table/TableFooterCellCustom'
import TableHeadCellCustom from '@karpatkey-monorepo/shared/components/Table/TableHeadCellCustom'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { Box, Table, TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material'
import * as React from 'react'
import UniswapHelpText from '@karpatkey-monorepo/shared/components/UniswapHelpText'
import { UNISWAP_PROTOCOL } from '@karpatkey-monorepo/reports/src/config/constants'

interface TableFundsProps {
  funds: any
  totals: any
}

const BoxWrapper = styled(BoxWrapperColumn)({
  minWidth: 'max-content',
  width: '125px',
  maxWidth: '100%',
  alignItems: 'flex-end'
})

const TableFunds = (props: TableFundsProps) => {
  const { funds, totals } = props
  const [displayAll, setDisplayAll] = React.useState(false)

  return (
    <BoxWrapperColumn gap={4}>
      <TableContainer component={Box}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Blockchain
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Position
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Farming funds
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Unclaimed rewards
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Farming results *
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

                  return (
                    <TableRow key={index}>
                      <TableCellCustom sx={{ width: '20%' }} align="left">
                        {row.blockchain}
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '20%' }} align="left">
                        <BoxWrapperRow
                          sx={{
                            width: '90%',
                            overflowWrap: 'anywhere',
                            justifyContent: 'flex-start'
                          }}
                        >
                          <BoxWrapperColumn>
                            {row.position}
                            <CustomTypography variant="tableCellSubData">
                              {row.protocol}
                            </CustomTypography>
                          </BoxWrapperColumn>
                          {row.protocol === UNISWAP_PROTOCOL ? <UniswapHelpText /> : null}
                        </BoxWrapperRow>
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '20%' }} align="left">
                        <BoxWrapper>
                          {formatCurrency(Math.round(row.funds || 0))}
                          {row?.allocation > 0 ? (
                            <CustomTypography variant="tableCellSubData">
                              {formatPercentage(row.allocation / 100)}
                            </CustomTypography>
                          ) : null}
                        </BoxWrapper>
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '20%' }} align="left">
                        {formatCurrency(Math.round(row.unclaimed || 0))}
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '20%' }} align="left">
                        {formatCurrency(Math.round(row.results || 0))}
                      </TableCellCustom>
                    </TableRow>
                  )
                })}

                {funds.length > 5 ? (
                  <TableRow>
                    <TableCellCustom colSpan={5} align="center">
                      <BoxWrapperRow gap={1}>
                        <CustomTypography
                          variant="tableCellSubData"
                          sx={{ cursor: 'pointer', align: 'center' }}
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

                <TableRow>
                  <TableFooterCellCustom colSpan={2} align="left">
                    Total
                  </TableFooterCellCustom>
                  <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                    <BoxWrapper>{formatCurrency(Math.round(totals?.fundsTotal || 0))}</BoxWrapper>
                  </TableFooterCellCustom>
                  <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                    {formatCurrency(Math.round(totals?.unclaimedTotal || 0))}
                  </TableFooterCellCustom>
                  <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                    {formatCurrency(Math.round(totals?.resultsTotal || 0))}
                  </TableFooterCellCustom>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomTypography
        variant="body2"
        color="textSecondary"
        align="left"
        sx={{ fontStyle: 'italic' }}
      >
        * Farming Results include results from fees, rebasing, pool token variation and rewards
      </CustomTypography>
    </BoxWrapperColumn>
  )
}

export default TableFunds
