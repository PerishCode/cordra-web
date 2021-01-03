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
      target: 'https://172.22.176.46:7711',
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/cordra': '' },
    },
  },
})
