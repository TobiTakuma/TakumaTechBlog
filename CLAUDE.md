# TakumaTechBlog

## 起動方法

```bash
cd /Users/takumatoiyama/ComputerScience/my-astro-project/TakumaTechBlog
npm run dev
npm run dev -- --host
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

H1 + HTMLコメントを言語マーカーとして使う：

```markdown
# <!--en-->

English summary goes here.
**Bold** and other Markdown work fine.

# <!--ja-->

日本語の詳しい本文をここに書く。
**太字**などのMarkdown記法も使える。
```

**仕組み：**
- `# <!--en-->` と `# <!--ja-->` をマーカーにして、それ以降のコンテンツが次のマーカーまで `<section lang="x">` で囲まれる（remarkプラグイン `src/remark/lang-sections.mjs` で変換）
- Obsidianプレビューではコメントが透明なので「空のH1」として表示される。それでも見出し扱いなので折りたたみ・Outlineが機能する
- 直後に空行を入れるのは推奨（普通のMarkdownと同じ）

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

## 2026/05/23 - 記事内のリンクにアイコンやプレビューを表示したい
質問：記事内に貼ったURLをNotionのようにプレビュー表示したり、Qiitaのアイコンを出せるか？  
回答：標準Markdownだけでは不可。アイコンだけなら `<img src="https://qiita.com/favicon.ico" width="16">` をMarkdown内に直接書ける。OGPカード（タイトル・説明付きプレビュー）はMDXへの移行とカスタムコンポーネントの実装が必要。

## 2026/05/25 - フォントをセルフホストすると軽くなるか
質問：フォントの情報をフォルダの中に入れておいたら軽くなる？  
回答：軽くなる。現在は Google Fonts から読み込んでいるため、外部サーバーへの DNS 解決と TLS 握手が 2 回発生する（fonts.googleapis.com と fonts.gstatic.com）。セルフホストすると Cloudflare Pages の CDN から同じ接続で配信できるので、初回訪問時に約 100-200ms 速くなる。プライバシー面でも Google にトラフィックが渡らない利点がある。ついでに使うウェイトの絞り込み・Latin サブセット化・`font-display: swap` を指定すると更に軽くなる。

## 2026/05/25 - フッターの RSS と © 表記の意味
質問：下にある RSS と © 2026 Takuma Toiyama って何？  
回答：RSS は読者が「購読」できる仕組み。`/rss.xml` を RSS リーダーアプリ（Feedly等）に登録すると新着記事が通知される。© は著作権表示で「このサイトのコンテンツは私のもの」というサイン。書かなくても著作権は自動発生するので法的効力は実質ない。両方とも消しても問題なし。

## 2026/05/24 - JetBrains Monoで日本語は表示されるか
質問：JetBrains Monoに日本語グリフはないと言っていたが、実際には表示されている  
回答：実際に表示できていたため、フォントをJetBrains Monoに一本化。`--font-en`/`--font-ja` の区別をなくし `--font-body: "JetBrains Mono", sans-serif` に統一した。

---

# 変更ログ

## 2026/05/25 (最新12)
モバイルで making-website 記事を開くと画面全体が縮小される問題の修正を求められた。

原因: 3列テーブルに "Cloudflare" (10文字) など長い単語があり、JetBrains Mono のモノスペース幅でセル内に収まらず、テーブルが iPhone 幅 375px を超えてしまう。iOS Safari は viewport を超える要素があると全体を縮小して画面に収める挙動のため、ページが小さく左上に寄って見える。

- `src/styles/global.css`: テーブルにコードブロックと同じ横スクロール挙動を導入。`table` に `display: block`、`max-width: 100%`、`overflow-x: auto` を追加。セルには `white-space: nowrap` を追加してコードブロック同様に内容を1行で保持。画面幅を超える場合はテーブル単位で横スクロール。

## 2026/05/25 (最新11)
案D は採用せず現状維持。フローティングボタン出現時のスライド距離だけ控えめに調整するよう求められた。

- `src/styles/global.css`: `.floating-btn` の `transform: translateY(8px)` を `translateY(5px)` に変更。出現時の上方向への動きが少しだけ抑えめになる。

## 2026/05/25 (最新10)
言語切替ボタンの UX について案D（ナビボタンが消えてフローティングに「移動」するクロスフェード）の検証モックアップ作成を求められた。

- `mockups/option-d.html` 新規作成: スクロール 300px 超で `#lang-toggle-nav` に `.is-scrolled` を付けて非表示化、同時に `#lang-toggle-floating` に `.visible` を付けて出現させるクロスフェード挙動を実装。両方とも `transition: 220ms ease` で同期。本番には未適用、Obsidian/ブラウザで動作確認用。

