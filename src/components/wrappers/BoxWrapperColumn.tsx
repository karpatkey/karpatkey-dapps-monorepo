import { Box, BoxProps, styled } from '@mui/material'
import { FC } from 'react'

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column'
}))

export const BoxWrapperColumn: FC<BoxProps> = (props) => <StyledBox {...props} />
