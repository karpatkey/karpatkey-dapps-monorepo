import { CustomTypography } from 'components/index'
import * as React from 'react'

interface ItemTextProps {
  itemText: string
  maxWidth?: string
}

export const ItemText = ({ itemText, maxWidth = 'fit-content' }: ItemTextProps) => {
  return (
    <CustomTypography
      sx={{
        fontFamily: 'IBM Plex Sans',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '16px',
        lineHeight: '20px',
        color: 'custom.grey.dark',
        maxWidth: maxWidth,
        wordBreak: 'break-word'
      }}
    >
      {itemText}
    </CustomTypography>
  )
}
