import { createSelector } from 'reselect'
import { getAddress as baseGetAddress, isConnected } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { RootState } from '../reducer'
import {
  getWalletData,
  Wallet,
  getNetwork,
  getNetworks
} from '../authorization/types'

export * from 'decentraland-dapps/dist/modules/wallet/selectors'

export const getWallet = createSelector<
  RootState,
  Wallet | null,
  Wallet | null
>(getWalletData, wallet =>
  wallet ? { ...wallet, address: wallet.address.toLowerCase() } : null
)

export const getAddress = (state: RootState) => {
  const address = baseGetAddress(state)
  return address ? address.toLowerCase() : undefined
}

export const getSpecies = (state: any) => {
  if (!isConnected(state)) {
    return undefined
  }
  const network = getNetwork(state)
  const networks = getNetworks(state)
  return networks[network].species
}
