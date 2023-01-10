import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import importToCDN from 'vite-plugin-cdn-import'

export default defineConfig({
  plugins: [
    react(),
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

        // {
        //   name: 'react-router',
        //   var: 'ReactRouter',
        //   path: `https://cdn.bootcdn.net/ajax/libs/react-router/6.6.1/react-router.development.js`,
        // },

        // {
        //   name: 'react-router-dom',
        //   var: 'ReactRouterDOM',
        //   path: `https://cdn.bootcdn.net/ajax/libs/react-router-dom/6.6.1/react-router-dom.development.js`,
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
      ],
    }),
  ],
  server: {
    proxy: {
      '/api': {
        // target: "https://musicapi-murex.vercel.app",
        target: 'http://127.0.0.1:9998',
        // target: 'http://43.137.43.190:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
