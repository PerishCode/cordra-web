import React, { useState } from 'react'
import { JSONEditor, XForm } from '@/components'
import './index.sass'
import { transformer } from '@/utils/transformer'

export default function Page() {
  const [type, setType] = useState('')

  const [schema, setSchema] = useState({
    __render__: ['Object'],
    properties: {
      a: {
        __render__: ['Reference'],
        query: 'type:"Author"',
      },
    },
  })

  const [formData, setFormData] = useState(null)

  return (
    <div className="page schema-new container">
      <div className="card editor">
        <div className="title">
          <input
            type="text"
            className="type-input"
            value={type}
            onChange={e => setType(e.target.value)}
            placeholder="在此输入新建 Schema 名称"
          />
        </div>
        <div className="body">
          <JSONEditor
            mode="code"
            json={schema}
            onChange={j => setSchema(j)}
            hideMenu={true}
          />
        </div>
      </div>
      <div className="card preview-form">
        <div className="title">表单预览</div>
        <div className="body">
          <XForm schema={schema} onChange={d => setFormData(transformer(d))} />
        </div>
      </div>
      <div className="card preview-formdata">
        <div className="title">表单数据预览</div>
        <div className="body">
          <JSONEditor mode="view" json={formData} />
        </div>
      </div>
    </div>
  )
}
