import React from 'react'
import { Link } from 'umi'
import './index.sass'

export default () => {
  return (
    <div className="title">
      <h1>主页</h1>
      <ul>
        <li>
          <Link to="/schema">Schema 查询/编辑</Link>
        </li>
        <li>
          <Link to="/document">Document 查询/编辑</Link>
        </li>
      </ul>
    </div>
  )
}
