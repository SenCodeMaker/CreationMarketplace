import { connect } from 'react-redux'
import {
  isConnected,
  isConnecting,
  getAddress,
  getSpecies
} from '../../../modules/wallet/selectors'
import { isEnabled } from 'decentraland-dapps/dist/modules/translation/selectors'
import { RootDispatch } from '../../../types'
import { Props, MapStateProps, MapDispatchProps } from './BaseNavbar.types'
import { BaseNavbar } from './BaseNavbar'

const mapState = (state: any): MapStateProps => ({
  species: getSpecies(state),
  address: getAddress(state),
  isConnected: isConnected(state),
  isConnecting: isConnecting(state),
  hasTranslations: isEnabled(state)
})

const mapDispatch = (_dispatch: RootDispatch): MapDispatchProps => ({})

const mergeProps = (
  stateProps: MapStateProps,
  dispatchProps: MapDispatchProps,
  ownProps: Props
): Props => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

export default connect(
  mapState,
  mapDispatch,
  mergeProps
)(BaseNavbar) as any