import React from 'react'
import { Icon } from '@/components'
import './index.sass'
import { history } from 'umi'

export default function ({ children }) {
  return (
    <div className="layout">
      <div className="navigator">
        <Icon type="iconedit" onClick={() => history.push('/schema')} />
        <Icon type="iconedit" onClick={() => history.push('/object')} />
      </div>
      <div className="content">{children}</div>
    </div>
  )
}
