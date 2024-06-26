import { isFeatureFlagOne } from '../params'

export const getTokenDetails = (data: any, dataV2: any) => {
  const rowsFilteredUSD = dataV2.filter((row: any) => {
    return (row.metric.includes('balances') || row.metric.includes('unclaim')) && +row.bal_1 !== 0
  })

  const rowsUSD = rowsFilteredUSD.reduce(
    (
      acc: any,
      obj: any
    ): {
      price: number
      balance: number
      usdValue: number
      nextPeriodFirstPrice: number
      periodFirstPrice: number
      tokenCategory: string
      blockchain: string
      tokenSymbol: string
    }[][] => {
      const tokenCategory = obj?.token_category?.replace(/[0-9][0-9] /g, '').trim()
      const blockchain = obj?.blockchain?.trim()
      const tokenSymbol = obj?.token_symbol?.trim()

      if (!tokenCategory || !blockchain || !tokenSymbol) return acc

      if (!acc[blockchain]) acc[blockchain] = {}
      if (!acc[blockchain][tokenCategory]) acc[blockchain][tokenCategory] = {}
      if (!acc[blockchain][tokenCategory][tokenSymbol])
        acc[blockchain][tokenCategory][tokenSymbol] = {
          price: 0,
          balance: 0,
          usdValue: 0,
          nextPeriodFirstPrice: 0,
          periodFirstPrice: 0,
          tokenCategory,
          blockchain,
          tokenSymbol
        }

      acc[blockchain][tokenCategory][tokenSymbol].price = obj['next_period_first_price'] ?? 0
      acc[blockchain][tokenCategory][tokenSymbol].balance =
        acc[blockchain][tokenCategory][tokenSymbol].balance + (obj['bal_1'] ? obj['bal_1'] : 0)
      acc[blockchain][tokenCategory][tokenSymbol].usdValue =
        acc[blockchain][tokenCategory][tokenSymbol].usdValue +
        ((obj['bal_1'] ?? 0) * obj['next_period_first_price'] ?? 0)
      acc[blockchain][tokenCategory][tokenSymbol].nextPeriodFirstPrice =
        acc[blockchain][tokenCategory][tokenSymbol].nextPeriodFirstPrice +
        (obj['next_period_first_price'] ? obj['next_period_first_price'] : 0)
      acc[blockchain][tokenCategory][tokenSymbol].periodFirstPrice =
        acc[blockchain][tokenCategory][tokenSymbol].periodFirstPrice +
        (obj['period_first_price'] ? obj['period_first_price'] : 0)

      return acc
    },
    []
  )

  let rowsFlatUSD: any = []
  for (const blockchain in rowsUSD) {
    for (const tokenCategory in rowsUSD[blockchain]) {
      for (const tokenSymbol in rowsUSD[blockchain][tokenCategory]) {
        rowsFlatUSD.push(rowsUSD[blockchain][tokenCategory][tokenSymbol])
      }
    }
  }

  rowsFlatUSD = rowsFlatUSD
    .map((row: any) => {
      return {
        ...row,
        price: row.price,
        priceAvg: row.price,
        priceVariation: row.nextPeriodFirstPrice / row.periodFirstPrice - 1
      }
    })
    .sort((a: any, b: any) => b.allocation - a.allocation)

  // ########################################

  const rowsFilteredETH = dataV2.filter((row: any) => {
    return (row.metric.includes('balances') || row.metric.includes('unclaim')) && +row.bal_1 !== 0
  })

  const rowsETH = rowsFilteredETH.reduce(
    (
      acc: any,
      obj: any
    ): {
      price: number
      balance: number
      usdValue: number
      nextPeriodFirstPrice: number
      periodFirstPrice: number
      tokenCategory: string
      blockchain: string
      tokenSymbol: string
    }[][] => {
      const tokenCategory = obj?.token_category?.replace(/[0-9][0-9] /g, '').trim()
      const blockchain = obj?.blockchain?.trim()
      const tokenSymbol = obj?.token_symbol?.trim()

      if (!tokenCategory || !blockchain || !tokenSymbol) return acc

      if (!acc[blockchain]) acc[blockchain] = {}
      if (!acc[blockchain][tokenCategory]) acc[blockchain][tokenCategory] = {}
      if (!acc[blockchain][tokenCategory][tokenSymbol])
        acc[blockchain][tokenCategory][tokenSymbol] = {
          price: 0,
          balance: 0,
          usdValue: 0,
          nextPeriodFirstPrice: 0,
          periodFirstPrice: 0,
          tokenCategory,
          blockchain,
          tokenSymbol
        }

      acc[blockchain][tokenCategory][tokenSymbol].price =
        (obj['next_period_first_price'] ?? 0) / (obj['eth_next_month_first_price'] ?? 1)
      acc[blockchain][tokenCategory][tokenSymbol].balance =
        acc[blockchain][tokenCategory][tokenSymbol].balance + (obj['bal_1'] ? obj['bal_1'] : 0)
      acc[blockchain][tokenCategory][tokenSymbol].usdValue =
        acc[blockchain][tokenCategory][tokenSymbol].usdValue +
        (obj['bal_1'] * obj['next_period_first_price']) / (obj['eth_next_month_first_price'] ?? 1)

      acc[blockchain][tokenCategory][tokenSymbol].nextPeriodFirstPrice =
        acc[blockchain][tokenCategory][tokenSymbol].nextPeriodFirstPrice +
        +obj['next_period_first_price'] / (+obj['eth_next_month_first_price'] || 1)
      acc[blockchain][tokenCategory][tokenSymbol].periodFirstPrice =
        acc[blockchain][tokenCategory][tokenSymbol].periodFirstPrice +
        +obj['period_first_price'] / (+obj['eth_month_first_price'] || 1)

      return acc
    },
    []
  )

  let rowsFlatETH: any = []
  for (const blockchain in rowsETH) {
    for (const tokenCategory in rowsETH[blockchain]) {
      for (const tokenSymbol in rowsETH[blockchain][tokenCategory]) {
        rowsFlatETH.push(rowsETH[blockchain][tokenCategory][tokenSymbol])
      }
    }
  }

  rowsFlatETH = rowsFlatETH
    .map((row: any) => {
      return {
        ...row,
        price: row.price,
        priceAvg: row.price,
        priceVariation: row.nextPeriodFirstPrice / (row.periodFirstPrice || 1) - 1
      }
    })
    .sort((a: any, b: any) => b.allocation - a.allocation)

  return {
    rowsFlatUSD,
    rowsFlatETH
  }
}

