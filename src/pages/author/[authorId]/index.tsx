import { useEffect, useState } from 'react'
import { Card } from '@/components'
import { search } from '@/utils/request'
import {} from '@/utils/transformer'

import './index.sass'

export default function Page({
  match: {
    params: { authorId },
  },
}) {
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    search({
      query: 'type:"Author"',
    }).then(console.log)
  }, [])

  return <div className="page author-single container">{authorId}</div>
}
