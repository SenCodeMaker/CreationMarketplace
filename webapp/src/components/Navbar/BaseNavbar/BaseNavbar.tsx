import * as React from 'react'
import { Menu, Responsive } from 'semantic-ui-react'
import { Header, Container, Blockie } from 'decentraland-ui'
import { BaseNavbarState, Props } from './BaseNavbar.types'
import { Logo } from '../../Logo/Logo'
import { Species } from '../../Species'
import './BaseNavbar.css'

export class BaseNavbar extends React.PureComponent<Props, BaseNavbarState> {
  static defaultProps: Partial<Props> = {
    species: undefined,
    address: undefined,
    activePage: undefined,
    leftMenu: null,
    middleMenu: null,
    i18n: {
      menu: {
        marketplace: 'Marketplace'
      },
      account: {
        signIn: 'Sign In',
        connecting: 'Connecting...'
      }
    },
    isConnected: false,
    isConnecting: false,
    isFullscreen: false,
    isOverlay: false,
    isSignIn: false,
    onSignIn: undefined,
    onClickAccount: undefined
  }

  public state = {
    toggle: false
  }
  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
  }

  handleToggle = (event: React.MouseEvent<HTMLHeadElement>) => {
    this.setState({ toggle: !this.state.toggle })
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
  }

  handleDocumentClick = () => {
    this.setState({ toggle: false })
  }

  renderLeftMenu() {
    const { activePage, i18n, leftMenu } = this.props
    if (leftMenu) {
      return leftMenu
    }
    return (
      <>
        <Menu.Item
          active={activePage === 'marketplace'}
          href="https://market.species.org"
        >
          {i18n?.menu.marketplace}
        </Menu.Item>
      </>
    )
  }

  renderRightMenu() {
    const {
      rightMenu,
      middleMenu,
      isConnected,
      onClickAccount,
      species,
      address,
      isConnecting,
      isSignIn,
      i18n,
      onSignIn
    } = this.props
    if (rightMenu) {
      return rightMenu
    } else if (isConnected) {
      return (
        <>
          {middleMenu ? (
            <Responsive
              as={Menu}
              secondary
              className="dcl navbar-account-menu"
              minWidth={Responsive.onlyTablet.minWidth}
            >
              {middleMenu}
            </Responsive>
          ) : null}
          <span
            className={`dcl account-wrapper ${
              onClickAccount ? 'clickable' : ''
            }`}
            onClick={onClickAccount}
          >
            {species != null ? (
              <Species
                size="small"
                title={`${species.toLocaleString()} Species`}
              >
                {parseInt(species.toFixed(0), 10).toLocaleString()}
              </Species>
            ) : null}
            {address != null ? <Blockie seed={address} /> : null}
          </span>
        </>
      )
    } else if (isConnecting && !isSignIn) {
      return (
        <Menu secondary>
          <Menu.Item disabled>{i18n?.account.connecting}</Menu.Item>
        </Menu>
      )
    } else if (onSignIn || isSignIn) {
      return (
        <Menu secondary>
          <Menu.Item className="sign-in-button" onClick={onSignIn}>
            {i18n?.account.signIn}
          </Menu.Item>
        </Menu>
      )
    } else {
      return null
    }
  }

  render() {
    const {
      activePage,
      className,
      isSignIn,
      isFullscreen,
      isOverlay
    } = this.props

    let classes = `dcl navbar`

    if (this.state.toggle) {
      classes += ' open'
    }

    if (isSignIn) {
      classes += ' sign-in'
    }

    if (isFullscreen) {
      classes += ' fullscreen'
    }

    if (isOverlay) {
      classes += ' overlay'
    }

    if (className) {
      classes += ` ${className}`
    }

    return (
      <div className={classes} role="navigation">
        <Container>
          <div className="dcl navbar-menu">
            <Responsive
              as={Menu}
              secondary
              stackable
              minWidth={Responsive.onlyTablet.minWidth}
            >
              <a className="dcl navbar-logo" href="https://species.org">
                <Logo />
              </a>
              {this.renderLeftMenu()}
            </Responsive>
            <Responsive
              {...Responsive.onlyMobile}
              className="dcl navbar-mobile-menu"
            >
              <a className="dcl navbar-logo" href="https://species.org">
                <Logo />
              </a>
              <Header
                size="small"
                className={`dcl active-page ${
                  this.state.toggle ? 'caret-up' : 'caret-down'
                }`}
                onClick={this.handleToggle}
              >
                {activePage}
              </Header>
            </Responsive>
          </div>

          <div className="dcl navbar-account">{this.renderRightMenu()}</div>
        </Container>
        <div className="mobile-menu">{this.renderLeftMenu()}</div>
      </div>
    )
  }
}
