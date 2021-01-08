import React, { useState } from 'react'
import { Button, message } from 'antd'
import { history } from 'umi'
import { JSONEditor, XForm, Card } from '@/components'
import { parseFormDataFromSchema, schemaEnlarge } from '@/utils/transformer'
import { createSchema } from '@/utils/request'
import './index.sass'

export default function Page() {
  const [type, setType] = useState('')
  const [formData, setFormData] = useState(null)
  const [schema, setSchema] = useState({
    __render__: 'Table',
    type: 'array',
    items: {
      $ref: 'dingling',
    },
  })

  function createHandler() {
    createSchema(type, schema)
      .then(() => history.push('/schema/' + type))
      .catch(err => message.error(err.message, 1))
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
          transformer={schemaEnlarge}
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
