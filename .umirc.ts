import { defineConfig } from 'umi'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes,
  sass: {},
  // layout: {
  //   name: 'Cordra',
  //   layout: 'side',
  //   locale: false,
  // },
  dva: {},
  locale: {},
  antd: {},
  proxy: {
    '/cordra': {
      target: 'https://172.19.224.1:7711',
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/cordra': '' },
    },
  },
})
