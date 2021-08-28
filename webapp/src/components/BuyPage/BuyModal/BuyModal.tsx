import React, { useState, useCallback } from 'react'
import { Header, Button } from 'decentraland-ui'
import { T, t } from 'decentraland-dapps/dist/modules/translation/utils'
import { AuthorizationType } from 'decentraland-dapps/dist/modules/authorization/types'
import { formatSpecies } from '../../../lib/species'
import { locations } from '../../../modules/routing/locations'
import { isPartner } from '../../../modules/vendor/utils'
import { getNFTName } from '../../../modules/nft/utils'
import { NFT } from '../../../modules/nft/types'
import { getContract } from '../../../modules/contract/utils'
import { NFTAction } from '../../NFTAction'
import { Species } from '../../Species'
import { AuthorizationModal } from '../../AuthorizationModal'
import { Props } from './BuyModal.types'
import {
  Authorization,
  ContractName,
  hasAuthorization
} from '../../../modules/authorization/types'
import { getContractNames } from '../../../modules/vendor'
import { Network } from '../../../modules/contract/types'

const BuyPage = (props: Props) => {
  const {
    nft,
    order,
    wallet,
    authorizations,
    isLoading,
    onNavigate,
    onBuyOrder,
    isOwned,
    isOwner,
    hasInsufficientSPECIES
  } = props

  const [showAuthorizationModal, setShowAuthorizationModal] = useState(false)
  const [wantsToProceed, setWantsToProceed] = useState(false)

  const handleBuyOrder = useCallback(() => {
    onBuyOrder(order!, nft)
  }, [order, nft, onBuyOrder])

  if (!wallet) {
    return null
  }

  const contractNames = getContractNames()

  const species = getContract({
    name: contractNames.SPECIES,
    network: nft.network
  })

  // const marketplace = getContract({
  //   name:
  //     /*isPartner(nft.vendor)
  //     ? contractNames.MARKETPLACE_ADAPTER
  //     :*/ contractNames.MARKETPLACE,
  //   network: nft.network
  // })

  const authorization: Authorization = {
    address: wallet.address,
    // authorizedAddress: marketplace.address,
    authorizedAddress: species.address,
    contractAddress: species.address,
    contractName: ContractName.SPECIESToken,
    chainId: nft.chainId,
    type: AuthorizationType.APPROVAL
  }

  const handleToggleWantsToProceed = () => {
    setWantsToProceed(!wantsToProceed)
  }

  const handleSubmit = () => {
    if (true /*hasAuthorization(authorizations, authorization)*/) {
      handleBuyOrder()
    } else {
      setShowAuthorizationModal(true)
    }
  }

  const handleClose = () => setShowAuthorizationModal(false)

  const isDisabled = isOwned || isOwner || hasInsufficientSPECIES
  const name = <Name nft={nft} />

  let subtitle = null
  if (false /*!order*/) {
    subtitle = <T id={'buy_page.not_for_sale'} values={{ name }} />
  } else if (isOwned) {
    subtitle = <T id={'buy_page.owned'} values={{ name }} />
  } else if (isOwner) {
    subtitle = <T id={'buy_page.is_owner'} values={{ name }} />
  } else if (hasInsufficientSPECIES) {
    subtitle = (
      <T
        id={'buy_page.not_enough_species'}
        values={{
          name,
          amount: <Price network={nft.network} price={order? order.price : 'see next'} />
        }}
      />
    )
  } else {
    subtitle = (
      <T
        id={'buy_page.subtitle'}
        values={{
          name/*,
          amount: <Price network={nft.network} price={order? order.price : 'see next'}/>*/
        }}
      />
    )
  }

  return (
    <NFTAction nft={nft}>
      <Header size="large">
        {t('buy_page.title', {
          category: t(`kingdom.${nft.category.toLocaleLowerCase()}`)
        })}
      </Header>
      <div className={isDisabled ? 'error' : ''}>{subtitle}</div>
      <div className="buttons">
        <Button
          onClick={() =>
            onNavigate(locations.nft(nft.contractAddress, nft.tokenId))
          }
        >
          {t('global.cancel')}
        </Button>

        {isDisabled || wantsToProceed ? (
          <Button
            primary
            disabled={isDisabled || isLoading}
            onClick={handleSubmit}
            loading={isLoading}
          >
            {t('buy_page.buy')}
          </Button>
        ) : (
          <Button
            primary
            onClick={handleToggleWantsToProceed}
            loading={isLoading}
          >
            {t('buy_page.proceed_anyways')}
          </Button>
        )}
      </div>
      <AuthorizationModal
        open={showAuthorizationModal}
        authorization={authorization}
        onProceed={handleBuyOrder}
        onCancel={handleClose}
      />
    </NFTAction>
  )
}

const Name = (props: { nft: NFT }) => <b>{getNFTName(props.nft)}</b>

const Price = (props: { network?: Network; price: string }) => (
  <Species network={props.network} inline withTooltip>
    {formatSpecies(props.price)}
  </Species>
)

export default React.memo(BuyPage)