export const getTokenDetailsGrouped = (data: any, dataV2: any) => {
  const rowsFilteredUSD = dataV2.filter((row: any) => {
    return (row.metric.includes('balances') || row.metric.includes('unclaim')) && +row.bal_1 !== 0
  })

  const rowsUSD = rowsFilteredUSD.reduce(
    (
      acc: any,
      obj: any
    ): {
      price: number
      balance: number
      usdValue: number
      nextPeriodFirstPrice: number
      periodFirstPrice: number
      blockchain: string[]
      tokenCategory: string
      tokenSymbol: string
    }[][] => {
      const tokenCategory = obj?.token_category?.replace(/[0-9][0-9] /g, '').trim()
      const tokenSymbol = obj?.token_symbol?.trim()

      if (!tokenCategory || !tokenSymbol) return acc

      if (!acc[tokenCategory]) acc[tokenCategory] = {}
      if (!acc[tokenCategory][tokenSymbol])
        acc[tokenCategory][tokenSymbol] = {
          price: 0,
          balance: 0,
          usdValue: 0,
          nextPeriodFirstPrice: 0,
          periodFirstPrice: 0,
          blockchain: [],
          tokenCategory,
          tokenSymbol
        }

      acc[tokenCategory][tokenSymbol].price = obj['next_period_first_price'] ?? 0
      acc[tokenCategory][tokenSymbol].balance =
        acc[tokenCategory][tokenSymbol].balance + (obj['bal_1'] ? obj['bal_1'] : 0)
      acc[tokenCategory][tokenSymbol].usdValue =
        acc[tokenCategory][tokenSymbol].usdValue +
        ((obj['bal_1'] ?? 0) * obj['next_period_first_price'] ?? 0)
      acc[tokenCategory][tokenSymbol].nextPeriodFirstPrice =
        acc[tokenCategory][tokenSymbol].nextPeriodFirstPrice +
        (obj['next_period_first_price'] ? obj['next_period_first_price'] : 0)
      acc[tokenCategory][tokenSymbol].periodFirstPrice =
        acc[tokenCategory][tokenSymbol].periodFirstPrice +
        (obj['period_first_price'] ? obj['period_first_price'] : 0)

      if (!acc[tokenCategory][tokenSymbol].blockchain.includes(obj['blockchain']))
        acc[tokenCategory][tokenSymbol].blockchain.push(obj['blockchain'])

      return acc
    },
    []
  )

  let rowsFlatUSD: any = []

  for (const tokenCategory in rowsUSD) {
    for (const tokenSymbol in rowsUSD[tokenCategory]) {
      rowsFlatUSD.push(rowsUSD[tokenCategory][tokenSymbol])
    }
  }

  rowsFlatUSD = rowsFlatUSD.map((row: any) => {
    return {
      ...row,
      blockchain: row.blockchain.sort((a: any, b: any) => a.localeCompare(b)).join('|'),
      price: row.price,
      priceAvg: row.price,
      priceVariation: row.nextPeriodFirstPrice / row.periodFirstPrice - 1
    }
  })

  //////////////////////////// ETH
  const rowsFilteredETH = dataV2.filter((row: any) => {
    return (row.metric.includes('balances') || row.metric.includes('unclaim')) && +row.bal_1 !== 0
  })

  const rowsETH = rowsFilteredETH.reduce(
    (
      acc: any,
      obj: any
    ): {
      price: number
      balance: number
      usdValue: number
      nextPeriodFirstPrice: number
      periodFirstPrice: number
      blockchain: string[]
      tokenCategory: string
      tokenSymbol: string
    }[][] => {
      const tokenCategory = obj?.token_category?.replace(/[0-9][0-9] /g, '').trim()
      const tokenSymbol = obj?.token_symbol?.trim()

      if (!tokenCategory || !tokenSymbol) return acc

      if (!acc[tokenCategory]) acc[tokenCategory] = {}
      if (!acc[tokenCategory][tokenSymbol])
        acc[tokenCategory][tokenSymbol] = {
          price: 0,
          balance: 0,
          usdValue: 0,
          nextPeriodFirstPrice: 0,
          periodFirstPrice: 0,
          blockchain: [],
          tokenCategory,
          tokenSymbol
        }

      acc[tokenCategory][tokenSymbol].price =
        (obj['next_period_first_price'] ?? 0) / (obj['eth_next_month_first_price'] ?? 1)
      acc[tokenCategory][tokenSymbol].balance =
        acc[tokenCategory][tokenSymbol].balance + (obj['bal_1'] ? obj['bal_1'] : 0)
      acc[tokenCategory][tokenSymbol].usdValue =
        acc[tokenCategory][tokenSymbol].usdValue +
        ((obj['bal_1'] * obj['next_period_first_price']) /
          (obj['eth_next_month_first_price'] ?? 1) ?? 0)
      acc[tokenCategory][tokenSymbol].nextPeriodFirstPrice =
        acc[tokenCategory][tokenSymbol].nextPeriodFirstPrice +
        (+obj['next_period_first_price'] ?? 0) / (+obj['eth_next_month_first_price'] || 1)
      acc[tokenCategory][tokenSymbol].periodFirstPrice =
        acc[tokenCategory][tokenSymbol].periodFirstPrice +
        (+obj['period_first_price'] ?? 0) / (+obj['eth_month_first_price'] || 1)

      if (!acc[tokenCategory][tokenSymbol].blockchain.includes(obj['blockchain']))
        acc[tokenCategory][tokenSymbol].blockchain.push(obj['blockchain'])

      return acc
    },
    []
  )

  let rowsFlatETH: any = []

  for (const tokenCategory in rowsETH) {
    for (const tokenSymbol in rowsETH[tokenCategory]) {
      rowsFlatETH.push(rowsETH[tokenCategory][tokenSymbol])
    }
  }

  rowsFlatETH = rowsFlatETH.map((row: any) => {
    return {
      ...row,
      blockchain: row.blockchain.sort((a: any, b: any) => a.localeCompare(b)).join('|'),
      price: row.price,
      priceAvg: row.price,
      priceVariation: row.nextPeriodFirstPrice / row.periodFirstPrice - 1
    }
  })

  return {
    rowsFlatUSD,
    rowsFlatETH
  }
}

