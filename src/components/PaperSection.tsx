import InfoIcon from '@mui/icons-material/Info'
import { Divider, Theme, Tooltip } from '@mui/material'
import * as React from 'react'
import { Section } from './layout/report/desktop/Sidebar'
import { CustomTypography, Paper, BoxWrapperRow, BoxWrapperColumn } from 'src/components'
import { slugify } from 'src/utils'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

interface PaperSectionProps {
  id?: Section
  title?: Section
  subTitle?: string
  helpInfo?: string
  filter?: React.ReactNode
  children: React.ReactNode
  sxCustom?: any
}

export const PaperSection = (props: PaperSectionProps) => {
  const { id, title, subTitle, sxCustom, helpInfo, filter, children } = props

  const isMD = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  return (
    <Paper
      className={'scrollable'}
      {...(id && isMD ? { id: slugify(id) } : {})}
      {...(sxCustom ? { sx: { ...sxCustom } } : {})}
    >
      {!isMD && (
        <Box
          {...(id && !isMD ? { id: slugify(id) } : {})}
          sx={{
            visibility: 'hidden',
            marginTop: '-140px',
            position: 'absolute'
          }}
        />
      )}
      <Divider />
      <BoxWrapperColumn
        sx={{
          margin: {
            xs: '40px 20px 40px 20px',
            md: '30px 30px 30px 30px'
          },
          gap: { xs: 3, md: 3 }
        }}
      >
        {title ? (
          <BoxWrapperRow
            gap={2}
            sx={{ justifyContent: 'flex-start', alignItems: { xs: 'center', md: 'flex-end' } }}
          >
            <CustomTypography
              variant="paperSectionTitle"
              textAlign="left"
              sx={{
                fontSize: { xs: 22, md: 44 },
                lineHeight: { xs: '22px', md: '44px' }
              }}
            >
              {title}
            </CustomTypography>
            {helpInfo ? (
              <Tooltip
                title={
                  <CustomTypography
                    variant="body1"
                    sx={{ color: 'common.white', fontSize: { xs: 14, md: 18 } }}
                  >
                    {helpInfo}
                  </CustomTypography>
                }
                enterTouchDelay={0}
                sx={{ ml: 1, cursor: 'pointer' }}
              >
                <InfoIcon sx={{ fontSize: { xs: 30, md: 40 }, cursor: 'pointer' }} />
              </Tooltip>
            ) : null}
          </BoxWrapperRow>
        ) : null}
        {subTitle || filter ? (
          <BoxWrapperRow
            sx={{
              ...(subTitle ? { justifyContent: 'space-between' } : { justifyContent: 'flex-end' }),
              gap: '0.75em'
            }}
          >
            {subTitle ? (
              <CustomTypography
                variant="paperSectionSubtitle"
                sx={{
                  fontSize: { xs: 16, md: 22 },
                  lineHeight: { xs: '20px', md: '22px' }
                }}
              >
                {subTitle}
              </CustomTypography>
            ) : null}
            {filter ? filter : null}
          </BoxWrapperRow>
        ) : null}
        {children}
      </BoxWrapperColumn>
    </Paper>
  )
}
