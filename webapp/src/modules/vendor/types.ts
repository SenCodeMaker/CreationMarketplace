import * as species from './species'

export enum VendorName {
  SPECIES = 'species'
}

export const Disabled = {}

const ContractName = {
  ...species.ContractName
}

export type ContractName = typeof ContractName

export const getContractNames = () =>
({
  ...species.ContractName
} as ContractName)

export enum TransferType {
  SAFE_TRANSFER_FROM = 0,
  TRANSFER_FROM = 1,
  TRANSFER = 2
}
