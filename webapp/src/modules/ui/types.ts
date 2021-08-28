export const View = {
  MARKET: 'market',
  ACCOUNT: 'account',
  HOME_ANIMALIA: 'home_animalia',
  HOME_ARCHAEA: 'home_archaea',
  HOME_BACTERIA: 'home_bacteria',
  HOME_PLANTAE: 'home_plantae',
  HOME_PROTOZOA: 'home_protozoa',
  HOME_FUNGI: 'home_fungi',
  HOME_CHROMISTA: 'home_chromista',
  HOME_VIRUSES: 'home_viruses',
  HOME_ENS: 'home_ens',
  LOAD_MORE: 'load_more',
  ATLAS: 'atlas'
} as const

export type View = typeof View[keyof typeof View]
