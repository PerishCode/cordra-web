import { useEffect, useState } from 'react'
import { message } from 'antd'
import { Card, Icon, JSONEditor, XForm } from '@/components'
import { parseFormDataFromSchema } from '@/utils/transformer'
import { edit } from '@/utils/augmenter'
import { getSchema, updateSchema } from '@/utils/request'
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
    getSchema(type).then(setSchema)
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
      <Card
        title="表单预览"
        className="preview-form"
        options={
          <Icon type="iconsave" className="store" onClick={storeHandler} />
        }
      >
        <XForm
          schema={schema}
          onChange={d => setFormData(parseFormDataFromSchema(d))}
          transformer={edit}
        />
      </Card>
      <Card title="表单数据预览" className="preview-formdata">
        <JSONEditor mode="view" json={formData} />
      </Card>
    </div>
  )
}
