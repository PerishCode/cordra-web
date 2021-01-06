import React, { useState } from 'react'
import { Button } from 'antd'
import { connect, history } from 'umi'
import { Card, Icon, JSONEditor } from '@/components'
import { namespace } from './model'
import './index.sass'
import url from '*.svg'

export default connect(({ [namespace]: model }: any) => ({ model }))(Page)

function Page({ model: objects, dispatch }) {
  const [query, setQuery] = useState({
    query: 'type:"Test"',
  })

  function searchHandler() {
    dispatch({
      type: namespace + '/search',
      query,
    })
  }

  function editHandler() {
    history.push('/object/' + this.replaceAll('/', '.'))
  }

  return (
    <div className="page object container">
      <Card title="查询语句" className="query">
        <JSONEditor mode="code" json={query} onChange={setQuery} hideMenu />
        <Button className="search" onClick={searchHandler}>
          查询
        </Button>
      </Card>
      <Card title="查询结果" className="result">
        {objects.map((o, i) => (
          <Card key={i} title={o.id}>
            {JSON.stringify(o.content, null, 2)}
            <Icon
              className="edit"
              type="iconedit"
              onClick={editHandler.bind(o.id)}
            />
          </Card>
        ))}
      </Card>
    </div>
  )
}
