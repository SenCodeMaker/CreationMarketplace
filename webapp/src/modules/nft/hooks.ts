import { useEffect, useState } from 'react'
import { TokenConverter } from '../vendor/TokenConverter'
import { MarketplacePrice } from '../vendor/MarketplacePrice'
import { isPartner } from '../vendor/utils'
import { Order } from '../order/types'
import { NFT } from './types'

export const useComputedPrice = (nft: NFT, order: Order | null) => {
  const [computedPrice, setComputedPrice] = useState<string>()
  const [percentageIncrease, setPercentageIncrease] = useState(0)
  const [isAboveMaxPercentage, setIsAboveMaxPercentage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (order && isPartner(nft.vendor)) {
      const tokenConverter = new TokenConverter()
      const marketPrice = new MarketplacePrice()

      setIsLoading(true)
      tokenConverter
        .contractEthToSpecies(order.ethPrice!)
        .then(computedPrice => {
          const percentage = marketPrice.getPercentageIncrease(
            computedPrice as unknown as string,
            order.price
          )

          setComputedPrice(computedPrice as unknown as string)
          setPercentageIncrease(percentage)
          setIsAboveMaxPercentage(
            marketPrice.isAboveMaxIncreasePercentage(percentage)
          )
        })
        .finally(() => setIsLoading(false))
        .catch(error =>
          console.error(
            `Error getting computed price for nft ${nft.tokenId} from ${nft.vendor}`,
            error
          )
        )
    }
  }, [
    nft,
    order,
    setComputedPrice,
    setPercentageIncrease,
    setIsAboveMaxPercentage,
    setIsLoading
  ])

  return [
    computedPrice,
    percentageIncrease,
    isAboveMaxPercentage,
    isLoading
  ] as const
}
