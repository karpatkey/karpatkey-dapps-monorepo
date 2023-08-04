import { AutocompleteOption } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import Filter from '@karpatkey-monorepo/shared/components/Filter/Filter'
import Form from '@karpatkey-monorepo/shared/components/Filter/Form'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import dynamic from 'next/dynamic'
import * as React from 'react'

const DynamicTableTokenDetail = dynamic(
  () =>
    import(
      '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailItems/TableTokenDetail'
    )
)

interface TokenDetailContainerProps {
  tokenDetails: any[]
  tokenDetailsGrouped: any[]
}

const TokenDetailContainer = (props: TokenDetailContainerProps) => {
  const { tokenDetails = [], tokenDetailsGrouped = [] } = props
  const [blockchainFilter, setBlockchainFilter] = React.useState<Maybe<string>>(null)

  const filteredTokenDetailsWithoutAllocation = blockchainFilter
    ? tokenDetails.filter((tokenDetail) => {
        return blockchainFilter ? blockchainFilter === tokenDetail['blockchain'] : true
      })
    : tokenDetailsGrouped

  const usdValueTotal = filteredTokenDetailsWithoutAllocation.reduce(
    (accumulator: number, currentValue: any) => accumulator + currentValue.usdValue,
    0
  )

  const filteredTokenDetails = filteredTokenDetailsWithoutAllocation
    .map((tokenDetail) => {
      return {
        ...tokenDetail,
        allocation: tokenDetail.usdValue / usdValueTotal
      }
    })
    .sort((a, b) => b.allocation - a.allocation)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const blockchainOptions = tokenDetails
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

  const filter = (
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

  const isFilterApplied = blockchainFilter !== null

  return (
    <PaperSection
      id="Token detail"
      title="Token detail"
      subTitle="Token detail with price variation"
      helpInfo="Token balances, price variations, detail by position and wallet"
      filter={filter}
    >
      {filteredTokenDetails.length === 0 && !isFilterApplied ? (
        <EmptyData />
      ) : (
        <DynamicTableTokenDetail filteredTokenDetails={filteredTokenDetails} />
      )}
    </PaperSection>
  )
}

export default TokenDetailContainer
