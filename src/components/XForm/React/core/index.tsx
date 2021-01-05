import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import {
  reactive,
  observeGlobal,
  combine,
  unobserveGlobal,
} from '@/components/XForm/reactive/core'
import { CoreProps, XFormProps, XSchema } from './types'
import { __render__ } from './global'
import renders from '../renders'

export function core({ schema, addition, index }: CoreProps) {
  const combination = combine(schema, addition) as XSchema
  const renderKeys = combination['__render__']

  let unit: any = null
  if (Array.isArray(renderKeys))
    renderKeys.forEach((key, i) => {
      const render: any = renders[key] || renders['Void']
      unit =
        i + 1 !== renderKeys.length
          ? render({ schema: combination, index, children: unit })
          : React.createElement(
              render,
              { schema: combination, index, key: index },
              unit
            )
    })
  return unit
}

export default function XForm({ schema: initialSchema, onChange }: XFormProps) {
  const container = useRef()
  const reactionRef = useRef(null)

  function render() {
    const reaction = reactionRef.current
    onChange && onChange(reaction)
    reaction &&
      ReactDOM.render(core({ schema: reaction }), container.current as any)
  }

  useEffect(() => {
    observeGlobal(render)
    render()
    return () => unobserveGlobal(render)
  }, [])

  useEffect(() => {
    if (initialSchema !== null) reactionRef.current = reactive(initialSchema)
    render()
  }, [initialSchema])

  return React.createElement('div', {
    ref: container,
    className: 'XForm__root',
  })
}
