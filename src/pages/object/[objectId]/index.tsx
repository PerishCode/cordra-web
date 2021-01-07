import React, { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import {
  getObjectById,
  getSchemaByTypeName,
  updateObjectById,
} from '@/utils/request'
import {
  combineFormDataAndSchema,
  parseFormDataFromSchema,
  schemaEnlarge,
} from '@/utils/transformer'
import { XForm, Card, JSONEditor } from '@/components'
import './index.sass'

export default function Page({
  match: {
    params: { objectId },
  },
}) {
  const [schema, setSchema] = useState(null)
  const [formData, setFormData] = useState(null)

  const actualId = objectId.replaceAll('.', '/')

  useEffect(() => {
    getObjectById(actualId, 'full').then(({ type, content }) =>
      getSchemaByTypeName(type).then(schema =>
        setSchema(combineFormDataAndSchema(schemaEnlarge(schema), content))
      )
    )
  }, [])

  function storeHandler() {
    updateObjectById(actualId, formData).then(() =>
      message.success('保存成功', 1)
    )
  }

  return (
    <div className="page object-single container">
      <Card title="表单填写" className="form">
        <XForm
          schema={schema}
          onChange={d => setFormData(parseFormDataFromSchema(d))}
          // transformer={}
        />
      </Card>
      <Card title="表单数据预览" className="formdata">
        <JSONEditor mode="view" json={formData} />
      </Card>
      <Button className="store" onClick={storeHandler}>
        保存
      </Button>
    </div>
  )
}
