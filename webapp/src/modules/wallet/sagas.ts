import { takeEvery, all, put } from 'redux-saga/effects'
import { Network } from '@dcl/schemas'
import { createWalletSaga } from 'decentraland-dapps/dist/modules/wallet/sagas'
import {
  ConnectWalletSuccessAction,
  CONNECT_WALLET_SUCCESS,
  ChangeAccountAction,
  ChangeNetworkAction,
  CHANGE_ACCOUNT,
  CHANGE_NETWORK
} from 'decentraland-dapps/dist/modules/wallet/actions'
import { AuthorizationType } from 'decentraland-dapps/dist/modules/authorization/types'

import { contracts, getContract } from '../contract/utils'
import { getContractNames } from '../vendor'
import { ContractName, Authorization } from '../authorization/types'

const baseWalletSaga = createWalletSaga({
  CHAIN_ID: +(process.env.REACT_APP_CHAIN_ID || 1)
})

export function* walletSaga() {
  yield all([baseWalletSaga(), fullWalletSaga()])
}

function* fullWalletSaga() {
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleWallet)
  yield takeEvery(CHANGE_ACCOUNT, handleWallet)
  yield takeEvery(CHANGE_NETWORK, handleWallet)
}

function* handleWallet(
  action: ConnectWalletSuccessAction | ChangeAccountAction | ChangeNetworkAction
) {
  const { address } = action.payload.wallet

  const contractNames = getContractNames()

  // const marketplaceEthereum = getContract({
  //   name: contractNames.MARKETPLACE,
  //   network: Network.ETHEREUM
  // })

  // const marketplaceMatic = getContract({
  //   name: contractNames.MARKETPLACE,
  //   network: Network.MATIC
  // })

  // const marketplaceAdapter = getContract({
  //   name: contractNames.MARKETPLACE_ADAPTER
  // })

  // const bids = getContract({
  //   name: contractNames.BIDS
  // })

  // const manaEthereum = getContract({
  //   name: contractNames.MANA,
  //   network: Network.ETHEREUM
  // })

  // const manaMatic = getContract({
  //   name: contractNames.MANA,
  //   network: Network.MATIC
  // })

  const speciesMatic = getContract({
    name: contractNames.SPECIES,
    network: Network.ETHEREUM
  })

  const authorizations: Authorization[] = []

  authorizations.push({
    address,
    authorizedAddress: speciesMatic.address,
    contractAddress: speciesMatic.address,
    contractName: ContractName.SPECIESToken,
    chainId: speciesMatic.chainId,
    type: AuthorizationType.APPROVAL
  })

  // authorizations.push({
  //   address,
  //   authorizedAddress: marketplaceEthereum.address,
  //   contractAddress: manaEthereum.address,
  //   contractName: ContractName.MANAToken,
  //   chainId: manaEthereum.chainId,
  //   type: AuthorizationType.ALLOWANCE
  // })

  // authorizations.push({
  //   address,
  //   authorizedAddress: marketplaceMatic.address,
  //   contractAddress: manaMatic.address,
  //   contractName: ContractName.MANAToken,
  //   chainId: manaMatic.chainId,
  //   type: AuthorizationType.ALLOWANCE
  // })

  // authorizations.push({
  //   address,
  //   authorizedAddress: marketplaceMatic.address,
  //   contractAddress: speciesMatic.address,
  //   contractName: ContractName.SPECIESToken,
  //   chainId: speciesMatic.chainId,
  //   type: AuthorizationType.ALLOWANCE
  // })

  // authorizations.push({
  //   address,
  //   authorizedAddress: marketplaceAdapter.address,
  //   contractAddress: manaEthereum.address,
  //   contractName: ContractName.MANAToken,
  //   chainId: manaEthereum.chainId,
  //   type: AuthorizationType.ALLOWANCE
  // })

  // authorizations.push({
  //   address,
  //   authorizedAddress: bids.address,
  //   contractAddress: manaEthereum.address,
  //   contractName: ContractName.MANAToken,
  //   chainId: manaEthereum.chainId,
  //   type: AuthorizationType.ALLOWANCE
  // })

  // for (const contract of contracts.filter(c => c.category !== null)) {
  //   const marketplace = getContract({
  //     name:
  //       /* contract.vendor && isPartner(contract.vendor)
  //          ? contractNames.MARKETPLACE_ADAPTER
  //          : */ contractNames.MARKETPLACE,
  //     network: contract.network
  //   })

  // authorizations.push({
  //   address,
  //   authorizedAddress: marketplace.address,
  //   contractAddress: contract.address,
  //   contractName:
  //     contract.category === NFTCategory.WEARABLE &&
  //       contract.network === Network.MATIC
  //       ? ContractName.ERC721CollectionV2
  //       : ContractName.ERC721,
  //   chainId: contract.chainId,
  //   type: AuthorizationType.APPROVAL
  // })
  // }

  // yield put(fetchAuthorizationsRequest(authorizations))
}
