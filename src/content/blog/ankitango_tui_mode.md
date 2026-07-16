---
title: ankitangoでtuiが使用可能
title_en: available tui mode on ankitango
pubDate: 2026-07-15T17:17
description: available tui mode on ankitango
tags:
  - ankitango
url: ankitango_tui_mode
---

# <!--en-->
## Implement TUI mode(only add command)
I implement TUI(Text based User Interface) on ankitango.
This enable intuitive operation.
You can use TUI mode only add command now.

```bash
ankitango tui
```

1. **Deck** — type a deck name and press Enter. ankitango checks that Anki is running and the deck exists. The deck you used last time is remembered and pre-filled.

2. **Word** — type a word and press Enter to generate the translation and example sentences.

3. **Review** — the generated result is shown.

	- `enter` : add it to Anki
	- `r` : regenerate
	- `b` : go back and change the word

4. **Success** — after adding, press `enter` to add another word (back to step 2).

# <!--ja-->
## TUIモードを実装(addコマンドのみ)
ankitangoにTUI(Text based User Interface)を実装しました。
これにより、コマンドを打つよりも直感的に操作することができます。
現在はaddコマンドのみTUIで使用可能です。
## 使い方
```bash
ankitango tui
```

TUIモードで単語を追加する時４つの手順があります。

1. **Deckの指定** — Deckを指定し、エンターを押してください。DeckがAnkiに存在しない場合エラーが出ます。一番最近に使用したDeckはローカルに保存され、次回TUIモードを使用した時、テキストボックスに自動で入力されます。

2. **単語を入力** — 単語を入力してください。エンターを押すとAIが例文の生成を行います。

3. **生成結果の確認**
	- `enter` : 生成された結果をAnkiに追加します。
	- `r` : 例文と翻訳を再生成します
	- `b` : 単語を入力するページに戻ります。

4. **結果** —  カードの追加に成功した場合、エンターでステップ2に戻ります。

いずれの手順においても`esc` / `ctrl+c`でTUIモードを終了します。
