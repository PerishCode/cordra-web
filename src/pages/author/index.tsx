import { useEffect, useState } from 'react'
import { message, Table, Select } from 'antd'
import { createObjectByTypeName, deleteObjectById, getSchema, search, updateObjectById } from '@/utils/request'
import { Card, Icon } from '@/components'
import './index.sass'

const { Option } = Select

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

  const columns = Object.keys(schema?.properties || {})
    .filter(k => k !== 'id')
    .map(k => ({
      title: schema.properties[k].title,
      dataIndex: k,
      render: (value, _, index) =>
        schema.properties[k].enum ? (
          <Select
            key={index}
            value={value}
            onChange={v => {
              authors[index].content[k] = v
              setAuthors(Array.from(authors))
            }}
            showArrow={false}
          >
            {schema.properties[k].enum.map(v => (
              <Option value={v} key={v}>
                {v}
              </Option>
            ))}
          </Select>
        ) : (
          <input
            value={value}
            onChange={e => {
              authors[index].content[k] = e.target.value
              setAuthors(Array.from(authors))
            }}
          />
        ),
    }))

  const dataSource = authors.map(a => ({ ...a.content, key: a.id }))

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
            ...columns,
            {
              title: '操作',
              render: (_, record, index) => (
                <>
                  <Icon
                    type="iconshanchu"
                    onClick={() => {
                      console.log(record.key)
                      deleteHandler(record.key)
                    }}
                  />
                  <Icon type="iconyishen" onClick={() => saveHandler(index)} />
                </>
              ),
            },
          ]}
          dataSource={dataSource}
        />
      </Card>
    </div>
  )
}
