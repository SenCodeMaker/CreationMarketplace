import * as React from 'react'
import { Header, HeaderProps } from 'decentraland-ui'
import './BaseSpecies.css'
import { Network } from '../../../modules/contract/types'

export type SpeciesProps = {
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'huge'
  inline?: boolean
  network?: Network
  className?: string
  title?: string
  children?: React.ReactChild
}

export class BaseSpecies extends React.Component<SpeciesProps & HeaderProps> {
  static defaultProps = {
    className: '',
    network: Network.MATIC
  }

  render() {
    const { size, className, inline, children, network, ...rest } = this.props
    const classes = `dcl species ${inline ? 'inline ' : ''}${className}`.trim()
    return (
      <Header size={size} className={classes} {...rest}>
        <i className="symbol">
          {network !== Network.MATIC ? (
            <i className={network?.toLowerCase()} />
          ) : (
            '⏣'
          )}
        </i>
        {children}
      </Header>
    )
  }
}
