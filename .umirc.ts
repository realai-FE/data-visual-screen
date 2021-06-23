import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/screen/' : '/',
  routes: [
    { exact: true, path: '/', redirect: '/screen' },
    { exact: true, path: '/screen', component: '@/pages/index' },
    // { component: '@/pages/404' },
  ],
  theme: {
    '@primary-color': '#2B85FF',
  },
  // favicon:
  //   process.env.NODE_ENV === 'production'
  //     ? '/screen/realai.ico'
  //     : '/realai.ico',
  // title: 'RealSafe',
  proxy: {
    // 集合mock服务器
    '/mock': {
      target: 'http://yapi.realai-inc.cn/mock/24',
      changeOrigin: true,
      pathRewrite: { '^/mock': '' },
    },
  },
});
