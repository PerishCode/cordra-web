import React, { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import { Card, JSONEditor, XForm } from '@/components'
import { parseFormDataFromSchema, schemaEnlarge } from '@/utils/transformer'
import { getSchemaByTypeName, updateSchema } from '@/utils/request'
import './index.sass'

export default function Page({
  match: {
    params: { type },
  },
}) {
  const [formData, setFormData] = useState(null)
  const [schema, setSchema] = useState(null)

  function storeHandler() {
    updateSchema(type, schema).then(() => message.success('保存成功', 1))
  }

  useEffect(() => {
    getSchemaByTypeName(type).then(setSchema)
  }, [])

  return (
    <div className="page schema-single container">
      <Card title={type} className="editor">
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
      <Button className="store" onClick={storeHandler}>
        保存
      </Button>
    </div>
  )
}
