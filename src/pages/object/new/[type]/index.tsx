import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { Card, JSONEditor, XForm } from '@/components'
import { parseFormDataFromSchema } from '@/utils/transformer'
import {
  createObjectByTypeName,
  getSchemaByTypeName,
  updateSchema,
} from '@/utils/request'
import './index.sass'
import { history } from 'umi'

export default function Page({
  match: {
    params: { type },
  },
}) {
  const [formData, setFormData] = useState(null)
  const [schema, setSchema] = useState(null)

  function createHandler() {
    createObjectByTypeName(type, formData)
      .then(({ id }) => history.push('/object/' + id.replaceAll('/', '.')))
      .catch(console.error)
  }

  useEffect(() => {
    getSchemaByTypeName(type).then(setSchema)
  }, [])

  return (
    <div className="page object-new container">
      <Card title="表单填写" className="form">
        <XForm
          schema={schema}
          onChange={d => setFormData(parseFormDataFromSchema(d))}
        />
      </Card>
      <Card title="表单数据预览" className="formdata">
        <JSONEditor mode="view" json={formData} />
      </Card>
      <Button className="create" onClick={createHandler}>
        创建
      </Button>
    </div>
  )
}
