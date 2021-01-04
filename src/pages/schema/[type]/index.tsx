import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { Card, JSONEditor, XForm } from '@/components'
import { transformer } from '@/utils/transformer'
import './index.sass'
import { getSchemaByTypeName } from '@/utils/request'

export default function Page({
  match: {
    params: { type },
  },
}) {
  const [formData, setFormData] = useState(null)
  const [schema, setSchema] = useState(null)

  function storeHandler() {}

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
        <XForm schema={schema} onChange={d => setFormData(transformer(d))} />
      </Card>
      <Card title="表单数据预览" className="preview-formdata">
        {/* <JSONEditor mode="view" json={formData} /> */}
      </Card>
      <Button className="store" onClick={storeHandler}>
        保存
      </Button>
    </div>
  )
}
