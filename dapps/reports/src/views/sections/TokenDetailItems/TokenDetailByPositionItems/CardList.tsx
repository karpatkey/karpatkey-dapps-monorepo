import { Box } from '@mui/material'
import { Variants, motion, useAnimation } from 'framer-motion'
import * as React from 'react'
import { useInView } from 'react-intersection-observer'

import Card from './Card/Card'

interface CardListProps {
  tokenDetailByPosition: any[]
}

const CardList = (props: CardListProps) => {
  const { tokenDetailByPosition } = props

  const [ref, inView] = useInView()
  const controls = useAnimation()

  React.useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.stop()
    }
  }, [inView, controls, tokenDetailByPosition])

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants: Variants = {
    hidden: {
      y: 50,
      opacity: 0
    },
    visible: ({ index }: any) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: 'ease-in-out',
        delay: 0.15 * index
      }
    })
  }

  return (
    <Box
      ref={ref}
      component={motion.div}
      initial={'hidden'}
      animate={controls}
      variants={containerVariants}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        gap: '20px 20px'
      }}
    >
      {tokenDetailByPosition.map((card: any, index: number) => {
        return (
          <Box
            component={motion.div}
            key={index}
            variants={itemVariants}
            custom={{ index }}
            sx={{
              maxWidth: '320px',
              minWidth: '320px',
              minHeight: '440px',
              height: 'content-fit',
              padding: '8px 8px',
              border: '1px solid #B6B6B6',
              background: 'background.paper'
            }}
          >
            <Card id={index} key={index} card={card} />
          </Box>
        )
      })}
    </Box>
  )
}

export default CardList
