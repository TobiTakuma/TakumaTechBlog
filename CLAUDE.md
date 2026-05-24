# TakumaTechBlog

## 起動方法

```bash
cd /Users/takumatoiyama/ComputerScience/my-astro-project/TakumaTechBlog
npm run dev
```

ブラウザで `http://localhost:4321` を開く。

---

## 記事の書き方

### ファイルの場所
`src/content/blog/記事名.md`

### フロントマター（ファイル冒頭に必須）

```yaml
---
title: "日本語タイトル"
title_en: "English Title"
pubDate: 2026-05-22T10:00
description: "記事の説明（省略可）"
tags: ["Dev log"]
url: "article-slug"
---
```

`title_en` を省略した場合、英語モードでも日本語の値が表示される。  
`pubDate` は時刻まで入れると同日複数記事の並び順が正しくなる。

### 本文（日英切り替えあり）

```markdown
<section lang="en">

English summary goes here.
**Bold** and other Markdown work fine.

</section>

<section lang="ja">

日本語の詳しい本文をここに書く。
**太字**などのMarkdown記法も使える。

</section>
```

**注意：`<section>` タグの直後は必ず空行を入れる。** 空行がないと内部がMarkdownとして処理されない。

### 画像の挿入

```markdown
![説明テキスト](/images/ファイル名.png)
```

サイズを指定したい場合：
```html
<img src="/images/ファイル名.png" alt="説明" style="max-width: 400px;">
```

- 画像ファイルは `public/images/` に置く
- 英日共通の画像は `<section>` タグの**外**に置く
- Obsidianの添付ファイル保存先を `public/images` に設定すると自動で正しい場所に保存される

---

## デザイン変更の方法

`src/styles/global.css` の上部にある `:root` の変数を変えるだけで全体のデザインが変わる。

```css
:root {
  --color-bg:      #ffffff;   /* 背景色 */
  --color-accent:  #2563eb;   /* リンク・アクセントカラー */
  --font-en:       "JetBrains Mono", "Noto Sans JP", sans-serif; /* 英語本文 */
  --font-ja:       "JetBrains Mono", "Noto Sans JP", sans-serif; /* 日本語本文 */
  --max-width:     720px;     /* コンテンツ幅 */
}
```

フォントスタックは左から順に優先。JetBrains Monoに日本語グリフがないため、日本語文字は自動的にNoto Sans JPで表示される。

## Favicon の変更方法

`public/favicon.svg` を差し替えるだけ。SVGはベクター形式なので拡大縮小しても劣化しない。

絵文字を使う最も簡単な方法：
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <text y=".9em" font-size="90">🖥️</text>
</svg>
```

既製アイコンは heroicons.com や lucide.dev で入手可能。ブラウザキャッシュが残る場合は `Cmd + Shift + R` で強制リロード。

---

## デプロイ

- ホスティング: **Cloudflare Pages**
- リポジトリ: `TakumaToiyama/TakumaTechBlog`（GitHub）
- `main` ブランチへ push すると自動デプロイ
- ビルドコマンド: `npm run build` / 出力: `dist`

---

# Q&A

## 2026/05/22 - 開発サーバーの起動方法
質問：実際の画面はどうやって確認できますか？  
回答：`npm run dev` を実行してブラウザで `http://localhost:4321` を開く。Claude Codeから実行する場合はプロンプトに `! npm run dev` と入力する。

## 2026/05/22 - 画像・記事のファイル構成
質問：画像と記事のファイルツリー構造を教えて  
回答：記事は `src/content/blog/` に `.md` で置く。画像は `public/images/` に置いて `/images/ファイル名` で参照。

## 2026/05/22 - ObsidianをCMSとして使う構成
質問：記事をObsidianで書きたい。画像の扱いは？  
回答：Vaultは `TakumaTechBlog/` 全体に設定。Obsidian設定で「Wikiリンク → OFF」「添付ファイル保存先 → `public/images`」「新規ノート保存先 → `src/content/blog`」にする。

