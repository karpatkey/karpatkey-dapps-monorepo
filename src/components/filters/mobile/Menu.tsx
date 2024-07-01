import React from 'react'
import { BoxWrapperColumn, BoxWrapperRow, CustomTypography } from 'src/components'
import { Box, Snackbar } from '@mui/material'
import { ShareIcon } from 'components/icons'
import { useApp } from 'src/contexts/app.context'
import { FILTER_DAO, FILTER_DAOS, MONTHS } from 'src/config/constants'
import { getDAO, getMonthName } from 'src/utils'
import { styled } from '@mui/material/styles'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { SnackbarOrigin } from '@mui/material/Snackbar'
import { TransitionProps } from '@mui/material/transitions'
import Slide from '@mui/material/Slide'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const BlockMenu = styled(Box)(() => ({
  width: '25%',
  paddingRight: '10px',
  paddingLeft: '10px',
  paddingTop: '10px',
  paddingBottom: '10px',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))

const CustomTypo = styled(CustomTypography)(() => ({
  fontSize: 18,
  fontWeight: 600
}))

const CustomButton = styled(Button)(() => ({
  borderRadius: '50px',
  width: '314px',
  height: '48px',
  fontSize: '18px',
  backgroundColor: '#DEDEDE',
  ':hover': {
    backgroundColor: 'white'
  }
}))

interface State extends SnackbarOrigin {
  open: boolean
}

export const Menu = () => {
  const { state } = useApp()
  const router = useRouter()

  const { DAO: filterDAO, month, year, currency } = state

  const valueToCopy = React.useMemo(() => {
    const query = new URLSearchParams()
    const url = window.location.href.split('?')[0]
    if (filterDAO) query.append('dao', filterDAO + '')
    if (month) query.append('month', month + '')
    if (year) query.append('year', year + '')
    if (currency) query.append('currency', currency)
    return `${url}?${query.toString()}`
  }, [month, filterDAO, year, currency])

  const { dao, monthName } = React.useMemo(() => {
    const dao: FILTER_DAO | undefined = getDAO(filterDAO)
    const monthName = month ? getMonthName(+month)?.short : null

    return { dao, monthName }
  }, [filterDAO, month])

  const isSharedButtonEnabled = React.useMemo(() => {
    return !!month || !!filterDAO || !!year
  }, [month, filterDAO, year])

  // Snackbar state and handlers
  const [snackbarState, setSnackbarState] = React.useState<State>({
    open: false,
    vertical: 'bottom',
    horizontal: 'right'
  })
  const { vertical, horizontal, open } = snackbarState

  const handleClickCopy = (newState: SnackbarOrigin) => () => {
    if (isSharedButtonEnabled) {
      setSnackbarState({ ...newState, open: true })
    }
  }

  const handleClose = () => {
    setSnackbarState({ ...snackbarState, open: false })
  }

  const [openModal, setOpenModal] = React.useState(false)

  const handleClickOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    // clear state
    setIsMenuBeenDisplayed(true)
    setIsDAOSelectionBeenDisplayed(false)
    setIsPeriodSelectionBeenDisplayed(false)
    setIsCurrencySelectionBeenDisplayed(false)

    setOpenModal(false)
  }

  const [isMenuBeenDisplayed, setIsMenuBeenDisplayed] = React.useState(true)
  const [isDAOSelectionBeenDisplayed, setIsDAOSelectionBeenDisplayed] = React.useState(false)
  const [isPeriodSelectionBeenDisplayed, setIsPeriodSelectionBeenDisplayed] = React.useState(false)
  const [isCurrencySelectionBeenDisplayed, setIsCurrencySelectionBeenDisplayed] =
    React.useState(false)

  const [selectedDAO, setSelectedDAO] = React.useState<Maybe<number>>(dao?.id ? dao?.id : null)
  const [selectedPeriod, setSelectedPeriod] = React.useState<Maybe<string>>(
    year && month ? `${year}-${month}` : null
  )
  const [selectedCurrency, setSelectedCurrency] = React.useState<Maybe<string>>(
    currency ? currency : null
  )

  const imgSrc = selectedDAO ? getDAO(selectedDAO)?.icon ?? '' : ''
  const imgAlt = selectedDAO ? getDAO(selectedDAO)?.name ?? '' : ''

  const daoName = selectedDAO ? getDAO(selectedDAO)?.name ?? '' : ''

  const periodName = selectedPeriod
    ? selectedPeriod?.split('-')[0] + ' ' + getMonthName(+selectedPeriod?.split('-')[1])?.label
    : ''

  const currencyName = selectedCurrency ? selectedCurrency : ''

  React.useEffect(() => {
    if (filterDAO && !selectedDAO) {
      setSelectedDAO(filterDAO)
    }

    if (month && year && !selectedPeriod) {
      setSelectedPeriod(`${year}-${month}`)
    }

    if (currency && !selectedCurrency) {
      setSelectedCurrency(currency)
    }
  }, [filterDAO, month, year, currency])

  if (!dao || !monthName) {
    return null
  }

  const isDisabled = !selectedDAO || !selectedPeriod || !selectedCurrency

  const imageWidth = dao?.keyName === 'Lido' ? {} : dao?.keyName === 'CoW DAO' ? {} : { width: 76 }

  const imageHeight = { height: dao?.keyName === 'CoW DAO' ? 48 : 38 }

  const daoWithValues: FILTER_DAO | undefined = getDAO(selectedDAO)
  const imageWidthViewer =
    daoWithValues?.keyName === 'Lido'
      ? {}
      : daoWithValues?.keyName === 'CoW DAO'
        ? {}
        : daoWithValues?.keyName === 'Safe<>Gnosis'
          ? { width: 44 }
          : { width: 30 }

  const imageHeightViewer =
    daoWithValues?.keyName === 'CoW DAO'
      ? { height: 34 }
      : daoWithValues?.keyName === 'Safe<>Gnosis'
        ? { height: 44 }
        : { height: 30 }

  return (
    <>
      <BoxWrapperRow
        sx={{
          justifyContent: 'space-between',
          width: '100%',
          height: '80px',
          borderBottom: '2px solid #E0E0E0',
          borderTop: '2px solid #E0E0E0',
          marginTop: '20px'
        }}
      >
        <BlockMenu onClick={handleClickOpenModal} gap={1}>
          <img
            src={dao?.icon ?? ''}
            alt={dao?.name || ''}
            key={dao?.icon}
            {...imageWidth}
            {...imageHeight}
          />
          <CustomTypo
            sx={{
              maxWidth: 'max(0px, calc((100% - 140px)*999))',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}
          >
            {dao?.name}
          </CustomTypo>
        </BlockMenu>
        <BlockMenu
          onClick={handleClickOpenModal}
          sx={{ borderLeft: '2px solid #E0E0E0', textAlign: 'center' }}
        >
          <CustomTypo
            sx={{
              textAlign: 'center',
              margin: '5px',
              textOverflow: 'ellipsis',
              whiteSpace: 'pre-wrap',
              overflow: 'hidden'
            }}
          >
            {year} {monthName}
          </CustomTypo>
        </BlockMenu>
        <BlockMenu
          onClick={handleClickOpenModal}
          sx={{ borderLeft: '2px solid #E0E0E0', textAlign: 'center' }}
        >
          <CustomTypo>{currency}</CustomTypo>
        </BlockMenu>
        <BlockMenu sx={{ borderLeft: '2px solid #E0E0E0', cursor: 'pointer' }}>
          <CopyToClipboard text={valueToCopy}>
            <ShareIcon
              onClick={handleClickCopy({ vertical: 'bottom', horizontal: 'right' })}
              width={38}
              height={38}
            />
          </CopyToClipboard>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message="Link copied!"
            key={vertical + horizontal}
            autoHideDuration={2000}
          />
        </BlockMenu>
      </BoxWrapperRow>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            maxWidth: 'none',
            width: '100%',
            margin: 0,
            height: '80%',
            alignItems: 'flex-end',
            position: 'absolute',
            left: 0,
            bottom: 0,
            borderRadius: '46px 46px 0 0',
            backgroundColor: 'background.default'
          }
        }}
      >
        <BoxWrapperColumn
          sx={{
            height: '100%',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            display: isMenuBeenDisplayed ? 'flex' : 'none'
          }}
        >
          <BoxWrapperColumn gap={2} sx={{ alignItems: 'center', marginTop: '20px' }}>
            <BoxWrapperColumn sx={{ alignItems: 'center' }}>
              <CustomTypo sx={{ color: 'primary.main', marginTop: '20px', marginBottom: '10px' }}>
                DAO
              </CustomTypo>
              <CustomButton
                onClick={() => {
                  setIsMenuBeenDisplayed(false)
                  setIsDAOSelectionBeenDisplayed(true)
                }}
              >
                <BoxWrapperRow gap={2}>
                  <img
                    src={imgSrc}
                    alt={imgAlt}
                    key={imgAlt}
                    {...imageWidthViewer}
                    {...imageHeightViewer}
                  />
                  <CustomTypo sx={{ color: 'custom.grey.ternary' }}>
                    {daoName || 'Select DAO'}
                  </CustomTypo>
                </BoxWrapperRow>
              </CustomButton>
            </BoxWrapperColumn>
            <BoxWrapperColumn sx={{ alignItems: 'center' }}>
              <CustomTypo sx={{ color: 'primary.main', marginTop: '20px', marginBottom: '10px' }}>
                Period
              </CustomTypo>
              <CustomButton
                onClick={() => {
                  setIsMenuBeenDisplayed(false)
                  setIsPeriodSelectionBeenDisplayed(true)
                }}
              >
                <CustomTypo sx={{ color: 'custom.grey.ternary' }}>
                  {periodName || 'Select period'}
                </CustomTypo>
              </CustomButton>
            </BoxWrapperColumn>
            <BoxWrapperColumn sx={{ alignItems: 'center' }}>
              <CustomTypo sx={{ color: 'primary.main', marginTop: '20px', marginBottom: '10px' }}>
                Currency
              </CustomTypo>
              <CustomButton
                onClick={() => {
                  setIsMenuBeenDisplayed(false)
                  setIsCurrencySelectionBeenDisplayed(true)
                }}
              >
                <CustomTypo sx={{ color: 'custom.grey.ternary' }}>
                  {currencyName || 'Select currency'}
                </CustomTypo>
              </CustomButton>
            </BoxWrapperColumn>
          </BoxWrapperColumn>
          <Button
            disabled={isDisabled}
            sx={{
              borderRadius: '50px',
              width: '314px',
              height: '48px',
              marginBottom: '10px',
              fontSize: '18px',
              ':disabled': {
                backgroundColor: 'custom.grey.ternary',
                color: 'custom.grey.quaternary'
              }
            }}
            onClick={() => {
              if (!selectedDAO || !selectedPeriod || !selectedCurrency) {
                return
              }
              const query = new URLSearchParams()

              if (selectedDAO !== null && selectedDAO !== undefined)
                query.append('dao', selectedDAO + '')
              if (selectedPeriod !== null && selectedPeriod !== undefined)
                query.append('month', selectedPeriod.split('-')[1])
              if (selectedPeriod !== null && selectedPeriod !== undefined)
                query.append('year', selectedPeriod.split('-')[0])
              if (selectedCurrency !== null && selectedCurrency !== undefined)
                query.append('currency', selectedCurrency)

              const href = `/?${query.toString()}`
              router.push(href)
              // close modal
              handleCloseModal()
            }}
          >
            Apply selection
          </Button>
        </BoxWrapperColumn>

        <BoxWrapperColumn
          sx={{
            height: '100%',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            display: isDAOSelectionBeenDisplayed ? 'flex' : 'none'
          }}
        >
          <BoxWrapperColumn gap={2} sx={{ alignItems: 'center', marginTop: '20px' }}>
            <CustomTypo sx={{ color: 'primary.main', marginY: '20px' }}>Select DAO</CustomTypo>
            {FILTER_DAOS.filter((option: FILTER_DAO) => option.isEnabled)
              .sort((a, b) => (a.name < b.name ? -1 : 1))
              .map((option: FILTER_DAO) => {
                const imageWithViewerInter =
                  option?.keyName === 'CoW DAO'
                    ? { width: 42 }
                    : option?.keyName === 'Safe<>Gnosis'
                      ? { width: 60 }
                      : option?.keyName === 'Lido'
                        ? { width: 24 }
                        : { width: 30 }

                const imageHeightViewerInter =
                  option?.keyName === 'CoW DAO'
                    ? { height: 42 }
                    : option?.keyName === 'Safe<>Gnosis'
                      ? { height: 42 }
                      : { height: 30 }

                return (
                  <CustomButton
                    key={option.id}
                    onClick={() => {
                      setIsMenuBeenDisplayed(true)
                      setIsDAOSelectionBeenDisplayed(false)
                      setSelectedDAO(option.id)
                      setSelectedPeriod(null)
                      setSelectedCurrency(null)
                    }}
                  >
                    <BoxWrapperRow gap={2} sx={{ width: '100%' }}>
                      <Box sx={{ width: '40%', justifyContent: 'center', paddingLeft: '45px' }}>
                        <img
                          src={option.icon}
                          alt={option.name}
                          key={option.name}
                          {...imageWithViewerInter}
                          {...imageHeightViewerInter}
                        />
                      </Box>
                      <Box sx={{ width: '60%', textAlign: 'left' }}>
                        <CustomTypo>{option.name}</CustomTypo>
                      </Box>
                    </BoxWrapperRow>
                  </CustomButton>
                )
              })}
          </BoxWrapperColumn>
        </BoxWrapperColumn>

        <BoxWrapperColumn
          sx={{
            height: '100%',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            display: isPeriodSelectionBeenDisplayed ? 'flex' : 'none'
          }}
        >
          <BoxWrapperColumn
            gap={2}
            sx={{
              alignItems: 'center',
              marginTop: '20px',
              overflow: 'hidden',
              overflowY: 'scroll'
            }}
          >
            <CustomTypo sx={{ color: 'primary.main', marginY: '20px' }}>Select period</CustomTypo>
            {FILTER_DAOS.find((option) => {
              if (filterDAO && !selectedDAO) {
                return +option.id === +filterDAO
              } else if (selectedDAO) {
                return +option.id === +selectedDAO
              } else {
                return false
              }
            })
              ?.datesAllowed?.reduce((acc: string[], option) => {
                // reduce to use a pair year-month as id and label
                const pair = `${option.year}-${option.month}`
                if (!acc.includes(pair)) {
                  acc.push(pair)
                }
                return acc
              }, [])
              .sort((a, b) => {
                const [aYear, aMonth] = a.split('-')
                const [bYear, bMonth] = b.split('-')
                return +aYear === +bYear ? +bMonth - +aMonth : +bYear - +aYear
              })
              .map((pair) => {
                const [year, month] = pair.split('-')
                const monthString =
                  MONTHS.find((option) => {
                    return +option.id === +month
                  })?.label ?? ''

                const id = pair
                const label = `${year} ${monthString}`

                return (
                  <CustomButton
                    key={id}
                    onClick={() => {
                      setIsMenuBeenDisplayed(true)
                      setIsPeriodSelectionBeenDisplayed(false)
                      setSelectedPeriod(id)
                    }}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    <CustomTypo gap={2} sx={{ paddingLeft: '85px' }}>
                      {label}
                    </CustomTypo>
                  </CustomButton>
                )
              })}
          </BoxWrapperColumn>
        </BoxWrapperColumn>

        <BoxWrapperColumn
          sx={{
            height: '100%',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            display: isCurrencySelectionBeenDisplayed ? 'flex' : 'none'
          }}
        >
          <BoxWrapperColumn
            gap={2}
            sx={{
              alignItems: 'center',
              marginTop: '20px',
              overflow: 'hidden',
              overflowY: 'scroll'
            }}
          >
            <CustomTypo sx={{ color: 'primary.main', marginY: '20px' }}>Select currency</CustomTypo>
            {FILTER_DAOS.find((option) => {
              if (filterDAO && !selectedDAO) {
                return +option.id === +filterDAO
              } else if (selectedDAO) {
                return +option.id === +selectedDAO
              } else {
                return false
              }
            })?.currenciesAllowed?.map((option) => (
              <CustomButton
                key={option}
                onClick={() => {
                  setIsMenuBeenDisplayed(true)
                  setIsCurrencySelectionBeenDisplayed(false)
                  setSelectedCurrency(option)
                }}
                sx={{ justifyContent: 'flex-start' }}
              >
                <CustomTypo gap={2} sx={{ paddingLeft: '130px' }}>
                  {option}
                </CustomTypo>
              </CustomButton>
            ))}
          </BoxWrapperColumn>
        </BoxWrapperColumn>
      </Dialog>
    </>
  )
}
