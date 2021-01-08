import { getSchemaByTypeName } from './request'

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
  array: schema =>
    new Promise((resolve, reject) => {
      if (!schema['__render__']) schema['__render__'] = []
      if (typeof schema['__render__'] === 'string')
        schema['__render__'] = [schema['__render__']]
      if (schema['__render__'].findIndex(k => k === 'Array') < 0)
        schema['__render__'].splice(0, 0, 'Array', 'Default')

      schemaEnlarge(schema.items).then(result => {
        schema.items = result
        resolve(schema)
      })
    }),

  object: schema =>
    new Promise(resolve => {
      if (!schema['__render__']) schema['__render__'] = []
      if (typeof schema['__render__'] === 'string')
        schema['__render__'] = [schema['__render__']]
      if (schema['__render__'].findIndex(k => k === 'Object') < 0)
        schema['__render__'].splice(0, 0, 'Object')
      Promise.all(
        Object.keys(schema.properties).map(k =>
          schemaEnlarge(schema.properties[k])
        )
      ).then(results => {
        Object.keys(schema.properties).forEach((k, i) => {
          schema.properties[k] = results[i]
        })

        resolve(schema)
      })
    }),
  string: schema =>
    new Promise((resolve, reject) => {
      if (schema['__link__']) schema['__render__'] = ['Reference']
      resolve(schema)
    }),
}

export function schemaEnlarge(schema) {
  return new Promise((resolve, reject) => {
    if (schema === null) resolve({})

    if (schema['$ref']) {
      const ref = schema['$ref']
      getSchemaByTypeName(ref).then(schemaEnlarge).then(resolve).catch(reject)
    } else {
      const parser = parsers[schema['type']]
      if (parser) parser(schema).then(resolve).catch(reject)
      else resolve(schema)
    }
  })
}
