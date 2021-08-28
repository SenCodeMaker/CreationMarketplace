import { services as species } from './species'
import {
  ContractService,
  NFTService,
  OrderService,
  BidService
} from './services'
import { VendorName } from './types'

export class VendorFactory {
  static build(vendor: VendorName): Vendor<VendorName> {
    switch (vendor) {
      case VendorName.SPECIES:
        return new Vendor<VendorName.SPECIES>(
          vendor,
          new species.ContractService(),
          new species.NFTService(),
          new species.OrderService(),
          new species.BidService()
        )
      default:
        throw new Error(`Invalid vendor "${vendor}"`)
    }
  }
}

export class Vendor<V extends VendorName> {
  constructor(
    public type: V,
    public contractService: ContractService,
    public nftService: NFTService<V>,
    public orderService: OrderService<V>,
    public bidService?: BidService<V>
  ) {}
}
