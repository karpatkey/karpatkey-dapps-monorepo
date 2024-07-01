import React from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useRouter } from 'next/router'
import {
  BoxWrapperColumn,
  BoxWrapperRow,
  LinkWrapper,
  AnimatePresenceWrapper,
  CustomTypography
} from 'src/components'
import { NumberBlockCard } from './NumberBlockCard'
import { Currency } from 'src/contexts/state'
import { formatCurrency, formatNumber, formatPercentage } from 'src/utils/format'
import { Value } from './Value'
import moment from 'moment'
import { FILTER_DAOS } from '../../../config/constants'
import { isFeatureFlagTwo } from '../../../utils/params'

interface CardProps {
  name: string
  urlToReport: string
  icon: string
  totalFundsUSD: number
  totalFundsETH: number
  allocatedFunds: number
  deFiResultsUSD: number
  deFiResultsETH: number
  APY: string
  currency: Currency
  latestMonth: number
  latestYear: number
  keyName: string
  shouldBeIncludedNCAum: boolean
}

const Title = ({ title }: { title: string }) => {
  return (
    <CustomTypography
      sx={{
        textAlign: 'flex-start',
        fontFamily: 'IBM Plex Mono',
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: '600',
        fontStyle: 'normal'
      }}
    >
      {title}
    </CustomTypography>
  )
}

export const Card = (props: CardProps) => {
  const {
    name,
    urlToReport,
    icon,
    totalFundsUSD,
    totalFundsETH,
    allocatedFunds,
    deFiResultsUSD,
    deFiResultsETH,
    APY,
    latestMonth,
    latestYear,
    keyName,
    currency,
    shouldBeIncludedNCAum
  } = props
  const router = useRouter()

  const onClick = (e: any) => {
    if (e.ctrlKey || e.metaKey) {
      //if ctrl key or command is pressed
      window.open(urlToReport, '_blank')
    } else {
      router.push(urlToReport)
    }
  }

  const formattedDate = moment(`${latestYear}-${latestMonth}`, 'YYYY-MM').format('MMM YYYY')

  const defaultCurrency =
    FILTER_DAOS.find((dao) => dao.keyName === keyName)?.defaultCurrency ?? currency

  const params = { yearArg: latestYear.toString(), monthArg: latestMonth.toString() }
  const isFeatureFlagTwoValue = isFeatureFlagTwo(params)

  return (
    <AnimatePresenceWrapper>
      <BoxWrapperColumn
        gap={4}
        sx={{
          maxWidth: '320px',
          minWidth: '320px',
          minHeight: '260px',
          height: 'fit-content',
          padding: '8px 8px',
          border: '1px solid #B6B6B6',
          background: 'background.paper'
        }}
      >
        <BoxWrapperRow sx={{ justifyContent: 'space-between' }} gap={2}>
          <BoxWrapperRow gap={1}>
            <img src={icon} alt={name} height={32} />
            <Value value={name} fontWeight={600} />
          </BoxWrapperRow>
          <BoxWrapperRow gap={1}>
            <Title title={formattedDate} />
            <LinkWrapper url={urlToReport} isCentered>
              <OpenInNewIcon onClick={onClick} sx={{ cursor: 'pointer', fontSize: '1.4rem' }} />
            </LinkWrapper>
          </BoxWrapperRow>
        </BoxWrapperRow>
        <BoxWrapperRow
          sx={{
            justifyContent: 'space-between',
            alignItems: !isFeatureFlagTwoValue ? 'center' : 'flex-start'
          }}
          gap={4}
        >
          <BoxWrapperColumn gap={4}>
            <NumberBlockCard
              amount={
                defaultCurrency === 'USD'
                  ? formatCurrency(totalFundsUSD || 0)
                  : `${formatNumber(totalFundsETH || 0, 0)} ETH`
              }
              title={`Total funds ${shouldBeIncludedNCAum ? '(ncAUM)' : ''}`}
            />
            <NumberBlockCard
              amount={
                defaultCurrency === 'USD'
                  ? formatCurrency(deFiResultsUSD || 0)
                  : `${formatNumber(deFiResultsETH || 0, 0)} ETH`
              }
              title={'DeFi results'}
            />
          </BoxWrapperColumn>
          <BoxWrapperColumn gap={4}>
            <NumberBlockCard
              amount={formatPercentage(allocatedFunds || 0, 0)}
              title={'Allocated funds'}
            />
            {!isFeatureFlagTwoValue && <NumberBlockCard amount={APY} title={'APY'} />}
          </BoxWrapperColumn>
        </BoxWrapperRow>
      </BoxWrapperColumn>
    </AnimatePresenceWrapper>
  )
}
