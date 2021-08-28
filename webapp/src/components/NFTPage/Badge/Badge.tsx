import React from 'react'
import { Props } from './Badge.types'
import './Badge.css'

const Badge = (props: Props) => {
  const { color, backgroundColor, className = '', children } = props
  return (
    <div
      className={`Badge ${className}`}
      style={{ backgroundColor: backgroundColor, color: color }}
    >
      {children}
    </div>
  )
}

export default React.memo(Badge)
