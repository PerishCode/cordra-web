import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import {
  reactive,
  observeGlobal,
  combine,
  unobserveGlobal,
} from '@/components/XForm/reactive/core'
import { CoreProps, XFormProps, XSchema } from './types'
import renders from '../renders'

export function core({ schema, addition, index }: CoreProps) {
  const combination = combine(schema, addition) as XSchema
  const renderKeys = combination['__render__']

  let unit: any = null
  if (Array.isArray(renderKeys))
    renderKeys.forEach((key, i) => {
      const render: any = renders[key] || renders['Void']
      unit = !render['withHooks']
        ? render({ schema: combination, index, children: unit })
        : React.createElement(
            render,
            { schema: combination, index, key: index },
            unit
          )
    })

  return unit
}

export default function XForm({
  schema: initialSchema,
  onChange,
  transformer,
}: XFormProps) {
  const container = useRef()
  const reactionRef = useRef(null)

  function render(source = null) {
    if (source) reactionRef.current = reactive(source as any)
    const reaction = reactionRef.current

    onChange && onChange(reaction)
    reaction &&
      ReactDOM.render(core({ schema: reaction }), container.current as any)
  }

  useEffect(() => {
    const emptyRender = () => render()
    observeGlobal(emptyRender)
    render()
    return () => unobserveGlobal(emptyRender)
  }, [])

  useEffect(() => {
    if (initialSchema !== null) {
      let actualSchema = JSON.parse(JSON.stringify(initialSchema))
      if (transformer) transformer(actualSchema).then(render)
      else render(actualSchema)
    }
  }, [initialSchema, transformer])

  return React.createElement('div', {
    ref: container,
    className: 'XForm__root',
  })
}
