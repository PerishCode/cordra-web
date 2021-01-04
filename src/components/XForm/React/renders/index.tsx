import React from 'react'
import Reference from './Reference'
import Preview from './Preview'
import { core } from '../core'

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
  Reference,
  Preview,
}

export default renders
