import { Dispatch } from 'redux'
import { Transaction } from 'decentraland-dapps/dist/modules/transaction/types'
import {
  Authorization, grantTokenRequest,
  GrantTokenRequestAction,
  revokeTokenRequest,
  RevokeTokenRequestAction
} from '../../modules/authorization/types'

export type Props = {
  open: boolean
  authorization: Authorization
  authorizations: Authorization[]
  pendingTransactions: Transaction[]
  isLoading: boolean
  onGrant: typeof grantTokenRequest
  onRevoke: typeof revokeTokenRequest
  onCancel: () => void
  onProceed: () => void
}

export type MapStateProps = Pick<
  Props,
  'authorizations' | 'pendingTransactions' | 'isLoading'
>
export type MapDispatchProps = Pick<Props, 'onGrant' | 'onRevoke'>
export type MapDispatch = Dispatch<
  GrantTokenRequestAction | RevokeTokenRequestAction
>
export type OwnProps = Pick<Props, 'open' | 'authorization' | 'onProceed'>
