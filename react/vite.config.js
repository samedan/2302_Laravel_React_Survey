import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        cors: false,
    },
    plugins: [react()],
    build: {
        rollupOptions: {
            external: "./node_modules/vfile/lib/index.js",
        },
    },
});

// export default defineConfig({
//   build: {
//     rollupOptions: {
//       external: [
//         /^node:.*/,
//       ]
//     }
//   }
// })
