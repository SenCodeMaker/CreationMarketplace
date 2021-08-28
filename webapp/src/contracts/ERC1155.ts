import BN from "bn.js";
import { Address } from "web3x-es/address";
import { EventLog, TransactionReceipt } from "web3x-es/formatters";
import { Contract, ContractOptions, TxCall, TxSend, EventSubscriptionFactory } from "web3x-es/contract";
import { Eth } from "web3x-es/eth";
import abi from "./ERC1155Abi";
interface ERC1155Events {
}
interface ERC1155EventLogs {
}
interface ERC1155TxEventLogs {
}
export interface ERC1155TransactionReceipt extends TransactionReceipt<ERC1155TxEventLogs> {
}
interface ERC1155Methods {
}
export interface ERC1155Definition {
    methods: ERC1155Methods;
    events: ERC1155Events;
    eventLogs: ERC1155EventLogs;
}
export class ERC1155 extends Contract<ERC1155Definition> {
    constructor(eth: Eth, address?: Address, options?: ContractOptions) {
        super(eth, abi, address, options);
    }
}
export var ERC1155Abi = abi;
