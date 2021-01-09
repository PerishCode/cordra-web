import { useEffect, useState } from 'react'
import { search } from '@/utils/request'
import {} from '@/utils/transformer'
import './index.sass'
import { Card } from '@/components'

export default function Page() {
  const [authors, setAuthors] = useState<any>([])

  useEffect(() => {
    search({
      query: 'type:"Author"',
    }).then(({ results }) => setAuthors(results))
  }, [])

  return (
    <div className="page author container">
      <Card className="authors" title="作者管理">
        {authors.map(a => (
          <pre key={a.id}>{JSON.stringify(a)}</pre>
        ))}
      </Card>
    </div>
  )
}
