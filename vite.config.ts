import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',   // 모든 네트워크 인터페이스에서 접속 허용
    port: 3001,
    strictPort: true,  // 포트 이미 사용 중이면 에러 (랜덤 포트 방지)
  },
})
