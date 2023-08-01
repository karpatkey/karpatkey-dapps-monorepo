import PageLayout from '@karpatkey-monorepo/reports/src/components/Layout/Layout'
import { Filter, ReportProps } from '@karpatkey-monorepo/reports/src/types'
import { getCommonServerSideProps } from '@karpatkey-monorepo/reports/src/utils/serverSide'
import { filterSchemaValidation } from '@karpatkey-monorepo/reports/src/validations'
import dynamic from 'next/dynamic'
import { GetServerSidePropsContext } from 'next/types'
import React, { ReactElement } from 'react'

const HomepageContent = dynamic(() => import('@karpatkey-monorepo/reports/src/views/Homepage'))
const WelcomeContent = dynamic(() => import('@karpatkey-monorepo/reports/src/views/Welcome'))
const Homepage = (props: ReportProps) => {
  const { monthSelected, daoSelected, yearSelected } = props
  const isFilterEmpty = !monthSelected && !daoSelected && !yearSelected

  return isFilterEmpty ? <WelcomeContent /> : <HomepageContent {...props} />
}

Homepage.getTitle = 'Home'

Homepage.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>

export default Homepage

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { query } = ctx
  const { month: monthSelected = null, year: yearSelected = null, dao: daoSelected = null } = query

  const params = { daoSelected, monthSelected, yearSelected } as Filter

  // We validate the params here to avoid any errors in the page
  await filterSchemaValidation.validate(params)

  const serverSideProps = await getCommonServerSideProps(params)

  // Pass data to the page via props
  return {
    props: {
      ...serverSideProps,
      ...params
    }
  }
}
