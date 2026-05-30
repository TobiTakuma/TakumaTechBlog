// @ts-check
import { defineConfig } from 'astro/config';
import mermaid from 'astro-mermaid';
import { remarkLangSections } from './src/remark/lang-sections.mjs';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  // RSS フィード生成や絶対 URL 生成に使用。
  // カスタムドメインに変更したらここを書き換える。
  site: 'https://takumatechblog.pages.dev',

  // ```mermaid コードブロックをブラウザ側で図に描画する。
  // Shiki にコードブロックを無視させ、mermaid.js が SVG を生成する。
  // fontFamily を指定しないと、mermaid はデフォルトフォントで文字幅を計測する一方
  // ページ CSS（JetBrains Mono）で描画され、計測と描画がズレてラベルの箱が
  // 小さくなる（見切れ）。サイトと同じフォントを渡して計測＝描画を一致させる。
  integrations: [
    mermaid({
      theme: 'default',
      autoTheme: false,
      mermaidConfig: { fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace' },
    }),
  ],

  markdown: {
    // # <!--en--> / # <!--ja--> マーカーを <section lang="x"> に変換
    remarkPlugins: [remarkLangSections],
  },

  adapter: cloudflare()
});