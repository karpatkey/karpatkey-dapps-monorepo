import { Filter } from '@karpatkey-monorepo/reports/src/types'
import { CustomError } from '@karpatkey-monorepo/reports/src/utils/Errors/customError'
import React from 'react'

export enum ActionKind {
  UPDATE = 'UPDATE',
  RESET = 'RESET'
}

interface Action {
  type: ActionKind
  payload: { value: Filter; error: Maybe<CustomError> }
}

type Dispatch = (action: Action) => void

type FilterProviderProps = { children: React.ReactNode }

interface State {
  value: Filter
  error: Maybe<CustomError>
}

const INITIAL_STATE: State = {
  value: {
    monthSelected: null,
    yearSelected: null,
    daoSelected: null,
    monthOptions: null,
    yearOptions: null,
    daoOptions: null
  },
  error: null
}

const Reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionKind.UPDATE: {
      return {
        ...state,
        value: action.payload.value,
        error: action.payload.error
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
