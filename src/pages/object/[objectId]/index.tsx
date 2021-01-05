import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import {
  getObjectById,
  getSchemaByTypeName,
  updateObjectById,
} from '@/utils/request'
import {
  combineFormDataAndSchema,
  parseFormDataFromSchema,
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
        setSchema(combineFormDataAndSchema(schema, content))
      )
    )
  }, [])

  function storeHandler() {
    updateObjectById(actualId, formData)
  }

  return (
    <div className="page object-single container">
      <Card title="表单填写" className="form">
        <XForm
          schema={schema}
          onChange={d => setFormData(parseFormDataFromSchema(d))}
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
