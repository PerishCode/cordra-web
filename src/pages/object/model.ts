import { search } from '@/utils/request'

export const namespace = 'object-search'

export default {
  namespace,

  state: [],

  effects: {
    *search({ query }, { call, put }) {
      const { results: objects } = yield call(search, query)
      yield put({
        type: 'set',
        objects,
      })
    },
  },
  reducers: {
    set(_, { objects }) {
      return objects
    },
  },
}
