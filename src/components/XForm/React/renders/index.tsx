import React from 'react'
import Reference from './Reference'
import Preview from './Preview'
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
  Array: ({ schema: { template, items } }) =>
    items.map((item, index) =>
      core({ schema: template, addition: item, index })
    ),

  Info: ({ schema }) => <div>{JSON.stringify(schema)}</div>,
  Input: ({ schema }) => (
    <input value={schema.data} onChange={e => (schema.data = e.target.value)} />
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
}

export default renders
