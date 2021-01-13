import { useEffect, useState } from 'react'
import { message, Table, Select } from 'antd'
import {
  createObjectByTypeName,
  deleteObjectById,
  getObjectById,
  getSchema,
  search,
  updateObjectById,
} from '@/utils/request'
import { Card, Icon } from '@/components'
import './index.sass'

const { Option } = Select

function Reference({ value, onChange }) {
  const [options, setOptions] = useState<any>([])
  const [content, setContent] = useState(null)
  const id = value

  useEffect(() => {
    id && getObjectById(id, 'full').then(({ content }) => setContent(content))
  }, [id])

  function updateHandler() {
    search({
      query: 'type:"Author"',
    }).then(({ results }) => Array.isArray(results) && setOptions(results))
  }

  useEffect(() => {
    updateHandler()
  }, [])

  return (
    <span>
      <Select value={id} onChange={onChange} showArrow={false}>
        {options.map((o: any, i) => (
          <Option key={i} value={o.id}>
            {o.content.name || o.id}
          </Option>
        ))}
      </Select>
      <Icon type="iconrefresh" onClick={updateHandler} />
    </span>
  )
}

export default function Page() {
  const [papers, setPapers] = useState<any>([])
  const [schema, setSchema] = useState<any>({})

  useEffect(() => {
    getSchema('Paper').then(schema =>
      search({
        query: 'type:"Paper"',
      }).then(({ results }) => {
        setPapers(results)
        setSchema(schema)
      })
    )
  }, [])

  function createHandler() {
    createObjectByTypeName('Paper', {}).then(res => {
      message.success('创建成功', 1)
      setPapers(papers.concat([res]))
    })
  }

  function deleteHandler(id) {
    deleteObjectById(id).then(() => {
      message.success('删除成功', 1)
      setPapers(papers.filter(a => a.id !== id))
    })
  }

  function saveHandler(index) {
    updateObjectById(papers[index].id, papers[index].content).then(() => {
      message.success('更新成功', 1)
    })
  }

  return (
    <div className="page paper container">
      <Card
        className="papers"
        title="论文管理"
        options={<Icon type="iconcreate" className="create" onClick={createHandler} />}
      >
        <Table
          className="preview"
          columns={[
            {
              title: '论文标题',
              dataIndex: 'title',
              render: (value, _, index) => (
                <input
                  value={value}
                  onChange={e => {
                    papers[index].content.title = e.target.value
                    setPapers(papers)
                  }}
                />
              ),
            },
            {
              title: 'DOI号',
              dataIndex: 'DOI',
              render: (value, _, index) => (
                <input
                  value={value}
                  onChange={e => {
                    papers[index].content.DOI = e.target.value
                    setPapers(papers)
                  }}
                />
              ),
            },
            {
              title: '第一作者',
              dataIndex: 'FirstAuthor',
              render: (value, _, index) => (
                <Reference
                  value={value}
                  onChange={v => {
                    papers[index].content.FirstAuthor = v
                    setPapers(papers)
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
          dataSource={papers.map(a => ({ ...a.content, key: a.id }))}
        />
      </Card>
    </div>
  )
}
