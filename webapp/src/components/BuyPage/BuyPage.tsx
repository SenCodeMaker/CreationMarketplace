import React from 'react'
import { fromWei } from 'web3x-es/utils'
import { Page } from 'decentraland-ui'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Wallet as WalletProvider } from '../Wallet'
import { NFTProviderPage } from '../NFTProviderPage'
import { isOwnedBy, isOwned } from '../../modules/nft/utils'
import { Order } from '../../modules/order/types'
import { NFT } from '../../modules/nft/types'
import { BuyModal } from './BuyModal'
import { Props } from './BuyPage.types'
import './BuyPage.css'
import { Wallet } from '../../modules/authorization/types'
import { Network } from '../../modules/contract/types'
/* tslint:disable */

const BuyPage = (props: Props) => {
  const { authorizations, isLoading, onNavigate, onBuyOrder } = props

  const isInsufficientSpecies = (
    wallet: Wallet,
    nft: NFT,
    order: Order | null
  ) =>
    !!order && wallet.networks[Object.values(Network).find(x => x === nft.network) as Network].species < +fromWei(order.price, 'ether')

  return (
    <>
      <Navbar isFullscreen />
      <Page className="BuyPage">
        <WalletProvider>
          {wallet => (
            <NFTProviderPage>
              {(nft, order) => (
                <BuyModal
                  nft={nft}
                  order={order}
                  wallet={wallet}
                  authorizations={authorizations}
                  isLoading={isLoading}
                  onNavigate={onNavigate}
                  onBuyOrder={onBuyOrder}
                  isOwned={isOwnedBy(nft, wallet)}
                  isOwner={isOwned(nft)}
                  hasInsufficientSPECIES={isInsufficientSpecies(
                    wallet,
                    nft,
                    order
                  )}
                />
              )}
            </NFTProviderPage>
          )}
        </WalletProvider>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(BuyPage)