## 2026/05/25 (最新9)
言語切替ボタンもスクロールに追従するよう求められた。

- `src/layouts/Layout.astro`: `<button id="lang-toggle-floating" class="floating-btn">` をフローティングで追加（一番上に戻るボタンの上に縦積み）。ナビの `#lang-toggle` とラベル・状態を同期するよう JS をリファクタリング（`langButtons` 配列で両方扱う）。
- `src/styles/global.css`: 個別の `#back-to-top` スタイルを `.floating-btn` 共通クラスに昇格。`#back-to-top` と `#lang-toggle-floating` は `bottom` の値だけ差別化。
- スクロール 300px 超で `.visible` を一括付与し、両ボタンが同時に出現。

## 2026/05/25 (最新8)
画面右下に「一番上に戻る」ボタンの追加を求められた。

- `src/layouts/Layout.astro`: `<button id="back-to-top">`（上矢印 SVG アイコン）をフッターの後に追加。スクロール量が 300px を超えたら `.visible` クラスを付与して表示、クリックで `window.scrollTo({ top: 0, behavior: 'smooth' })`。
- `src/styles/global.css`: 右下固定の円形ボタン（40px、`--color-border` のボーダー）。デフォルト `opacity: 0` + `pointer-events: none` で完全非表示、`.visible` で表示。`translateY` を併用してフェードイン時に少し下から浮き上がる挙動。

## 2026/05/25 (最新7)
記事の言語区切り方式を `<section lang="x">` から `# <!--en-->` / `# <!--ja-->` に移行するよう求められた。Obsidianプレビューで Markdown がちゃんと整形されるようにするため。

- `src/remark/lang-sections.mjs` 新規作成: H1 で唯一の子が `<!--en-->` または `<!--ja-->` というHTMLコメントのノードを検出し、次のマーカーまでのコンテンツを `<section lang="x">` で囲む remarkプラグイン。
- `astro.config.mjs`: `markdown.remarkPlugins` に `remarkLangSections` を追加。
- `src/utils/readingTime.ts`: 新形式（`# <!--en-->` マーカー）から英・日テキストを抽出するロジックに変更。旧形式（`<section lang="x">`）もフォールバックとしてサポート。
- 全既存記事（11ファイル）を新形式に移行: `another-post.md`、`artemis-ii.md`、`dateTest.md`、`git-push-error.md`、`hashcat-password-cracking.md`、`long-title-test.md`、`making website.md`、`my-first-post.md`、`template test.md`、`URL test.md`、`self-hosting-fonts.md`（ユーザーが既に新形式で作成）
- `templates/blog-post.md`: 新形式に更新。空の重複セクションも削除して2マーカー構成にスッキリ。
- 重複した空セクションがあった `dateTest.md` と `URL test.md` も整理。

ビルド検証: 全 29 ページが正常生成、各記事のHTMLに `<section lang="en">` と `<section lang="ja">` が正しく1個ずつ挿入されることを確認。読了時間も新形式から正しく計算される。

## 2026/05/25 (最新6)
post-nav のサイズがまだ揃わない問題の再修正。

- `src/styles/global.css`: `.post-nav .title` に `line-height: 1.4` を明示（body の 1.8 継承を打ち切る）。`min-height` を `height: calc(0.95rem * 1.4 * 2)` に変更し、タイトルが 1 行でも 2 行でも常に 2 行分の固定高さに。これでどのページでも両カードのサイズが完全に揃う。

## 2026/05/25 (最新5)
記事日付・読了時間・タグなど UI のフォントが本文と違うのを統一するよう求められた。

- `src/styles/global.css`: `--font-sans` を `system-ui, -apple-system, sans-serif` から `"JetBrains Mono", sans-serif` に変更。これによりナビ・メタ情報・タグ・フッター・テーブル・post-nav ラベル等もすべて JetBrains Mono になる。日本語文字は sans-serif フォールバックで表示（既存挙動と同じ）。

## 2026/05/25 (最新4)
記事ページ末尾の Older/Newer カードがタイトルの長さで高さがバラつく問題の修正を求められた。

- `src/styles/global.css`: `.post-nav .title` に `-webkit-line-clamp: 2`（2 行で省略）、`min-height`（短いタイトルでも 2 行分の高さを確保）、`overflow-wrap: break-word` を追加。両カードのサイズが常に揃う。

## 2026/05/25 (最新3)
JetBrains Mono をセルフホスト化するよう求められた。Google Fonts への外部リクエストを排除して初回ロードを高速化。

