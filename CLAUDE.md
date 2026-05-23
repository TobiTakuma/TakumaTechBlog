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
pubDate: 2026-05-22
description: "記事の説明（省略可）"
tags: ["開発記録"]
tags_en: ["Dev log"]
---
```

`title_en` / `tags_en` を省略した場合、英語モードでも日本語の値が表示される。

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

画像ファイルは `public/images/` に置く。Obsidianを使っている場合は添付ファイル保存先を `public/images` に設定しておくと自動でここに保存される。

---

# Q&A

## 2026/05/22 - 開発サーバーの起動方法
質問：実際の画面はどうやって確認できますか？  
回答：`npm run dev` を実行してブラウザで `http://localhost:4321` を開く。Claude Codeから実行する場合はプロンプトに `! npm run dev` と入力する。

## 2026/05/22 - 画像・記事のファイル構成
質問：画像と記事のファイルツリー構造を教えて  
回答：記事は `src/content/blog/` に `.md` で置く。画像は `public/images/` に置いて `/images/ファイル名` で参照（シンプル）か、`src/assets/images/` に置いてAstroの最適化を使う方法がある。

## 2026/05/22 - ObsidianをCMSとして使う構成
質問：記事をObsidianで書きたい。`blog/` をVaultにして運用したい。画像の扱いは？  
回答：Vaultは `blog/` でなく `TakumaTechBlog/` 全体に設定する方が良い。Obsidian設定で「Wikiリンク → OFF」「添付ファイル保存先 → `public/images`」「新規ノート保存先 → `src/content/blog`」にすると、画像ドロップで自動的に正しい場所に保存され、標準Markdown記法で参照される。

## 2026/05/22 - 記事作成時にフロントマターを自動挿入したい
質問：タグや公開日などの基本情報を新しく記事を書くたびに自動で追加してほしい。  
回答：ObsidianのコミュニティプラグインTemplaterを使う。「Trigger Templater on new file creation → ON」「Folder Templates で `src/content/blog` にテンプレートを指定」すると、該当フォルダに新規ノート作成時にフロントマターが自動挿入される。テンプレートファイルは `templates/blog-post.md` に作成。

## 2026/05/22 - ObsidianとVS Code、どちらで書くべきか
質問：Obsidianで書く方法自体は問題ない？別のやり方の方が良ければそちらにしたい。  
回答：Obsidianは問題ない。VS Codeは設定ゼロで今すぐ使えてシンプル。Obsidianは書くことに特化した快適なエディタだが最初に設定が必要。書く頻度が低ければVS Code、頻繁に書くならObsidianが向いている。

## 2026/05/22 - Obsidianの必要な設定
質問：Obsidianの設定ってどんなことが必要なの？  
回答：2つだけ。①「設定 → ファイルとリンク → Wikiリンクを使用」をOFF（ONのままだと画像がAstroで読めない記法になる）。②「新規添付ファイルの保存先」を `public/images` に指定（画像ドロップ時に自動で正しい場所に保存される）。

---

## 2026/05/22 - デプロイ先と手順
質問：次に何をするべきか？Cloudflare Pagesを使う予定だった。  
回答：GitHubリポジトリ（TakumaToiyama/TakumaTechBlog）は既にあるので、Cloudflare Pagesで Connect to Git → リポジトリ選択 → ビルドコマンド `npm run build` / 出力 `dist` で設定するだけ。コード変更不要。

## 2026/05/22 - 画像の挿入とサイズ調整
質問：写真の挿入とサイズ調整のやり方がわからない  
回答：画像は `public/images/` に置いて `![alt](/images/ファイル名.png)` で挿入。サイズ指定したい場合は `<img src="/images/..." style="max-width: 400px;">` を使う。英日共通画像は `<section>` タグの外に置く。

# 変更ログ

## 2026/05/22 (最新)
タグページの日英切り替えが機能していなかったため修正を求められた。

- `src/pages/tags/index.astro`: `<h1>` を `lang-en`/`lang-ja` で分岐
- `src/pages/tags/[tag].astro`: `<h1>`・記事タイトル・戻るリンクを日英対応