export const getTokenDetailByPositionUSD = (data: any, params: any) => {
  const isDDay = isFeatureFlagOne({ yearArg: params?.year, monthArg: params?.month })

  const rowsFiltered = data.filter((row: any) => {
    return (
      ((row.metric.includes('balances') || row.metric.includes('unclaim')) &&
        !row.protocol.includes('Wallet')) ||
      row.metric_code === 'm21' ||
      row.metric_code === 'm22' ||
      row.metric_code === 'm23' ||
      row.metric_code === 'm24' ||
      row.metric_code === 'm25' ||
      row.metric_code === 'm26'
    )
  })

  const commonCards = rowsFiltered
    .reduce((acc: any, obj: any): any => {
      const cardType = obj?.type?.trim()
      if (cardType === 'CDP') {
        return acc
      }

      const deFiType = obj?.farming_type?.includes('DeFi') ? 'DeFi' : 'Operations'
      const tokenSymbol = obj?.token_symbol?.trim()
      const position = obj?.lptoken_name?.trim()
      const blockchain = obj?.blockchain?.trim()
      const protocol = obj?.protocol?.trim()
      const metric = obj?.metric?.trim()

      if (!tokenSymbol || !position || !blockchain || !protocol || !metric || !deFiType) {
        return acc
      }

      let categoryName = isDDay && deFiType ? `${deFiType} funds` : 'Farming funds'
      if (metric.includes('unclaim')) {
        categoryName = isDDay && deFiType ? `${deFiType} unclaimed rewards` : 'Unclaimed rewards'
      }
      if (metric.includes('balance') && protocol.includes('Wallet')) {
        categoryName = 'Wallet'
      }

      const cardFound = acc.find((card: any) => {
        return (
          card.blockchain === blockchain &&
          card.protocol === protocol &&
          card.position === position &&
          card.deFiType === deFiType
        )
      })

      const balance = obj.bal_1 ? obj.bal_1 : 0
      const price = obj.next_period_first_price ? obj.next_period_first_price : 0

      if (cardFound) {
        const categoryFound = cardFound?.categories.find((category: any) => {
          return category.name === categoryName
        })

        if (categoryFound) {
          // check if token already exists
          const tokenFound = categoryFound.tokens.find((token: any) => {
            return token.symbol === tokenSymbol
          })

          if (tokenFound) {
            tokenFound.balance = tokenFound.balance + balance
            tokenFound.usdValue = tokenFound.balance * price
          } else {
            categoryFound.tokens.push({
              symbol: tokenSymbol,
              balance,
              usdValue: balance * price
            })
          }
        } else {
          cardFound.categories.push({
            name: categoryName,
            tokens: [
              {
                symbol: tokenSymbol,
                balance,
                usdValue: balance * price
              }
            ]
          })
        }
      } else {
        acc.push({
          blockchain,
          protocol,
          position,
          deFiType,
          cardType: 'common',
          categories: [
            {
              name: categoryName,
              tokens: [
                {
                  symbol: tokenSymbol,
                  balance,
                  usdValue: balance * price
                }
              ]
            }
          ]
        })
      }

      return acc
    }, [])
    .map((card: any) => {
      card.categories.forEach((category: any) => {
        card.totalUsdValue =
          (card.totalUsdValue || 0) +
          category.tokens.reduce((acc: any, obj: any) => {
            return acc + obj.usdValue
          }, 0)
      })
      return card
    })

  const metricsCards = rowsFiltered.reduce((acc: any, obj: any): any => {
    const metricCode = obj?.metric_code?.trim()

    if (
      metricCode !== 'm24' &&
      metricCode !== 'm23' &&
      metricCode !== 'm22' &&
      metricCode !== 'm21'
    ) {
      return acc
    }

    const blockchain = obj?.blockchain?.trim()
    const protocol = obj?.protocol?.trim()
    const position = obj?.lptoken_name?.trim()
    const tokenSymbol = obj?.token_symbol?.trim()
    const deFiType = obj?.farming_type?.includes('DeFi') ? 'DeFi' : 'Operations'

    if (!blockchain || !protocol || !position || !deFiType) {
      return acc
    }

    const positionType = 'Ratios'

    let ratioName = ''
    if (!tokenSymbol && metricCode === 'm24') {
      ratioName = 'Collateral price drop to liquidation'
    }
    if (!tokenSymbol && metricCode === 'm23') {
      ratioName = 'Collateral liquidation price'
    }
    if (!tokenSymbol && metricCode === 'm22') {
      ratioName = 'Minimum collateral ratio'
    }
    if (!tokenSymbol && metricCode === 'm21') {
      ratioName = 'Collateral ratio'
    }

    const cardFound = acc.find((card: any) => {
      return (
        card.blockchain === blockchain &&
        card.protocol === protocol &&
        card.position === position &&
        card.deFiType === deFiType
      )
    })

    const value = obj.metric_value ? obj.metric_value : 0

    if (cardFound) {
      const categoryFound = cardFound?.categories.find((category: any) => {
        return category.name === positionType
      })

      if (categoryFound) {
        categoryFound?.ratios?.push({
          name: ratioName,
          value
        })
      } else {
        cardFound?.categories?.push({
          name: positionType,
          ratios: [
            {
              name: ratioName,
              value
            }
          ]
        })
      }
    } else {
      acc.push({
        blockchain,
        protocol,
        position,
        cardType: 'metrics',
        deFiType,
        categories: [
          {
            name: positionType,
            ratios: [
              {
                name: ratioName,
                value
              }
            ]
          }
        ]
      })
    }

    return acc
  }, [])

  const vaultCards = rowsFiltered
    .reduce((acc: any, obj: any): any => {
      const cardType = obj?.type?.trim()

      if (cardType === 'Standard') {
        return acc
      }

      const position = obj?.lptoken_name?.trim()
      const blockchain = obj?.blockchain?.trim()
      const protocol = obj?.protocol?.trim()
      const tokenSymbol = obj?.token_symbol?.trim()
      const deFiType = obj?.farming_type?.includes('DeFi') ? 'DeFi' : 'Operations'

      if (!position || !blockchain || !protocol || !tokenSymbol || !deFiType) {
        return acc
      }

      const balance = obj.bal_1 ? obj.bal_1 : 0

      let categoryName = 'Operations'
      if (obj?.farming_type?.includes('DeFi funds')) {
        const positiveBalanceLabel = isDDay ? `DeFi funds: collateral` : `Farming funds: collateral`
        const negativeBalanceLabel = isDDay ? `DeFi funds: debt` : `Farming funds: debt`
        categoryName = balance > 0 ? positiveBalanceLabel : negativeBalanceLabel
      }
      if (obj?.farming_type?.includes('unclaim')) {
        categoryName = isDDay ? `DeFi unclaimed rewards` : `Unclaimed rewards`
      }
      if (obj?.farming_type?.includes('Operations')) {
        const positiveBalanceLabel = `Operations funds: collateral`
        const negativeBalanceLabel = `Operations funds: debt`
        categoryName = balance > 0 ? positiveBalanceLabel : negativeBalanceLabel
      }

      const cardFound = acc.find((card: any) => {
        return (
          card.blockchain === blockchain &&
          card.protocol === protocol &&
          card.position === position &&
          card.deFiType === deFiType
        )
      })

      const price = obj.next_period_first_price ? obj.next_period_first_price : 0

      if (cardFound) {
        const categoryFound = cardFound?.categories.find((category: any) => {
          return category.name === categoryName
        })

        if (categoryFound) {
          categoryFound?.tokens?.push({
            symbol: tokenSymbol,
            balance,
            usdValue: balance * price
          })
        } else {
          cardFound?.categories?.push({
            name: categoryName,
            tokens: [
              {
                symbol: tokenSymbol,
                balance,
                usdValue: balance * price
              }
            ]
          })
        }
      } else {
        acc.push({
          blockchain,
          protocol,
          position,
          deFiType,
          cardType: 'metrics',
          categories: [
            {
              name: categoryName,
              tokens: [
                {
                  symbol: tokenSymbol,
                  balance,
                  usdValue: balance * price
                }
              ]
            }
          ]
        })
      }

      return acc
    }, [])
    .map((card: any) => {
      card.categories.forEach((category: any) => {
        card.totalUsdValue =
          (card.totalUsdValue || 0) +
          category.tokens.reduce((acc: any, obj: any) => {
            return acc + obj.usdValue
          }, 0)
      })
      return card
    })

  const mergeAllCards = (cards1: any, cards2: any, cards3: any) => {
    const cards = cards1.concat(cards2).concat(cards3)
    const cardsMerged = cards.reduce((acc: any, obj: any): any => {
      const cardFound = acc.find((card: any) => {
        return (
          card.blockchain === obj.blockchain &&
          card.protocol === obj.protocol &&
          card.position === obj.position &&
          card.deFiType === obj.deFiType
        )
      })

      if (cardFound) {
        cardFound.categories = cardFound.categories.concat(obj.categories)
      } else {
        acc.push(obj)
      }

      return acc
    }, [])

    return cardsMerged
  }

  const allCards = mergeAllCards(commonCards, vaultCards, metricsCards)
  const allCardsSortedByTotalUsdValue = allCards.sort((a: any, b: any) => {
    return b.totalUsdValue - a.totalUsdValue
  })

  return allCardsSortedByTotalUsdValue
}

