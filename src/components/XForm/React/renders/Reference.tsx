import React from 'react'
import { search } from '@/utils/request'
import core from '../core'

export default function Reference({ schema }) {
  return (
    <div
      onClick={() => {
        search({
          query: schema.query,
        }).then(res => {
          console.log(res)
        })
      }}
    >
      当前值： {schema.data}
    </div>
  )
}
