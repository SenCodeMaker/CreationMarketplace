import React from 'react'
import BaseUserMenu from './BaseUserMenu/BaseUserMenu.container'

export default class UserMenu extends React.PureComponent {
  render() {
    return (
      <>
        <BaseUserMenu {...this.props} />
      </>
    )
  }
}
