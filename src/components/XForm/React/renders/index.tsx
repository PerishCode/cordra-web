import React, { useEffect } from 'react'
import { Button } from 'antd'
import Reference from './Reference'
import Preview from './Preview'
import Test from './Test'
import { core } from '../core'
import './index.sass'

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
  Array: ({ schema: { data } }) => {
    return Array.isArray(data)
      ? data.map((d, index) => core({ schema: d, index }))
      : null
  },
  Default: ({ schema, children, index }) => {
    const { data, items } = schema
    if (Array.isArray(data) && data.length) return children
    return (
      <Button
        onClick={() => {
          schema.data = [JSON.parse(JSON.stringify(items))]
        }}
      >
        ADD
      </Button>
    )
  },

  Option: ({ schema, children, index }) => (
    <div>
      {children}
      <Button
        onClick={() => {
          schema.$.splice(
            index + 1,
            0,
            JSON.parse(JSON.stringify(schema.$.$.items))
          )
        }}
      >
        ADD
      </Button>
      <Button onClick={() => schema.$.splice(index, 1)}>DEL</Button>
    </div>
  ),
  Info: ({ schema }) => <div>{JSON.stringify(schema)}</div>,
  Input: ({ schema }) => (
    <input
      value={schema.data || ''}
      onChange={e => (schema.data = e.target.value)}
    />
  ),
  Label: ({ children, schema: { title } }) => (
    <div className="XForm-Label">
      <span className="title">{title}</span>
      <span className="content">{children}</span>
    </div>
  ),
  Void: () => null,
  Reference,
  Preview,
  Test,
}

export default renders
