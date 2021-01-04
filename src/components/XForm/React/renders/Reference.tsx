import React, { useEffect, useState } from 'react'
import { search } from '@/utils/request'
import { Select, Button } from 'antd'
import core from '../core'

const { Option } = Select

export default function Reference({ schema, children }) {
  const [options, setOptions] = useState([])

  function updateHandler() {
    const { query } = schema

    search(query).then(({ results }) => setOptions(results))
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
