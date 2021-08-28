import { TxSend } from 'web3x-es/contract'
import { Address } from 'web3x-es/address'
import { Network } from '@dcl/schemas'
import { getChainConfiguration } from 'decentraland-dapps/dist/lib/chainConfiguration'
import {
  ContractData,
  sendMetaTransaction as baseSendMetaTransaction
} from 'decentraland-transactions'
import {
  getConnectedProvider,
  getNetworkProvider
} from 'decentraland-dapps/dist/lib/eth'
import { Wallet } from '../authorization/types'

export function shortenAddress(address: string) {
  if (address) {
    return address.slice(0, 6) + '...' + address.slice(42 - 5)
  }
}

export function addressEquals(address1?: string, address2?: string) {
  return (
    address1 != undefined &&
    address2 != undefined &&
    address1.toLowerCase() === address2.toLowerCase()
  )
}

export function sendTransaction(
  method: TxSend<any>,
  contract: ContractData,
  wallet: Wallet
): Promise<string> {
  const { network } = getChainConfiguration(wallet.chainId)

  // switch (network) {
  //   case Network.MATIC:
  return method
    .send({ from: Address.fromString(wallet.address)/*, gas: 11827500*/ })
    .getTxHash()
  // case Network.ETHEREUM: {
  //   return sendMetaTransaction(
  //     method,
  //     contract,
  //     Address.fromString(wallet.address)
  //   )
  // }
  // default:
  //   throw new Error(`Undefined network ${network}`)
  // }
}

export async function sendMetaTransaction(
  method: TxSend<any>,
  contract: ContractData,
  from: Address
): Promise<string> {
  const provider = await getConnectedProvider()
  if (!provider) {
    throw new Error('Could not get a valid connected Wallet')
  }
  const metaTxProvider = await getNetworkProvider(contract.chainId)
  const txData = getMethodData(method, from)
  return baseSendMetaTransaction(provider, metaTxProvider, txData, contract)
}

export function sendTransactionFromEth(
  method: TxSend<any>,
  contract: ContractData,
  from: Address
): Promise<string> {
  const { network } = getChainConfiguration(contract.chainId)

  switch (network) {
    case Network.ETHEREUM:
      return method.send({ from }).getTxHash()
    case Network.MATIC: {
      return sendMetaTransactionFromEth(method, contract, from)
    }
    default:
      throw new Error(`Undefined network ${network}`)
  }
}

export async function sendMetaTransactionFromEth(
  method: TxSend<any>,
  contract: ContractData,
  from: Address
): Promise<string> {
  const provider = await getConnectedProvider()
  if (!provider) {
    throw new Error('Could not get a valid connected Wallet')
  }
  const metaTxProvider = await getNetworkProvider(contract.chainId)
  const txData = getMethodData(method, from)
  return baseSendMetaTransaction(provider, metaTxProvider, txData, contract)
}

export function getMethodData(method: TxSend<any>, from: Address): string {
  const payload = method.getSendRequestPayload({ from })
  return payload.params[0].data
}
