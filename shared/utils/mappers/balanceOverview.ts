export const getBalanceOverviewByType = (data: any) => {
  const rows = data
    .filter((row: any) => {
      return row.metric.includes('balances') || row.metric.includes('unclaim')
    })
    .reduce((acc: any, obj: any): { funds: number }[][] => {
      const metric = obj['metric'].trim()
      const tokenCategory = obj['token_category'].replace(/[0-9][0-9] /g, '').trim()
      const protocol = obj['protocol'].trim()
      const metricKey = metric.includes('unclaim')
        ? 'Unclaimed rewards'
        : metric.includes('balance') && protocol.includes('Wallet')
        ? 'Wallet'
        : 'Farming funds'

      if (!acc[tokenCategory]) acc[tokenCategory] = {}
      if (!acc[tokenCategory][metricKey])
        acc[tokenCategory][metricKey] = { funds: 0, row: tokenCategory, column: metricKey }
      acc[tokenCategory][metricKey].funds =
        acc[tokenCategory][metricKey].funds +
        ((obj['bal_1'] ?? 0) * obj['next_period_first_price'] ?? 0)

      return acc
    }, [])

  return Object.keys(rows)
    .map((key: string) => {
      const farmingFunds = rows[key as any]['Farming funds' as any]?.funds ?? 0
      const unclaimedRewards = rows[key as any]['Unclaimed rewards' as any]?.funds ?? 0
      const wallet = rows[key as any]['Wallet' as any]?.funds ?? 0
      const total = farmingFunds + unclaimedRewards + wallet
      return {
        'Token Category': key,
        'Farming funds': farmingFunds,
        'Unclaimed rewards': unclaimedRewards,
        Wallet: wallet,
        Total: total
      }
    })
    .sort((a: any, b: any) => b.Total - a.Total)
}

export const getBalanceOverviewByBlockchain = (data: any) => {
  const rows = data
    .filter((row: any) => {
      return row.metric.includes('balances') || row.metric.includes('unclaim')
    })
    .reduce((acc: any, obj: any): { funds: number }[][] => {
      const tokenCategory = obj['token_category'].replace(/[0-9][0-9] /g, '').trim()
      const blockchain = obj['blockchain'].trim()

      if (!acc[tokenCategory]) acc[tokenCategory] = {}
      if (!acc[tokenCategory][blockchain])
        acc[tokenCategory][blockchain] = { funds: 0, row: tokenCategory, column: blockchain }
      acc[tokenCategory][blockchain].funds =
        acc[tokenCategory][blockchain].funds +
        ((obj['bal_1'] ?? 0) * obj['next_period_first_price'] ?? 0)

      return acc
    }, [])

  const flatRows = Object.keys(rows).reduce((acc: any, key: string) => {
    const row = rows[key as any]
    Object.keys(row).forEach((key: string) => {
      acc.push(row[key])
    })
    return acc
  }, [])

  return flatRows
}
