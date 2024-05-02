import { Filter } from '@karpatkey-monorepo/reports/src/types'
import Button from '@mui/material/Button'
import * as React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'

interface State extends SnackbarOrigin {
  open: boolean
}

const Share = (props: Filter) => {
  const { month, dao, year } = props
  const value = React.useMemo(() => {
    const query = new URLSearchParams()
    const url = window.location.href.split('?')[0]
    if (dao) query.append('dao', dao + '')
    if (month) query.append('month', month + '')
    if (year) query.append('year', year + '')
    return `${url}?${query.toString()}`
  }, [month, dao, year])

  const isShareButtonEnable = React.useMemo(() => {
    return !!month || !!dao || !!year
  }, [month, dao, year])

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
    <>
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
    </>
  )
}

export default Share