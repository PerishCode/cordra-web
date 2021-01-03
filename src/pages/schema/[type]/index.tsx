import React from 'react'
import { namespace } from '../model'
import { connect } from 'umi'

export default connect(({ [namespace]: model }: any) => ({ model }))(Page)

function Page(props: any) {
  const {
    match: {
      params: { type },
    },
    model,
  } = props

  console.log(type)

  return (
    <div className="page schema-single container">
      单页 Schema 编辑
      <pre>{JSON.stringify(model)}</pre>
    </div>
  )
}
