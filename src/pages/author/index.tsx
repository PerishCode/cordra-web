import { useEffect, useState } from 'react'
import { createObjectByTypeName, deleteObjectById, search } from '@/utils/request'
import {} from '@/utils/transformer'
import { Card, Icon } from '@/components'
import './index.sass'

// function MiniForm({ author: { id, content }, onSave }) {
//   const [editable, setEditable] = useState(false)

//   return (
//     <Card title={id} className="thumbnail" options={editable ? <Icon type="iconsave" /> : <Icon type="iconedit" />}>
//       {/* {JSON.stringify(a)} */}
//       {/* {id} */}
//       {JSON.stringify(content)}
//     </Card>
//   )
// }

export default function Page() {
  const [authors, setAuthors] = useState<any>([])

  useEffect(() => {
    search({
      query: 'type:"Author"',
    }).then(({ results }) => setAuthors(results))
  }, [])

  function createHandler() {
    createObjectByTypeName('Author', {}).then(res => setAuthors(authors.concat([res])))
  }

  function deleteHandler() {
    deleteObjectById(this).then(res => setAuthors(authors.filter(a => a.id !== this)))
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
            {JSON.stringify(a.content)}
          </Card>
        ))}
      </Card>
    </div>
  )
}
