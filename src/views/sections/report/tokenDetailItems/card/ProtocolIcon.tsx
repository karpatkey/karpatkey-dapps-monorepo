import {
  Aave,
  AaveV3,
  Angle,
  Agave,
  Ankr,
  Aura,
  Azuro,
  Balancer,
  Bancor,
  Compound,
  Connext,
  Convex,
  Curve,
  Default,
  Element,
  HoneySwap,
  Idle,
  Lido,
  Maker,
  MU,
  Notional,
  Pods,
  Spark,
  StakeWise,
  SushiSwap,
  Swapr,
  UniswapV3,
  Validators,
  CoW,
  Enzyme,
  Gnosis,
  RocketPool,
  Karpatkey,
  Stader,
  StakeDAO,
  Autonolas,
  Sommelier,
  Dolomite,
  ChorusOne,
  Bread,
  Centrifuge
} from 'components/icons/protocols'
import { Safe } from 'components/icons/protocols/Safe'
import * as React from 'react'

interface ProtocolIconProps {
  protocol: string
}

export const ProtocolIcon = (props: ProtocolIconProps) => {
  const { protocol } = props

  let icon: Maybe<React.ReactElement> = null

  switch (protocol) {
    case 'Aave':
      icon = <Aave width={24} height={24} />
      break
    case 'AaveV2':
      icon = <AaveV3 width={24} height={24} />
      break
    case 'AaveV3':
      icon = <AaveV3 width={24} height={24} />
      break
    case 'Aave (AMM)':
      icon = <AaveV3 width={24} height={24} />
      break
    case 'Angle':
      icon = <Angle width={24} height={24} />
      break
    case 'Azuro':
      icon = <Azuro width={24} height={24} />
      break
    case 'Ankr':
      icon = <Ankr width={24} height={24} />
      break
    case 'Agave':
      icon = <Agave width={24} height={24} />
      break
    case 'Aura':
      icon = <Aura width={24} height={24} />
      break
    case 'Balancer':
      icon = <Balancer width={24} height={24} />
      break
    case 'Idle':
      icon = <Idle width={24} height={24} />
      break
    case 'Element':
      icon = <Element width={24} height={24} />
      break
    case 'Bancor':
      icon = <Bancor width={24} height={24} />
      break
    case 'Connext':
      icon = <Connext width={24} height={24} />
      break
    case 'Curve':
      icon = <Curve width={24} height={24} />
      break
    case 'CompoundV3':
      icon = <Compound width={24} height={24} />
      break
    case 'Compound V2':
      icon = <Compound width={24} height={24} />
      break
    case 'Convex':
      icon = <Convex width={24} height={24} />
      break
    case 'Honeyswap':
      icon = <HoneySwap width={24} height={24} />
      break
    case 'Lido':
      icon = <Lido width={18} height={24} />
      break
    case 'Maker':
      icon = <Maker width={24} height={24} />
      break
    case 'CoW':
      icon = <CoW width={24} height={24} />
      break
    case 'CoW AMM':
      icon = <CoW width={24} height={24} />
      break
    case 'Notional':
      icon = <Notional width={24} height={24} />
      break
    case 'Pods':
      icon = <Pods width={24} height={24} />
      break
    case 'Swapr':
      icon = <Swapr width={24} height={24} />
      break
    case 'SwaprV3':
      icon = <Swapr width={24} height={24} />
      break
    case 'Spark':
      icon = <Spark width={24} height={24} />
      break
    case 'Mu Exchange':
      icon = <MU width={24} height={24} />
      break
    case 'SushiSwap':
      icon = <SushiSwap width={24} height={24} />
      break
    case 'Stakewise':
      icon = <StakeWise width={24} height={24} />
      break
    case 'Validators (GC)':
      icon = <Validators width={24} height={24} />
      break
    case 'UniswapV2':
      icon = <UniswapV3 width={24} height={24} />
      break
    case 'UniswapV3':
      icon = <UniswapV3 width={24} height={24} />
      break
    case 'Enzyme':
      icon = <Enzyme width={24} height={24} />
      break
    case 'Gnosis':
      icon = <Gnosis width={24} height={24} />
      break
    case 'Rocket':
      icon = <RocketPool width={24} height={24} />
      break
    case 'Arbitrage Bot':
      icon = <Karpatkey width={24} height={24} />
      break
    case 'Stader':
      icon = <Stader width={24} height={24} />
      break
    case 'StakeDAO':
      icon = <StakeDAO width={24} height={24} />
      break
    case 'Autonolas':
      icon = <Autonolas width={24} height={24} />
      break
    case 'Sommelier':
      icon = <Sommelier width={24} height={24} />
      break
    case 'Safe':
      icon = <Safe width={24} height={24} />
      break
    case 'Dolomite':
      icon = <Dolomite width={24} height={24} />
      break
    case 'Opus Pool (Chorus One)':
      icon = <ChorusOne width={24} height={24} />
      break
    case 'Bread':
      icon = <Bread width={24} height={24} />
      break
    case 'Centrifuge':
      icon = <Centrifuge width={24} height={24} />
      break
    default:
      icon = <Default width={24} height={24} />
      break
  }

  return icon
}
