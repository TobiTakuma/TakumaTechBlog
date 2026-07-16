---
title: Goのインポートを簡単に
title_en: Easily import Go
pubDate: 2026-06-13T14:04
description: Easily import Go
tags:
  - DevLog
url: goimports
---

# <!--en-->
install
```bash
go install golang.org/x/tools/cmd/goimports@latest
```
run
```bash
goimports -w cmd/*.go
```
# <!--ja-->
インストール
```bash
go install golang.org/x/tools/cmd/goimports@latest
```

実行
```bash
goimports -w cmd/*.go
```

- gofmt：Go標準。インデントや書式を整える（import の追加・削除はしない）
- goimports：gofmt の全機能 ＋ import の自動追加・削除。Goチーム公式（golang.org/x/tools 配下）だが、標準には同梱されないので別途インストールが必要
- 多くのエディタ（VS Code の Go拡張など）は保存時に goimports を自動実行する設定があり、普段はツールの存在を意識せず import が勝手に整います

使うには

標準には入っていないので最初だけインストール：
```bash
go install golang.org/x/tools/cmd/goimports@latest
```
これで ~/go/bin/goimports が入ります（ankitango をビルドしたのと同じ仕組み）。あとはルートで goimports -w . を打てば全 .go の import が整います。

もし goimports: command not found が出たら、~/go/bin に PATH が通っているか確認してください（以前 export PATH=$PATH:$HOME/go/bin を .zshrc に足したのと同じ場所です）。
