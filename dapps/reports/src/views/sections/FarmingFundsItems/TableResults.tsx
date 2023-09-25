import { formatCurrency } from '@karpatkey-monorepo/reports/src/utils/format'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import TableEmptyCellCustom from '@karpatkey-monorepo/shared/components/Table/TableEmptyCellCustom'
import TableFooterCellCustom from '@karpatkey-monorepo/shared/components/Table/TableFooterCellCustom'
import TableHeadCellCustom from '@karpatkey-monorepo/shared/components/Table/TableHeadCellCustom'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { Box, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import * as React from 'react'

interface TableResultsProps {
  fundsDetails: any
  totals: any
}

const TableResults = (props: TableResultsProps) => {
  const { fundsDetails, totals } = props
  const [displayAll, setDisplayAll] = React.useState(false)

  return (
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
              Rewards
            </TableHeadCellCustom>
            <TableHeadCellCustom sx={{ width: '20%' }} align="left">
              Fees/Rebasing/Pool Token Variation
            </TableHeadCellCustom>
            <TableHeadCellCustom sx={{ width: '20%' }} align="left">
              Total
            </TableHeadCellCustom>
          </TableRow>
        </TableHead>
        <TableBody>
          {fundsDetails.length === 0 ? (
            <TableRow>
              <TableEmptyCellCustom colSpan={5}>
                <EmptyData />
              </TableEmptyCellCustom>
            </TableRow>
          ) : (
            <>
              {fundsDetails.map((row: any, index: number) => {
                if (!displayAll && index > 4) return null

                return (
                  <TableRow key={index}>
                    <TableCellCustom sx={{ width: '20%' }} align="left">
                      {row?.blockchain}
                    </TableCellCustom>
                    <TableCellCustom sx={{ width: '20%' }} align="left">
                      <BoxWrapperColumn sx={{ width: '90%', overflowWrap: 'anywhere' }}>
                        {row?.position}
                        <CustomTypography variant="tableCellSubData">
                          {row?.protocol}
                        </CustomTypography>
                      </BoxWrapperColumn>
                    </TableCellCustom>
                    <TableCellCustom sx={{ width: '20%' }} align="left">
                      {formatCurrency(row?.rewards?.toFixed(2) || 0)}
                    </TableCellCustom>
                    <TableCellCustom sx={{ width: '20%' }} align="left">
                      {formatCurrency(row?.fees?.toFixed(2)) || 0}
                    </TableCellCustom>
                    <TableCellCustom sx={{ width: '20%' }} align="left">
                      {formatCurrency(row?.total?.toFixed(2) || 0)}
                    </TableCellCustom>
                  </TableRow>
                )
              })}

              {fundsDetails.length > 5 ? (
                <TableRow>
                  <TableCellCustom colSpan={5} align="center">
                    <BoxWrapperRow gap={1}>
                      <CustomTypography
                        variant="tableCellSubData"
                        sx={{ cursor: 'pointer', align: 'center' }}
                        onClick={() => setDisplayAll(!displayAll)}
                      >
                        {!displayAll
                          ? `${fundsDetails.length > 4 ? 5 : fundsDetails.length} of ${
                              fundsDetails.length
                            }`
                          : `${fundsDetails.length} of ${fundsDetails.length}`}
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
                <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                  Total
                </TableFooterCellCustom>
                <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                  {' '}
                </TableFooterCellCustom>
                <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                  {formatCurrency(totals?.rewardsTotal || 0)}
                </TableFooterCellCustom>
                <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                  {formatCurrency(totals?.feesTotal || 0)}
                </TableFooterCellCustom>
                <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                  {formatCurrency(totals?.total || 0)}
                </TableFooterCellCustom>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableResults
