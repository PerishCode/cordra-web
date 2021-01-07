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

export function Table({ schema, children }) {
  if (!Array.isArray(children)) return children
  return (
    <table className="XForm-Table">
      <thead>{headParser(schema)}</thead>
      <tbody>{children}</tbody>
    </table>
  )
}

export function TableRow({ schema, children, index }) {
  if (!Array.isArray(children)) return children

  return (
    <tr>
      {children.map((c, i) => (
        <td key={i}>{c}</td>
      ))}

      <td>
        <Button
          onClick={() => {
            schema.$.splice(
              index + 1,
              0,
              JSON.parse(JSON.stringify(schema.$.$.items))
            )
          }}
        >
          ADD
        </Button>
        <Button onClick={() => schema.$.splice(index, 1)}>DEL</Button>
      </td>
    </tr>
  )
}
