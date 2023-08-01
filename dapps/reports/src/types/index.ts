import { AutocompleteOption } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'

export type Filter = {
  daoSelected: Maybe<number>
  monthSelected: Maybe<number>
  yearSelected: Maybe<number>
  monthOptions: Maybe<AutocompleteOption[]>
  yearOptions: Maybe<AutocompleteOption[]>
  daoOptions: Maybe<AutocompleteOption[]>
}

// TODO: improve types without the use of "any"
export type ReportData = {
  totalFunds: number
  capitalUtilization: number
  farmingResults: number
  globalROI: number
  fundsByTokenCategory: any[]
  fundsByType: any[]
  fundsByBlockchain: any[]
  fundsByProtocol: any[]
  balanceOverviewType: any[]
  balanceOverviewBlockchain: any[]
  treasuryVariationData: any[]
  historicVariationData: any[]
  treasuryVariationForThePeriodDetailData: any[]
  totalFarmingResultsFarmSwaps: number
  farmingFundsByProtocol: any[]
  farmingResultsDetailsByProtocol: any[]
  tokenDetails: any[]
  tokenDetailsGrouped: any[]
  tokenDetailByPosition: any[]
  walletTokenDetail: any[]
}

export type ReportProps = ReportData & Filter

// TODO improve types without the use of "any"
export type FormProps = {
  name: string
  control: any
  onChange?: (value: any) => void
}
