import SearchIcon from '@mui/icons-material/Search'
import { Box, TextField, AutocompleteRenderInputParams } from '@mui/material'
import * as React from 'react'
import { CustomAutocomplete, CustomTypography, BoxWrapperRow } from 'src/components'
import { FILTER_DAO, FILTER_DAOS } from 'src/config/constants'

const DAOs = FILTER_DAOS.filter((option: FILTER_DAO) => option.isEnabled)
  .map((option: FILTER_DAO) => {
    return {
      logo: option.icon,
      label: option.name,
      id: option.id
    }
  })
  .sort((a, b) => (a.label < b.label ? -1 : 1))

const RenderInput = (params: AutocompleteRenderInputParams) => {
  const InputProps = {
    ...params.InputProps
  }

  const option = FILTER_DAOS.find((option: FILTER_DAO) => {
    if (option.name === params.inputProps.value) {
      return option
    }
  })

  const imageWidth =
    option?.keyName === 'Lido'
      ? { width: 20 }
      : { width: option?.keyName === 'Safe<>Gnosis' ? 40 : option?.keyName === 'CoW DAO' ? 30 : 40 }

  const imageHeight =
    option?.keyName === 'Lido'
      ? { height: 25 }
      : {
          height: option?.keyName === 'Safe<>Gnosis' ? 40 : option?.keyName === 'CoW DAO' ? 30 : 20
        }

  if (option) {
    InputProps.startAdornment = (
      <>
        <img src={option.icon || ''} alt={option.name} {...imageWidth} {...imageHeight} />
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
      sx={{ width: 230 }}
    />
  )
}

const RenderOption = (props: any, option: any) => {
  const imageWidth =
    option?.label === 'Lido'
      ? { width: 20 }
      : {
          width: option?.label === 'Safe<>Gnosis' ? 40 : option?.label === 'CoW Protocol' ? 30 : 40
        }

  const imageHeight =
    option?.label === 'Lido'
      ? { height: 25 }
      : {
          height: option?.label === 'Safe<>Gnosis' ? 40 : option?.label === 'CoW Protocol' ? 30 : 20
        }

  const styles =
    option?.label === 'Lido'
      ? { marginLeft: '10px' }
      : option?.label === 'CoW Protocol'
        ? { marginLeft: '5px' }
        : {}

  return (
    <Box
      component="span"
      sx={{
        '& > img': {
          mr: 2,
          ...styles
        },
        '& > span': {
          ...styles
        },
        backgroundColor: '#F5F5F5',
        width: 230
      }}
      key={option.name}
      {...props}
    >
      <img
        key={option.name}
        src={option.logo || ''}
        alt={option.label}
        {...imageWidth}
        {...imageHeight}
      />
      <span>{option.label}</span>
    </Box>
  )
}

interface DAOAutocompleteProps {
  name: string
  control: any
  onChangeProps?: (value: any) => void
}

export const DAOAutocomplete = (props: DAOAutocompleteProps) => {
  return (
    <CustomAutocomplete
      {...props}
      options={DAOs}
      renderInput={RenderInput}
      renderOption={RenderOption}
    />
  )
}