export const getTokenDetailByPositionETH = (data: any, params: any) => {
  const isDDay = isFeatureFlagOne({ yearArg: params?.year, monthArg: params?.month })

  const rowsFiltered = data.filter((row: any) => {
    return (
      ((row.metric.includes('balances') || row.metric.includes('unclaim')) &&
        !row.protocol.includes('Wallet')) ||
      row.metric_code === 'm21' ||
      row.metric_code === 'm22' ||
      row.metric_code === 'm23' ||
      row.metric_code === 'm24' ||
      row.metric_code === 'm25' ||
      row.metric_code === 'm26'
    )
  })

  const commonCards = rowsFiltered
    .reduce((acc: any, obj: any): any => {
      const cardType = obj?.type?.trim()
      if (cardType === 'CDP') {
        return acc
      }

      const deFiType = obj?.farming_type?.includes('DeFi') ? 'DeFi' : 'Operations'
      const tokenSymbol = obj?.token_symbol?.trim()
      const position = obj?.lptoken_name?.trim()
      const blockchain = obj?.blockchain?.trim()
      const protocol = obj?.protocol?.trim()
      const metric = obj?.metric?.trim()

      if (!tokenSymbol || !position || !blockchain || !protocol || !metric || !deFiType) {
        return acc
      }

      let categoryName = isDDay && deFiType ? `${deFiType} funds` : 'Farming funds'
      if (metric.includes('unclaim')) {
        categoryName = isDDay && deFiType ? `${deFiType} unclaimed rewards` : 'Unclaimed rewards'
      }
      if (metric.includes('balance') && protocol.includes('Wallet')) {
        categoryName = 'Wallet'
      }

      const cardFound = acc.find((card: any) => {
        return (
          card.blockchain === blockchain &&
          card.protocol === protocol &&
          card.position === position &&
          card.deFiType === deFiType
        )
      })

      const balance = obj?.bal_1 ?? 0
      const price = obj?.next_period_first_price / (obj?.eth_next_month_first_price ?? 1)

      if (cardFound) {
        const categoryFound = cardFound?.categories.find((category: any) => {
          return category.name === categoryName
        })

        if (categoryFound) {
          // check if token already exists
          const tokenFound = categoryFound.tokens.find((token: any) => {
            return token.symbol === tokenSymbol
          })

          if (tokenFound) {
            tokenFound.balance = tokenFound.balance + balance
            tokenFound.usdValue = tokenFound.balance * price
          } else {
            categoryFound.tokens.push({
              symbol: tokenSymbol,
              balance,
              usdValue: balance * price
            })
          }
        } else {
          cardFound.categories.push({
            name: categoryName,
            tokens: [
              {
                symbol: tokenSymbol,
                balance,
                usdValue: balance * price
              }
            ]
          })
        }
      } else {
        acc.push({
          blockchain,
          protocol,
          position,
          deFiType,
          cardType: 'common',
          categories: [
            {
              name: categoryName,
              tokens: [
                {
                  symbol: tokenSymbol,
                  balance,
                  usdValue: balance * price
                }
              ]
            }
          ]
        })
      }

      return acc
    }, [])
    .map((card: any) => {
      card.categories.forEach((category: any) => {
        card.totalUsdValue =
          (card.totalUsdValue || 0) +
          category.tokens.reduce((acc: any, obj: any) => {
            return acc + obj.usdValue
          }, 0)
      })
      return card
    })

  const metricsCards = rowsFiltered.reduce((acc: any, obj: any): any => {
    const metricCode = obj?.metric_code?.trim()

    if (
      metricCode !== 'm24' &&
      metricCode !== 'm23' &&
      metricCode !== 'm22' &&
      metricCode !== 'm21'
    ) {
      return acc
    }

    const blockchain = obj?.blockchain?.trim()
    const protocol = obj?.protocol?.trim()
    const position = obj?.lptoken_name?.trim()
    const tokenSymbol = obj?.token_symbol?.trim()
    const deFiType = obj?.farming_type?.includes('DeFi') ? 'DeFi' : 'Operations'

    if (!blockchain || !protocol || !position || !deFiType) {
      return acc
    }

    const positionType = 'Ratios'

    let ratioName = ''
    if (!tokenSymbol && metricCode === 'm24') {
      ratioName = 'Collateral price drop to liquidation'
    }
    if (!tokenSymbol && metricCode === 'm23') {
      ratioName = 'Collateral liquidation price'
    }
    if (!tokenSymbol && metricCode === 'm22') {
      ratioName = 'Minimum collateral ratio'
    }
    if (!tokenSymbol && metricCode === 'm21') {
      ratioName = 'Collateral ratio'
    }

    const cardFound = acc.find((card: any) => {
      return (
        card.blockchain === blockchain &&
        card.protocol === protocol &&
        card.position === position &&
        card.deFiType === deFiType
      )
    })

    const value = obj.metric_value ? obj.metric_value : 0

    if (cardFound) {
      const categoryFound = cardFound?.categories.find((category: any) => {
        return category.name === positionType
      })

      if (categoryFound) {
        categoryFound?.ratios?.push({
          name: ratioName,
          value
        })
      } else {
        cardFound?.categories?.push({
          name: positionType,
          ratios: [
            {
              name: ratioName,
              value
            }
          ]
        })
      }
    } else {
      acc.push({
        blockchain,
        protocol,
        position,
        cardType: 'metrics',
        deFiType,
        categories: [
          {
            name: positionType,
            ratios: [
              {
                name: ratioName,
                value
              }
            ]
          }
        ]
      })
    }

    return acc
  }, [])

  const vaultCards = rowsFiltered
    .reduce((acc: any, obj: any): any => {
      const cardType = obj?.type?.trim()

      if (cardType === 'Standard') {
        return acc
      }

      const position = obj?.lptoken_name?.trim()
      const blockchain = obj?.blockchain?.trim()
      const protocol = obj?.protocol?.trim()
      const tokenSymbol = obj?.token_symbol?.trim()
      const deFiType = obj?.farming_type?.includes('DeFi') ? 'DeFi' : 'Operations'

      if (!position || !blockchain || !protocol || !tokenSymbol || !deFiType) {
        return acc
      }

      const balance = obj?.bal_1 ?? 0

      const positiveBalanceLabel = isDDay
        ? `${deFiType} funds: collateral`
        : 'Farming funds: collateral'
      const negativeBalanceLabel = isDDay ? `${deFiType} funds: debt` : 'Farming funds: debt'

      const categoryName = balance > 0 ? positiveBalanceLabel : negativeBalanceLabel

      const cardFound = acc.find((card: any) => {
        return (
          card.blockchain === blockchain &&
          card.protocol === protocol &&
          card.position === position &&
          card.deFiType === deFiType
        )
      })

      const price = obj?.next_period_first_price / (obj?.eth_next_month_first_price ?? 1)

      if (cardFound) {
        const categoryFound = cardFound?.categories.find((category: any) => {
          return category.name === categoryName
        })

        if (categoryFound) {
          categoryFound?.tokens?.push({
            symbol: tokenSymbol,
            balance,
            usdValue: balance * price
          })
        } else {
          cardFound?.categories?.push({
            name: categoryName,
            tokens: [
              {
                symbol: tokenSymbol,
                balance,
                usdValue: balance * price
              }
            ]
          })
        }
      } else {
        acc.push({
          blockchain,
          protocol,
          position,
          deFiType,
          cardType: 'metrics',
          categories: [
            {
              name: categoryName,
              tokens: [
                {
                  symbol: tokenSymbol,
                  balance,
                  usdValue: balance * price
                }
              ]
            }
          ]
        })
      }

      return acc
    }, [])
    .map((card: any) => {
      card.categories.forEach((category: any) => {
        card.totalUsdValue =
          (card.totalUsdValue || 0) +
          category.tokens.reduce((acc: any, obj: any) => {
            return acc + obj.usdValue
          }, 0)
      })
      return card
    })

  const mergeAllCards = (cards1: any, cards2: any, cards3: any) => {
    const cards = cards1.concat(cards2).concat(cards3)
    const cardsMerged = cards.reduce((acc: any, obj: any): any => {
      const cardFound = acc.find((card: any) => {
        return (
          card.blockchain === obj.blockchain &&
          card.protocol === obj.protocol &&
          card.position === obj.position &&
          card.deFiType === obj.deFiType
        )
      })

      if (cardFound) {
        cardFound.categories = cardFound.categories.concat(obj.categories)
      } else {
        acc.push(obj)
      }

      return acc
    }, [])

    return cardsMerged
  }

  const allCards = mergeAllCards(commonCards, vaultCards, metricsCards)
  const allCardsSortedByTotalUsdValue = allCards.sort((a: any, b: any) => {
    return b.totalUsdValue - a.totalUsdValue
  })

  return allCardsSortedByTotalUsdValue
}

