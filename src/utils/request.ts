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

export function getSchemaByTypeName(type) {
  return fetch('/cordra/schemas/' + type, {
    method: 'get',
    headers: new Headers({
      Authorization: 'Basic ' + btoa('admin:king'),
    }),
  }).then(res => res.json())
}

export function createSchema(type, schema) {
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
  return fetch('/cordra/objects?type=' + type, {
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
