import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import { Box } from '@mui/material'
import Lottie from 'lottie-react'
import React from 'react'

const Welcome = () => {
  const [lottieFile, setLottieFile] = React.useState<Maybe<any>>(null)

  React.useEffect(() => {
    ;(async () => {
      const karpatkeyFields = await import(
        '@karpatkey-monorepo/reports/src/utils/Lottie/karpatkeyFields.json'
      )

      setLottieFile(karpatkeyFields)
    })()
  }, [])

  const style = {
    display: 'block',
    alignItems: 'auto',
    marginTop: '-50px',
    zIndex: '-1',
    width: '100%',
    height: '100%'
  }

  return (
    <BoxWrapperColumn sx={{ alignItems: 'center', marginTop: 10 }} gap={10}>
      <CustomTypography variant="h1" textAlign="center">
        View our DAO treasury reports
      </CustomTypography>
      <CustomTypography
        textAlign="center"
        sx={{
          fontFamily: 'IBM Plex Mono',
          fontSize: '30px',
          lineHeight: '28px',
          fontWeight: '300',
          fontStyle: 'normal'
        }}
      >
        Desktop site, Mobile coming soon
      </CustomTypography>
      <CustomTypography
        textAlign="center"
        sx={{
          fontFamily: 'IBM Plex Mono',
          fontSize: '24px',
          lineHeight: '28px',
          fontWeight: '300',
          fontStyle: 'normal'
        }}
      >
        Select report above
      </CustomTypography>
      <Box
        sx={{
          width: '1180px',
          maxWidth: '100%',
          height: '100%',
          maxHeight: '800px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Lottie style={style} loop={false} animationData={lottieFile} />
      </Box>
    </BoxWrapperColumn>
  )
}

export default Welcome
