import React, { useState, useCallback } from 'react'
import { Network } from '@dcl/schemas'
import { Header, Form, Field, Button } from 'decentraland-ui'
import { t, T } from 'decentraland-dapps/dist/modules/translation/utils'
import { AuthorizationType } from 'decentraland-dapps/dist/modules/authorization/types'
import { toSPECIES, fromSPECIES } from '../../../lib/species'
import { NFTAction } from '../../NFTAction'
import { getNFTName, isOwnedBy } from '../../../modules/nft/utils'
import { getDefaultExpirationDate } from '../../../modules/order/utils'
import { locations } from '../../../modules/routing/locations'
import { AuthorizationModal } from '../../AuthorizationModal'
import { Props } from './BidModal.types'
import './BidModal.css'
import { getContractNames } from '../../../modules/vendor'
import { getContract } from '../../../modules/contract/utils'
import {
  Authorization,
  ContractName,
  hasAuthorization
} from '../../../modules/authorization/types'

const BidModal = (props: Props) => {
  const { nft, wallet, authorizations, onNavigate, onPlaceBid } = props

  const [price, setPrice] = useState('')
  const [expiresAt, setExpiresAt] = useState(getDefaultExpirationDate())

  const [showAuthorizationModal, setShowAuthorizationModal] = useState(false)

  const handlePlaceBid = useCallback(
    () => onPlaceBid(nft, fromSPECIES(price), +new Date(expiresAt), undefined),
    [nft, price, expiresAt, undefined, onPlaceBid]
  )

  if (!wallet) {
    return null
  }

  const contractNames = getContractNames()

  const mana = getContract({
    name: contractNames.SPECIES,
    network: nft.network
  })

  const bids = getContract({
    name: contractNames.BIDS,
    network: nft.network
  })

  const authorization: Authorization = {
    address: wallet.address,
    authorizedAddress: bids.address,
    contractAddress: mana.address,
    contractName: ContractName.SPECIESToken,
    chainId: nft.chainId,
    type: AuthorizationType.ALLOWANCE
  }

  const handleSubmit = () => {
    if (hasAuthorization(authorizations, authorization)) {
      handlePlaceBid()
    } else {
      setShowAuthorizationModal(true)
    }
  }

  const handleClose = () => setShowAuthorizationModal(false)

  const isInvalidDate = +new Date(expiresAt) < Date.now()
  const hasInsufficientSpecies =
    !!price &&
    !!wallet &&
    fromSPECIES(price) > wallet.networks[Network.MATIC].species

  return (
    <NFTAction nft={nft}>
      <Header size="large">{t('bid_page.title')}</Header>
      <p className="subtitle">
        <T
          id={'bid_page.subtitle'}
          values={{
            name: <b className="primary-text">{getNFTName(nft)}</b>
          }}
        />
      </p>
      <Form onSubmit={handleSubmit}>
        <div className="form-fields">
          <Field
            label={t('bid_page.price')}
            placeholder={toSPECIES(1000)}
            value={price}
            onChange={(_event, props) => {
              const newPrice = fromSPECIES(props.value)
              setPrice(toSPECIES(newPrice))
            }}
            error={hasInsufficientSpecies}
            message={
              hasInsufficientSpecies ? t('bid_page.not_enougn_mana') : undefined
            }
          />
          <Field
            label={t('bid_page.expiration_date')}
            type="date"
            value={expiresAt}
            onChange={(_event, props) =>
              setExpiresAt(props.value || getDefaultExpirationDate())
            }
            error={isInvalidDate}
            message={isInvalidDate ? t('bid_page.invalid_date') : undefined}
          />
        </div>
        <div className="buttons">
          <Button
            as="div"
            onClick={() =>
              onNavigate(locations.nft(nft.contractAddress, nft.tokenId))
            }
          >
            {t('global.cancel')}
          </Button>
          <Button
            type="submit"
            primary
            disabled={
              isOwnedBy(nft, wallet) ||
              fromSPECIES(price) <= 0 ||
              isInvalidDate ||
              hasInsufficientSpecies ||
              false
            }
          >
            {t('bid_page.submit')}
          </Button>
        </div>
      </Form>
      <AuthorizationModal
        open={showAuthorizationModal}
        authorization={authorization}
        onProceed={handlePlaceBid}
        onCancel={handleClose}
      />
    </NFTAction>
  )
}

export default React.memo(BidModal)
