import { useEffect, useState } from 'react'
import { search } from '@/utils/request'
import {} from '@/utils/transformer'
import './index.sass'

export default function Page() {
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    search({
      query: 'type:"Author"',
    }).then(console.log)
  }, [])

  return <div className="page author container">{}</div>
}
