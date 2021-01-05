import React, { useState } from 'react'
import { JSONEditor, XForm, Card } from '@/components'
import { parseFormDataFromSchema } from '@/utils/transformer'
import { Button } from 'antd'
import './index.sass'
import { createSchema } from '@/utils/request'

export default function Page() {
  const [type, setType] = useState('')
  const [formData, setFormData] = useState(null)
  const [schema, setSchema] = useState({
    __render__: ['Array'],
    type: 'array',
    items: {
      __render__: ['Object', 'Option'],
      type: 'object',
      properties: {
        a: {
          __render__: ['Input'],
          type: 'string',
        },
      },
    },
    data: [
      {
        __render__: ['Object', 'Option'],
        type: 'object',
        properties: {
          a: {
            __render__: ['Input'],
            type: 'string',
          },
        },
      },
    ],
  })

  function createHandler() {
    createSchema(type, schema).then(console.log).catch(console.error)
  }

  return (
    <div className="page schema-new container">
      <Card
        title={
          <input
            className="type-input"
            value={type}
            onChange={e => setType(e.target.value)}
            placeholder="在此输入新建 Schema 名称"
          />
        }
        className="editor"
      >
        <JSONEditor
          mode="code"
          json={schema}
          onChange={setSchema}
          hideMenu={true}
        />
      </Card>
      <Card title="表单预览" className="preview-form">
        <XForm
          schema={schema}
          onChange={d => setFormData(parseFormDataFromSchema(d))}
        />
      </Card>
      <Card title="表单数据预览" className="preview-formdata">
        <JSONEditor mode="view" json={formData} />
      </Card>
      <Button className="create" onClick={createHandler}>
        确认创建
      </Button>
    </div>
  )
}
