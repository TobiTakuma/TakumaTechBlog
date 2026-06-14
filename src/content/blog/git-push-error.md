---
title: "push時エラー「error: failed to push some refs」の原因と解決法"
title_en: "Git Push Error: failed to push some refs"
pubDate: 2026-04-30T10:00
description: "Git Push Error: failed to push some refs"
tags:
  - Git
url: git-push-error
---

# <!--en-->

## Problem

This error occurs when your local branch and the remote have diverged — both have commits the other doesn't know about.

```
Initial commit
↓
A ── B ── D   (local)
      \
       C      (GitHub)
       ↑
Someone committed directly on GitHub
```

In this case, the cause was adding and committing a README directly on GitHub.

## Solution

```bash
git pull --rebase
```

This replays your local commits on top of the remote, resulting in a clean linear history:

```bash
A -- B -- C -- D
```

After that, `git push` works without issues.

# <!--ja-->

## 問題

このエラーは同じ地点からリモートとローカルが別々に変更されてしまった状態を表している。

```
最初のコミット
↓
A ── B ── D   (ローカル)
      \
       C      (GitHub側)
       ↑
誰か（or自分）がGitHub上でcommit
```

今回の場合、GitHub側でREADMEを追加しコミットしたことが問題だった。

## 解決法

```bash
git pull --rebase
```

これをすることで

```bash
A -- B -- C -- D
```

と綺麗に並べることができ、その後にpushすると問題なく更新できた。
