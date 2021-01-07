import React, { useEffect, useState } from 'react'
import { Select, Button } from 'antd'
import { search } from '@/utils/request'

const { Option } = Select
function Reference({ schema, children }) {
  const [options, setOptions] = useState([])

  function updateHandler() {
    search(schema.parameters).then(({ results }) => setOptions(results))
  }

  useEffect(() => {
    updateHandler()
  }, [])

  return (
    <div>
      <Select onChange={v => (schema.data = v)}>
        {options.map((o: any, i) => (
          <Option key={i} value={o.id}>
            {o.id}
          </Option>
        ))}
      </Select>
      <Button onClick={updateHandler}>更新选项</Button>
      {children}
    </div>
  )
}

Reference.withHooks = true

export default Reference
