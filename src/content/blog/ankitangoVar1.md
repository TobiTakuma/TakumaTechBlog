---
title: Ankiを便利にするCLIツール「ankitango」を作った
title_en: I created CLI tool for Anki called ankitango
pubDate: 2026-05-29T17:07
description: I created a CLI tool to make Anki more convenient
tags:
  - DevLog
url: ankitangoVar1
---

# <!--en-->

## [ankitango](https://github.com/TobiTakuma/ankitango)

A CLI tool that automatically generates translations and example sentences using AI, then adds them to Anki. I created this because manually adding cards to Anki was a hassle.  

## Demo

```bash
ankitango add "choice" "test"

Generating...
{
  "Front": "choice",
  "Front_Sentence": "It's important to make the right choice when it comes to your career.",
  "Back": "選択",
  "Back_Sentence": "キャリアに関して正しい選択をすることが重要です。"
}
Success!
```

## Architecture Diagram
```mermaid
flowchart LR
    User["User<br/>ankitango add"] -->|word| CLI
    CLI["ankitango<br/>Go + Cobra"] -->|generate request| OpenAI["OpenAI API<br/>Generates sentence & translation"]
    OpenAI -->|sentence & translation| CLI
    CLI -->|card data| AnkiConnect["AnkiConnect<br/>HTTP API"]
    AnkiConnect --> Anki["Anki"]
```
## Tech Stack
- Language: Go
- CLI: cobra (add / list / config commands)
- External Services:
  - OpenAI API - generates translations & example sentences
  - AnkiConnect - adds the generated cards to Anki and lists Anki decks
- Config storage: JSON file (~/.config/ankitango/config.json)
- Distribution: GoReleaser + GitHub Actions

## References
1. [【完全ガイド】Go で CLI ツールを作り、リリースまで一気通貫！](https://zenn.dev/momosuke/articles/how-to-develope-cli-by-go)


## For installation and usage details, see the [README](https://github.com/TobiTakuma/ankitango/blob/main/README.md)

# <!--ja-->

## [ankitango](https://github.com/TobiTakuma/ankitango)

AIで翻訳と例文を自動生成し、そのままAnkiにカードとして追加するCLIツール。手動でAnkiにカードを追加するのが面倒だったので作った。

## デモ

```bash
ankitango add "choice" "test"

Generating...
{
  "Front": "choice",
  "Front_Sentence": "It's important to make the right choice when it comes to your career.",
  "Back": "選択",
  "Back_Sentence": "キャリアに関して正しい選択をすることが重要です。"
}
Success!
```

## アーキテクチャ図
```mermaid
flowchart LR
    User["ユーザー<br/>ankitango add"] -->|単語| CLI
    CLI["ankitango<br/>Go + Cobra"] -->|生成リクエスト| OpenAI["OpenAI API<br/>例文・翻訳を生成"]
    OpenAI -->|例文・訳| CLI
    CLI -->|カードデータ| AnkiConnect["AnkiConnect<br/>HTTP API"]
    AnkiConnect --> Anki["Anki"]
```
## テックスタック
- 言語: Go
- CLI: cobra（add / list / config コマンド）
- 外部サービス:
  - OpenAI API - 翻訳と例文を生成
  - AnkiConnect - 生成したカードをAnkiに追加・Ankiのデッキ一覧を取得
- 設定の保存先: JSONファイル（~/.config/ankitango/config.json）
- 配布: GoReleaser + GitHub Actions

## 参考
1. [【完全ガイド】Go で CLI ツールを作り、リリースまで一気通貫！](https://zenn.dev/momosuke/articles/how-to-develope-cli-by-go)


## インストール・使い方の詳細は [README](https://github.com/TobiTakuma/ankitango/blob/main/README.md) を参照