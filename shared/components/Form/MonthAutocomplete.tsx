import { CustomAutocomplete } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { MONTHS } from '@karpatkey-monorepo/shared/config/constants'
import * as React from 'react'

const Label = () => <CustomTypography variant="filterTextRenderInput">Month</CustomTypography>

interface MonthAutocompleteProps {
  name: string
  control: any
  options: any
}

export default function MonthAutocomplete(props: MonthAutocompleteProps) {
  return (
    <CustomAutocomplete
      {...props}
      label={<Label />}
    />
  )
}
