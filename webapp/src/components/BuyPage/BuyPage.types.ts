import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import {
  buyOrderRequest,
  BuyOrderRequestAction
} from '../../modules/order/actions'
import { Wallet, Authorization } from '../../modules/authorization/types'

export type Props = {
  wallet: Wallet | null
  authorizations: Authorization[]
  isLoading: boolean
  onBuyOrder: typeof buyOrderRequest
  onNavigate: (path: string) => void
}

export type MapStateProps = Pick<
  Props,
  'wallet' | 'authorizations' | 'isLoading'
>
export type MapDispatchProps = Pick<Props, 'onNavigate' | 'onBuyOrder'>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction | BuyOrderRequestAction
>
