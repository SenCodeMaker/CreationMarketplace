import React from 'react'
import { FooterProps, Locale } from 'decentraland-ui'
import { BaseFooter } from './BaseFooter/BaseFooter'
import * as tranlsations from '../../modules/translation/locales'

const locales = Object.keys(tranlsations) as Locale[]

const Footer = (props: FooterProps) => (
  <BaseFooter locales={locales} {...props} />
)

export default React.memo(Footer)
