import React, { useEffect } from 'react'
import { namespace } from './model'
import { connect } from 'umi'

export default connect(({ [namespace]: model }: any) => ({ model }))(Page)

function Page(props: any) {
  const { model, dispatch } = props

  useEffect(() => {
    dispatch({
      type: namespace + '/save',
      haha: 'this is the payload',
    })
  }, [])

  return <div className="page document-edit container">document 编辑</div>
}
