import { getAllSchemas } from '@/utils/request'

export const namespace = 'schema-search'

export default {
  namespace,

  state: {},

  effects: {
    *initialize(_, { call, put }) {
      const schemas = yield call(getAllSchemas)

      yield put({
        type: 'set',
        schemas,
      })
    },
  },
  reducers: {
    set(_, { schemas }) {
      return schemas
    },
  },
}
