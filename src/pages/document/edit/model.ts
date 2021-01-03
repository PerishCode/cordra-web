export const namespace = 'document-edit'

export default {
  namespace,

  state: {
    name: '',
  },

  effects: {
    *query({ payload }, { call, put }) {},
  },
  reducers: {
    save(oldState, dispatchParams) {
      console.log(dispatchParams)
      return {
        name: 'Yeah',
      }
    },
  },
}
