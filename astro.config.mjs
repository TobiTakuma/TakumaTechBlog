// @ts-check
import { defineConfig } from 'astro/config';
import { remarkLangSections } from './src/remark/lang-sections.mjs';

// https://astro.build/config
export default defineConfig({
  // RSS フィード生成や絶対 URL 生成に使用。
  // カスタムドメインに変更したらここを書き換える。
  site: 'https://takumatechblog.pages.dev',
  markdown: {
    // # <!--en--> / # <!--ja--> マーカーを <section lang="x"> に変換
    remarkPlugins: [remarkLangSections],
  },
});
