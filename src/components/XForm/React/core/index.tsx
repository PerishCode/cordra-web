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
import schema from '@/pages/schema'

let renders = {
  Object: ({ schema: { properties } }) => {
    let result: any[] = []

    Object.keys(properties).forEach(k => {
      const children = core({ schema: properties[k], index: k }) as any
      if (Array.isArray(children)) result = result.concat(children)
      else result.push(children)
    })

    return result
  },
  Array: ({ schema: { template, items } }) =>
    items.map((item, index) =>
      core({ schema: template, addition: item, index })
    ),

  Info: ({ schema }) => <div>{JSON.stringify(schema)}</div>,
  Input: ({ schema }) => (
    <input value={schema.data} onChange={e => (schema.data = e.target.value)} />
  ),
  Void: () => null,
}

export function registerRender(addition) {
  renders = {
    ...renders,
    ...addition,
  }
}

export function core({ schema, addition, index }: CoreProps) {
  const combination = combine(schema, addition) as XSchema
  const renderKeys = combination['__render__']

  let unit: any = null
  renderKeys?.forEach((key, i) => {
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

  function render() {
    const reaction = reactive(initialSchema)
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
    render()
  }, [initialSchema])

  return React.createElement('div', {
    ref: container,
    className: 'XForm__root',
  })
}
