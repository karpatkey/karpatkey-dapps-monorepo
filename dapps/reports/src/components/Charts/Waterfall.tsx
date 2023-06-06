import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { Box, BoxProps, Paper } from '@mui/material'
import numbro from 'numbro'
import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

export type WaterfallProps = {
  title: string
  data: any[]
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        elevation={24}
        sx={{
          backgroundColor: '#d9d9d9',
          width: 'max-content',
          minHeight: 60,
          height: 'max-content'
        }}
      >
        <CustomTypography
          variant="body2"
          color="textSecondary"
          sx={{ padding: 1, fontWeight: 'bold', textAlign: 'left' }}
        >
          {payload[1].payload.value}
        </CustomTypography>
        <CustomTypography
          variant="body2"
          color="textSecondary"
          sx={{ padding: 1, textAlign: 'left' }}
        >
          {numbro(payload[1].value).formatCurrency({
            spaceSeparated: false,
            mantissa: 2,
            thousandSeparated: true
          })}
        </CustomTypography>
      </Paper>
    )
  }

  return null
}

const Waterfall = ({ title, data, ...props }: BoxProps & WaterfallProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <CustomTypography variant="h6" color="textSecondary" sx={{ textAlign: 'center' }}>
        {title}
      </CustomTypography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={(obj: any) => {
              if (data.length > 4) {
                return obj.shortedValue
              } else {
                return obj.value
              }
            }}
            fontSize={12}
          />
          <YAxis
            fontSize={12}
            tickFormatter={(tick) => {
              return numbro(tick).formatCurrency({
                average: true,
                spaceSeparated: false,
                mantissa: 2
              })
            }}
          />
          <Tooltip wrapperStyle={{ outline: 'none' }} content={<CustomTooltip />} />
          <Bar dataKey="pv" stackId="a" fill="transparent" barSize={60} />
          <Bar dataKey="uv" stackId="a" fill="#232323" barSize={60}>
            {data.map((item, index) => {
              if (item.uv < 0) {
                return <Cell key={index} fill="#DF5C64" />
              }
              if (item.value === 'Initial Balance' || item.value === 'Final Balance') {
                return <Cell key={index} fill="#6B6B6B" />
              }
              return <Cell key={index} fill="#54B9A1" />
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default Waterfall
