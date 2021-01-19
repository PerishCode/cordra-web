import { Select as S } from 'antd'

const { Option } = S

export default function Select({ schema, index }) {
  const options = Array.isArray(schema.enum) ? schema.enum : []

  return (
    <S key={index} value={schema.data} onChange={v => (schema.data = v)}>
      {options.map(v => (
        <Option value={v} key={v}>
          {v}
        </Option>
      ))}
    </S>
  )
}
