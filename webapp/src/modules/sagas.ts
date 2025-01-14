import { all } from 'redux-saga/effects'
import { createAnalyticsSaga } from 'decentraland-dapps/dist/modules/analytics/sagas'
import { transactionSaga } from 'decentraland-dapps/dist/modules/transaction/sagas'
import { createProfileSaga } from 'decentraland-dapps/dist/modules/profile/sagas'
import { authorizationSaga } from 'decentraland-dapps/dist/modules/authorization/sagas'

import { bidSaga } from './bid/sagas'
import { nftSaga } from './nft/sagas'
import { orderSaga } from './order/sagas'
import { routingSaga } from './routing/sagas'
import { translationSaga } from './translation/sagas'
import { uiSaga } from './ui/sagas'
import { walletSaga } from './wallet/sagas'

const analyticsSaga = createAnalyticsSaga()
const profileSaga = createProfileSaga({
  peerUrl: process.env.REACT_APP_PEER_URL!
})

export function* rootSaga() {
  yield all([
    analyticsSaga(),
    transactionSaga(),
    authorizationSaga(),
    bidSaga(),
    nftSaga(),
    orderSaga(),
    profileSaga(),
    routingSaga(),
    translationSaga(),
    uiSaga(),
    walletSaga()
  ])
}
