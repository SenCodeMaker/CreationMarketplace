import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import {
  createOrderRequest,
  CreateOrderRequestAction
} from '../../modules/order/actions'
import { Authorization } from '../../modules/authorization/types'

export type Props = {
  authorizations: Authorization[]
  isLoading: boolean
  onCreateOrder: typeof createOrderRequest
  onNavigate: (path: string) => void
}

export type MapStateProps = Pick<Props, 'authorizations' | 'isLoading'>
export type MapDispatchProps = Pick<Props, 'onNavigate' | 'onCreateOrder'>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction | CreateOrderRequestAction
>
