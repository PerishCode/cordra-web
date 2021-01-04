import { getObjectById, getSchemaByTypeName } from '@/utils/request'
import React, { useEffect, useState } from 'react'
import { core } from '../core'

export default function Preview({ schema: { data: id } }) {
  const [schema, setSchema] = useState({})

  useEffect(() => {
    id &&
      getObjectById(id, 'full').then(({ type, content }) => {
        getSchemaByTypeName(type).then(setSchema)
      })
  }, [id])

  //   return <div>{core({ schema })}</div>
  return <div>{JSON.stringify(schema)}</div>
}
