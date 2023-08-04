import Share from '@karpatkey-monorepo/reports//src/components/Share'
import { useFilter } from '@karpatkey-monorepo/reports/src/contexts/filter.context'
import { AutocompleteOption } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import Filter from '@karpatkey-monorepo/shared/components/Filter/Filter'
import Form, { SubmitValues } from '@karpatkey-monorepo/shared/components/Filter/Form'
import { YEARS } from '@karpatkey-monorepo/shared/components/Form/YearAutocomplete'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { MONTHS } from '@karpatkey-monorepo/shared/config/constants'
import { FILTER_DAO, FILTER_DAOS } from '@karpatkey-monorepo/shared/config/constants'
import { useRouter } from 'next/router'
import React from 'react'

const Menu = () => {
  const { state } = useFilter()
  const router = useRouter()

  const { daoSelected, monthSelected, yearSelected } = state.value

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClear = () => {
    window.open('/', '_self')
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  // DAO default value
  const filterDaoOption = FILTER_DAOS.find(
    (option: FILTER_DAO) => daoSelected && option.id === Number(daoSelected)
  )

  const defaultDAOValue = filterDaoOption
    ? ({
        logo: filterDaoOption?.icon,
        label: filterDaoOption?.name,
        id: filterDaoOption?.id
      } as AutocompleteOption)
    : null

  // Month default value
  const filterMonthOption = MONTHS.find((option) => option.id === Number(monthSelected))
  const defaultMonthValue = filterMonthOption ?? null

  // Year default value
  const filterYearOption = YEARS.find((option) => option.id === Number(yearSelected))
  const defaultYearValue = filterYearOption ?? null

  const onSubmitClose = (data: SubmitValues) => {
    const { month, DAO: dao, year } = data

    if (month === undefined || dao === undefined || year === undefined) return

    const query = new URLSearchParams()
    if (dao) query.append('dao', dao + '')
    if (month) query.append('month', month + '')
    if (year) query.append('year', year + '')

    const href = `/?${query.toString()}`
    router.push(href)
  }

  const formProps = {
    onRequestClose: handleClose,
    onSubmitClose,
    defaultDAOValue,
    defaultYearValue,
    defaultMonthValue,
    enableDAO: true,
    enableYear: true,
    enableMonth: true,
    buttonTitle: 'Apply selection'
  }

  const filterElement = (
    <Filter
      id={id}
      title={'Select report'}
      handleClick={handleClick}
      handleClose={handleClose}
      handleClear={handleClear}
      anchorEl={anchorEl}
      open={open}
      enableDAO
      enableMonth
      enableYear
      DAO={defaultDAOValue?.label ?? ''}
      year={defaultYearValue?.label ?? ''}
      month={defaultMonthValue?.label ?? ''}
      tooltipText={'Clear selected report'}
      position={'middle'}
    >
      <Form {...formProps} />
    </Filter>
  )

  return (
    <BoxWrapperRow gap={2}>
      <BoxWrapperRow id={id || ''} gap={2}>
        {filterElement}
        <Share
          daoSelected={daoSelected}
          monthSelected={monthSelected}
          yearSelected={yearSelected}
        />
      </BoxWrapperRow>
    </BoxWrapperRow>
  )
}

export default Menu
