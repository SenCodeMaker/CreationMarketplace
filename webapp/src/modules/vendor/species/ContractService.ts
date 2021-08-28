import { ChainId, Network } from '@dcl/schemas'
import {
  Contract,
  ContractService as ContractServiceInterface
} from '../services'
import { Network as AppNetwork } from '../../contract/types'
import { TransferType } from '../types'
import { nftAPI } from './nft'

const network = process.env.REACT_APP_NETWORK! as AppNetwork

export enum ContractName {
  SPECIES = 'SPECIES',
  MARKETPLACE = 'Marketplace',
  BIDS = 'Bids'
}

export class ContractService implements ContractServiceInterface {

  // hasFetched = false

  async build() {
    //   if (this.hasFetched) {
    //     return
    //   }

    //   const contracts = await nftAPI.fetchContracts()
    //   if (Symbol.iterator in Object(contracts)) {
    //     for (const contract of contracts) {
    //       this.contracts?.push(contract)
    //     }
    //   }


    //   this.hasFetched = true
  }

  getContracts() {
    return ({
      [AppNetwork.MATIC]: [
        {
          // notre token
          name: ContractName.SPECIES,
          address: '0x2a8fd99c19271f4f04b1b7b9c4f7cf264b626edb',
          vendor: 'species',
          category: null,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_ROPSTEN
        },
        {
          name: ContractName.MARKETPLACE,
          address: '0x5424912699dabaa5f2998750c1c66e73d67ad219',
          vendor: 'species',
          category: null,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_ROPSTEN
        },
        {
          name: ContractName.BIDS,
          address: '0x250fa138c0a994799c7a49df3097dc71e37b3d6f',
          vendor: 'species',
          category: null,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_ROPSTEN
        },
        {
          name: ContractName.SPECIES,
          address: '0x882Da5967c435eA5cC6b09150d55E8304B838f45',
          vendor: 'species',
          category: null,
          network: Network.MATIC,
          chainId: ChainId.MATIC_MUMBAI
        },
        {
          name: ContractName.MARKETPLACE,
          address: '0x4D005B77334E36cD53843e9bABDf10340862C7f2',
          vendor: 'species',
          category: null,
          network: Network.MATIC,
          chainId: ChainId.MATIC_MUMBAI
        }
      ],
      [AppNetwork.ETHEREUM]: [
        {
          name: ContractName.SPECIES,
          address: '0x882Da5967c435eA5cC6b09150d55E8304B838f45',
          vendor: 'species',
          category: null,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET
        },
        {
          name: ContractName.MARKETPLACE,
          address: '0x8e5660b4ab70168b5a6feea0e0315cb49c8cd539',
          vendor: 'species',
          category: null,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET
        },
        {
          name: ContractName.BIDS,
          address: '0xe479dfd9664c693b2e2992300930b00bfde08233',
          vendor: 'species',
          category: null,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_ROPSTEN
        },
        {
          name: ContractName.SPECIES,
          address: '0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4',
          vendor: 'species',
          category: null,
          network: Network.MATIC,
          chainId: ChainId.MATIC_MAINNET
        },
        {
          name: ContractName.MARKETPLACE,
          address: '0x0000000000000000000000000000000000000000', // TODO: add contract address
          vendor: 'species',
          category: null,
          network: Network.MATIC,
          chainId: ChainId.MATIC_MAINNET
        }
      ]
    } as Record<AppNetwork, Contract[]>)[network]
  }

  getTransferType(_address: string) {
    return TransferType.SAFE_TRANSFER_FROM
  }
}
