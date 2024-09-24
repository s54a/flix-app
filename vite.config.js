import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: true,
      inject: {
        injectOptions: {
          // Specify the HTML files you want to include
          inject: [
            { src: "index.html" },
            { src: "shows.html" },
            { src: "search.html" },
            { src: "movie-details.html" },
            { src: "tv-details.html" },
          ],
        },
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        shows: "shows.html",
        search: "search.html",
        movieDetails: "movie-details.html",
        tvDetails: "tv-details.html",
      },
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `
          @import './lib/fontawesome.css';
          @import './lib/swiper.css';
          @import './css/spinner.css';
          @import './css/style.css';
      `,
      },
    },
  },
});
