import React, { useState } from 'react'
import { message } from 'antd'
import { history } from 'umi'
import { JSONEditor, XForm, Card, Icon } from '@/components'
import { parseFormDataFromSchema } from '@/utils/transformer'
import { createSchema } from '@/utils/request'
import edit from '../_augmenter'
import './index.sass'

export default function Page() {
  const [type, setType] = useState('')
  const [formData, setFormData] = useState(null)
  const [schema, setSchema] = useState({
    type: 'object',
    properties: {
      DOI: {
        type: 'string',
      },
      FirstAuthor: {
        type: 'string',
        __link__: {
          query: 'type:"Author"',
        },
      },
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
        <JSONEditor mode="code" json={schema} onChange={setSchema} hideMenu={true} />
      </Card>
      <Card title="表单数据预览" className="preview-formdata">
        <JSONEditor mode="view" json={formData} />
      </Card>
      <Card
        title="表单预览"
        className="preview-form"
        options={<Icon type="icontemplate" className="create" onClick={createHandler} />}
      >
        <XForm schema={schema} onChange={d => setFormData(parseFormDataFromSchema(d))} transformer={edit} />
      </Card>
    </div>
  )
}
