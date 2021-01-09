import { useEffect, useState } from 'react'
import { history } from 'umi'
import { Card, Icon, JSONEditor, XForm } from '@/components'
import { parseFormDataFromSchema } from '@/utils/transformer'
import { edit } from '@/utils/augmenter'
import { createObjectByTypeName, getSchema } from '@/utils/request'
import './index.sass'

export default function Page({
  match: {
    params: { type },
  },
}) {
  const [formData, setFormData] = useState(null)
  const [schema, setSchema] = useState(null)

  useEffect(() => {
    getSchema(type).then(setSchema)
  }, [])

  function createHandler() {
    createObjectByTypeName(type, formData)
      .then(({ id }) => history.push('/object/' + id.replaceAll('/', '.')))
      .catch(console.error)
  }

  return (
    <div className="page object-new container">
      <Card
        title="表单填写"
        className="form"
        options={
          <Icon
            type="icontemplate"
            className="create"
            onClick={createHandler}
          />
        }
      >
        <XForm
          schema={schema}
          onChange={d => setFormData(parseFormDataFromSchema(d))}
          transformer={edit}
        />
      </Card>
      <Card title="表单数据预览" className="formdata">
        <JSONEditor mode="view" json={formData} />
      </Card>
    </div>
  )
}
