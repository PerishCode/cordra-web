import { useEffect, useState } from 'react'
import { Select } from 'antd'
import { getObjectById, search } from '@/utils/request'
import { Icon } from '@/components'

const { Option } = Select

function Reference({ schema }) {
  const [options, setOptions] = useState<any>([])
  const [content, setContent] = useState(null)
  const id = schema.data

  useEffect(() => {
    id && getObjectById(id, 'full').then(({ type, content }) => setContent(content))
  }, [id])

  function updateHandler() {
    search(schema['__link__']).then(({ results }) => Array.isArray(results) && setOptions(results))
  }

  useEffect(() => {
    updateHandler()
  }, [])

  return (
    <span>
      <Select value={id} onChange={v => (schema.data = v)}>
        {options.map((o: any, i) => (
          <Option key={i} value={o.id}>
            {o.content.name || o.id}
          </Option>
        ))}
      </Select>
      {/* <Button onClick={updateHandler}>更新选项</Button> */}
      <Icon type="iconrefresh" onClick={updateHandler} />
    </span>
  )
}

Reference.withHooks = true

export default Reference
