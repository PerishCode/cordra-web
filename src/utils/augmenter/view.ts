export default function processor(schema) {
  return new Promise((resolve, reject) => {
    schema['__render__'] = ['Format']
    resolve(schema)
  })
}
