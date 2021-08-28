import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Transaction } from 'decentraland-dapps/dist/modules/transaction/types'
import {
  Authorization,
  grantTokenRequest,
  GrantTokenRequestAction,
  revokeTokenRequest,
  RevokeTokenRequestAction,
  Wallet
} from '../../modules/authorization/types'

export type Props = {
  wallet: Wallet | null
  authorizations: Authorization[]
  pendingTransactions: Transaction[]
  isLoadingAuthorization: boolean
  hasError: boolean
  isConnecting: boolean
  onGrant: typeof grantTokenRequest
  onRevoke: typeof revokeTokenRequest
  onNavigate: (path: string) => void
}

export type MapStateProps = Pick<
  Props,
  | 'wallet'
  | 'authorizations'
  | 'pendingTransactions'
  | 'isLoadingAuthorization'
  | 'isConnecting'
  | 'hasError'
>
export type MapDispatchProps = Pick<
  Props,
  'onGrant' | 'onRevoke' | 'onNavigate'
>
export type MapDispatch = Dispatch<
  GrantTokenRequestAction | RevokeTokenRequestAction | CallHistoryMethodAction
>
