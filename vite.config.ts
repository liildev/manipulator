import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  build: {
    minify: 'terser',
    manifest: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    TanStackRouterVite(),
    AutoImport({
      dts: './src/types/imports.d.ts',
      imports: [
        'react',
        {
          '@tanstack/react-router': [
            'useRouter',
            'useNavigate',
            'createFileRoute',
          ],
        },
        {
          'react-hook-form': ['useForm', 'useFormContext', 'useFieldArray'],
        },
        {
          '@hookform/resolvers/zod': ['zodResolver'],
        },
      ],
    }),
  ],
});