## 2026/05/22 - 記事作成時にフロントマターを自動挿入したい
質問：タグや公開日などの基本情報を新しく記事を書くたびに自動で追加してほしい。  
回答：ObsidianのコミュニティプラグインTemplaterを使う。「Trigger Templater on new file creation → ON」「Folder Templates で `src/content/blog` にテンプレートを指定」すると自動挿入される。テンプレートは `templates/blog-post.md`。

## 2026/05/22 - ObsidianとVS Code、どちらで書くべきか
質問：Obsidianで書く方法自体は問題ない？  
回答：Obsidianは問題ない。VS Codeは設定ゼロでシンプル。Obsidianは書くことに特化した快適なエディタだが最初に設定が必要。書く頻度が低ければVS Code、頻繁に書くならObsidianが向いている。

## 2026/05/22 - Obsidianの必要な設定
質問：Obsidianの設定ってどんなことが必要なの？  
回答：2つだけ。①「設定 → ファイルとリンク → Wikiリンクを使用」をOFF。②「新規添付ファイルの保存先」を `public/images` に指定。

## 2026/05/22 - 画像の挿入とサイズ調整
質問：写真の挿入とサイズ調整のやり方がわからない  
回答：画像は `public/images/` に置いて `![alt](/images/ファイル名.png)` で挿入。サイズ指定したい場合は `<img src="/images/..." style="max-width: 400px;">` を使う。英日共通画像は `<section>` タグの外に置く。

## 2026/05/22 - デプロイ先と移行の自由度
質問：Cloudflare Pagesから別のホスティングや自分のサーバーに移せる？  
回答：できる。Astroは静的ファイル（`dist/`）を生成するだけなので、どこに置いても動く。Vercel・Netlifyはリポジトリを繋ぎ直すだけ。自分のサーバーは `dist/` をNginx等で配信するだけ。

## 2026/05/22 - Cloudflare PagesのGit連携が切れた
質問：pushしても自動デプロイされない。「Gitアカウントから切断されています」と表示される。  
回答：Settings → Builds → Git Repository →「Manage」から GitHub を再認証する。再接続後は手動で「Trigger deploy」を一度押して最新化する。

## 2026/05/22 - CloudflareがPRを自動生成した
質問：Cloudflareから自動でPRが来たがこれは何？  
回答：Cloudflare Pagesが自動生成した設定ファイル追加のPR。今のブログには不要なのでGitHub上でそのままクローズして良い。

## 2026/05/22 - デザインを後から変えやすくしたい
質問：後からどうとでもなるようにデザインを整えてほしい  
回答：`src/styles/global.css` にCSS変数（`:root { --color-bg, --color-accent, --font-en ... }`）を集約。デザイン変更は変数の値を書き換えるだけで全体に反映される。

## 2026/05/23 - SVGとは何か
質問：SVGってどういう形式？複数サイズが合わさっているやつ？  
回答：それは `.ico` 形式。SVGはベクター画像形式で、ピクセルでなく数式で図形を描くためどんなサイズでも劣化しない。

## 2026/05/23 - SVGの作り方
質問：SVGってどうやって作るの？  
回答：①絵文字をそのままSVGコードに埋め込む（最簡単）②Figmaでデザインしてエクスポート③heroicons.comやlucide.devで既製アイコンを取得。

## 2026/05/23 - 英語・日本語で別フォントにしたい
質問：英語と日本語のフォントを別々にできるか？  
回答：CSSフォントスタックで可能。`--font-en` と `--font-ja` を別々に定義し、`html.ja body` で切り替え。JetBrains Monoのように日本語グリフがないフォントは自動的に次のフォントにフォールバックするので、`"JetBrains Mono", "Noto Sans JP"` と並べれば英数字はJetBrains Mono・日本語はNoto Sans JPになる。

---

# 変更ログ

## 2026/05/23 (最新)
フォント・リスト表示の調整を複数求められた。

