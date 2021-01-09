import { getSchema } from '@/utils/request'

const parsers = {
  array: schema =>
    new Promise((resolve, reject) => {
      if (!schema['__render__']) schema['__render__'] = []
      if (typeof schema['__render__'] === 'string')
        schema['__render__'] = [schema['__render__']]
      if (schema['__render__'].findIndex(k => k === 'Array') < 0)
        schema['__render__'].splice(0, 0, 'Array', 'Default')

      processor(schema.items).then(result => {
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
        Object.keys(schema.properties).map(k => processor(schema.properties[k]))
      ).then(results => {
        Object.keys(schema.properties).forEach((k, i) => {
          schema.properties[k] = results[i]
        })

        resolve(schema)
      })
    }),
  string: schema =>
    new Promise((resolve, reject) => {
      if (schema['__render__'] === undefined) schema['__render__'] = ['Input']
      if (schema['__link__']) schema['__render__'] = ['Reference']
      //   if (
      //     schema['title'] &&
      //     schema['__render__'].findIndex(r => r === 'Label') === -1
      //   )
      //     schema['__render__'].push('Label')
      resolve(schema)
    }),
}

export default function processor(schema) {
  return new Promise((resolve, reject) => {
    if (schema === null || schema === undefined) resolve({})

    if (schema['$ref']) {
      const ref = schema['$ref']
      getSchema(ref).then(processor).then(resolve).catch(reject)
    } else {
      const parser = parsers[schema['type']]
      if (parser) parser(schema).then(resolve).catch(reject)
      else resolve(schema)
    }
  })
}
