name: Deploy Vue.js to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm install
        working-directory: ./Event-WebApp
      - run: npm run build
        working-directory: ./Event-WebApp
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v2
        with:
          path: ./Event-WebApp/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v3