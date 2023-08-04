import { AutocompleteOption } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import BlockchainAutocomplete from '@karpatkey-monorepo/shared/components/Form/BlockchainAutocomplete'
import DAOAutocomplete from '@karpatkey-monorepo/shared/components/Form/DAOAutocomplete'
import MonthAutocomplete from '@karpatkey-monorepo/shared/components/Form/MonthAutocomplete'
import ProtocolAutocomplete from '@karpatkey-monorepo/shared/components/Form/ProtocolAutocomplete'
import TokenAutocomplete from '@karpatkey-monorepo/shared/components/Form/TokenAutocomplete'
import YearAutocomplete from '@karpatkey-monorepo/shared/components/Form/YearAutocomplete'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { FILTER_DAO, FILTER_DAOS } from '@karpatkey-monorepo/shared/config/constants'
import { MONTHS } from '@karpatkey-monorepo/shared/config/constants'
import WarningIcon from '@mui/icons-material/Warning'
import { Box, Button, ClickAwayListener, styled } from '@mui/material'
import Stack from '@mui/material/Stack'
import { DateTime } from 'luxon'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

const ButtonStyled = styled(Button)({
  padding: '6px 14px',
  width: '152px',
  height: '48px'
})

type FormValues = {
  blockchain: Maybe<AutocompleteOption>
  protocol: Maybe<AutocompleteOption>
  token: Maybe<AutocompleteOption>
  DAO: Maybe<AutocompleteOption>
  year: Maybe<AutocompleteOption>
  month: Maybe<AutocompleteOption>
}

const validationSchema = yup.object({
  blockchain: yup.object().notRequired(),
  protocol: yup.object().notRequired(),
  token: yup.object().notRequired(),
  DAO: yup.object().notRequired(),
  year: yup.object().notRequired(),
  month: yup.object().notRequired()
})

const useYupValidationResolver = (validationSchema: any, shouldCheckDAOFilter: boolean) =>
  React.useCallback(
    async (data: any) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        })

        let errors = {}

        if (shouldCheckDAOFilter) {
          const dao = FILTER_DAOS.find((option: FILTER_DAO) => {
            return option.id === values?.DAO?.id
          })

          if (!dao)
            errors = {
              inner: {
                type: 'DAO_NOT_FOUND',
                message: 'DAO not found. It should be selected from the list.'
              }
            }

          if (!values?.month?.id) {
            errors = {
              inner: {
                type: 'MONTH_REQUIRED',
                message: `Month is required`
              }
            }
          }

          if (!values?.year?.id) {
            errors = {
              inner: {
                type: 'YEAR_REQUIRED',
                message: `Year is required`
              }
            }
          }

          if (dao && (values?.month?.id < dao.sinceMonth || values?.year?.id < dao.sinceYear)) {
            const month = MONTHS.find((option: AutocompleteOption) => {
              return +option.id === +dao.sinceMonth
            })

            errors = {
              inner: {
                type: 'REPORT_NOT_AVAILABLE_FOR_THE_PERIOD',
                message: `Report not available for the period. Should be since ${month?.label}/${dao.sinceYear}`
              }
            }
          }

          const actualMonth = DateTime.local().month
          const actualYear = DateTime.local().year
          if (values?.month?.id > actualMonth && values?.year?.id >= actualYear) {
            errors = {
              inner: {
                type: 'REPORT_NOT_AVAILABLE_FOR_THE_PERIOD',
                message: `The date selected is greater than the current date`
              }
            }
          }
        }

        return {
          values,
          errors
        }
      } catch (errors) {
        return {
          values: {},
          errors: (errors as any).inner?.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message
              }
            }),
            {}
          )
        }
      }
    },
    [validationSchema]
  )

export type SubmitValues = {
  blockchain?: string | number
  protocol?: string | number
  token?: string | number
  DAO?: string | number
  year?: string | number
  month?: string | number
}

