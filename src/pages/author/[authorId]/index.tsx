import { useEffect, useState } from 'react'
import { message } from 'antd'
import { Card, Icon, XForm } from '@/components'
import { getObjectById, getSchema, updateObjectById } from '@/utils/request'
import { combineFormDataAndSchema, parseFormDataFromSchema } from '@/utils/transformer'
import augmenter from './_augmenter'
import './index.sass'

export default function Page({
  match: {
    params: { authorId },
  },
}) {
  const realId = authorId.replaceAll('.', '/')
  const [formData, setFormData] = useState<any>(null)
  const [schema, setSchema] = useState<any>(null)

  useEffect(() => {
    getObjectById(realId, 'full').then(({ type, content }) =>
      getSchema(type)
        .then(augmenter)
        .then(result => setSchema(combineFormDataAndSchema(result, content)))
    )
  }, [])

  function saveHandler() {
    updateObjectById(realId, formData)
      .then(() => message.success('保存成功', 1))
      .catch(console.error)
  }

  return (
    <div className="page author-single container">
      <Card title="作者信息管理" className="management" options={<Icon type="iconsave" onClick={saveHandler} />}>
        <XForm schema={schema} onChange={d => setFormData(parseFormDataFromSchema(d))} />
      </Card>
    </div>
  )
}
