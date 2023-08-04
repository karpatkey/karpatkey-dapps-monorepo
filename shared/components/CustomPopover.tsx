import { Box, Popover } from '@mui/material'
import React from 'react'

interface CustomPopoverProps {
  id: string | undefined
  open: boolean
  anchorEl: any
  handleClose: () => void
  children: React.ReactNode
  position?: 'left' | 'middle' | 'right'
}

const CustomPopover = (props: CustomPopoverProps) => {
  const containerRef = React.useRef()
  const { id, open, anchorEl, handleClose, children, position = 'middle' } = props
  return (
    <Box ref={containerRef}>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        container={containerRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            borderRadius: 0
          }
        }}
      >
        <Box
          sx={{
            position: 'relative',
            mt: '10px',
            '&::before': {
              backgroundColor: '#F5F5F5',
              content: '""',
              display: 'block',
              position: 'absolute',
              width: 12,
              height: 12,
              top: -6,
              transform: 'rotate(45deg)',
              left:
                position === 'left'
                  ? 'calc(25% - 6px)'
                  : position === 'middle'
                  ? 'calc(50% - 6px)'
                  : 'calc(75% - 6px)'
            }
          }}
        >
          {children}
        </Box>
      </Popover>
    </Box>
  )
}

export default CustomPopover
