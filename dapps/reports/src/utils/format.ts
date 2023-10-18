import numbro from 'numbro'

export const formatCurrency = (value: number, mantissa = 0, withZero = false) => {
  if (value === 0 || (value < 0.5 && value > -0.5 && mantissa === 0)) return withZero ? '$0' : '-'

  return numbro(value).formatCurrency({
    spaceSeparated: false,
    mantissa,
    thousandSeparated: true
  })
}

export const formatPercentage = (value: number, mantissa = 2) => {
  if (!value || value === 0) return '-'

  return numbro(value).format({
    output: 'percent',
    spaceSeparated: false,
    mantissa
  })
}

export const formatNumber = (value: number, mantissa = 2) => {
  return numbro(value).format({
    spaceSeparated: false,
    thousandSeparated: true,
    mantissa
  })
}

export const formatCurrencyWithPrecision = (value: number) => {
  if (value > 1) {
    return numbro(value).formatCurrency({
      spaceSeparated: false,
      thousandSeparated: true,
      mantissa: 2
    })
  } else {
    const valueWithPrecision = value.toPrecision(3)
    return numbro(valueWithPrecision).formatCurrency({
      spaceSeparated: false,
      thousandSeparated: true
    })
  }
}
