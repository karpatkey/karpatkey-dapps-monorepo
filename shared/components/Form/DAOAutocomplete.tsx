import { CustomAutocomplete } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { FILTER_DAO, FILTER_DAOS } from '@karpatkey-monorepo/shared/config/constants'
import SearchIcon from '@mui/icons-material/Search'
import { Box, TextField } from '@mui/material'
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete'
import Image from 'next/image'
import * as React from 'react'

const DAOs = FILTER_DAOS.map((option: FILTER_DAO) => {
  return {
    logo: option.icon,
    label: option.name,
    id: option.id
  }
}).sort((a, b) => (a.label < b.label ? -1 : 1))

const RenderInput = (params: AutocompleteRenderInputParams) => {
  const InputProps = {
    ...params.InputProps
  }

  const option = FILTER_DAOS.find((option: FILTER_DAO) => {
    if (option.name === params.inputProps.value) {
      return option
    }
  })

  if (option) {
    InputProps.startAdornment = (
      <>
        <Image src={option.icon || ''} alt={option.name} width={20} height={20} />
        &nbsp;
      </>
    )
  }

  return (
    <TextField
      {...params}
      InputProps={InputProps}
      label={
        <BoxWrapperRow gap={2}>
          <SearchIcon />
          <CustomTypography variant="filterTextRenderInput">DAO</CustomTypography>
        </BoxWrapperRow>
      }
      variant="standard"
    />
  )
}

const RenderOption = (props: any, option: any) => {
  return (
    <Box
      component="span"
      sx={{ '& > img': { mr: 2, flexShrink: 0 }, backgroundColor: '#F5F5F5' }}
      {...props}
    >
      <Image src={option.logo || ''} alt={option.label} width={20} height={20} />
      {option.label}
    </Box>
  )
}

interface DAOAutocompleteProps {
  name: string
  control: any
  options: any
}

export default function DAOAutocomplete(props: DAOAutocompleteProps) {
  return (
    <CustomAutocomplete
      {...props}
      renderInput={RenderInput}
      renderOption={RenderOption}
    />
  )
}
