import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import importToCDN from 'vite-plugin-cdn-import'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),

    // 静态资源cdn替换
    importToCDN.Plugin({
      modules: [
        {
          name: 'react',
          var: 'React',
          path: `https://cdn.bootcdn.net/ajax/libs/react/18.2.0/umd/react.production.min.js`,
        },
        {
          name: 'react-dom',
          var: 'ReactDOM',
          path: `https://cdn.bootcdn.net/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js`,
        },
        {
          name: 'react-redux',
          var: 'ReactRedux ',
          path: `https://cdn.bootcdn.net/ajax/libs/react-redux/8.0.5/react-redux.min.js`,
        },

        // {
        //   name: 'react-router',
        //   var: 'ReactRouter',
        //   path: `https://cdn.bootcdn.net/ajax/libs/react-router/6.8.1/react-router.production.min.js`,
        // },

        // {
        //   name: 'react-router-dom',
        //   var: 'ReactRouterDOM',
        //   path: `https://cdn.bootcdn.net/ajax/libs/react-router-dom/6.8.1/react-router-dom.production.min.js`,
        // },

        {
          name: 'axios',
          var: 'axios',
          path: `https://cdn.bootcdn.net/ajax/libs/axios/1.2.2/axios.min.js`,
        },

        {
          name: 'lodash',
          var: '_',
          path: `https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js`,
        },

        {
          name: 'dayjs',
          var: 'dayjs',
          path: `https://cdn.bootcdn.net/ajax/libs/dayjs/1.11.7/dayjs.min.js`,
        },

        {
          name: 'duration',
          var: 'dayjs_plugin_duration',
          path: `https://cdn.bootcdn.net/ajax/libs/dayjs/1.11.7/plugin/duration.min.js`,
        },
      ],
    }),

    //打包分析工具
    visualizer({
      open: false, //注意这里要设置为true，否则无效
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  server: {
    port: '9001',

    //代理
    proxy: {
      '/api': {
        target: 'http://116.204.127.62:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
