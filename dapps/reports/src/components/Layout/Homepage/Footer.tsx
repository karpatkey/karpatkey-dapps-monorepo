import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import Github from '@karpatkey-monorepo/shared/components/Icons/Socials/Github'
import Linkedin from '@karpatkey-monorepo/shared/components/Icons/Socials/Linkedin'
import Mirror from '@karpatkey-monorepo/shared/components/Icons/Socials/Mirror'
import Twitter from '@karpatkey-monorepo/shared/components/Icons/Socials/Twitter'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { Box, Link } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'

const Wrapper = styled(BoxWrapperColumn)(({ theme }: any) => ({
  backgroundColor: theme.palette.background.default,
  justifyContent: 'center',
  gap: 20,
  height: '70px',
  width: '100%',
  maxWidth: '1140px',
  padding: '20px 20px',
  marginLeft: 'auto',
  marginRight: 'auto'
}))

const Container = styled(Box)(() => ({
  display: 'block',
  position: 'static',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
  maxWidth: '980px',
  paddingLeft: '20px',
  paddingRight: '20px'
}))

const Title = styled(CustomTypography)({
  fontFamily: 'IBM Plex Sans',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '24px',
  color: '#262626'
})

export const Footer = () => {
  return (
    <AnimatePresenceWrapper>
      <Wrapper>
        <Container>
          <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
            <BoxWrapperRow>
              <Title>© 2023 karpatkey&nbsp;&nbsp;•&nbsp;&nbsp;</Title>
              <Link
                href={`https://drive.google.com/drive/folders/1-RaGdsneMJ1sznUkzBw2CCWlLlO_EAJB`}
                target="_blank"
                sx={{ textDecoration: 'none' }}
              >
                <Title
                  sx={{
                    fontWeight: 500,
                    '&:hover': {
                      color: 'rgba(26, 27, 31, 0.6)'
                    }
                  }}
                >
                  press kit
                </Title>
              </Link>
            </BoxWrapperRow>
            <BoxWrapperRow gap={4}>
              <Link
                href={`https://github.com/KarpatkeyDAO`}
                target="_blank"
                height={'24px'}
                width={'24px'}
              >
                <Github height={'20px'} width={'100%'} />
              </Link>
              <Link
                href={`https://twitter.com/karpatkey`}
                target="_blank"
                height={'24px'}
                width={'24px'}
              >
                <Twitter height={'20px'} width={'100%'} />
              </Link>
              <Link
                href={`https://mirror.xyz/karpatkey.eth`}
                target="_blank"
                height={'24px'}
                width={'24px'}
              >
                <Mirror height={'20px'} width={'100%'} />
              </Link>
              <Link
                href={`https://www.linkedin.com/company/karpatkey/mycompany/`}
                target="_blank"
                height={'24px'}
                width={'24px'}
              >
                <Linkedin height={'20px'} width={'100%'} />
              </Link>
            </BoxWrapperRow>
          </BoxWrapperRow>
        </Container>
      </Wrapper>
    </AnimatePresenceWrapper>
  )
}
