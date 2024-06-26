import { GetServerSidePropsContext } from 'next/types'
import React, { ReactElement } from 'react'
import { Layout as PageLayout } from 'src/components/layout/Layout'
import { Filter, ReportProps } from 'src/types'
import { filterSchemaValidation } from 'src/validations'
import { FILTER_DAOS } from 'src/config/constants'
import { Dashboard as DashboardContent } from 'src/views/Dashboard'
import { Report as ReportContent } from 'src/views/Report'
import { readFileSync } from 'fs'
import path from 'path'
import { useApp } from 'src/contexts/app.context'
import {
  clearState,
  updateCurrency,
  updateDAO,
  updateDashboard,
  updateMonth,
  updateReport,
  updateYear
} from 'src/contexts/reducers'
import { Currency, Dashboard, Report } from 'src/contexts/state'
import { useRouter } from 'next/router'
import { getDAO } from '../utils'

const Homepage = (props: ReportProps) => {
  const { month, dao, year, metrics, daoResume, report, currency } = props
  const isFilterEmpty = !month && !dao && !year

  const { dispatch } = useApp()

  const router = useRouter()
  const [, hash] = router.asPath.split('#')

  React.useEffect(() => {
    const start = () => {
      dispatch(clearState())

      if (dao) dispatch(updateDAO(+dao))
      if (year) dispatch(updateYear(+year))
      if (month) dispatch(updateMonth(+month))

      if (metrics && daoResume) {
        const dashboard = { metrics, daoResume } as unknown as Dashboard
        dispatch(updateDashboard(dashboard))
      }

      if (report) {
        dispatch(updateReport(report as Report))
      }

      if (currency) {
        dispatch(updateCurrency(currency))
      }
    }

    start()
  }, [dispatch, dao, year, month, metrics, daoResume, report, currency])

  if (!hash) {
    window.scrollTo(0, 0)
  }

  if (isFilterEmpty) {
    return <DashboardContent />
  }

  return <ReportContent />
}

Homepage.getTitle = 'Home'

Homepage.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>

export default Homepage

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { query } = ctx
  const { month = null, year = null, dao = null } = query
  let { currency = null } = query

  if (month && year && dao) {
    const allowedMonthAndYear = FILTER_DAOS.find((option) => {
      return dao && +option.id === +dao
    })?.datesAllowed?.find((option) => {
      return year && month && +option.year === +year && +option.month === +month
    })

    if (!allowedMonthAndYear) {
      return {
        redirect: {
          permanent: false,
          destination: '/500'
        }
      }
    }
  }

  // Check if is Lido DAO and currency is not USD
  const daoName = dao ? getDAO(+dao)?.keyName || '' : ''
  if (daoName === 'Lido' && currency === 'USD') currency = Currency.ETH

  if (currency && dao) {
    const allowedCurrency = FILTER_DAOS.find((option) => {
      return dao && +option.id === +dao
    })?.currenciesAllowed?.find((option) => {
      return option === currency
    })

    if (!allowedCurrency) {
      return {
        redirect: {
          permanent: false,
          destination: '/500'
        }
      }
    }
  }

  if (!currency && dao) {
    currency = FILTER_DAOS.find((option) => {
      return dao && +option.id === +dao
    })?.currenciesAllowed[0] as unknown as Currency
  }

  const params = { dao, month, year, currency } as Filter

  // should come all parameters
  const paramsNotNull = Object.values(params).filter((value) => value !== null).length
  if (paramsNotNull !== 4 && paramsNotNull !== 0) {
    return {
      redirect: {
        permanent: false,
        destination: '/422'
      }
    }
  }

  // check if DAO parameters is correct
  if (dao && !FILTER_DAOS.some((option) => dao && +option.id === +dao)) {
    return {
      redirect: {
        permanent: false,
        destination: '/404'
      }
    }
  }

  // check if month and year parameters is correct
  if (month && year && !filterSchemaValidation.isValidSync({ month, year })) {
    return {
      redirect: {
        permanent: false,
        destination: '/404'
      }
    }
  }

  // check if currency parameters is correct
  if (currency && !filterSchemaValidation.isValidSync({ currency })) {
    return {
      redirect: {
        permanent: false,
        destination: '/404'
      }
    }
  }

  try {
    const pathFile = path.resolve(process.cwd(), './cache/dashboard.json')
    const dashboard = JSON.parse(readFileSync(pathFile, 'utf8'))

    let report = null
    if (dao && month && year) {
      const pathFile = path.resolve(process.cwd(), `./cache/${dao}.json`)
      const reports = JSON.parse(readFileSync(pathFile, 'utf8'))

      report = reports[+year][+month]
    }

    const props = {
      ...dashboard,
      report,
      currency: currency ? (currency as Currency) : null,
      month: month ? +month : null,
      year: year ? +year : null,
      dao: dao ? +dao : null
    }

    return { props }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/400'
      }
    }
  }
}
