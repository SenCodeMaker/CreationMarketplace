import { ChainId } from '@dcl/schemas'
import { speciesTokenAbi } from './speciesAbi.ts'

export const speciesToken = {
  [31337]: {
    version: '1',
    abi: speciesTokenAbi,
    address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    name: 'SpeciesToken',
    chainId: 31337
  },
  [ChainId.ETHEREUM_ROPSTEN]: {
    version: '1',
    abi: speciesTokenAbi,
    address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    name: 'SpeciesToken',
    chainId: ChainId.ETHEREUM_ROPSTEN
  },
  [ChainId.ETHEREUM_GOERLI]: {
    version: '1',
    abi: speciesTokenAbi,
    address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    name: 'SpeciesToken',
    chainId: ChainId.ETHEREUM_GOERLI
  },
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: speciesTokenAbi,
    address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    name: 'Decentraland MANA (PoS)',
    chainId: ChainId.MATIC_MUMBAI
  },
  [ChainId.MATIC_MAINNET]: {
    version: '1',
    abi: speciesTokenAbi,
    address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    name: '(PoS) Decentraland MANA',
    chainId: ChainId.MATIC_MAINNET
  }
}