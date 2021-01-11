export default function processor(schema) {
  return new Promise(resolve => {
    schema['__render__'] = ['Format']
    resolve(schema)
  })
}
