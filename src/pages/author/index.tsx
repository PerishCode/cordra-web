import { useEffect, useState } from 'react'
import { message, Table } from 'antd'
import { createObjectByTypeName, deleteObjectById, getSchema, search, updateObjectById } from '@/utils/request'
import { Card, Icon } from '@/components'
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

  function deleteHandler(id) {
    deleteObjectById(id).then(() => {
      message.success('删除成功', 1)
      setAuthors(authors.filter(a => a.id !== id))
    })
  }

  function saveHandler(index) {
    updateObjectById(authors[index].id, authors[index].content).then(() => {
      message.success('更新成功', 1)
    })
  }

  return (
    <div className="page author container">
      <Card
        className="authors"
        title="作者管理"
        options={<Icon type="iconcreate" className="create" onClick={createHandler} />}
      >
        <Table
          className="preview"
          columns={[
            {
              title: '姓名',
              dataIndex: 'name',
              render: (value, _, index) => (
                <input
                  value={value}
                  onChange={e => {
                    authors[index].content.name = e.target.value
                    setAuthors(authors)
                  }}
                />
              ),
            },
            {
              title: '单位',
              dataIndex: 'organization',
              render: (value, _, index) => (
                <input
                  value={value}
                  onChange={e => {
                    authors[index].content.organization = e.target.value
                    setAuthors(authors)
                  }}
                />
              ),
            },
            {
              title: '操作',
              render: (_, record, index) => (
                <>
                  <Icon type="iconshanchu" onClick={() => deleteHandler(record.key)} />
                  <Icon type="iconyishen" onClick={() => saveHandler(index)} />
                </>
              ),
            },
          ]}
          dataSource={authors.map(a => ({ ...a.content, key: a.id }))}
        />
      </Card>
    </div>
  )
}
