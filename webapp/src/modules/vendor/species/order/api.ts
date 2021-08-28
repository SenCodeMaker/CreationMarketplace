import { Order } from '../../../order/types'

class OrderAPI {
  async fetchByNFT(contractAddress: string, tokenId: string) {
    const orders: Order[] = await fetch(
      `${process.env
        .REACT_APP_ORDER_SERVER_URL!}/v1/contracts/${contractAddress}/tokens/${tokenId}/history`
    ).then(resp => resp.json())
    return orders
  }
}

export const orderAPI = new OrderAPI()
