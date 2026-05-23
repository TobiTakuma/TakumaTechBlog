---
title: "hashcatを使ったパスワードのクラッキング"
title_en: "Password Cracking with hashcat"
pubDate: 2026-04-21T10:00
description: "hashcatの基本的な使い方と攻撃モードのまとめ"
tags: ["Security", "CTF"]
url: "hashcat-password-cracking"
---

<section lang="en">

## Install via Homebrew

```bash
brew install hashcat
```

## Basic Syntax

```bash
hashcat -m [hash-type] -a [attack-mode] [hash-file] [wordlist/mask]
```

## Hash Types (`-m`)

| Value | Type |
|-------|------|
| 0 | MD5 |
| 100 | SHA1 |
| 1800 | SHA-512 (Unix) |
| 3200 | bcrypt |
| 1000 | NTLM (Windows) |

## Attack Modes (`-a`)

Run `hashcat --help` for the full list.

| Value | Mode |
|-------|------|
| 0 | Dictionary attack |
| 1 | Combination attack |
| 3 | Brute-force (mask attack) |
| 6 | Wordlist + mask |
| 7 | Mask + wordlist (reverse of mode 6) |
| 9 | Association |

## Dictionary Attack (MD5)

```bash
hashcat -m 0 -a 0 hashes.txt wordlist.txt
```

You can also replace `hashes.txt` with the raw hash value directly.

## Hybrid Attack

```bash
hashcat -a 6 -m 0 13445cbc17a1400afce3589e9a969264 rockyou.txt "@?d?d?d"
```

This combines the `rockyou.txt` wordlist with a mask that appends `@` followed by three digits. In this example, the target password was `xxterrixx@420`.

</section>

<section lang="ja">

## hashcatをbrewでインストール

```bash
brew install hashcat
```

## 基本的な構文

```bash
hashcat -m [ハッシュタイプ] -a [攻撃モード] [ハッシュファイル] [辞書/マスク]
```

## -m（ハッシュタイプ）の主な値

| コマンド | 種類 |
|----------|------|
| 0 | MD5 |
| 100 | SHA1 |
| 1800 | SHA-512(Unix) |
| 3200 | bcrypt |
| 1000 | NTLM(Windows) |

## -a（攻撃モード）の主な値

`hashcat --help` より参照。

| コマンド | 種類 |
|----------|------|
| 0 | 辞書攻撃 |
| 1 | 組み合わせ攻撃 |
| 3 | ブルートフォース（マスク攻撃） |
| 6 | ワードリスト＋マスク |
| 7 | マスク＋ワードリスト（6と逆順で試す） |
| 9 | Association |

## 辞書攻撃（MD5）

```bash
hashcat -m 0 -a 0 hashes.txt wordlist.txt
```

`hashes.txt` の部分はそのままハッシュ値に置き換えても良い。

## ハイブリッドアタック

```bash
hashcat -a 6 -m 0 13445cbc17a1400afce3589e9a969264 rockyou.txt "@?d?d?d"
```

`rockyou.txt` の辞書に加えて、`@???`（`?d` は任意の数字）を試すマスクを追加している。今回の例では `xxterrixx@420` というパスワードを解読した。

</section>