export const getWalletTokenDetails = (data: any) => {
  const rowsFilteredUSD = data.filter((row: any) => {
    return (
      row.protocol.includes('Wallet') && row.metric.includes('balances_monthly') && +row.bal_1 !== 0
    )
  })

  const rowsUSD = rowsFilteredUSD.reduce((acc: any, obj: any): any => {
    const blockchain = obj['blockchain'].trim()
    const tokenSymbol = obj['token_symbol'].trim()

    if (!acc[blockchain]) acc[blockchain] = {}
    if (!acc[blockchain][tokenSymbol])
      acc[blockchain][tokenSymbol] = {
        tokenBalance: 0,
        usdValue: 0,
        blockchain,
        tokenSymbol
      }

    acc[blockchain][tokenSymbol].tokenBalance =
      acc[blockchain][tokenSymbol].tokenBalance + (obj['bal_1'] ? obj['bal_1'] : 0)

    acc[blockchain][tokenSymbol].usdValue =
      acc[blockchain][tokenSymbol].usdValue +
      ((obj['bal_1'] ?? 0) * obj['next_period_first_price'] ?? 0)

    return acc
  }, {})

  const rowsFlatUSD: any = []
  for (const blockchain in rowsUSD) {
    for (const tokenSymbol in rowsUSD[blockchain]) {
      rowsFlatUSD.push(rowsUSD[blockchain][tokenSymbol])
    }
  }

  /////////////////// ETH

  const rowsFilteredETH = data.filter((row: any) => {
    return (
      row.protocol.includes('Wallet') && row.metric.includes('balances_monthly') && +row.bal_1 !== 0
    )
  })

  const rowsETH = rowsFilteredETH.reduce((acc: any, obj: any): any => {
    const blockchain = obj['blockchain'].trim()
    const tokenSymbol = obj['token_symbol'].trim()

    if (!acc[blockchain]) acc[blockchain] = {}
    if (!acc[blockchain][tokenSymbol])
      acc[blockchain][tokenSymbol] = {
        tokenBalance: 0,
        usdValue: 0,
        blockchain,
        tokenSymbol
      }

    acc[blockchain][tokenSymbol].tokenBalance =
      acc[blockchain][tokenSymbol].tokenBalance + (obj['bal_1'] ? obj['bal_1'] : 0)

    acc[blockchain][tokenSymbol].usdValue =
      acc[blockchain][tokenSymbol].usdValue +
      ((obj['bal_1'] ?? 0) *
        (obj['next_period_first_price'] / (obj['eth_next_month_first_price'] ?? 1)) ?? 0)
    return acc
  }, {})

  const rowsFlatETH: any = []
  for (const blockchain in rowsETH) {
    for (const tokenSymbol in rowsETH[blockchain]) {
      rowsFlatETH.push(rowsETH[blockchain][tokenSymbol])
    }
  }

  return {
    rowsFlatUSD,
    rowsFlatETH
  }
}

