import { Filter } from 'src/types'
import { Button, Snackbar } from '@mui/material'
import * as React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { SnackbarOrigin } from '@mui/material/Snackbar'
import { AnimatePresenceWrapper } from 'src/components'

interface State extends SnackbarOrigin {
  open: boolean
}

export const Share = (props: Filter) => {
  const { month, dao, year, currency } = props
  const value = React.useMemo(() => {
    const query = new URLSearchParams()
    const url = window.location.href.split('?')[0]
    if (dao) query.append('dao', dao + '')
    if (month) query.append('month', month + '')
    if (year) query.append('year', year + '')
    if (currency) query.append('currency', currency + '')
    return `${url}?${query.toString()}`
  }, [month, dao, year])

  const isShareButtonEnable = React.useMemo(() => {
    return !!month || !!dao || !!year || !!currency
  }, [month, dao, year, currency])

  // Snackbar state and handlers
  const [snackbarState, setSnackbarState] = React.useState<State>({
    open: false,
    vertical: 'bottom',
    horizontal: 'right'
  })
  const { vertical, horizontal, open } = snackbarState

  const handleClick = (newState: SnackbarOrigin) => () => {
    if (isShareButtonEnable) {
      setSnackbarState({ ...newState, open: true })
    }
  }

  const handleClose = () => {
    setSnackbarState({ ...snackbarState, open: false })
  }

  return (
    <AnimatePresenceWrapper>
      <CopyToClipboard text={value}>
        <Button
          sx={{
            ...(isShareButtonEnable
              ? { backgroundColor: '#1A1A1A !important' }
              : { backgroundColor: '#7A7A7A !important' }),
            width: '110px',
            height: '48px'
          }}
          onClick={handleClick({ vertical: 'bottom', horizontal: 'right' })}
        >
          Share
        </Button>
      </CopyToClipboard>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Link copied!"
        key={vertical + horizontal}
        autoHideDuration={2000}
      />
    </AnimatePresenceWrapper>
  )
}
