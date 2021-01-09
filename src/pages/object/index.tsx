import { useState } from 'react'
import { message } from 'antd'
import { history } from 'umi'
import { Card, Icon, JSONEditor } from '@/components'
import { deleteObjectById, search } from '@/utils/request'
import './index.sass'

export default function Page() {
  const [hide, setHide] = useState(false)
  const [objects, setObjects] = useState<any>([])
  const [query, setQuery] = useState({
    query: 'type:"Author"',
  })

  function searchHandler() {
    search(query).then(({ results }) => setObjects(results))
  }

  function editHandler() {
    history.push('/object/' + this.replaceAll('/', '.'))
  }

  function deleteHandler() {
    deleteObjectById(this).then(() => {
      message.success('删除成功', this)
      setObjects(objects.filter(o => o.id !== this))
    })
  }

  return (
    <div className={`page object container ${hide ? 'hide' : ''}`}>
      <Card
        title="查询语句"
        className="query"
        options={
          <Icon type="iconsearch" className="search" onClick={searchHandler} />
        }
      >
        <JSONEditor mode="code" json={query} onChange={setQuery} hideMenu />
      </Card>
      <Card
        title={<div onClick={() => setHide(!hide)}>查询结果</div>}
        className="result"
      >
        {objects.map((o, i) => (
          <Card
            key={i}
            title={o.content.name || o.id}
            options={
              <>
                <Icon type="iconedit" onClick={editHandler.bind(o.id)} />
                <Icon type="icondelete" onClick={deleteHandler.bind(o.id)} />
              </>
            }
          >
            <pre className="preview">{JSON.stringify(o.content, null, 2)}</pre>
          </Card>
        ))}
      </Card>
    </div>
  )
}
