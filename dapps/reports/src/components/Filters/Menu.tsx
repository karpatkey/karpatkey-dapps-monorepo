import Share from '@karpatkey-monorepo/reports//src/components/Share'
import {ActionKind, useFilter} from '@karpatkey-monorepo/reports/src/contexts/filter.context'
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
  const { state, dispatch } = useFilter()
  const router = useRouter()

  const { value } = state
  const { filters, daoSelected, monthSelected, yearSelected, yearOptions, monthOptions, daoOptions } = value

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

  const handleChangeYear = React.useCallback((value: Maybe<AutocompleteOption>) => {
    if(!value) return
    dispatch({
      type: ActionKind.ON_CHANGE,
      payload: {
        status: 'success',
        value: { yearSelected: +value.id, daoSelected, monthSelected, filters },
        error: null
      }
    })
  }, [daoSelected, monthSelected, yearSelected, filters, dispatch])

  const handleChangeMonth = React.useCallback((value: Maybe<AutocompleteOption>) => {
    if(!value) return
    dispatch({
      type: ActionKind.ON_CHANGE,
      payload: {
        status: 'success',
        value: { monthSelected: +value.id, daoSelected, yearSelected, filters },
        error: null
      }
    })
  }, [daoSelected, monthSelected,  yearSelected, filters, dispatch])

  const handleChangeDAO = React.useCallback((value: Maybe<AutocompleteOption>) => {
    if(!value) return
    dispatch({
      type: ActionKind.ON_CHANGE,
      payload: {
        status: 'success',
        value: { monthSelected, daoSelected: value.id, yearSelected, filters },
        error: null
      }
    })
  }, [daoSelected, monthSelected,  yearSelected, filters, dispatch])

  const formProps = {
    onRequestClose: handleClose,
    onSubmitClose,
    defaultDAOValue,
    defaultYearValue,
    defaultMonthValue,
    enableDAO: true,
    enableYear: true,
    enableMonth: true,
    buttonTitle: 'Apply selection',
    yearOptions,
    monthOptions,
    daoOptions,
    handleChangeYear,
    handleChangeMonth,
    handleChangeDAO
  }

  return (
    <BoxWrapperRow id={id || ''} gap={2}>
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
      <Share
        daoSelected={daoSelected}
        monthSelected={monthSelected}
        yearSelected={yearSelected}
      />
    </BoxWrapperRow>
  )
}

export default Menu
