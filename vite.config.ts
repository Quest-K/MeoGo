import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// [https://vite.dev/config/](https://vite.dev/config/)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/Quest_K/', // 깃허브 페이지 배포를 위한 필수 설정입니다.
  server: {
    host: '0.0.0.0',
    port: 3001,
    strictPort: true,
  },
})
