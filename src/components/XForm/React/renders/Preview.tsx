import React, { useEffect, useState } from 'react'
import { getObjectById } from '@/utils/request'

export default function Preview({ schema: { data: id } }) {
  const [content, setContent] = useState(null)

  useEffect(() => {
    if (!id) return
    getObjectById(id, 'full').then(({ type, content }) => setContent(content))
  }, [id])

  return <div>{JSON.stringify(content)}</div>
}
