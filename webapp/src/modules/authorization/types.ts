import { ChainId, Network } from '@dcl/schemas'
import { getData as getDataBase } from 'decentraland-dapps/dist/modules/authorization/selectors'
import {
  getData as getDataWallet,
  getNetwork as getNetworkBase,
  getNetworks as getNetworksBase
} from 'decentraland-dapps/dist/modules/wallet/selectors'
import {
  grantTokenRequest as grantTokenRequestBase,
  revokeTokenRequest as revokeTokenRequestBase
} from 'decentraland-dapps/dist/modules/authorization/actions'
import { hasAuthorization as hasAuthorizationBase } from 'decentraland-dapps/dist/modules/authorization/utils'
import { ContractData } from 'decentraland-transactions'
import { PayloadAction } from 'typesafe-actions'
import { ProviderType } from 'decentraland-connect'
import { speciesToken } from './contract_address'

export declare type NetworkData = {
  species: number
  chainId: ChainId
}
export declare type Networks = Record<Network, NetworkData>
export interface Wallet {
  address: string
  networks: Networks
  network: Network
  chainId: ChainId
  providerType: ProviderType
}
export declare type Authorization = {
  type: AuthorizationType
  address: string
  contractAddress: string
  authorizedAddress: string
  contractName: ContractName
  chainId: ChainId
}

export declare enum AuthorizationType {
  ALLOWANCE = 'allowance',
  APPROVAL = 'approval'
}

export const getData = (state: any) => {
  return (getDataBase(state) as unknown) as Authorization[]
}

export const getNetwork = (state: any) => {
  return (getNetworkBase(state) as unknown) as Network
}

export const getNetworks = (state: any) => {
  return (getNetworksBase(state) as unknown) as Networks
}

export const getWalletData = (state: any) => {
  return (getDataWallet(state) as unknown) as Wallet
}

export const hasAuthorization = (
  authorizations: Authorization[],
  authorizationToFind: Authorization | Authorization) => {
  return hasAuthorizationBase(authorizations as any, authorizationToFind as any)
}

export declare const fetchAuthorizationsRequest: (
  authorizations: Authorization[]
) => PayloadAction<
  '[Request] Fetch Authorizations',
  {
    authorizations: Authorization[]
  }
>

export declare const fetchAuthorizationsSuccess: (
  authorizations: Authorization[]
) => PayloadAction<
  '[Success] Fetch Authorizations',
  {
    authorizations: Authorization[]
  }
>

export const grantTokenRequest = (authorization: Authorization) => {
  return grantTokenRequestBase(authorization as any)
}

export const revokeTokenRequest = (authorization: Authorization) => {
  return revokeTokenRequestBase(authorization as any)
}

export declare type GrantTokenRequestAction = ReturnType<
  typeof grantTokenRequest
>
export declare type RevokeTokenRequestAction = ReturnType<
  typeof revokeTokenRequest
>

export enum ContractName {
  // CollectionFactory = "CollectionFactory",
  // CollectionManager = "CollectionManager",
  // CollectionStore = "CollectionStore",
  // Committee = "Committee",
  // ERC20 = "ERC20",
  // ERC721 = "ERC721",
  // ERC721CollectionV2 = "ERC721CollectionV2",
  // Forwarder = "Forwarder",
  SPECIESToken = 'SPECIESToken'
  // Marketplace = "Marketplace",
}

export const contracts: Record<
  ContractName,
  Partial<Record<ChainId, ContractData>>
> = {
  // [ContractName.CollectionFactory]:
  // [ContractName.CollectionManager]: undefined!
  // [ContractName.CollectionStore]: undefined
  // [ContractName.Committee]: undefined
  // [ContractName.ERC20]: undefined
  // [ContractName.ERC721]: undefined
  // [ContractName.ERC721CollectionV2]: undefined
  // [ContractName.Forwarder]: undefined
  // [ContractName.Marketplace]: undefined
  [ContractName.SPECIESToken]: speciesToken
}

export function getContract(
  contractName: ContractName,
  chainId: ChainId
): ContractData {
  const contract = contracts[contractName]
  if (!contract) {
    throw new Error(`Could not get a valid contract for name: ${contractName}`)
  }
  if (!contract[chainId]) {
    throw new Error(
      `Could not get a valid contract for ${contractName} using chain ${chainId}`
    )
  }

  return contract[chainId]!
}

export function getContractName(address: string): ContractName {
  for (const contractName in Object.keys(contracts) as ContractName[]) {
    for (const chainId in Object.keys(
      contracts[contractName as ContractName]
    ).map(parseInt) as Array<ChainId>) {
      const contract =
        contracts[contractName as ContractName][parseInt(chainId) as ChainId]

      if (contract?.address.toLowerCase() === address.toLowerCase()) {
        return contractName as ContractName
      }
    }
  }
  throw new Error(`Could not get a valid contract name for address ${address}`)
}
