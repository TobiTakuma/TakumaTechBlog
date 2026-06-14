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

