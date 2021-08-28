import { NavbarI18N, NavbarProps } from 'decentraland-ui'

export type BaseNavbarI18N = Omit<NavbarI18N, 'menu'> & {
  menu: {
    marketplace: React.ReactNode
  }
}

export type Props = Omit<NavbarProps, 'mana' | 'activePage' | 'i18n'> & {
  species?: number
  address?: string
  activePage?: 'marketplace' | string
  leftMenu?: React.ReactNode
  middleMenu?: React.ReactNode
  rightMenu?: React.ReactNode
  i18n?: BaseNavbarI18N
  isConnected?: boolean
  isConnecting?: boolean
  isSignIn?: boolean
  isFullscreen?: boolean
  isOverlay?: boolean
  hasTranslations?: boolean
  className?: string
  onSignIn?: () => void
  onClickAccount?: () => void
}

export type MapStateProps = Pick<
  Props,
  'species' | 'address' | 'isConnected' | 'isConnecting' | 'hasTranslations'
>
export type BaseNavbarState = {
  toggle: boolean
}

export type MapDispatchProps = {}