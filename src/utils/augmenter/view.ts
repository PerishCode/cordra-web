import { getSchema } from '@/utils/request'

const parsers = {
  array: schema =>
    new Promise(resolve => {
      // if (schema['__render__'].findIndex(k => k === 'Array') < 0) schema['__render__'].splice(0, 0, 'Array', 'Default')

      // processor(schema.items).then(result => {
      //   schema.items = result
      //   resolve(schema)
      // })

      resolve({})
    }),

  object: schema =>
    new Promise(resolve => {
      if (schema['__render__'].findIndex(k => k === 'Object') < 0) schema['__render__'].splice(0, 0, 'Object')
      const validKeys = Object.keys(schema.properties).filter(k => k !== 'id')
      Promise.all(validKeys.map(k => processor(schema.properties[k]))).then(results => {
        validKeys.forEach((k, i) => (schema.properties[k] = results[i]))
        resolve(schema)
      })
      // resolve({})
    }),

  string: schema =>
    new Promise(resolve => {
      if (schema['__render__'].length === 0) schema['__render__'] = ['Preview']
      // if (schema['__link__']) schema['__render__'] = ['Reference']
      resolve(schema)
      // resolve({})
    }),
}

export default function processor(schema) {
  return new Promise((resolve, reject) => {
    if (schema === null || schema === undefined) resolve({})

    if (schema['$ref']) {
      const ref = schema['$ref']
      getSchema(ref).then(processor).then(resolve).catch(reject)
    } else {
      if (!schema['__render__']) schema['__render__'] = []
      if (typeof schema['__render__'] === 'string') schema['__render__'] = [schema['__render__']]

      const parser = parsers[schema['type']]
      if (parser) parser(schema).then(resolve).catch(reject)
      else resolve(schema)
    }
    // console.log(schema)
    // resolve({})
  })
}
