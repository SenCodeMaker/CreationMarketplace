import React, { useMemo } from 'react'
import { Loader } from 'decentraland-ui'
import { LazyImage } from 'react-lazy-images'
import { NFT, NFTCategory } from '../../modules/nft/types'
import {
  THREATSTATUS_BACKGROUND_COLOR,
  THREATSTATUS_BACKGROUND_COLOR_LIGHT
} from '../../modules/nft/species/types'
import { getNFTName } from '../../modules/nft/utils'
import { Props } from './NFTImage.types'
import './NFTImage.css'
import { VendorName } from '../../modules/vendor'

// 1x1 transparent pixel
const PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII='

const NFTImage = (props: Props) => {
  const { nft } = props

  const { threatStatus } = (nft as NFT<
    VendorName.SPECIES // TODO send data from java
  >).data

  switch (nft.category) {
    // case NFTCategory.ENS: {
    //   let name = ens!.subdomain
    //   let classes = ['ens-subdomain']
    //   if (isSmall) {
    //     name = name.slice(0, 2)
    //     classes.push('small')
    //   }
    //   return (
    //     <div className={classes.join(' ')}>
    //       <div className="name">{name}</div>
    //       {showMonospace ? <div className="monospace">{name}</div> : null}
    //     </div>
    //   )
    // }

    case NFTCategory.ANIMALIA:
    case NFTCategory.ARCHAEA:
    case NFTCategory.BACTERIA:
    case NFTCategory.CHROMISTA:
    case NFTCategory.FUNGI:
    case NFTCategory.PLANTAE:
    case NFTCategory.PROTOZOA:
    case NFTCategory.VIRUSES: {
      const backgroundImage = `radial-gradient(${
        THREATSTATUS_BACKGROUND_COLOR[threatStatus!]
      }, ${THREATSTATUS_BACKGROUND_COLOR_LIGHT[threatStatus!]})`
      return (
        <div
          className="rarity-background"
          style={{
            backgroundImage
          }}
        >
          <img
            alt={getNFTName(nft) as string}
            className="image"
            src={nft.data.image?.url}
          />
        </div>
      )
    }

    default: {
      return (
        <LazyImage
          src={nft.image}
          alt={getNFTName(nft) as string}
          debounceDurationMs={1000}
          placeholder={({ ref }) => (
            <div ref={ref}>
              <Loader size="small" active />
            </div>
          )}
          actual={({ imageProps }) => (
            <img
              className="image"
              alt={getNFTName(nft) as string}
              {...imageProps}
            />
          )}
        />
      )
    }
  }
}

// the purpose of this wrapper is to make the div always be square, by using a 1x1 transparent pixel
const NFTImageWrapper = (props: Props) => {
  const { nft, className, ...rest } = props

  let classes = 'NFTImage'
  if (className) {
    classes += ' ' + className
  }

  return (
    <div className={classes}>
      <img src={PIXEL} alt="pixel" className="pixel" />
      <div className="image-wrapper">
        <NFTImage nft={nft} {...rest} />
      </div>
    </div>
  )
}

NFTImage.defaultProps = {
  isDraggable: false,
  withNavigation: false,
  zoom: 0.5,
  isSmall: false,
  showMonospace: false
}

export default React.memo(NFTImageWrapper)
