import {
  ConnectWalletRequestAction,
  DisconnectWalletAction
} from 'decentraland-dapps/dist/modules/wallet/actions'
import { Dispatch } from 'redux'
import { BaseUserMenuProps } from './BaseUserMenu'

export type MapStateProps = Pick<
  BaseUserMenuProps,
  | 'isSignedIn'
  | 'isSigningIn'
  | 'address'
  // | 'avatar'
  | 'speciesBalances'
  | 'hasActivity'
  | 'hasTranslations'
>
export type MapDispatchProps = Pick<BaseUserMenuProps, 'onSignOut'>
export type MapDispatch = Dispatch<
  ConnectWalletRequestAction | DisconnectWalletAction
>

export type OwnProps = Partial<BaseUserMenuProps>
