import { useEffect, useState } from 'react'
import { XForm } from '@/components'
import { parseFormDataFromSchema } from '@/utils/transformer'
import { edit } from '@/utils/augmenter'
import { getSchema } from '@/utils/request'
import './index.sass'

export default function Page() {
  const [formData, setFormData] = useState(null)
  const [schema, setSchema] = useState(null)

  useEffect(() => {
    getSchema('Paper').then(setSchema)
  }, [])

  return (
    <div className="page author-new container">
      <XForm
        schema={schema}
        onChange={d => setFormData(parseFormDataFromSchema(d))}
        transformer={edit}
      />
    </div>
  )
}
