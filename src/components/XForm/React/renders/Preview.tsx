import React, { useEffect, useState } from 'react'
import { getObjectById } from '@/utils/request'

function Preview({ schema: { data: id } }) {
  const [content, setContent] = useState(null)

  useEffect(() => {
    if (!id) return
    getObjectById(id, 'full').then(({ type, content }) => setContent(content))
  }, [id])

  return <div>{JSON.stringify(content)}</div>
}

Preview.withHooks = true

export default Preview
