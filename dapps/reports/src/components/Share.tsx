import Button from '@mui/material/Button'
import * as React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'

interface State extends SnackbarOrigin {
  open: boolean
}

interface ShareProps {
  daoSelected: Maybe<number>
  monthSelected: Maybe<number>
  yearSelected: Maybe<number>
}

const Share = (props: ShareProps) => {
  const { monthSelected, daoSelected, yearSelected } = props
  const value = React.useMemo(() => {
    const query = new URLSearchParams()
    const url = window.location.href.split('?')[0]
    if (daoSelected) query.append('dao', daoSelected + '')
    if (monthSelected) query.append('month', monthSelected + '')
    if (yearSelected) query.append('year', yearSelected + '')
    return `${url}?${query.toString()}`
  }, [monthSelected, daoSelected, yearSelected])

  const isShareButtonEnable = React.useMemo(() => {
    return !!monthSelected || !!daoSelected || !!yearSelected
  }, [monthSelected, daoSelected, yearSelected])

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
