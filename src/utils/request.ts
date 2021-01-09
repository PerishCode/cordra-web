export function search(query) {
  return fetch('/cordra/search', {
    method: 'post',
    headers: new Headers({
      Authorization: 'Basic ' + btoa('admin:king'),
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(query),
  }).then(res => res.json())
}

export function getAllSchemas() {
  return fetch('/cordra/schemas', {
    method: 'get',
    headers: new Headers({
      Authorization: 'Basic ' + btoa('admin:king'),
    }),
  }).then(res => res.json())
}

export function getSchema(type) {
  return fetch('/cordra/schemas/' + type, {
    method: 'get',
    headers: new Headers({
      Authorization: 'Basic ' + btoa('admin:king'),
    }),
  }).then(res => res.json())
}

export function deleteSchema(type) {
  return fetch('/cordra/schemas/' + type, {
    method: 'delete',
    headers: new Headers({
      Authorization: 'Basic ' + btoa('admin:king'),
    }),
  }).then(res => res.json())
}

export function createSchema(type, schema) {
  if (typeof type !== 'string' || type.length === 0)
    return new Promise((resolve, reject) => {
      reject(new Error('类型名称不能为空'))
    })

  return fetch('/cordra/schemas/' + type, {
    method: 'put',
    headers: new Headers({
      Authorization: 'Basic ' + btoa('admin:king'),
    }),
    body: JSON.stringify(schema),
  }).then(res => res.json())
}

export function updateSchema(type, schema) {
  return fetch('/cordra/schemas/' + type, {
    method: 'put',
    headers: new Headers({
      Authorization: 'Basic ' + btoa('admin:king'),
    }),
    body: JSON.stringify(schema),
  }).then(res => res.json())
}

export function getObjectById(id, params = '') {
  return fetch('/cordra/objects/' + id + '?' + params, {
    method: 'get',
    headers: new Headers({
      Authorization: 'Basic ' + btoa('admin:king'),
    }),
  }).then(res => res.json())
}

export function createObjectByTypeName(type, content) {
  return fetch('/cordra/objects?type=' + type + '&full', {
    method: 'post',
    headers: new Headers({
      Authorization: 'Basic ' + btoa('admin:king'),
    }),
    body: JSON.stringify(content),
  }).then(res => res.json())
}

export function updateObjectById(id, content) {
  return fetch('/cordra/objects/' + id, {
    method: 'put',
    headers: new Headers({
      Authorization: 'Basic ' + btoa('admin:king'),
    }),
    body: JSON.stringify(content),
  }).then(res => res.json())
}

export function deleteObjectById(id) {
  return fetch('/cordra/objects/' + id, {
    method: 'delete',
    headers: new Headers({
      Authorization: 'Basic ' + btoa('admin:king'),
    }),
  }).then(res => res.json())
}