- `public/fonts/JetBrainsMono-latin.woff2` (31KB): 可変フォント。normal の 400/500/700 を 1 ファイルでカバー（Google Fonts API が返す Latin サブセット済み woff2 をダウンロード）
- `public/fonts/JetBrainsMono-italic-latin.woff2` (22KB): italic 専用
- `src/styles/global.css`: 冒頭の `@import url('https://fonts.googleapis.com/...')` を削除し、`@font-face` 宣言 2 つ（normal / italic）に置き換え。`font-weight: 100 800` で可変フォントの全範囲をカバー、`font-display: swap` でフォント読み込み中もフォールバック表示。

合計フォントサイズ ~53KB、外部リクエスト 0 件（旧: fonts.googleapis.com + fonts.gstatic.com の 2 ドメイン）。初回訪問で約 100-200ms の短縮が見込める。

矢印（→ ←）など Latin サブセットに含まれない文字は font stack の `sans-serif` にフォールバックする（既存の挙動と同じ）。

## 2026/05/25 (最新2)
ダークモード・トップページのAbout抜粋・description プレビューの削除を求められた。

- `src/layouts/Layout.astro`: テーマ判定スクリプト、`#theme-toggle` ボタン、トグル用 JS を削除。
- `src/styles/global.css`: `html.dark` ブロック、`--color-hero-bg` 変数、`.hero` 関連スタイル、`.post-desc` スタイルを削除。
- `src/pages/index.astro`: ヒーロー section を削除し、元の `<h1>Welcome to ...` 形式に戻した。description プレビュー行を削除。
- `src/pages/blog/[...page].astro`: description プレビュー行を削除。

About ページ自体（/about）とナビの About リンクは残置。

## 2026/05/25
サイトのリッチ化を求められた（軽量さは維持）。モックアップで確認した機能を本番に全部入れた。

- `src/styles/global.css`: ダークモード用CSS変数（`html.dark`）、進捗バー、アイコンボタン、ヒーロー、section-title、post-list（description + meta + tag）、article-meta、コピーボタン、post-nav（前/次）、footer のスタイルを追加。
- `src/layouts/Layout.astro`: 進捗バー要素、ダークモードトグル＋言語トグル（アイコンボタン化）、About リンク追加、OGP/Twitter meta、RSS link、フッター（GitHub `https://github.com/TobiTakuma` / RSS）、コードコピーボタンを全 `<article> pre` に自動付与する JS、FOUC 防止スクリプトにテーマ判定を追加。
- `src/utils/readingTime.ts` 新規作成: 記事本文から英語の単語数と日本語の文字数を別々にカウントし、英語=200wpm・日本語=500cpmで読了時間を算出。
- `src/pages/index.astro`: ヒーローセクション（日英）、`post-list` クラスで description + 読了時間 + タグバッジ表示。`<>` は Astro パーサで弾かれたので `<Fragment>` を使用。
- `src/pages/blog/[...page].astro`: 同様に `post-list` 形式に変更。
- `src/pages/[...slug].astro`: 記事メタを `article-meta` で統一（日付・読了時間・タグバッジ）、前/次の記事リンク（`post-nav`）を末尾に追加。`getStaticPaths` で sorted 配列から newer/older を渡す。
- `src/pages/about.astro` 新規作成: 日英の自己紹介ページ。
- `src/pages/rss.xml.ts` 新規作成: `@astrojs/rss` で RSS フィード生成。
- `astro.config.mjs`: `site: 'https://takumatechblog.pages.dev'` を設定（RSS の絶対 URL 用、カスタムドメインに変更したら要更新）。
- `package.json`: `@astrojs/rss` を依存に追加。

ビルド確認: `npm run build` で全 26 ページ + `/rss.xml` が正常生成。

## 2026/05/24
making-website記事のレビュー・修正・日英分割を求められた。

- `src/content/blog/making website.md`: 誤字修正（ClaudFlare→Cloudflare、Regisrar→Registrar）、DNS説明の不正確な記述を修正（「DNSを変えられない」→「ネームサーバーをCloudflare以外に変更できない」）、テスト文字列を削除、英語セクションを新規作成（シンプルな文法で）、日英セクションに分割。

## 2026/05/24
フォントをJetBrains Monoに統一するよう求められた。

- `src/styles/global.css`: `--font-en`/`--font-ja` を廃止し `--font-body: "JetBrains Mono", sans-serif` に一本化。Noto Sans JPのimportも削除。`html.ja` のフォント上書きも削除。

## 2026/05/24
記事一覧から記事を開いた後、元のページ（2ページ目など）に戻れるようにするよう求められた。

- `src/pages/[...slug].astro`: `document.referrer` でどのブログ一覧ページから来たかを取得し `sessionStorage` に保存。「Back to blog」リンクがその URL を使って戻る。直接アクセスの場合は `/blog` にフォールバック。

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
