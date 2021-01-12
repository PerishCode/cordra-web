import { useEffect, useState } from 'react'
import { message } from 'antd'
import { history } from 'umi'
import { createObjectByTypeName, deleteObjectById, getSchema, search } from '@/utils/request'
import { combineFormDataAndSchema } from '@/utils/transformer'
import { view } from '@/utils/augmenter'
import { Card, Icon, XForm } from '@/components'
import './index.sass'

export default function Page() {
  const [authors, setAuthors] = useState<any>([])
  const [schema, setSchema] = useState<any>({})

  useEffect(() => {
    getSchema('Author').then(schema =>
      search({
        query: 'type:"Author"',
      }).then(({ results }) => {
        setAuthors(results)
        setSchema(schema)
      })
    )
  }, [])

  function createHandler() {
    createObjectByTypeName('Author', {}).then(res => {
      message.success('创建成功', 1)
      setAuthors(authors.concat([res]))
    })
  }

  function deleteHandler() {
    deleteObjectById(this).then(() => {
      message.success('删除成功', 1)
      setAuthors(authors.filter(a => a.id !== this))
    })
  }

  function editHandler() {
    history.push('/author/' + this.replaceAll('/', '.'))
  }

  return (
    <div className="page author container">
      <Card className="authors" title="作者管理">
        <Card className="thumbnail create">
          <Icon type="iconcreate" onClick={createHandler} />
        </Card>
        {authors.map(a => (
          <Card
            title={a.content.name || a.id}
            key={a.id}
            className="thumbnail"
            options={
              <>
                <Icon type="iconedit" onClick={editHandler.bind(a.id)} />
                <Icon type="icondelete" onClick={deleteHandler.bind(a.id)} />
              </>
            }
          >
            <XForm
              schema={combineFormDataAndSchema(JSON.parse(JSON.stringify(schema)), a.content)}
              transformer={view}
            />
            {/* <pre>{JSON.stringify(combineFormDataAndSchema(schema, a.content), null, 2)}</pre> */}
          </Card>
        ))}
      </Card>
    </div>
  )
}
