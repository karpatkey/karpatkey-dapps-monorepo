import { Filter } from '@karpatkey-monorepo/reports/src/types'
import { CustomError } from '@karpatkey-monorepo/reports/src/utils/Errors/customError'
import React from 'react'
import {AutocompleteOption} from "@karpatkey-monorepo/shared/components/CustomAutocomplete"
import {getDAO, getDAOByKeyName} from "@karpatkey-monorepo/shared/utils"
import {MONTHS} from "@karpatkey-monorepo/shared/config/constants"

export enum ActionKind {
  CREATE = 'CREATE',
  ON_CHANGE = 'ON_CHANGE',
  UPDATE = 'UPDATE',
  RESET = 'RESET'
}

const monthOrder = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

type STATUS = 'loading' | 'error' | 'success'

export interface State {
  error: Maybe<CustomError>
  status: STATUS
  value: Filter
}

interface Action {
  type: ActionKind
  payload: State
}

type Dispatch = (action: {
  payload: {
    error: null;
    value: {
      monthSelected: Maybe<number>;
      yearSelected: Maybe<number>;
      daoSelected: Maybe<number>;
      filters: Maybe<any>
    };
    status: string
  };
  type: ActionKind
}) => void

type FilterProviderProps = { children: React.ReactNode }

const INITIAL_STATE: {
  error: null;
  status: 'loading';
  value: {
    monthSelected: null;
    daoOptions: null;
    yearOptions: null;
    yearSelected: null;
    monthOptions: null;
    daoSelected: null;
    filters: null;
  }
} = {
  error: null,
  status: 'loading',
  value: {
    monthSelected: null,
    yearSelected: null,
    daoSelected: null,
    monthOptions: null,
    yearOptions: null,
    daoOptions: null,
    filters: null
  }
}

const getMonthOptions = (filters: any): Maybe<AutocompleteOption[]> => {
  return Object.keys(filters).reduce(
    (acc: any, daoKeyName: string) => {
      const DAO = getDAOByKeyName(daoKeyName as unknown as DAO_NAME)
      if (!DAO) return acc

      const years = Object.keys(filters[daoKeyName])
      years.forEach((year: string) => {
        const months = filters[daoKeyName][year]
        months.forEach((month: string) => {
          const monthFound = acc.find((option: AutocompleteOption) => option.id === month)
          if (!monthFound) {
            const monthItem = MONTHS.find((m: any) => m.id === month)

            acc.push({
              id: month,
              label: monthItem?.label
            })
          }
        })
      })
      return acc
    },
    []
  ).sort((a: AutocompleteOption, b: AutocompleteOption) => {
    return monthOrder.indexOf(a.label) - monthOrder.indexOf(b.label)
  })
}

const getYearOptions = (filters: any): Maybe<AutocompleteOption[]> => {
  return Object.keys(filters).reduce(
    (acc: any, daoKeyName: string) => {
      const DAO = getDAOByKeyName(daoKeyName as unknown as DAO_NAME)
      if (!DAO) return acc

      const years = Object.keys(filters[daoKeyName])
      years.forEach((year: string) => {
        const yearFound = acc.find((option: AutocompleteOption) => option.id === year)
        if (!yearFound) {
          acc.push({
            id: year,
            label: year
          })
        }
      })
      return acc
    },
    []
  ).sort((a: AutocompleteOption, b: AutocompleteOption) => a.id - b.id)
}

const getDAOOptions = (filters: any): Maybe<AutocompleteOption[]> => {
  return Object.keys(filters).reduce(
    (acc: any, daoKeyName: string) => {
      const DAO = getDAOByKeyName(daoKeyName as unknown as DAO_NAME)
      if (!DAO) return acc

      const daoFound = acc.find((option: AutocompleteOption) => option.id === DAO.keyName)
      if (!daoFound) {
        acc.push({
          id: DAO.id,
          label: DAO.name,
          logo: DAO.icon
        })
      }
      return acc
    },
    []
  ).sort((a: AutocompleteOption, b: AutocompleteOption) => a.label.localeCompare(b.label))
}

const Reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionKind.CREATE: {
      const { filters, yearSelected, daoSelected, monthSelected } = action.payload.value

      const daoOptions: Maybe<AutocompleteOption[]> = getDAOOptions(filters)

      const yearOptions: Maybe<AutocompleteOption[]> = getYearOptions(filters)

      const monthOptions: Maybe<AutocompleteOption[]> = getMonthOptions(filters)

      return {
        ...state,
        error: action.payload.error,
        status: 'success',
        value: {
          ...state.value,
          filters,
          daoOptions,
          yearOptions,
          monthOptions,
          yearSelected,
          monthSelected,
          daoSelected
        }
      } as State
    }

    case ActionKind.ON_CHANGE: {
      const { filters, daoSelected } = action.payload.value

      // Generate daoOptions, taking into account yearSelected and monthSelected, from filters
      let monthOptions: Maybe<AutocompleteOption[]> = []
      let yearOptions: Maybe<AutocompleteOption[]> = []

      if(daoSelected) {
        const DAO = getDAO(daoSelected as unknown as DAO_NAME)
        const years = Object.keys(filters[DAO?.keyName])
        years.forEach((year: string) => {
          const yearFound = yearOptions.find((option: AutocompleteOption) => option.id === year)
          if (!yearFound) {
            yearOptions.push({
              id: year,
              label: year
            })
          }

          const months = filters[DAO?.keyName][year]
          months.forEach((month: string) => {
            const monthFound = monthOptions.find((option: AutocompleteOption) => option.id === month)
            if (!monthFound) {
              const monthItem = MONTHS.find((m: any) => m.id === month)

              monthOptions.push({
                id: month,
                label: monthItem?.label
              })
            }
          })
        })

        yearOptions = yearOptions.sort((a: AutocompleteOption, b: AutocompleteOption) => a.id - b.id)
        monthOptions = monthOptions.sort((a: AutocompleteOption, b: AutocompleteOption) => monthOrder.indexOf(a.label) - monthOrder.indexOf(b.label))

      } else {
        monthOptions = getMonthOptions(filters)
        yearOptions = getYearOptions(filters)
      }

      return {
        ...state,
        error: action.payload.error,
        status: 'success',
        value: {
          ...state.value,
          filters,
          monthOptions,
          yearOptions,
        }
      }
    }

    case ActionKind.UPDATE: {
      return {
        ...state,
        error: action.payload.error,
        status: 'success',
        value: action.payload.value
      } as State
    }


    case ActionKind.RESET:
      return INITIAL_STATE
    default: {
      throw new Error(`Unhandled action type: ${(action as Action).type}`)
    }
  }
}

const FilterContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined
)

const FilterProvider = ({ children }: FilterProviderProps) => {
  const [state, dispatch] = React.useReducer(Reducer, INITIAL_STATE)
  const value = { state, dispatch }
  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

const useFilter = () => {
  const context = React.useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider')
  }
  return context
}

export { FilterProvider, useFilter }
