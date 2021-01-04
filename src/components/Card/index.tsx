import React from 'react'
import './index.sass'

export default function Card({ title, children, className = '' }) {
  return (
    <div className={'card ' + className}>
      <div className="title">{title}</div>
      <div className="body">{children}</div>
    </div>
  )
}