export const tokenDetailsData = ({
  variationMetricsDetail,
  financialMetricAndVarDetail,
  variationMetricsDetailV2,
  params
}: any) => {
  const tokenDetailsRows = getTokenDetails(variationMetricsDetail, variationMetricsDetailV2)
  const tokenDetailsGrouped = getTokenDetailsGrouped(
    variationMetricsDetail,
    variationMetricsDetailV2
  )

  // Token detail by position
  const tokenDetailByPositionUSD = getTokenDetailByPositionUSD(financialMetricAndVarDetail, params)
  const tokenDetailByPositionETH = getTokenDetailByPositionETH(financialMetricAndVarDetail, params)

  // Wallet token detail
  const walletTokenDetail = getWalletTokenDetails(variationMetricsDetail)

  return {
    USD: {
      tokenDetails: tokenDetailsRows.rowsFlatUSD,
      tokenDetailsGrouped: tokenDetailsGrouped.rowsFlatUSD,
      walletTokenDetail: walletTokenDetail.rowsFlatUSD,
      tokenDetailByPosition: tokenDetailByPositionUSD
    },
    ETH: {
      tokenDetails: tokenDetailsRows.rowsFlatETH,
      tokenDetailsGrouped: tokenDetailsGrouped.rowsFlatETH,
      walletTokenDetail: walletTokenDetail.rowsFlatETH,
      tokenDetailByPosition: tokenDetailByPositionETH
    }
  }
}
