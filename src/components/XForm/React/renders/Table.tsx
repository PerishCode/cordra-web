import React from 'react'
import { Button } from 'antd'

function headParser(schema) {
  const {
    items: { properties },
  } = schema

  let rows: any = [[]]

  Object.keys(properties).forEach(k => {
    rows[0].push(properties[k].title || k)
  })

  rows[0].push('选项')

  return [
    rows.map((row, i) => (
      <tr key={i}>
        {row.map(cell => (
          <th key={cell}>{cell}</th>
        ))}
      </tr>
    )),
  ]
}

export default function Table({ schema, children }) {
  if (!Array.isArray(children)) return children
  return (
    <table className="XForm-Table">
      <thead>{headParser(schema)}</thead>
      <tbody>
        {children.map((row, index) => (
          <tr key={index}>
            {row.map((cell, j) => (
              <td key={j}>{cell}</td>
            ))}
            <td>
              <Button
                onClick={() => {
                  schema.data.splice(
                    index + 1,
                    0,
                    JSON.parse(JSON.stringify(schema.items))
                  )
                }}
              >
                +
              </Button>
              <Button onClick={() => schema.data.splice(index, 1)}>-</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
