import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import emotion from '@emotion/babel-plugin';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [emotion]
      }
    })
  ]
});
