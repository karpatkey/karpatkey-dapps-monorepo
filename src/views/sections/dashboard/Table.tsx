import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import React from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Table as MaterialTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material'
import { FILTER_DAOS, MONTHS } from 'src/config/constants'
import { Value } from './Value'
import { formatCurrency, formatNumber, formatPercentage } from 'src/utils/format'
import {
  TableEmptyCellCustom,
  TableCellCustom,
  CustomTypography,
  LinkWrapper
} from 'src/components'
import { Currency, DAOResume } from 'src/contexts/state'
import { isFeatureFlagTwo } from '../../../utils/params'

interface TableProps {
  daoResume: DAOResume[]
  latestMonth: number
  latestYear: number
  currency?: Currency
}

export const Table = ({
  daoResume,
  latestMonth,
  latestYear,
  currency = 'USD' as Currency
}: TableProps) => {
  const router = useRouter()

  const latestMonthLabel = MONTHS.find((month) => month.id === Number(latestMonth))?.label

  const params = { yearArg: latestYear.toString(), monthArg: latestMonth.toString() }
  const isFeatureFlagTwoValue = isFeatureFlagTwo(params)

  return (
    <TableContainer component={Box} sx={{ overflow: 'hidden' /* Hide scrollbars */ }}>
      <MaterialTable>
        <TableHead>
          <TableRow sx={{ '& th': { borderBottom: 'none !important' } }}>
            <TableEmptyCellCustom
              colSpan={2}
              sx={{
                minWidth: '260px',
                maxWidth: '260px',
                paddingY: '4px',
                paddingLeft: '5px'
              }}
            />
            <TableCellCustom
              align="left"
              sx={{
                minWidth: '205px',
                maxWidth: '205px',
                paddingY: '4px',
                paddingX: '20px'
              }}
            >
              <Value
                value={`Total funds \n${currency === 'USD' ? '(ncAUM)' : ''}`}
                fontWeight={600}
                fontSize={'16px'}
              />
            </TableCellCustom>
            <TableCellCustom
              align="left"
              sx={{
                minWidth: '165px',
                maxWidth: '165px',
                paddingY: '4px',
                paddingX: '20px',
                display: 'table-cell'
              }}
            >
              <Value value={'Allocated funds'} fontWeight={600} fontSize={'16px'} />
            </TableCellCustom>
            <TableCellCustom
              align="left"
              sx={{
                minWidth: '145px',
                maxWidth: '145px',
                paddingY: '4px',
                paddingX: '20px',
                display: 'table-cell'
              }}
            >
              <Value value={`DeFi results`} fontWeight={600} fontSize={'16px'} />
            </TableCellCustom>
            {!isFeatureFlagTwoValue && (
              <TableCellCustom
                align="left"
                sx={{
                  minWidth: '115px',
                  maxWidth: '115px',
                  paddingY: '4px',
                  paddingLeft: '20px',
                  marginRight: '5px',
                  display: 'table-cell'
                }}
              >
                <Value value={'APY'} fontWeight={600} fontSize={'16px'} />
              </TableCellCustom>
            )}
            <TableEmptyCellCustom
              sx={{
                minWidth: '25px',
                maxWidth: '25px',
                paddingY: '4px',
                paddingRight: '5px',
                display: 'table-cell'
              }}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {daoResume?.length === 0 ? null : (
            <>
              {daoResume?.map((dao: any, index: number) => {
                const {
                  icon,
                  name,
                  keyName,
                  totalFundsUSD = 0,
                  totalFundsETH = 0,
                  allocatedFunds = 0,
                  deFiResultsUSD = 0,
                  deFiResultsETH = 0,
                  APY = 0,
                  urlToReport
                } = dao

                const isDAOEnsOctober =
                  keyName === 'ENS DAO' && +latestYear === 2023 && +latestMonth === 10
                const isDAOEnsNovember =
                  keyName === 'ENS DAO' && +latestYear === 2023 && +latestMonth === 11
                const CUSTOM_APY = isDAOEnsOctober
                  ? '2.04%'
                  : isDAOEnsNovember
                    ? '2.9%'
                    : formatPercentage(APY)

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const onClick = (e: any) => {
                  if (e.ctrlKey || e.metaKey) {
                    //if ctrl key or command is pressed
                    window.open(urlToReport, '_blank')
                  } else {
                    router.push(urlToReport)
                  }
                }

                const defaultCurrency =
                  FILTER_DAOS.find((dao) => dao.keyName === keyName)?.defaultCurrency ?? currency

                return (
                  <Tooltip
                    key={index}
                    enterTouchDelay={0}
                    title={
                      <CustomTypography variant="body2" sx={{ color: 'common.white' }}>
                        {`Click to see the ${latestMonthLabel} treasury report`}
                      </CustomTypography>
                    }
                    sx={{ cursor: 'pointer' }}
                    PopperProps={{
                      modifiers: [
                        {
                          name: 'offset',
                          options: {
                            offset: [50, -15]
                          }
                        }
                      ]
                    }}
                  >
                    <TableRow
                      onClick={onClick}
                      hover
                      sx={{
                        borderRadius: 10,
                        display: 'table-group-row !important',
                        '& td': {
                          borderBottom: 'none !important'
                        },
                        '&:hover': {
                          cursor: 'pointer'
                        }
                      }}
                    >
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: '120px',
                          maxWidth: '120px',
                          paddingY: '4px',
                          paddingLeft: '5px'
                        }}
                      >
                        <LinkWrapper url={urlToReport}>
                          <Box sx={{ textAlign: 'center' }}>
                            {name.includes('CoW') ? (
                              <img src={icon} alt={name} height={64} />
                            ) : (
                              <img src={icon} alt={name} height={48} />
                            )}
                          </Box>
                        </LinkWrapper>
                      </TableCellCustom>
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: '140px',
                          maxWidth: '140px',
                          paddingY: '4px',
                          paddingLeft: '5px'
                        }}
                      >
                        <LinkWrapper url={urlToReport}>
                          <Value value={name} fontWeight={600} />
                        </LinkWrapper>
                      </TableCellCustom>
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: '205px',
                          maxWidth: '205px',
                          paddingY: '4px',
                          paddingX: '20px'
                        }}
                      >
                        <LinkWrapper url={urlToReport}>
                          <Value
                            value={
                              defaultCurrency === 'USD'
                                ? formatCurrency(totalFundsUSD || 0)
                                : totalFundsETH
                                  ? `${formatNumber(totalFundsETH || 0, 0)} ETH`
                                  : '-'
                            }
                          />
                        </LinkWrapper>
                      </TableCellCustom>
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: '165px',
                          maxWidth: '165px',
                          paddingY: '4px',
                          paddingX: '20px',
                          display: 'table-cell'
                        }}
                      >
                        <LinkWrapper url={urlToReport}>
                          <Value value={formatPercentage(allocatedFunds || 0, 0)} />
                        </LinkWrapper>
                      </TableCellCustom>
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: '145px',
                          maxWidth: '145px',
                          paddingY: '4px',
                          paddingX: '20px',
                          display: 'table-cell'
                        }}
                      >
                        <LinkWrapper url={urlToReport}>
                          <Value
                            value={
                              defaultCurrency === 'USD'
                                ? formatCurrency(deFiResultsUSD || 0)
                                : deFiResultsETH
                                  ? `${formatNumber(deFiResultsETH || 0, 0)} ETH`
                                  : '-'
                            }
                          />
                        </LinkWrapper>
                      </TableCellCustom>
                      {!isFeatureFlagTwoValue && (
                        <TableCellCustom
                          align="left"
                          sx={{
                            minWidth: '115px',
                            maxWidth: '115px',
                            paddingY: '4px',
                            paddingLeft: '20px',
                            marginRight: '5px',
                            display: 'table-cell'
                          }}
                        >
                          <LinkWrapper url={urlToReport}>
                            <Value value={CUSTOM_APY} />
                          </LinkWrapper>
                        </TableCellCustom>
                      )}
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: '25px',
                          maxWidth: '25px',
                          paddingY: '4px',
                          paddingRight: '5px',
                          display: 'table-cell'
                        }}
                      >
                        <LinkWrapper url={urlToReport}>
                          <OpenInNewIcon
                            onClick={onClick}
                            sx={{ cursor: 'pointer', fontSize: '1.2rem' }}
                          />
                        </LinkWrapper>
                      </TableCellCustom>
                    </TableRow>
                  </Tooltip>
                )
              })}
            </>
          )}
        </TableBody>
      </MaterialTable>
    </TableContainer>
  )
}
