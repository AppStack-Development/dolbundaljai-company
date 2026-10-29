import {defineConfig} from 'vite';
import {fileURLToPath} from 'node:url';
export default defineConfig({root:'src',envDir:fileURLToPath(new URL('.',import.meta.url)),build:{outDir:'../dist',emptyOutDir:true},server:{port:4174,strictPort:true}});
