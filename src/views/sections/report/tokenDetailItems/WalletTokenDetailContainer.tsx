import { PieChart, PaperSection, Form, Filter, EmptyData, AutocompleteOption } from 'src/components'
import { OTHERS_WALLET_LIMIT } from 'src/config/constants'
import { SUMMARY_COLORS } from 'src/config/theme'
import { PaperProps, Theme } from '@mui/material'
import * as React from 'react'
import { useApp } from 'src/contexts/app.context'
import { TableWalletTokenDetail } from './TableWalletTokenDetail'
import useMediaQuery from '@mui/material/useMediaQuery'
import { FilterContent } from 'src/components/filters/mobile/FilterContent'
import Box from '@mui/material/Box'

interface WalletTokenDetailContainerProps {
  walletTokenDetail: any[]
}

export const WalletTokenDetailContainer = (props: WalletTokenDetailContainerProps & PaperProps) => {
  const { walletTokenDetail = [] } = props
  const [blockchainFilter, setBlockchainFilter] = React.useState<Maybe<string>>(null)

  const filteredWalletTokenDetailWithoutAllocation = blockchainFilter
    ? walletTokenDetail.filter((tokenDetail) => {
        return blockchainFilter ? blockchainFilter === tokenDetail['blockchain'] : true
      })
    : walletTokenDetail

  const usdValueTotal = filteredWalletTokenDetailWithoutAllocation.reduce(
    (accumulator: number, currentValue: any) => accumulator + currentValue.usdValue,
    0
  )

  const filteredWalletTokenDetail = filteredWalletTokenDetailWithoutAllocation
    .map((walletTokenDetail) => {
      return {
        ...walletTokenDetail,
        allocation: walletTokenDetail.usdValue / usdValueTotal
      }
    })
    .sort((a, b) => b.allocation - a.allocation)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const blockchainOptions = walletTokenDetail
    .reduce((result: AutocompleteOption[], currentValue) => {
      const value = result.find((item) => item.id === currentValue['blockchain'])
      if (!value)
        result.push({
          logo:
            currentValue['blockchain'].toLowerCase() === 'ethereum'
              ? '/images/chains/ethereum.svg'
              : currentValue['blockchain'].toLowerCase() === 'gnosis'
                ? '/images/chains/gnosis.svg'
                : '/images/chains/all.svg',
          label: currentValue['blockchain'],
          id: currentValue['blockchain']
        })

      return result
    }, [])
    .sort((a, b) => a.label.localeCompare(b.label))

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClear = () => {
    setBlockchainFilter(null)
  }

  const onSubmitClose = (params: any) => {
    const { blockchain } = params
    setBlockchainFilter(blockchain)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const defaultBlockchainValue = blockchainFilter
    ? {
        logo:
          blockchainFilter === 'ethereum'
            ? '/images/chains/ethereum.svg'
            : blockchainFilter === 'Gnosis'
              ? '/images/chains/gnosis.svg'
              : '/images/chains/all.svg',
        label: blockchainFilter,
        id: blockchainFilter
      }
    : null

  const CommonFilter = (
    <Filter
      id={id}
      handleClick={handleClick}
      handleClose={handleClose}
      handleClear={handleClear}
      anchorEl={anchorEl}
      open={open}
      blockchain={blockchainFilter}
      enableBlockchain
      tooltipText={'Clear filter'}
    >
      <Form
        blockchainOptions={blockchainOptions}
        onRequestClose={handleClose}
        onSubmitClose={onSubmitClose}
        defaultBlockchainValue={defaultBlockchainValue}
        enableBlockchain
        buttonTitle={'Apply filter'}
      />
    </Filter>
  )

  const MobileFilter = (
    <FilterContent
      enableBlockchain={true}
      blockchainOptions={blockchainOptions}
      defaultBlockchainValue={defaultBlockchainValue?.id}
      handleClear={handleClear}
      handleClick={onSubmitClose}
    />
  )

  const isFilterApplied = blockchainFilter !== null

  const filteredWalletTokenDetailForPieChartWithColors = filteredWalletTokenDetail.map(
    (item, index) => {
      return {
        allocation: item.allocation,
        color: SUMMARY_COLORS[index]
          ? SUMMARY_COLORS[index]
          : SUMMARY_COLORS[Math.floor(Math.random() * 9) + 0],
        label: item.tokenSymbol + ' ' + item.blockchain,
        value: item.usdValue
      }
    }
  )

  const filteredWalletTokenDetailForPieChartWithColorsAndOthers =
    filteredWalletTokenDetailForPieChartWithColors.reduce((result: any, currentValue: any) => {
      if (currentValue.allocation * 100 > OTHERS_WALLET_LIMIT) {
        result.push(currentValue)
      } else {
        const other = result.find((item: any) => item.label === 'Others')
        if (other) {
          other.value += currentValue.value
          other.allocation += currentValue.allocation
        } else {
          result.push({
            allocation: currentValue.allocation,
            color: currentValue.color,
            label: 'Others',
            value: currentValue.value
          })
        }
      }
      return result
    }, [])

  const { state } = useApp()
  const { currency } = state

  // check if the screen size is md
  const isMD = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const isBreakpointOne = useMediaQuery((theme: Theme) => theme.breakpoints.up(1000))
  const isBreakpointTwo = useMediaQuery((theme: Theme) => theme.breakpoints.up(720))
  const isBreakpointThree = useMediaQuery((theme: Theme) => theme.breakpoints.up(480))

  const settingsSize = {
    innerSize: isBreakpointOne
      ? '50%'
      : isBreakpointTwo
        ? '45%'
        : isBreakpointThree
          ? '40%'
          : '35%',
    outerSize: isBreakpointOne ? '75%' : isBreakpointTwo ? '70%' : isBreakpointThree ? '65%' : '60%'
  }

  const settingsHeightWidth = {
    width: isBreakpointOne
      ? 'inherit'
      : isBreakpointTwo
        ? 'inherit'
        : isBreakpointThree
          ? 'inherit'
          : 'inherit',
    height: isBreakpointOne ? 'fit-content' : isBreakpointTwo ? 500 : isBreakpointThree ? 470 : 360
  }

  const [tableRefHeight, setTableRefHeight] = React.useState(520)

  const expandCallback = (value: number) => {
    setTableRefHeight(value)
  }

  return (
    <PaperSection
      subTitle={currency === 'USD' ? 'Wallet token detail' : 'Wallet token detail (ETH)'}
      filter={isMD ? CommonFilter : MobileFilter}
      sxCustom={
        isMD
          ? { height: tableRefHeight, ...(tableRefHeight !== 520 ? { marginBottom: 15 } : {}) }
          : {}
      }
    >
      {filteredWalletTokenDetail.length === 0 && !isFilterApplied ? (
        <EmptyData />
      ) : (
        <Box
          gap={4}
          sx={{
            display: 'flex',
            flexDirection: isMD ? 'row' : 'column',
            // alignItems: 'center',
            justifyContent: isMD ? 'center' : 'flex-start',
            flexWrap: 'wrap',
            position: 'relative',
            ...(isMD ? { height: `${tableRefHeight}px` } : {})
          }}
        >
          <Box sx={{ width: isMD ? 'inherit' : '100%' }}>
            <div style={{ top: '20px', ...(tableRefHeight === 520 ? {} : { position: 'sticky' }) }}>
              <PieChart
                data={filteredWalletTokenDetailForPieChartWithColorsAndOthers.map((item: any) => {
                  return {
                    name: item.label,
                    y: item.allocation,
                    color: item.color
                  }
                })}
                innerSize={settingsSize.innerSize}
                outerSize={settingsSize.outerSize}
                width={settingsHeightWidth.width}
                height={settingsHeightWidth.height}
                centered={true}
              />
            </div>
          </Box>
          <Box sx={{ width: isMD ? '50%' : '100%' }}>
            <TableWalletTokenDetail
              filteredWalletTokenDetail={filteredWalletTokenDetail}
              expandCallback={expandCallback}
            />
          </Box>
        </Box>
      )}
    </PaperSection>
  )
}