- `src/styles/global.css`: フォントを `--font-en` / `--font-ja` に分離。JetBrains Mono + Noto Sans JP のフォントスタックに設定。英数字はJetBrains Mono、日本語はNoto Sans JPが自動適用される。
- `src/styles/global.css`: 記事一覧の日付を右寄せ（`ul li a` に `flex:1`）、タイトル長い場合に `...` で省略（`overflow: hidden; text-overflow: ellipsis`）。
- `src/styles/global.css`: `ul li span:last-child` → `ul li > span:last-child` に修正。日本語タイトルのリンクカラーが上書きされるバグを修正。
- 言語切り替えボタンの文言を「日本語」/「English」→「Read in Japanese」/「Read in English」に変更。

## 2026/05/22 (最新)
デザインシステムを構築するよう求められた。

- `src/styles/global.css` を新規作成。`:root` にCSS変数（色・フォント・余白・最大幅）を定義。後からデザインを変える際は変数の値を変えるだけ。
- `src/layouts/Layout.astro`: インラインCSSを削除し `global.css` をimport。ナビの `|` 区切りを削除しflexレイアウトに変更。

## 2026/05/22
Notionで書いていた記事2件をブログ形式に変換して追加するよう求められた。

- `src/content/blog/git-push-error.md` を新規作成（4/30のgit pushエラー記事）
- `src/content/blog/hashcat-password-cracking.md` を新規作成（4/21のhashcat記事）
- 両記事とも日英セクション・フロントマター付きで変換

## 2026/05/22
タグページの日英切り替えが機能していなかったため修正を求められた。

- `src/pages/tags/index.astro`: `<h1>` を `lang-en`/`lang-ja` で分岐
- `src/pages/tags/[tag].astro`: `<h1>`・記事タイトル・戻るリンクを日英対応

## 2026/05/22
同日複数記事の並び順修正と、デフォルト言語を英語にするよう求められた。

- `templates/blog-post.md`: `pubDate` 形式を `YYYY-MM-DD` → `YYYY-MM-DDTHH:mm` に変更
- `src/layouts/Layout.astro`: 言語設定の保存を `localStorage` → `sessionStorage` に変更

## 2026/05/22
テンプレートのURLをファイル名と自動同期するよう求められた。新規作成時にタイトル入力ダイアログを出す方式に。

- `templates/blog-post.md`: `tp.system.prompt()` でタイトル入力→`tp.file.rename()` でリネーム。`title`・`url` が入力値から自動生成。

## 2026/05/22 16:25
タグを日英で共通化するよう求められた。

- `config.ts`: `tags_en` フィールドを削除
- `templates/blog-post.md`: `tags_en` を削除
- 全記事: `tags_en` を削除。アルテミス記事のタグを英語（Space・Artemis）に統一
- `[...slug].astro`: タグ表示を1つに統合

## 2026/05/22 16:15
フロントマターのプロパティ順・名称の整理と、アルテミス記事の画像サイズ修正を求められた。

- `src/content/config.ts`: フィールド順を統一
- `templates/blog-post.md`: 完全なテンプレートに更新
- `artemis-ii.md`: 画像を `<section>` 外に移動し `max-width: 420px` で縮小

## 2026/05/22 15:21
既存の記事3件とトップページを日英切り替えに対応するよう求められた。

- `my-first-post.md` / `another-post.md` / `template test.md`: `title_en` 追加、本文を `<section lang>` で分割
- `src/pages/index.astro`: 「View all posts」「Recent Posts」を日英対応

## 2026/05/22 15:16
日英切り替え機能の実装を求められた。

- `src/content/config.ts`: `title_en` フィールドを追加
- `src/layouts/Layout.astro`: FOUC防止スクリプト・CSS・トグルボタン追加
- 各ページ（slug / page / index）で日英タイトル両方をレンダリング

## 2026/05/22 14:15
ブログを投稿・閲覧できる状態にするよう指示された。

- `src/layouts/Layout.astro`: タイトル反映・ナビゲーション追加
- `src/pages/index.astro` / `[...slug].astro` / `[...page].astro` / `[tag].astro`: Astro v5対応の構文バグ修正
