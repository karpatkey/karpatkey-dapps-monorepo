import { Box, TextField } from '@mui/material'
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete'
import * as React from 'react'
import { Controller } from 'react-hook-form'

export interface AutocompleteOption {
  logo?: string
  label: string
  id: number | string
}

interface AutocompleteProps {
  name: string
  control: any
  options: AutocompleteOption[]
  label?: React.ReactElement
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactElement
  renderOption?: (props: any, option: any, { selected }: any) => React.ReactElement
  onChangeProps?: (value: any) => void
}

const CustomRenderOption = (props: any, option: any) => {
  return (
    <Box
      component="span"
      sx={{ backgroundColor: 'custom.grey.light' }}
      key={option?.label}
      {...props}
    >
      {option.label}
    </Box>
  )
}
export const CustomAutocomplete = (props: AutocompleteProps) => {
  const { options, label, renderInput, renderOption, name, control } = props

  const isOptionEqualToValue = (option: AutocompleteOption, value: AutocompleteOption) =>
    option.id == value.id

  return (
    <Controller
      render={({ field: { onChange, value } }) => {
        return (
          <Autocomplete
            options={options}
            clearOnEscape
            autoHighlight
            autoSelect
            blurOnSelect
            selectOnFocus
            value={value || null}
            isOptionEqualToValue={isOptionEqualToValue}
            onChange={(_, data) => {
              if (props.onChangeProps) {
                props.onChangeProps(data)
              }
              onChange(data)
            }}
            renderInput={
              renderInput
                ? (params: AutocompleteRenderInputParams) => renderInput(params)
                : (params: AutocompleteRenderInputParams) => (
                    <TextField {...params} label={label || ''} variant="standard" />
                  )
            }
            renderOption={renderOption || CustomRenderOption}
          />
        )
      }}
      name={name}
      control={control}
    />
  )
}
