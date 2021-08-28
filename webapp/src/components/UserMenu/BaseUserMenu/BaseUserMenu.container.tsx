import { connect } from 'react-redux'
import { Network } from '@dcl/schemas'
import {
  getAddress,
  isConnected,
  isConnecting
} from '../../../modules/wallet/selectors'
import { getData as getProfiles } from 'decentraland-dapps/dist/modules/profile/selectors'
import { isEnabled } from 'decentraland-dapps/dist/modules/translation/selectors'
import { getTransactions } from 'decentraland-dapps/dist/modules/transaction/selectors'
import {
  MapStateProps,
  MapDispatch,
  MapDispatchProps,
  OwnProps
} from './BaseUserMenu.types'
import { BaseUserMenu, BaseUserMenuProps } from './BaseUserMenu'
import { isPending } from 'decentraland-dapps/dist/modules/transaction/utils'
import { disconnectWallet } from 'decentraland-dapps/dist/modules/wallet/actions'
import { getNetworks } from '../../../modules/authorization/types'

const mapState = (state: any): MapStateProps => {
  const isSignedIn = isConnected(state)
  const address = getAddress(state)
  const profile = getProfiles(state)[address!]
  const networks = getNetworks(state)

  const speciesBalances: BaseUserMenuProps['speciesBalances'] = {}
  if (isSignedIn) {
    const networkList = Object.values(Network) as Network[]
    for (const network of networkList) {
      const networkData = networks[network]
      if (networkData) {
        speciesBalances[network] = networks[network].species
      }
    }
  }

  return {
    address,
    speciesBalances,
    // avatar: profile ? profile.avatars[0] : undefined,
    isSignedIn,
    isSigningIn: isConnecting(state),
    hasActivity: getTransactions(state, address || '').some(tx =>
      isPending(tx.status)
    ),
    hasTranslations: isEnabled(state)
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onSignOut: () => dispatch(disconnectWallet())
})

const mergeProps = (
  mapStateProps: MapStateProps,
  mapDispatchProps: MapDispatchProps,
  ownProps: OwnProps
) => ({
  ...mapStateProps,
  ...mapDispatchProps,
  ...ownProps
})

export default connect(
  mapState,
  mapDispatch,
  mergeProps
)(BaseUserMenu)