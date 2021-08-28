import { Network } from '@dcl/schemas'
import * as React from 'react'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import { Row, Button } from 'decentraland-ui'
import './BaseUserMenu.css'
import { Species } from '../../Species'

export type BaseUserMenuI18N = {
  signIn: React.ReactNode
  signOut: React.ReactNode
  guest: React.ReactNode
  settings: React.ReactNode
}

export type BaseUserMenuProps = {
  isSignedIn?: boolean
  isSigningIn?: boolean
  isActivity?: boolean
  hasActivity?: boolean
  address?: string
  speciesBalances?: Partial<Record<Network, number>>
  hasTranslations?: boolean
  // avatar?: Avatar
  menuItems?: React.ReactNode
  i18n?: BaseUserMenuI18N
  onSignOut: () => void
  onSignIn?: () => void
  onClickProfile?: () => void
  onClickActivity?: () => void
  onClickSettings?: () => void
}

export type BaseUserMenuState = {
  isOpen: boolean
}

export class BaseUserMenu extends React.Component<
  BaseUserMenuProps,
  BaseUserMenuState
> {
  static defaultProps: Partial<BaseUserMenuProps> = {
    speciesBalances: {},
    i18n: {
      signIn: 'Sign In',
      signOut: 'Sign Out',
      guest: 'Guest',
      settings: 'Settings'
    }
  }

  state: BaseUserMenuState = {
    isOpen: false
  }

  ref: HTMLElement | null = null

  handleClose = () => {
    this.setState({ isOpen: false })
  }

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }
  render() {
    const {
      // avatar,
      speciesBalances,
      isSignedIn,
      isSigningIn,
      isActivity,
      hasActivity,
      onSignOut,
      onSignIn,
      onClickProfile,
      onClickActivity,
      onClickSettings,
      i18n,
      menuItems
    } = this.props

    const { isOpen } = this.state

    const networks: Readonly<Record<string, Network>> = {
      ETHEREUM: Network.ETHEREUM,
      MATIC: Network.MATIC
    }

    // const name = avatar ? avatar.name : null

    return (
      <Row className="dcl user-menu-wrapper">
        <Menu.Item
          className={isActivity ? 'activity-bell active' : 'activity-bell'}
        >
          {onClickActivity ? (
            <Icon
              className={hasActivity ? 'pending' : ''}
              name="bell"
              onClick={onClickActivity}
            />
          ) : null}
        </Menu.Item>
        <div className="dcl user-menu" onBlur={this.handleClose} tabIndex={0}>
          {isSignedIn && (
            <>
              <span className="dcl account-wrapper">
                {speciesBalances
                  ? Object.keys(speciesBalances).map(network => (
                      <Species
                        key={network}
                        network={network as Network}
                        size="small"
                        title={`${speciesBalances[networks[network]]} Species`}
                      >
                        {speciesBalances[networks[network]] ? parseInt(
                          speciesBalances[networks[network]]!.toFixed(0),
                          10
                        ).toLocaleString() : '?'}
                      </Species>
                    ))
                  : null}
              </span>
              <div className="toggle" onClick={this.handleToggle}>
              {/* <AvatarFace size="medium" avatar={avatar} /> */}
              </div>
              <div className={`menu ${isOpen ? 'open' : ''}`}>
                <div
                  className={`info ${onClickProfile ? 'clickable' : ''}`}
                  onClick={onClickProfile}
                >
                  {/* <div className="image">
                    <AvatarFace size="small" avatar={avatar} />
                  </div> */}
                  <div>
                    {<div className="name">{/*name ||*/ i18n!.guest}</div>}
                  </div>
                </div>
                <ul className="actions">
                  {menuItems}
                  {onClickSettings ? (
                    <li onClick={onClickSettings}>
                      <Icon name="cog" />
                      {i18n!.settings}
                    </li>
                  ) : null}
                  {onSignOut ? (
                    <li onClick={onSignOut}>
                      <i className="sign-out-icon" />
                      {i18n!.signOut}
                    </li>
                  ) : null}
                </ul>
              </div>
            </>
          )}
          {!isSignedIn && (
            <Button primary disabled={isSigningIn} onClick={onSignIn}>
              {i18n!.signIn}
            </Button>
          )}
        </div>
      </Row>
    )
  }
}