## 2026/05/22
同日複数記事の並び順修正と、デフォルト言語を英語にするよう求められた。

- `templates/blog-post.md`: `pubDate` 形式を `YYYY-MM-DD` → `YYYY-MM-DDTHH:mm` に変更。同日記事が作成時刻順に並ぶ。
- `src/layouts/Layout.astro`: 言語設定の保存を `localStorage` → `sessionStorage` に変更。タブを閉じると英語にリセットされる。

## 2026/05/22
テンプレート作成時にタイトル入力ダイアログを出し、ファイル名・title・urlを同期するよう求められた。

- `templates/blog-post.md`: `tp.system.prompt()` でタイトル入力ダイアログを追加、`tp.file.rename()` でファイルを即リネーム。`title` / `url` が入力値から自動生成される。

## 2026/05/22 16:25
タグを日英で共通化するよう求められた。

- `config.ts`: `tags_en` フィールドを削除
- `templates/blog-post.md`: `tags_en` を削除
- 全記事: `tags_en` を削除。アルテミス記事は日本語タグ（宇宙・アルテミス）を英語（Space・Artemis）に統一
- `[...slug].astro`: タグ表示を1つに統合（`lang-en`/`lang-ja` の分岐を削除）

## 2026/05/22 16:15
フロントマターのプロパティ順・名称の整理と、アルテミス記事の画像サイズ修正を求められた。

- `src/content/config.ts`: フィールド順を `title → title_en → pubDate → description → tags → tags_en → url` に統一
- `templates/blog-post.md`: 全プロパティを追加し、本文のセクション構造も含めた完全なテンプレートに更新
- 全記事のフロントマターを上記順序・ダブルクォート・インライン配列形式に統一
- `template test.md`: `url` を `template-test` に修正（スペースを含まない形式へ）
- `artemis-ii.md`: 画像を各セクション外（共通位置）に移動し、`<img style="max-width: 420px">` で表示サイズを縮小

## 2026/05/22 15:21
既存の記事3件とトップページを日英切り替えに対応するよう内容を変更するよう求められた。

- `src/content/blog/my-first-post.md`: `title_en`・`tags_en` 追加、本文を `<section lang="en/ja">` で分割
- `src/content/blog/another-post.md`: 同上。`title` も日本語に変更（「2つ目の投稿」）
- `src/content/blog/template test.md`: 同上
- `src/pages/index.astro`: 「View all posts」「Recent Posts」を日英両方に対応

## 2026/05/22 15:16
日英切り替え機能の実装を求められた。デフォルト英語・ボタンで日本語に切り替え・localStorage で言語保持。以下を変更。

- `src/content/config.ts`: `title_en`・`tags_en` フィールドを追加
- `src/layouts/Layout.astro`: `<script is:inline>` でFOUC防止、CSS で `.lang-ja`/`.lang-en`・`section[lang]` の表示制御、トグルボタン追加、localStorage保存JS追加
- `src/pages/[...slug].astro`: 日英タイトル・タグを両方レンダリング、section[lang] はCSSで制御
- `src/pages/blog/[...page].astro`: 記事一覧の各タイトルを日英両方レンダリング
- `src/pages/index.astro`: トップページの新着記事タイトルを日英両方レンダリング

## 2026/05/22 14:15
ブログを投稿・閲覧できる状態にするよう指示された。以下のファイルを修正。

- `src/layouts/Layout.astro`: `title` propを受け取って`<title>`タグに反映するよう修正。ナビゲーション（ホーム・記事一覧・タグ）を追加。
- `src/pages/index.astro`: `post.slug`（Astro v5で非推奨）を `post.id` ベースのURL生成に変更。
- `src/pages/[...slug].astro`: Astro v5で廃止された `post.render()` を `render(post)` に変更。URLのフォールバックロジックを `[...page].astro` と統一。
- `src/pages/blog/[...page].astro`: 重複していた `<BaseLayout>` タグを削除し、ページネーションナビを1つのレイアウト内に統合。
- `src/pages/tags/[tag].astro`: `getStaticPaths()` 内にHTMLテンプレートが混入していた構文バグを修正。テンプレートをフロントマター外に移動。
