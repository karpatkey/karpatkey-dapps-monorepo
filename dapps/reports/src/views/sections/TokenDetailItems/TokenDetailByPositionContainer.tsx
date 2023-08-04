import CardList from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/CardList'
import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import Filter from '@karpatkey-monorepo/shared/components/Filter/Filter'
import Form from '@karpatkey-monorepo/shared/components/Filter/Form'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import * as React from 'react'

interface TokenDetailByPositionContainerProps {
  tokenDetailByPosition: any[]
}

const TokenDetailByPositionContainer = (props: TokenDetailByPositionContainerProps) => {
  const { tokenDetailByPosition = [] } = props

  const [blockchainFilter, setBlockchainFilter] = React.useState<Maybe<string>>(null)
  const [protocolFilter, setProtocolFilter] = React.useState<Maybe<string>>(null)
  const [tokenFilter, setTokenFilter] = React.useState<Maybe<string>>(null)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClear = () => {
    setBlockchainFilter(null)
    setProtocolFilter(null)
    setTokenFilter(null)
  }

  const onSubmitClose = (params: any) => {
    const { blockchain, protocol, token } = params
    setBlockchainFilter(blockchain)
    setProtocolFilter(protocol)
    setTokenFilter(token)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const filteredDataByBlockchainAndProtocolAndToken = React.useMemo(() => {
    return tokenDetailByPosition.filter((item: any) => {
      const { blockchain, protocol, categories = [] } = item
      const isBlockchainFilter = blockchainFilter ? blockchainFilter === blockchain : true
      const isProtocolFilter = protocolFilter ? protocolFilter === protocol : true

      const isTokenFilter = categories.reduce((acc: boolean, category: any) => {
        const { tokens = [] } = category
        const isToken = tokens.reduce((acc: boolean, token: any) => {
          const { symbol } = token
          const isSymbol = tokenFilter ? symbol === tokenFilter : true
          return acc || isSymbol
        }, false)
        return acc || isToken
      }, false)

      return isBlockchainFilter && isProtocolFilter && isTokenFilter
    })
  }, [blockchainFilter, protocolFilter, tokenFilter, tokenDetailByPosition])

  const defaultBlockchainValue = blockchainFilter
    ? {
        logo:
          blockchainFilter.toLowerCase() === 'ethereum'
            ? '/images/chains/ethereum.svg'
            : blockchainFilter.toLowerCase() === 'gnosis'
            ? '/images/chains/gnosis.svg'
            : '/images/chains/all.svg',
        label: blockchainFilter,
        id: blockchainFilter
      }
    : null

  const defaultProtocolValue = protocolFilter
    ? {
        label: protocolFilter,
        id: protocolFilter
      }
    : null

  const defaultTokenValue = tokenFilter
    ? {
        label: tokenFilter,
        id: tokenFilter
      }
    : null

  const blockchainOptions = tokenDetailByPosition
    .reduce((acc: any, item: any) => {
      const { blockchain } = item
      if (!acc.includes(blockchain) && blockchain) {
        acc.push(blockchain)
      }
      return acc
    }, [])
    .map((key: string) => {
      return {
        logo:
          key.toLowerCase() === 'ethereum'
            ? '/images/chains/ethereum.svg'
            : key.toLowerCase() === 'gnosis'
            ? '/images/chains/gnosis.svg'
            : '/images/chains/all.svg',
        label: key,
        id: key
      }
    })
    .sort((a: any, b: any) => a.label.localeCompare(b.label))

  const protocolOptions = tokenDetailByPosition
    .reduce((acc: any, item: any) => {
      const { protocol } = item
      if (!acc.includes(protocol) && protocol) {
        acc.push(protocol)
      }
      return acc
    }, [])
    .map((key: string) => {
      return {
        label: key,
        id: key
      }
    }, [])
    .sort((a: any, b: any) => a.label.localeCompare(b.label))

  const tokenOptions: any[] = tokenDetailByPosition
    .reduce((acc: any, item: any) => {
      const { categories } = item
      if (categories && categories.length > 0) {
        categories.forEach(({ tokens }: any) => {
          tokens?.forEach(({ symbol }: any) => {
            if (!acc.includes(symbol) && symbol) {
              acc.push(symbol)
            }
          })
        })
      }
      return acc
    }, [])
    .map((key: string) => {
      return {
        label: key,
        id: key
      }
    })
    .sort((a: any, b: any) => a.label.localeCompare(b.label))

  const filter = (
    <Filter
      id={id}
      handleClick={handleClick}
      handleClose={handleClose}
      handleClear={handleClear}
      anchorEl={anchorEl}
      open={open}
      blockchain={blockchainFilter}
      protocol={protocolFilter}
      token={tokenFilter}
      enableBlockchain
      enableProtocol
      enableToken
      tooltipText={'Clear filter'}
    >
      <Form
        blockchainOptions={blockchainOptions}
        protocolOptions={protocolOptions}
        tokenOptions={tokenOptions}
        onRequestClose={handleClose}
        onSubmitClose={onSubmitClose}
        defaultBlockchainValue={defaultBlockchainValue}
        defaultProtocolValue={defaultProtocolValue}
        defaultTokenValue={defaultTokenValue}
        enableBlockchain
        enableProtocol
        enableToken
        buttonTitle={'Apply filter'}
      />
    </Filter>
  )

  return (
    <PaperSection subTitle="Token detail by position" filter={filter}>
      {filteredDataByBlockchainAndProtocolAndToken &&
      filteredDataByBlockchainAndProtocolAndToken.length > 0 ? (
        <CardList tokenDetailByPosition={filteredDataByBlockchainAndProtocolAndToken} />
      ) : (
        <EmptyData />
      )}
    </PaperSection>
  )
}

export default TokenDetailByPositionContainer
