import BN from "bn.js";
import { Address } from "web3x-es/address";
import { EventLog, TransactionReceipt } from "web3x-es/formatters";
import { Contract, ContractOptions, TxCall, TxSend, EventSubscriptionFactory } from "web3x-es/contract";
import { Eth } from "web3x-es/eth";
import abi from "./CreationTokenAbi";
export type ApprovalForAllEvent = {
    account: Address;
    operator: Address;
    approved: boolean;
};
export type PausedEvent = {
    account: Address;
};
export type RoleAdminChangedEvent = {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
};
export type RoleGrantedEvent = {
    role: string;
    account: Address;
    sender: Address;
};
export type RoleRevokedEvent = {
    role: string;
    account: Address;
    sender: Address;
};
export type TransferEvent = {
    from: Address;
    to: Address;
    value: string;
};
export type TransferBatchEvent = {
    operator: Address;
    from: Address;
    to: Address;
    ids: string[];
    values: string[];
};
export type TransferSingleEvent = {
    operator: Address;
    from: Address;
    to: Address;
    id: string;
    value: string;
};
export type URIEvent = {
    value: string;
    id: string;
};
export type UnpausedEvent = {
    account: Address;
};
export interface ApprovalForAllEventLog extends EventLog<ApprovalForAllEvent, "ApprovalForAll"> {
}
export interface PausedEventLog extends EventLog<PausedEvent, "Paused"> {
}
export interface RoleAdminChangedEventLog extends EventLog<RoleAdminChangedEvent, "RoleAdminChanged"> {
}
export interface RoleGrantedEventLog extends EventLog<RoleGrantedEvent, "RoleGranted"> {
}
export interface RoleRevokedEventLog extends EventLog<RoleRevokedEvent, "RoleRevoked"> {
}
export interface TransferEventLog extends EventLog<TransferEvent, "Transfer"> {
}
export interface TransferBatchEventLog extends EventLog<TransferBatchEvent, "TransferBatch"> {
}
export interface TransferSingleEventLog extends EventLog<TransferSingleEvent, "TransferSingle"> {
}
export interface URIEventLog extends EventLog<URIEvent, "URI"> {
}
export interface UnpausedEventLog extends EventLog<UnpausedEvent, "Unpaused"> {
}
interface CreationTokenEvents {
    ApprovalForAll: EventSubscriptionFactory<ApprovalForAllEventLog>;
    Paused: EventSubscriptionFactory<PausedEventLog>;
    RoleAdminChanged: EventSubscriptionFactory<RoleAdminChangedEventLog>;
    RoleGranted: EventSubscriptionFactory<RoleGrantedEventLog>;
    RoleRevoked: EventSubscriptionFactory<RoleRevokedEventLog>;
    Transfer: EventSubscriptionFactory<TransferEventLog>;
    TransferBatch: EventSubscriptionFactory<TransferBatchEventLog>;
    TransferSingle: EventSubscriptionFactory<TransferSingleEventLog>;
    URI: EventSubscriptionFactory<URIEventLog>;
    Unpaused: EventSubscriptionFactory<UnpausedEventLog>;
}
interface CreationTokenEventLogs {
    ApprovalForAll: ApprovalForAllEventLog;
    Paused: PausedEventLog;
    RoleAdminChanged: RoleAdminChangedEventLog;
    RoleGranted: RoleGrantedEventLog;
    RoleRevoked: RoleRevokedEventLog;
    Transfer: TransferEventLog;
    TransferBatch: TransferBatchEventLog;
    TransferSingle: TransferSingleEventLog;
    URI: URIEventLog;
    Unpaused: UnpausedEventLog;
}
interface CreationTokenTxEventLogs {
    ApprovalForAll: ApprovalForAllEventLog[];
    Paused: PausedEventLog[];
    RoleAdminChanged: RoleAdminChangedEventLog[];
    RoleGranted: RoleGrantedEventLog[];
    RoleRevoked: RoleRevokedEventLog[];
    Transfer: TransferEventLog[];
    TransferBatch: TransferBatchEventLog[];
    TransferSingle: TransferSingleEventLog[];
    URI: URIEventLog[];
    Unpaused: UnpausedEventLog[];
}
export interface CreationTokenTransactionReceipt extends TransactionReceipt<CreationTokenTxEventLogs> {
}
interface CreationTokenMethods {
    DEFAULT_ADMIN_ROLE(): TxCall<string>;
    LetBe(): TxCall<string>;
    MINTER_ROLE(): TxCall<string>;
    PAUSER_ROLE(): TxCall<string>;
    SNAPSHOTTER_ROLE(): TxCall<string>;
    _SpeciesSold(): TxCall<string>;
    _holderSpecies(a0: Address, a1: number | string | BN): TxCall<string>;
    _reward(): TxCall<string>;
    _rewardee(a0: number | string | BN): TxCall<Address>;
    _speciesHolders(a0: number | string | BN, a1: number | string | BN): TxCall<Address>;
    balanceOf(account: Address, id: number | string | BN): TxCall<string>;
    balanceOf(account: Address): TxCall<string>;
    balanceOfAtSnapshot(account: Address): TxCall<string>;
    balanceOfBatch(accounts: Address[], ids: (number | string | BN)[]): TxCall<string[]>;
    burn(amount: number | string | BN): TxSend<CreationTokenTransactionReceipt>;
    burn(account: Address, id: number | string | BN, value: number | string | BN): TxSend<CreationTokenTransactionReceipt>;
    burnBatch(account: Address, ids: (number | string | BN)[], values: (number | string | BN)[]): TxSend<CreationTokenTransactionReceipt>;
    buySpecie(spender: Address, to: Address, specieId: number | string | BN): TxSend<CreationTokenTransactionReceipt>;
    buySpecie(specieId: number | string | BN): TxSend<CreationTokenTransactionReceipt>;
    claimHolderReward(): TxSend<CreationTokenTransactionReceipt>;
    getRoleAdmin(role: string): TxCall<string>;
    getRoleMember(role: string, index: number | string | BN): TxCall<Address>;
    getRoleMemberCount(role: string): TxCall<string>;
    grantRole(role: string, account: Address): TxSend<CreationTokenTransactionReceipt>;
    hasRole(role: string, account: Address): TxCall<boolean>;
    holderSpecies(holder: Address): TxCall<string[]>;
    initialize(): TxSend<CreationTokenTransactionReceipt>;
    initialize(uri: string): TxSend<CreationTokenTransactionReceipt>;
    isApprovedForAll(account: Address, operator: Address): TxCall<boolean>;
    maxSpecimen(specieId: number | string | BN): TxCall<string>;
    mint(to: Address, amount: number | string | BN): TxSend<CreationTokenTransactionReceipt>;
    mint(to: Address, id: number | string | BN, amount: number | string | BN, data: string): TxSend<CreationTokenTransactionReceipt>;
    mintBatch(to: Address, ids: (number | string | BN)[], amounts: (number | string | BN)[], data: string): TxSend<CreationTokenTransactionReceipt>;
    mintSpecie(chosenSpecie: number | string | BN, to: Address): TxSend<CreationTokenTransactionReceipt>;
    pause(): TxSend<CreationTokenTransactionReceipt>;
    paused(): TxCall<boolean>;
    reflectionFromToken(tAmount: number | string | BN, deductTransferFee: boolean): TxCall<string>;
    renounceRole(role: string, account: Address): TxSend<CreationTokenTransactionReceipt>;
    revokeRole(role: string, account: Address): TxSend<CreationTokenTransactionReceipt>;
    rewardHolders(amount: number | string | BN): TxSend<CreationTokenTransactionReceipt>;
    safeBatchTransferFrom(from: Address, to: Address, ids: (number | string | BN)[], amounts: (number | string | BN)[], data: string): TxSend<CreationTokenTransactionReceipt>;
    safeTransferFrom(from: Address, to: Address, id: number | string | BN, amount: number | string | BN, data: string): TxSend<CreationTokenTransactionReceipt>;
    setApprovalForAll(operator: Address, approved: boolean): TxSend<CreationTokenTransactionReceipt>;
    setURI(newuri: string): TxSend<CreationTokenTransactionReceipt>;
    specieHolders(specieId: number | string | BN): TxCall<Address[]>;
    speciePrice(): TxCall<string>;
    supportsInterface(interfaceId: string): TxCall<boolean>;
    takeSnapshot(): TxSend<CreationTokenTransactionReceipt>;
    tokenFromReflection(rAmount: number | string | BN): TxCall<string>;
    totalFees(): TxCall<string>;
    totalSupply(): TxCall<string>;
    totalSupplyAtSnapShot(): TxCall<string>;
    transfer(recipient: Address, amount: number | string | BN): TxSend<CreationTokenTransactionReceipt>;
    transferFrom(sender: Address, recipient: Address, amount: number | string | BN): TxSend<CreationTokenTransactionReceipt>;
    unpause(): TxSend<CreationTokenTransactionReceipt>;
    uri(a0: number | string | BN): TxCall<string>;
}
export interface CreationTokenDefinition {
    methods: CreationTokenMethods;
    events: CreationTokenEvents;
    eventLogs: CreationTokenEventLogs;
}
export class CreationToken extends Contract<CreationTokenDefinition> {
    constructor(eth: Eth, address?: Address, options?: ContractOptions) {
        super(eth, abi, address, options);
    }
}
export var CreationTokenAbi = abi;
