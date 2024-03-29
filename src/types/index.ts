import { Currency, DAOResume, Metrics, Report } from '../contexts/state'

export type Filter = {
  dao: Maybe<number>
  month: Maybe<number>
  year: Maybe<number>
  currency: Maybe<Currency>
}

export type ReportData = {
  metrics: Metrics
  daoResume: DAOResume
  report: Report
  currency: Currency
}

export type ReportProps = ReportData & Filter

// TODO improve types without the use of "any"
export type FormProps = {
  name: string
  control: any
  onChange?: (value: any) => void
}
