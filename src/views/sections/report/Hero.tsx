import {
  ButtonAddress,
  AnimatePresenceWrapper,
  CustomTypography,
  BoxWrapperColumn,
  BoxWrapperRow
} from 'src/components'
import { DAO_ADDRESS, FILTER_DAO } from 'src/config/constants'
import { getDAO, getMonthName } from 'src/utils'
import * as React from 'react'
import { useApp } from 'src/contexts/app.context'
import { Box, Theme } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import moment from 'moment'
import { CarouselAddresses } from 'components/carousels/addresses'

export const Hero = () => {
  const { state } = useApp()

  const { DAO: filterDAO, month, year } = state
  // check if the screen size is md
  const isMD = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const { dao, monthName } = React.useMemo(() => {
    const dao: Maybe<FILTER_DAO> = getDAO(filterDAO) ?? null
    const monthName: Maybe<string> = month ? getMonthName(+month)?.label ?? null : null

    return { dao, monthName }
  }, [filterDAO, month])

  if (!dao || !monthName) {
    return null
  }

  const daoAddresses =
    dao?.addresses
      // sort by item order
      .filter((address) => {
        const [monthSince, yearSince] = address.since.split('_')
        //check if the monthSince and yearSince is less than or equal to the current month and year
        const d1 = moment(`${monthSince}/${yearSince}`, 'MM/YYYY')
        const d2 = moment(`${month}/${year}`, 'MM/YYYY')

        return d1.isSameOrBefore(d2)
      }) ?? []

  const imageWidth =
    dao?.keyName === 'Lido'
      ? {}
      : { width: dao?.keyName === 'Safe<>Gnosis' ? 232 : dao?.keyName === 'CoW DAO' ? 168 : 116 }

  return (
    <AnimatePresenceWrapper>
      {isMD ? (
        <BoxWrapperColumn
          sx={{
            margin: {
              xs: '20px 20px 20px 20px',
              md: '30px 30px 30px 30px'
            },
            alignItems: 'flex-start',
            gap: { xs: 2, md: 4 }
          }}
        >
          <BoxWrapperRow sx={{ gap: { xs: 0, md: 2 } }}>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <img
                src={dao?.icon ?? ''}
                alt={dao?.name ?? ''}
                height={dao?.keyName === 'CoW DAO' ? 168 : 116}
                key={dao?.icon}
                {...imageWidth}
              />
            </Box>
            <a className="anchor" id="summary" />
            <BoxWrapperColumn
              sx={{
                alignItems: 'flex-start',
                alignSelf: 'stretch',
                justifyContent: 'center',
                gap: { xs: 1, md: 0 }
              }}
            >
              <CustomTypography
                variant="heroSectionTitle"
                sx={{
                  fontSize: {
                    xs: '44px',
                    md: '64px'
                  },
                  lineHeight: {
                    xs: '44px',
                    md: '64px'
                  }
                }}
              >
                {dao?.name?.trim()}
              </CustomTypography>
              <CustomTypography
                variant="heroSectionSubtitle"
                sx={{
                  fontSize: {
                    xs: '24px',
                    md: '32px'
                  },
                  lineHeight: {
                    xs: '24px',
                    md: '64px'
                  }
                }}
              >
                {monthName.trim()} Treasury Report
              </CustomTypography>
            </BoxWrapperColumn>
          </BoxWrapperRow>
          <BoxWrapperRow
            sx={{
              justifyContent: 'flex-start',
              gap: 2,
              padding: '20px 20px 20px 0px',
              flexWrap: 'wrap'
            }}
          >
            {daoAddresses
              .sort((a: DAO_ADDRESS, b: DAO_ADDRESS) => a.order - b.order)
              .map((daoAddress: DAO_ADDRESS, index: number) => (
                <Box key={index}>
                  <ButtonAddress daoAddress={daoAddress} />
                </Box>
              ))}
          </BoxWrapperRow>
        </BoxWrapperColumn>
      ) : null}
      {!isMD && daoAddresses.length <= 1 ? (
        <BoxWrapperRow
          id="summary"
          sx={{
            justifyContent: 'flex-start',
            gap: 2,
            padding: '20px 20px 20px 20px',
            borderBottom: '2px solid #E0E0E0',
            flexWrap: 'wrap'
          }}
        >
          {daoAddresses
            .sort((a: DAO_ADDRESS, b: DAO_ADDRESS) => a.order - b.order)
            .map((daoAddress: DAO_ADDRESS, index: number) => (
              <Box key={index}>
                <ButtonAddress daoAddress={daoAddress} />
              </Box>
            ))}
        </BoxWrapperRow>
      ) : null}
      {!isMD && daoAddresses.length > 1 ? (
        <Box
          id="summary"
          sx={{
            padding: `10px 20px 10px 20px`,
            borderBottom: '2px solid #E0E0E0'
          }}
        >
          <CarouselAddresses
            className="custom-slider-address"
            totalSlides={daoAddresses.length || 0}
          >
            {daoAddresses
              .sort((a: DAO_ADDRESS, b: DAO_ADDRESS) => a.order - b.order)
              .map((daoAddress: DAO_ADDRESS, index: number) => (
                <Box key={index}>
                  <ButtonAddress daoAddress={daoAddress} sx={{ paddingX: '10px' }} />
                </Box>
              ))}
          </CarouselAddresses>
        </Box>
      ) : null}
    </AnimatePresenceWrapper>
  )
}

export default Hero
