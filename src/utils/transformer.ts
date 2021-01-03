export function transformer(source) {
  if (source === null || typeof source !== 'object') return source

  if (source['properties']) {
    let result = {}
    const from = source['properties']
    Object.keys(from).forEach(k => {
      result[k] = transformer(from[k])
    })

    console.log(result)

    return result
  }

  if (source['template']) {
    const from = source['items']
    return from.map(i => transformer(i))
  }

  return source['data']
}
