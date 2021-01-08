import { defineConfig } from 'umi'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title: 'DBM',
  favicon: 'favicon.png',
  sass: {},
  dva: {},
  locale: {},
  antd: {},
  proxy: {
    '/cordra': {
      target: 'https://172.23.48.1:7711',
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/cordra': '' },
    },
  },
})
