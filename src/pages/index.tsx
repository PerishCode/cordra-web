import React from 'react'
import { Link } from 'umi'
import './index.sass'

export default () => {
  return (
    <div className="title">
      <h1>主页</h1>
      <ul>
        <li>
          <Link to="/schema">Schema</Link>
        </li>
        <li>
          <Link to="/object">数字对象</Link>
        </li>
      </ul>
    </div>
  )
}
