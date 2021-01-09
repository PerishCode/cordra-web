import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { getObjectById, getSchema, updateObjectById } from '@/utils/request'
import {
  combineFormDataAndSchema,
  parseFormDataFromSchema,
} from '@/utils/transformer'
import { edit } from '@/utils/augmenter'
import { XForm, Card, JSONEditor, Icon } from '@/components'
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
      getSchema(type)
        .then(edit)
        .then(result => setSchema(combineFormDataAndSchema(result, content)))
    )
  }, [])

  function storeHandler() {
    updateObjectById(actualId, formData)
      .then(() => message.success('保存成功', 1))
      .catch(console.error)
  }

  return (
    <div className="page object-single container">
      <Card
        title="表单填写"
        className="form"
        options={
          <Icon className="store" type="iconsave" onClick={storeHandler} />
        }
      >
        <XForm
          schema={schema}
          onChange={d => setFormData(parseFormDataFromSchema(d))}
        />
      </Card>
      <Card title="表单数据预览" className="formdata">
        <JSONEditor mode="view" json={formData} />
      </Card>
    </div>
  )
}
