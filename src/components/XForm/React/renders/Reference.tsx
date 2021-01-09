import { useEffect, useState } from 'react'
import { Select, Button } from 'antd'
import { getObjectById, search } from '@/utils/request'

const { Option } = Select

function Reference({ schema }) {
  const [options, setOptions] = useState([])
  const [content, setContent] = useState(null)
  const id = schema.data

  useEffect(() => {
    id &&
      getObjectById(id, 'full').then(({ type, content }) => setContent(content))
  }, [id])

  function updateHandler() {
    search(schema['__link__']).then(({ results }) => setOptions(results))
  }

  useEffect(() => {
    updateHandler()
  }, [])

  return (
    <div>
      <Select value={id} onChange={v => (schema.data = v)}>
        {options.map((o: any, i) => (
          <Option key={i} value={o.id}>
            {o.id}
          </Option>
        ))}
      </Select>
      <Button onClick={updateHandler}>更新选项</Button>
    </div>
  )
}

Reference.withHooks = true

export default Reference
