import { useEffect, useState } from 'react'
import { Collapse, message } from 'antd'
import { history } from 'umi'
import { Icon, Card, XForm } from '@/components'
import { deleteSchema, getAllSchemas } from '@/utils/request'
import { view } from '@/utils/augmenter'
import './index.sass'

const { Panel } = Collapse

const nativeTypes = new Set([
  'Document',
  'Schema',
  'User',
  'Group',
  'CordraDesign',
])

export default function Page() {
  const [schemas, setSchemas] = useState<any>([])

  useEffect(() => {
    getAllSchemas().then(res =>
      setSchemas(
        Object.keys(res)
          .filter(k => !nativeTypes.has(k))
          .map(k => [k, res[k]])
      )
    )
  }, [])

  function createClickHandler() {
    history.push('/object/new/' + this)
  }

  function editClickHandler() {
    history.push('/schema/' + this)
  }

  function deleteClickHandler() {
    deleteSchema(this).then(() => {
      message.success('删除成功', 1)
      setSchemas(schemas.filter(([k]) => k !== this))
    })
  }

  return (
    <div className="page schema-all container">
      <Card className="create">
        <Icon type="iconcreate" onClick={() => history.push('/schema/new')} />
      </Card>

      {schemas.map(([k, schema]) => (
        <Card
          title={k}
          key={k}
          className="schema"
          options={
            <>
              <Icon type="icontemplate" onClick={createClickHandler.bind(k)} />
              <Icon type="icondelete" onClick={deleteClickHandler.bind(k)} />
              <Icon type="iconedit" onClick={editClickHandler.bind(k)} />
            </>
          }
        >
          {/* <XForm schema={schema} transformer={view} /> */}
          <pre>{JSON.stringify(schema, null, 2)}</pre>
        </Card>
      ))}
    </div>
  )
}
