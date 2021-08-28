import React from 'react'
import { Page } from 'decentraland-ui'

import { VendorName } from '../../modules/vendor/types'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Navigation } from '../Navigation'
import { NFTProviderPage } from '../NFTProviderPage'
import { ENSDetail } from './ENSDetail'
import './NFTPage.css'
import { SpeciesDetail } from './SpeciesDetail'

const NFTPage = () => {
  return (
    <>
      <Navbar isFullscreen />
      <Navigation isFullscreen />
      <Page className="NFTPage" isFullscreen>
        <NFTProviderPage>
          {nft => {
            // TODO: Move this to components/vendor
            return (
              <>
                {/* {data ? <ENSDetail nft={nft} /> : null} */}
                {nft.vendor === VendorName.SPECIES ? (
                  <SpeciesDetail nft={nft} />
                ) : null}
              </>
            )
          }}
        </NFTProviderPage>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(NFTPage)
