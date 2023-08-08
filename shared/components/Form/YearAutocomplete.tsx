import * as React from 'react'

import { CustomAutocomplete } from '../CustomAutocomplete'
import CustomTypography from '../CustomTypography'

const getYears = () => {
  const max = new Date().getFullYear()
  const min = 2023
  const years = []

  for (let i = max; i >= min; i--) {
    years.push({
      label: i.toString(),
      id: i
    })
  }
  return years
}

export const YEARS = getYears()

const Label = () => <CustomTypography variant="filterTextRenderInput">Year</CustomTypography>

interface YearAutocompleteProps {
  name: string
  control: any
  options: any
}

export default function YearAutocomplete(props: YearAutocompleteProps) {
  return (
    <CustomAutocomplete
      {...props}
      label={<Label />}
    />
  )
}
