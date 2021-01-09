export function parseFormDataFromSchema(source) {
  if (source === null || typeof source !== 'object') return source

  if (source['properties']) {
    let result = {}
    const from = source['properties']
    Object.keys(from).forEach(k => {
      result[k] = parseFormDataFromSchema(from[k])
    })
    return result
  }

  if (source['items']) {
    return source['data']?.map(i => parseFormDataFromSchema(i)) || []
  }

  return source['data']
}

export function combineFormDataAndSchema(schema, formData) {
  if (schema['properties']) {
    Object.keys(schema.properties).forEach(k => {
      schema.properties[k] = combineFormDataAndSchema(
        schema.properties[k],
        formData[k]
      )
    })
  } else if (schema['items']) {
    schema['data'] = formData.map(d =>
      combineFormDataAndSchema(JSON.parse(JSON.stringify(schema['items'])), d)
    )
  } else schema['data'] = formData

  return schema
}
