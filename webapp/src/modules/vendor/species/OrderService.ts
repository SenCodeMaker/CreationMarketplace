import { Address } from 'web3x-es/address'
import { toWei } from 'web3x-es/utils'
import { CreationToken } from '../../../contracts/CreationToken'
// import { Marketplace } from '../../../contracts/old/Marketplace'
import { ContractFactory } from '../../contract/ContractFactory'
import { NFT } from '../../nft/types'
import { Order } from '../../order/types'
import { orderAPI } from './order/api'
import { VendorName } from '../types'
import { OrderService as OrderServiceInterface } from '../services'
import { sendTransaction, sendTransactionFromEth } from '../../wallet/utils'
import { ContractName, getContract, Wallet } from '../../authorization/types'

export class OrderService implements OrderServiceInterface<VendorName.SPECIES> {
  async fetchByNFT(nft: NFT) {
    const orders = await orderAPI.fetchByNFT(nft.contractAddress, nft.tokenId)
    return orders
  }

  async create(
    wallet: Wallet | null,
    nft: NFT,
    price: number,
    expiresAt: number
  ) {
    const contractData = null as any // getContract(ContractName.Marketplace, nft.chainId)
    // const marketplace = await this.getMarketplaceContract(contractData.address)

    if (!wallet) {
      throw new Error('Invalid address. Wallet must be connected.')
    }
    const from = Address.fromString(wallet.address)

    const createOrder = null as any /* marketplace.methods.createOrder(
      Address.fromString(nft.contractAddress),
      nft.tokenId,
      toWei(price.toString(), 'ether'),
      expiresAt
    )*/

    return sendTransactionFromEth(createOrder, contractData, from)
  }

  async buySpecie(wallet: Wallet | null, nft: NFT, order: Order) {
    const contractData = getContract(ContractName.SPECIESToken, nft.chainId)
    const speciesContract = await ContractFactory.build(
      CreationToken,
      contractData.address
    )

    if (!wallet) {
      throw new Error('Invalid address. Wallet must be connected.')
    }
    return sendTransaction(
      speciesContract.methods.buySpecie(nft.id),
      contractData,
      wallet
    )
  }

  async execute(
    wallet: Wallet | null,
    nft: NFT,
    order: Order,
    fingerprint?: string
  ) {
    const contractData = null as any // getContract(ContractName.Marketplace, nft.chainId)
    // const marketplace = await this.getMarketplaceContract(contractData.address)
    // const { price } = order

    // if (!wallet) {
    //   throw new Error('Invalid address. Wallet must be connected.')
    // }
    const from = Address.fromString(wallet?.address as string)

    // if (fingerprint) {
    //   return marketplace.methods
    //     .safeExecuteOrder(
    //       Address.fromString(nft.contractAddress),
    //       nft.tokenId,
    //       price,
    //       fingerprint
    //     )
    //     .send({ from })
    //     .getTxHash()
    // } else {
    const executeOrder = null as any /*marketplace.methods.executeOrder(
        Address.fromString(nft.contractAddress),
        nft.tokenId,
        price
      )*/

    return sendTransactionFromEth(executeOrder, contractData, from)
    // }
  }

  async cancel(wallet: Wallet | null, nft: NFT) {
    const contractData = null as any // getContract(ContractName.Marketplace, nft.chainId)
    // const marketplace = await this.getMarketplaceContract(contractData.address)

    // if (!wallet) {
    //   throw new Error('Invalid address. Wallet must be connected.')
    // }

    const from = Address.fromString(wallet?.address as string)
    const cancelOrder = null as any /*marketplace.methods.cancelOrder(
      Address.fromString(nft.contractAddress),
      nft.tokenId
    )*/

    return sendTransactionFromEth(cancelOrder, contractData, from)
  }

  canSell() {
    return true
  }

  // private getMarketplaceContract(address: string) {
  //   return ContractFactory.build(Marketplace, address)
  // }
}
