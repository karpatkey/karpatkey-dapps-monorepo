import { Box, BoxProps, Paper } from '@mui/material'
import numbro from 'numbro'
import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import useMediaQuery from '@mui/material/useMediaQuery'
import { reduceSentenceByLengthInLines } from 'src/utils/strings'
import { formatCurrency, formatNumber } from 'src/utils/format'
import { CustomTypography } from 'src/components'
import { useApp } from 'src/contexts/app.context'

export type WaterfallProps = {
  title?: string
  data: any[]
  bottom?: number
  barSize?: number
}

const CustomTooltip = ({ active, payload }: any) => {
  const { state } = useApp()
  const { currency } = state

  if (active && payload && payload.length > 0) {
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
          {payload[1]?.payload?.value}
        </CustomTypography>
        <CustomTypography
          variant="body2"
          color="textSecondary"
          sx={{ padding: 1, textAlign: 'left' }}
        >
          {currency === 'USD'
            ? formatCurrency(payload[1]?.value, 0, true)
            : formatNumber(payload[1]?.value, 0)}
        </CustomTypography>
      </Paper>
    )
  }

  return null
}

const RenderCustomizedLabel = (props: any) => {
  const { x, y, width, value, viewBox } = props
  const radius = 10

  const customY = value > 0 ? y - radius : y - radius + viewBox.height

  const valueCast = value === 0 || (value < 0.5 && value > -0.5) ? '$0' : value

  return (
    <g>
      <text
        x={x + width / 2}
        y={customY}
        fontSize={12}
        fontWeight="bold"
        fill="#222222"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {numbro(valueCast)
          .formatCurrency({
            average: true,
            totalLength: 3,
            currencySymbol: ' '
          })
          .replace(' ', '')
          .toUpperCase()}
      </text>
    </g>
  )
}

const CustomizedAxisTick = (props: any) => {
  const { x, y, fontSize, payload, charactersLength = 20 } = props

  const words = reduceSentenceByLengthInLines(payload.value, charactersLength)

  return (
    <g transform={`translate(${x},${y})`}>
      {words.map((word: string, i: number) => (
        <text
          x={0}
          y={18}
          dy={i * 18}
          key={i}
          height="auto"
          textAnchor="middle"
          fontSize={fontSize}
          fill="#222222"
        >
          {word}
        </text>
      ))}
    </g>
  )
}

export const Waterfall = ({
  title,
  data,
  barSize = 60,
  bottom = 20,
  ...props
}: BoxProps & WaterfallProps) => {
  const initialBalanceFunds = data.find((item) => item.value === 'Initial Balance')?.uv

  const { minValue } = data.reduce(
    (acc, item) => {
      if (item.value !== 'Initial Balance' && item.value !== 'Final Balance') {
        acc.value += item.uv
        if (acc.value < acc.minValue) {
          acc.minValue = acc.value
        }
      }
      return acc
    },
    { value: initialBalanceFunds, minValue: initialBalanceFunds }
  )

  const { maxValue } = data.reduce(
    (acc, item) => {
      if (item.value !== 'Initial Balance' && item.value !== 'Final Balance') {
        acc.value += item.uv
        if (acc.value > acc.maxValue) {
          acc.maxValue = acc.value
        }
      }
      return acc
    },
    { value: initialBalanceFunds, maxValue: initialBalanceFunds }
  )

  const minValueFloor = minValue * 0.998
  const maxValueCeil = maxValue * 1.002

  let charactersLength = 15
  let fontSize = 12

  const isGreaterThanXL = useMediaQuery((theme: any) => theme.breakpoints.up('xl'))
  if (isGreaterThanXL) {
    charactersLength = 13
    fontSize = 13
  }

  const isMoreThanLGAndLessThanXL = useMediaQuery(
    (theme: any) => theme.breakpoints.up('lg') && theme.breakpoints.down('xl')
  )
  if (isMoreThanLGAndLessThanXL) {
    charactersLength = 10
    fontSize = 12
  }

  const isMoreThanMDAndLessThanLG = useMediaQuery(
    (theme: any) => theme.breakpoints.up('md') && theme.breakpoints.down('lg')
  )
  if (isMoreThanMDAndLessThanLG) {
    charactersLength = 8
    fontSize = 11
  }

  const isLessThanMD = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
  if (isLessThanMD) {
    charactersLength = 8
    fontSize = 9
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      {title ? (
        <CustomTypography variant="h6" color="textSecondary" sx={{ textAlign: 'center' }}>
          {title}
        </CustomTypography>
      ) : null}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            bottom,
            left: 10
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={'value'}
            interval={0}
            fontSize={fontSize}
            tick={(props: any) => (
              <CustomizedAxisTick {...props} charactersLength={charactersLength} />
            )}
          />
          <YAxis
            type={'number'}
            domain={() => {
              return [minValueFloor, maxValueCeil]
            }}
            tickCount={6}
            fontSize={fontSize}
            tickFormatter={(tick) => {
              return numbro(tick)
                .formatCurrency({
                  average: true,
                  spaceSeparated: false,
                  mantissa: 2
                })
                .toUpperCase()
            }}
          />
          <Tooltip wrapperStyle={{ outline: 'none' }} content={<CustomTooltip />} />
          <Bar dataKey="pv" stackId="a" fill="transparent" barSize={barSize} />
          <Bar dataKey="uv" stackId="a" fill="#232323" barSize={barSize}>
            <LabelList dataKey="uv" content={RenderCustomizedLabel} />
            {data.map((item, index) => {
              const color =
                item.value === 'Initial Balance' || item.value === 'Final Balance'
                  ? '#222222'
                  : item.uv < 0
                    ? '#DF5C64'
                    : '#54B9A1'

              return <Cell key={`cell-${index}`} fill={color} />
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}
