import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vitejs.dev/config/
const root = resolve(__dirname, 'src')
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': root,
        },
    },
})
