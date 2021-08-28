import React from 'react'
import { Container, Header } from 'decentraland-ui'

import { getNFTName } from '../../../modules/nft/utils'
import { PageHeader } from '../../PageHeader'
import { NFTImage } from '../../NFTImage'
import { Row } from '../../Layout/Row'
import { Column } from '../../Layout/Column'
import { Title } from '../Title'
import { Badge } from '../Badge'
import { Description } from '../Description'
import { OrderDetails } from '../OrderDetails'
import { Actions } from '../Actions'
import { TransactionHistory } from '../TransactionHistory'
import { Bids } from '../Bids'
import { Props } from './SpeciesDetail.types'
import { SexTag } from '../../NFTCard/SexTag'
import {
  THREATSTATUS_BACKGROUND_COLOR,
  THREATSTATUS_COLOR
} from '../../../modules/nft/species/types'
import { ThreatStatusTag } from '../../NFTCard/ThreatStatusTag'

const SpeciesDetail = (props: Props) => {
  const { nft } = props
  const speciesNFT = nft.data
/* tslint:disable */
  return (
    <>
      <PageHeader>
        <NFTImage
          nft={nft}
          isDraggable={true}
          withNavigation={true}
          hasPopup={true}
        />
      </PageHeader>
      <Container className="SpeciesDetail">
        <Title
          left={
            <Header size="large">
              <div className="text">
                {getNFTName(nft)}
                {speciesNFT.sex ? <SexTag nft={nft} /> : null}
                
                {speciesNFT.threatStatus ?
               
                <Badge color={THREATSTATUS_COLOR[speciesNFT.threatStatus]}
                    backgroundColor={THREATSTATUS_BACKGROUND_COLOR[speciesNFT.threatStatus]}
                  >
                   <ThreatStatusTag nft={nft} />
                  <div className="SpeciesDetail threatStatus rarity"
                    title={speciesNFT.threatStatus.toLocaleLowerCase()}>
                       t(`threatStatus.${speciesNFT.threatStatus.toLocaleLowerCase()}`)
                  </div>
                </Badge>
                : null }

                {speciesNFT.sex ?
                <Badge color="#37333d">
                   <SexTag nft={nft} />
                  <div className="SpeciesDetail"
                    title={speciesNFT.sex.toLocaleLowerCase()}>
                       t(`sex.${speciesNFT.sex.toLocaleLowerCase()}`)
                  </div>
                </Badge>
                : null }
              </div>
            </Header>
          }
          // right={<Owner nft={nft} />}
        />
        <Description descriptions={speciesNFT.descriptions} />
        <Row>
          <Column align="left" grow={true}>
            <OrderDetails nft={nft} />
          </Column>
          <Column align="right">
            <Actions nft={nft} />
          </Column>
        </Row>
        {/* <ProximityHighlights nft={nft} /> */}
        {/* <Bids nft={nft} /> */}
        {/* <TransactionHistory nft={nft} /> */}
      </Container>
    </>
  )
}

export default React.memo(SpeciesDetail)
