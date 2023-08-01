import { getAddress } from '@ethersproject/address'
import { FILTER_DAO, FILTER_DAOS, MONTHS, NONE } from '@karpatkey-monorepo/shared/config/constants'

import { AutocompleteOption } from '../components/CustomAutocomplete'

export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw new Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const getMonthName = (monthNumber: number) => {
  const month = MONTHS.find((option: AutocompleteOption) => {
    return +option.id === +monthNumber
  })

  return month?.label
}

export const getDAOName = (daoKey: number) => {
  const dao = FILTER_DAOS.find((dao: FILTER_DAO) => {
    return +dao.id === +daoKey
  })
  return dao?.name || NONE
}

export const getDAO = (daoKey: Maybe<number>) => {
  return FILTER_DAOS.find((dao: FILTER_DAO) => {
    return daoKey && +dao.id === +daoKey
  })
}

export const getDAOByKeyName = (daoKeyName: DAO_NAME) => {
  return FILTER_DAOS.find((dao: FILTER_DAO) => {
    return daoKeyName === dao.keyName
  })
}

export const isDAONameValid = (daoName: DAO_NAME) => {
  const dao = FILTER_DAOS.find((dao: FILTER_DAO) => dao.keyName === daoName)
  return !!dao
}

export const isYearValid = (year: number) => year < 2022 || year > new Date().getFullYear()

export const isMonthValid = (month: number) => month < 1 || month > 12
