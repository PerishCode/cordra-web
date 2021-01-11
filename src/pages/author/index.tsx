import { useEffect, useState } from 'react'
import { createObjectByTypeName, deleteObjectById, getSchema, search } from '@/utils/request'
import { combineFormDataAndSchema } from '@/utils/transformer'
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
    createObjectByTypeName('Author', {}).then(res => setAuthors(authors.concat([res])))
  }

  function deleteHandler() {
    deleteObjectById(this).then(() => setAuthors(authors.filter(a => a.id !== this)))
  }

  return (
    <div className="page author container">
      <Card className="authors" title="作者管理">
        <Card className="thumbnail create">
          <Icon type="iconcreate" onClick={createHandler} />
        </Card>
        {authors.map(a => (
          <Card
            title={a.id}
            key={a.id}
            className="thumbnail"
            options={
              <>
                <Icon type="iconedit" />
                <Icon type="icondelete" onClick={deleteHandler.bind(a.id)} />
              </>
            }
          >
            <XForm schema={combineFormDataAndSchema(schema, a.content)} />
          </Card>
        ))}
      </Card>
    </div>
  )
}