interface FormProps {
  onRequestClose: () => void
  onSubmitClose: (data: SubmitValues) => void
  defaultBlockchainValue?: Maybe<AutocompleteOption>
  defaultProtocolValue?: Maybe<AutocompleteOption>
  defaultTokenValue?: Maybe<AutocompleteOption>
  defaultDAOValue?: Maybe<AutocompleteOption>
  defaultMonthValue?: Maybe<AutocompleteOption>
  defaultYearValue?: Maybe<AutocompleteOption>
  blockchainOptions?: AutocompleteOption[]
  protocolOptions?: AutocompleteOption[]
  tokenOptions?: AutocompleteOption[]
  enableProtocol?: boolean
  enableBlockchain?: boolean
  enableToken?: boolean
  enableDAO?: boolean
  enableYear?: boolean
  enableMonth?: boolean
  buttonTitle?: string
}

const Form = (props: FormProps) => {
  const {
    onRequestClose,
    defaultBlockchainValue = null,
    defaultTokenValue = null,
    defaultProtocolValue = null,
    defaultDAOValue = null,
    defaultYearValue = null,
    defaultMonthValue = null,
    blockchainOptions = [],
    protocolOptions = [],
    tokenOptions = [],
    onSubmitClose,
    enableToken = false,
    enableBlockchain = false,
    enableProtocol = false,
    enableDAO = false,
    enableYear = false,
    enableMonth = false,
    buttonTitle
  } = props

  // Yup validation
  const resolver = useYupValidationResolver(
    validationSchema,
    enableDAO && enableYear && enableMonth
  )

  const defaultValues: FormValues = {
    blockchain: defaultBlockchainValue,
    protocol: defaultProtocolValue,
    token: defaultTokenValue,
    DAO: defaultDAOValue,
    year: defaultYearValue,
    month: defaultMonthValue
  }

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues,
    resolver
  })

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const blockchain = data?.blockchain?.id ?? ''
    const protocol = data?.protocol?.id ?? ''
    const token = data?.token?.id ?? ''
    const DAO = data?.DAO?.id ?? ''
    const year = data?.year?.id ?? ''
    const month = data?.month?.id ?? ''

    onRequestClose()

    const params = {
      blockchain,
      protocol,
      token,
      DAO,
      year,
      month
    }
    onSubmitClose(params)
  }

  return (
    <ClickAwayListener onClickAway={onRequestClose}>
      <Box
        sx={{
          p: '15px',
          minWidth: 260,
          width: 'max-content',
          backgroundColor: 'custom.grey.light',
          borderRadius: '4px'
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <BoxWrapperColumn gap={2}>
            <BoxWrapperRow gap={2}>
              {enableBlockchain ? (
                <Stack width={200}>
                  <BlockchainAutocomplete
                    options={blockchainOptions}
                    control={control}
                    name={'blockchain'}
                  />
                </Stack>
              ) : null}
              {enableProtocol ? (
                <Stack width={200}>
                  <ProtocolAutocomplete
                    options={protocolOptions}
                    control={control}
                    name={'protocol'}
                  />
                </Stack>
              ) : null}
              {enableToken ? (
                <Stack width={200}>
                  <TokenAutocomplete options={tokenOptions} control={control} name={'token'} />
                </Stack>
              ) : null}
              {enableDAO ? (
                <Stack width={200}>
                  <DAOAutocomplete control={control} name={'DAO'} />
                </Stack>
              ) : null}
              {enableMonth ? (
                <Stack width={200}>
                  <MonthAutocomplete control={control} name={'month'} />
                </Stack>
              ) : null}
              {enableYear ? (
                <Stack width={200}>
                  <YearAutocomplete control={control} name={'year'} />
                </Stack>
              ) : null}
            </BoxWrapperRow>
            <BoxWrapperRow gap={2} sx={{ justifyContent: 'space-between' }}>
              {errors && Object.values(errors).length > 0 && (
                <BoxWrapperRow gap={1}>
                  <WarningIcon sx={{ color: 'custom.error' }} />
                  <CustomTypography
                    variant="filterErrorMessage"
                    sx={{
                      '::first-letter': { textTransform: 'capitalize' },
                      wordBreak: 'break-word',
                      maxWidth: '350px'
                    }}
                  >
                    {Object.values(errors)[0].message}
                  </CustomTypography>
                </BoxWrapperRow>
              )}
              <ButtonStyled sx={{ marginLeft: 'auto' }} type="submit">
                {buttonTitle}
              </ButtonStyled>
            </BoxWrapperRow>
          </BoxWrapperColumn>
        </form>
      </Box>
    </ClickAwayListener>
  )
}

export default Form
