import useIsLoading from '@karpatkey-monorepo/reports/src/hooks/useIsLoading'
import useObserveAnchors from '@karpatkey-monorepo/reports/src/hooks/useObserveAnchors'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { slugify } from '@karpatkey-monorepo/shared/utils'
import CircleIcon from '@mui/icons-material/Circle'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemTextProps,
  Skeleton
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import React from 'react'
import { useInView } from 'react-intersection-observer'

export const SIDEBAR_WIDTH = 290

export type Section =
  | 'Summary'
  | 'Balance overview'
  | 'Treasury variation'
  | 'Farming funds and results'
  | 'Token detail'

const SECTIONS: Section[] = [
  'Summary',
  'Balance overview',
  'Treasury variation',
  'Farming funds and results',
  'Token detail'
]

const ListItemTextCustom = styled(ListItemText)<ListItemTextProps>(() => ({
  '& .MuiListItemText-primary': {
    width: 'calc(100% + 1px)'
  }
}))

const SidebarSkeletonLoading = () => {
  return (
    <BoxWrapperColumn sx={{ padding: '10px 10px', width: SIDEBAR_WIDTH, height: '100%' }} gap={2}>
      <List>
        {SECTIONS.map((_text, index) => {
          return (
            <ListItem key={index} sx={{ marginY: '20px' }}>
              <BoxWrapperRow gap={2}>
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton variant="rectangular" width={190} height={30} />
              </BoxWrapperRow>
            </ListItem>
          )
        })}
      </List>
    </BoxWrapperColumn>
  )
}

const Sidebar = () => {
  const router = useRouter()
  const [, hash = 'summary'] = router.asPath.split('#')

  const [sectionVisible, setSectionVisible] = React.useState<Maybe<string>>()

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    trackVisibility: true,
    delay: 3000
  })

  React.useEffect(() => {
    if (inView) {
      setSectionVisible(hash)
    }
  }, [inView, hash])

  useObserveAnchors({
    inView,
    setSectionVisible,
    threshold: 1,
    anchors: ['balance-overview', 'treasury-variation']
  })

  useObserveAnchors({
    inView,
    setSectionVisible,
    threshold: 0.5,
    anchors: ['summary']
  })

  useObserveAnchors({
    inView,
    setSectionVisible,
    threshold: 0.15,
    anchors: ['farming-funds-and-results', 'token-detail']
  })

  const isLoading = useIsLoading()

  return (
    <>
      {!isLoading ? (
        <AnimatePresenceWrapper>
          <BoxWrapperColumn sx={{ padding: '10px 10px', width: SIDEBAR_WIDTH, height: '100%' }}>
            <List ref={ref}>
              {SECTIONS.map((text: Section, index: number) => {
                const isActive = sectionVisible === slugify(text)
                return (
                  <Box
                    onClick={() => {
                      setSectionVisible(slugify(text))
                      router.push(`#${slugify(text)}`).catch((e) => {
                        // workaround for https://github.com/vercel/next.js/issues/37362
                        if (!e.cancelled) {
                          throw e
                        }
                      })
                    }}
                    key={index}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <ListItem key={text}>
                      <ListItemButton sx={{ padding: '0 0' }} disableTouchRipple>
                        <ListItemIcon sx={{ justifyContent: 'flex-start', minWidth: '35px' }}>
                          {isActive ? (
                            <CircleIcon sx={{ color: 'custom.black.primary' }} />
                          ) : (
                            <CircleOutlinedIcon sx={{ color: 'custom.grey.secondary' }} />
                          )}
                        </ListItemIcon>
                        <ListItemTextCustom
                          primary={text}
                          title={text}
                          sx={{
                            '& .MuiListItemText-primary': {
                              color: isActive ? 'custom.black.primary' : 'custom.grey.secondary',
                              fontWeight: isActive ? 700 : 600
                            }
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Box>
                )
              })}
            </List>
          </BoxWrapperColumn>
        </AnimatePresenceWrapper>
      ) : (
        <SidebarSkeletonLoading />
      )}
    </>
  )
}

export default Sidebar
