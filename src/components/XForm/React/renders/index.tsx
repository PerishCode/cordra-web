import { Button } from 'antd'
import Reference from './Reference'
import Table from './Table'
import Input from './Input'
import Label from './Label'
import Format from './Format'
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
  Array: ({ schema: { data } }) => {
    return Array.isArray(data) ? data.map((d, index) => core({ schema: d, index })) : null
  },
  Default: ({ schema, children }) => {
    const { data, items } = schema
    if (Array.isArray(data) && data.length) return children
    return (
      <Button
        onClick={() => {
          schema.data = [JSON.parse(JSON.stringify(items))]
        }}
      >
        新增
      </Button>
    )
  },
  Void: () => null,
  Input,
  Label,
  Reference,
  Format,
  Table,
  Preview,
}

export default renders
