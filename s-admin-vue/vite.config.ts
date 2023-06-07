import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  base: "./", //打包路径
  build: {
    outDir: 'dist', // 非正式
    // outDir: 'pro', // 正式
  },
  css: {
    modules: {
      localsConvention: "camelCase", // 默认只支持驼峰，修改为同时支持横线和驼峰
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')// 设置别名
    }
  },
  server: {
    // host: '10.1.6.86',
    // port: 8087, // 服务端口号
    open: true, // 服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    proxy: {
      '/api': {
        target: 'http://localhost:3000',	//
        // target: 'http://123.60.10.252',	//
        ws: true,  // proxy websockets
        changeOrigin: true,  // needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\//, '')
      }
    }
  }
})
