---
title: Cloudflare PagesとClaude Codeで自分のWebサイトを作った
title_en: I Built My Website with Cloudflare Pages and Claude Code
pubDate: 2026-05-23T21:34
description: Cloudflare PagesとClaude Codeを使って個人ブログを作った記録
tags:
  - Astro
  - Blog
url: making-website
---

# <!--en-->

## Introduction

I made my own website using Cloudflare Pages and Claude Code.
I thought making a blog was hard and expensive. But Cloudflare Pages is free and easy to use.

## How to Use Cloudflare Pages

You can make a site in just a few minutes.
See the reference link at the bottom for more details.

1. Make a GitHub account
2. Make a Cloudflare account. Linking it to GitHub makes things easier
3. Make a new GitHub repository and push your code
4. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Compute → Workers & Pages → Create → Pages → Connect to Git → Pick your repository → Deploy
5. Wait a moment for the deploy to finish
6. Done

After linking GitHub, every new push is automatically shown on your site.

## Custom Domain

### Buying a Domain

I bought a custom domain from [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/). It has some good points: no markup on domain prices, free WHOIS privacy, and good security.

One thing to know: you cannot move the nameservers away from Cloudflare. But you can still edit DNS records (like A records and CNAMEs) in the Cloudflare dashboard.

My domain was $10.46, and the renewal price stays the same.

### How to Set It Up

Go to the Domains section in your Cloudflare Pages project. Click "Add domain" and pick your domain. It updates automatically in a few minutes.

### Cloudflare Pages vs GitHub Pages

GitHub Pages is a similar service. Here is a quick comparison:

|                      | GitHub Pages       | Cloudflare Pages        |
| -------------------- | ------------------ | ----------------------- |
| Best for             | Simple static sites | Full web apps          |
| Framework support    | Jekyll             | Many frameworks         |
| Bandwidth (free)     | 100 GB/month       | Unlimited               |
| Serverless functions | No                 | Yes (JavaScript)        |
| Asset optimization   | No                 | Yes                     |
| Infrastructure       | GitHub             | Cloudflare global CDN   |

GitHub Pages is simple and good for static pages. Cloudflare Pages works for both static sites and dynamic web apps.

## How I Built It

I used Claude Code for almost all the HTML and CSS. I do not know much about front-end development, so I let it do most of the work. The site is simple, but it works well as a blog.

I used Astro as the framework.

## References

1. [無料で簡単、爆速でWebサイトを立ち上げる方法【GitHub + Cloudflare Pages】](https://qiita.com/norasuke/items/c9b517a19b8f74858001)
2. [Cloudflareのregistrarを使うメリットとは？特徴を解説！](https://www.it-tool-labo.top/cloudflare%E3%81%AEregistrar%E3%82%92%E4%BD%BF%E3%81%86%E3%83%A1%E3%83%AA%E3%83%83%E3%83%88%E3%81%A8%E3%81%AF%EF%BC%9F%E7%89%B9%E5%BE%B4%E3%82%92%E8%A7%A3%E8%AA%AC%EF%BC%81/)
3. [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)
4. [GitHub Pages VS Cloudflare Pages](https://jamstacky.com/comparision/github-pages-vs-cloudflare-pages/)
5. [【初心者】Astroでホームページ作成チュートリアル](https://qiita.com/takeshi_du/items/bb34d9621ed05ce26ea9)

# <!--ja-->

## はじめに

CloudflareとClaude Codeでホームページを作った。
自分でブログを作るのはお金もかかるし難しいというイメージがあったが、調べてみたところCloudflare Pagesというサービスを使うことで簡単で無料かつ高品質なサイトが作れるらしい。

## Cloudflare Pagesの簡単な使い方

作るだけならほんの数分で作ることができる。
詳しい説明は[下記](https://qiita.com/norasuke/items/c9b517a19b8f74858001)のサイトを参照。

1. GitHubのアカウントを作る
2. Cloudflareのアカウントを作る。その際GitHubのアカウントを利用するとコードの管理が簡単になる
3. GitHubに新たなリポジトリを作り、コードを置く
4. [Cloudflare](https://dash.cloudflare.com/)にアクセス → Compute → Workers & Pages → Create → Pages → Connect to Git → リポジトリを選択 → デプロイ
5. デプロイに少し時間がかかるが完了するとサイトにアクセスできるようになる
6. 完成

GitHubと連携している場合、GitHub側に新しくpushされたバージョンが自動的にサイトにも反映される。

## 独自ドメイン

### 購入

今回は独自ドメインを設定した。購入場所は[Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)というCloudflareが提供しているドメイン登録・管理サービス。ドメインを原価で提供してくれたり、WHOIS情報のプライバシー保護、セキュリティといった複数の利点がある。

ただしCloudflare Registrarで買ったドメインはネームサーバーをCloudflare以外に変更できないという制限がある。DNSレコード（AレコードやCNAMEなど）自体はCloudflareのダッシュボード上で自由に編集できる。

僕が買ったドメインは$10.46で更新金額も固定のまま。

### 設定方法

Cloudflare PagesのDomainsから簡単に変更できる。Add domainをクリックすると自分の持っているドメインが表示されるため、そこから選ぶだけ。
数分後自動で更新され、新しいドメインにアクセスできるようになる。

### GitHub Pagesとの違い

似たようなサービスでGitHub Pagesというものもある。

|              | GitHub Pages            | Cloudflare Pages               |
| ------------ | ----------------------- | ------------------------------ |
| 用途           | シンプルな静的サイト              | 本格的なWebアプリ                     |
| フレームワーク      | Jekyllが最適               | 幅広く対応                          |
| 帯域（無料枠）      | 100GB/month             | 無制限                            |
| サーバーレス関数     | なし                      | JavaScript対応                   |
| アセット最適化      | なし                      | 圧縮・最小化に対応                      |
| インフラ         | GitHub                  | Cloudflareのグローバルネットワーク         |

GitHub Pagesは、GitHubリポジトリから直接ページを公開できるシンプルなサービスで、静的ページに向いている。一方、Cloudflare PagesはグローバルなCDNネットワーク上にデプロイでき、静的サイトだけでなく動的なウェブアプリやAPIにも対応している。

## 実装

今回HTMLやCSSなど目に見える部分はほとんどClaude Codeを用いて実装した。僕はこの二つについてほとんど知識がないためほとんど全てを任せる形となった。具体的な実装イメージが沸かなかったのでかなり簡素なサイトになったが、ブログ・ホームページとしての体裁は保てていると思う。

フレームワークにはAstroを採用した。

## 参考

1. [無料で簡単、爆速でWebサイトを立ち上げる方法【GitHub + Cloudflare Pages】](https://qiita.com/norasuke/items/c9b517a19b8f74858001)
2. [Cloudflareのregistrarを使うメリットとは？特徴を解説！](https://www.it-tool-labo.top/cloudflare%E3%81%AEregistrar%E3%82%92%E4%BD%BF%E3%81%86%E3%83%A1%E3%83%AA%E3%83%83%E3%83%88%E3%81%A8%E3%81%AF%EF%BC%9F%E7%89%B9%E5%BE%B4%E3%82%92%E8%A7%A3%E8%AA%AC%EF%BC%81/)
3. [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)
4. [GitHub Pages VS Cloudflare Pages](https://jamstacky.com/comparision/github-pages-vs-cloudflare-pages/)
5. [【初心者】Astroでホームページ作成チュートリアル](https://qiita.com/takeshi_du/items/bb34d9621ed05ce26ea9)
