import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Link } from 'react-router-dom'
import { Card } from 'decentraland-ui'

import { formatSpecies } from '../../lib/species'
import { formatDistanceToNow } from '../../lib/date'
import { locations } from '../../modules/routing/locations'
import { getNFTName } from '../../modules/nft/utils'
import { NFT } from '../../modules/nft/types'
import { VendorName } from '../../modules/vendor/types'
import { NFTImage } from '../NFTImage'
import { Species } from '../Species'
import { ThreatStatusTag } from './ThreatStatusTag'
import { Props } from './NFTCard.types'
import './NFTCard.css'
import { SexTag } from './SexTag'

const NFTCard = (props: Props) => {
  const { nft, order } = props

  const title = getNFTName(nft)
  const { sex, threatStatus } = (nft as NFT<VendorName.SPECIES>).data

  return (
    <Card
      className="NFTCard"
      link
      as={Link}
      to={locations.nft(nft.contractAddress, nft.tokenId)}
    >
      <NFTImage nft={nft} showMonospace />
      <Card.Content>
        <Card.Header>
          <div className="title">{title}</div>{' '}
          {order ? (
            <Species network={nft.network} inline>
              {formatSpecies(order.price)}
            </Species>
          ) : null}
        </Card.Header>
        {order && order.expiresAt ? (
          <Card.Meta>
            {t('nft_card.expires_at', {
              date: formatDistanceToNow(+order.expiresAt, {
                addSuffix: true
              })
            })}
          </Card.Meta>
        ) : null}
        {sex ? <SexTag nft={nft} /> : null}
        {threatStatus ? <ThreatStatusTag nft={nft} /> : null}
      </Card.Content>
    </Card>
  )
}

export default React.memo(NFTCard)
