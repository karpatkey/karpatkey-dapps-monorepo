import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import Paper from '@karpatkey-monorepo/shared/components/Paper'
import {
  Box,
  BoxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { styled } from '@mui/material/styles'
import numbro from 'numbro'
import * as React from 'react'

const TableCellTotal = styled(TableCell)(({ theme }) => ({
  lineHeight: '1.5rem',
  fontWeight: 500,
  fontSize: '0.875rem',
  color: theme.palette.text.primary
}))

type TBalanceOverview = { balanceOverviewType: any; balanceOverviewBlockchain: any } & BoxProps

const BalanceOverview: React.FC<TBalanceOverview> = ({
  balanceOverviewType,
  balanceOverviewBlockchain
}: TBalanceOverview) => {
  const dataFooterType: any = {
    'Token Category': 'Total'
  }

  const dataFooterBlockchain: any = {
    'Token Category': 'Total'
  }

  // TODO, we can improve this, we can make a component for this, so we don't repeat the code
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" gap={2}>
      <Box display="flex" flexDirection="column" justifyContent="center" gap={2} mt={5}>
        <CustomTypography variant="h6" align="center">
          Funds by Token Category / Type
        </CustomTypography>
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Token Category</TableCell>
                <TableCell align="right">Farming Funds</TableCell>
                <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  Unclaimed Rewards
                </TableCell>
                <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  Wallet
                </TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {balanceOverviewType.map((row: any, index: number) => {
                dataFooterType['Farming Funds'] =
                  (dataFooterType['Farming Funds'] ?? 0) + row['Farming Funds']
                dataFooterType['Unclaimed Rewards'] =
                  (dataFooterType['Unclaimed Rewards'] ?? 0) + row['Unclaimed Rewards']
                dataFooterType['Wallet'] = (dataFooterType['Wallet'] ?? 0) + row['Wallet']
                dataFooterType['Total'] = (dataFooterType['Total'] ?? 0) + row['Total']

                return (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row['Token Category']}
                    </TableCell>
                    <TableCell align="right">
                      {numbro(row['Farming Funds']).formatCurrency({
                        spaceSeparated: true,
                        mantissa: 2
                      })}
                    </TableCell>
                    <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      {numbro(row['Unclaimed Rewards']).formatCurrency({
                        spaceSeparated: true,
                        mantissa: 2
                      })}
                    </TableCell>
                    <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      {numbro(row['Wallet']).formatCurrency({
                        spaceSeparated: true,
                        mantissa: 2
                      })}
                    </TableCell>
                    <TableCell align="right">
                      {numbro(row['Total']).formatCurrency({
                        spaceSeparated: true,
                        mantissa: 2
                      })}
                    </TableCell>
                  </TableRow>
                )
              })}
              <TableRow>
                <TableCellTotal align="left">{dataFooterType['Token Category']}</TableCellTotal>
                <TableCellTotal align="right">
                  {numbro(dataFooterType['Farming Funds']).formatCurrency({
                    spaceSeparated: true,
                    mantissa: 2
                  })}
                </TableCellTotal>
                <TableCellTotal align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  {numbro(dataFooterType['Unclaimed Rewards']).formatCurrency({
                    spaceSeparated: true,
                    mantissa: 2
                  })}
                </TableCellTotal>
                <TableCellTotal align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  {numbro(dataFooterType['Wallet']).formatCurrency({
                    spaceSeparated: true,
                    mantissa: 2
                  })}
                </TableCellTotal>
                <TableCellTotal align="right">
                  {numbro(dataFooterType['Total']).formatCurrency({
                    spaceSeparated: true,
                    mantissa: 2
                  })}
                </TableCellTotal>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center" gap={2} mt={5}>
        <CustomTypography variant="h6" align="center">
          Funds by Token Category / Blockchain
        </CustomTypography>
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Token Category</TableCell>
                <TableCell align="right">Ethereum</TableCell>
                <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  Gnosis
                </TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {balanceOverviewBlockchain.map((row: any, index: number) => {
                dataFooterBlockchain['Ethereum'] =
                  (dataFooterBlockchain['Ethereum'] ?? 0) + row['Ethereum']
                dataFooterBlockchain['Gnosis'] =
                  (dataFooterBlockchain['Gnosis'] ?? 0) + row['Gnosis']
                dataFooterBlockchain['Total'] = (dataFooterBlockchain['Total'] ?? 0) + row['Total']

                return (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row['Token Category']}
                    </TableCell>
                    <TableCell align="right">
                      {numbro(row['Ethereum']).formatCurrency({
                        spaceSeparated: true,
                        mantissa: 2
                      })}
                    </TableCell>
                    <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      {numbro(row['Gnosis']).formatCurrency({
                        spaceSeparated: true,
                        mantissa: 2
                      })}
                    </TableCell>
                    <TableCell align="right">
                      {numbro(row['Total']).formatCurrency({
                        spaceSeparated: true,
                        mantissa: 2
                      })}
                    </TableCell>
                  </TableRow>
                )
              })}
              <TableRow>
                <TableCellTotal align="left">
                  {dataFooterBlockchain['Token Category']}
                </TableCellTotal>
                <TableCellTotal align="right">
                  {numbro(dataFooterBlockchain['Ethereum']).formatCurrency({
                    spaceSeparated: true,
                    mantissa: 2
                  })}
                </TableCellTotal>
                <TableCellTotal align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  {numbro(dataFooterBlockchain['Gnosis']).formatCurrency({
                    spaceSeparated: true,
                    mantissa: 2
                  })}
                </TableCellTotal>
                <TableCellTotal align="right">
                  {numbro(dataFooterBlockchain['Total']).formatCurrency({
                    spaceSeparated: true,
                    mantissa: 2
                  })}
                </TableCellTotal>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default BalanceOverview
