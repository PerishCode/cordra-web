import { getSchemaByTypeName } from '@/utils/request'

export const namespace = 'schema-single'

export default {
  namespace,

  state: null,

  effects: {
    *initialize({ typeName }, { call, put }) {
      const schema = yield call(getSchemaByTypeName, typeName)

      yield put({
        type: 'set',
        schema,
      })
    },
  },
  reducers: {
    set(_, { schema }) {
      return schema
    },
  },
}
