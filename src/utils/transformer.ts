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

const parsers = {
  array: schema => {
    if (!schema['__render__']) schema['__render__'] = []

    if (typeof schema['__render__'] === 'string')
      schema['__render__'] = [schema['__render__']]

    if (schema['__render__'].findIndex(k => k === 'Array') < 0)
      schema['__render__'].splice(0, 0, 'Array', 'Default')

    schema.items = schemaEnlarge(schema.items)

    return schema
  },

  object: schema => {
    if (!schema['__render__']) schema['__render__'] = []
    if (typeof schema['__render__'] === 'string')
      schema['__render__'] = [schema['__render__']]
    if (schema['__render__'].findIndex(k => k === 'Object') < 0)
      schema['__render__'].splice(0, 0, 'Object')

    let properties = {}

    Object.keys(schema.properties || {}).forEach(k => {
      properties[k] = schemaEnlarge(schema.properties[k])
    })

    return schema
  },

  string: schema => {
    if (schema['__link__']) schema['__render__'] = ['Preview', 'Reference']

    return schema
  },
}

export function schemaEnlarge(schema) {
  const parser = parsers[schema['type']]

  return parser ? parser(schema) : schema
}
