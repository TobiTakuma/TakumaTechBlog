---
title: ankitangov2(txt、csvファイルに対応、geminiが利用可能)
title_en: ankitangov2(use .txt and .csv, generate with gemini)
pubDate: 2026-06-05T18:08
description: ankitango update news
tags:
  - DevLog
  - ankitango
url: ankitangov2
---

# <!--en-->

## 1.ankitango now supports .txt and .csv file
This update adds support for importing words from `.txt` and `.csv`.
To use this feature, I added a new `-f` option.

```bash
ankitango add -f word.txt wordList
ankitango add -f word.csv wordList
```

Also, if the connection to anki is lost while adding words, a file called`fail.txt` is created in a same directory as a word file.
## 2.Gemini can now be used with ankitango
```bash
ankitango config apikey <key> #original config command
```

We've updated this so that you can now specify which LLM to use

```bash
ankitango config apikey <provider> <key> #new config command
```

Users can choose OpenAI or Gemini now, but I will also make it possible to use local LLMs.
I also made a change to the optional configuration command so that users can choose the AI model they want to use.
```bash
ankitango config apikey gemini "AIza...xyz" gemini-2.5-flash
```

# <!--ja-->
## 1.ankitangoが.txt .csvファイルに対応
大量の単語を一気に追加する時に`.txt`と`.csv`ファイルを使えるようになった。
これに伴い新たに`-f`というオプションを追加した

```bash
ankitango add -f word.txt wordList
ankitango add -f word.csv wordList
```

また単語を追加している途中にankiとの接続が切れてしまった場合などは、wordファイルがあるディレクトリにfall.txtを作成し、そこに失敗した単語が追加されていく

## 2.ankitangoがgeminiに対応
無料枠の多いgeminiが使えるようになった。
それに合わせて、configコマンドの仕様を変更。
今まではapiキーのみを設定し、openAIのモデルのみが使用可能だった。
```bash
ankitango config apikey <key> #元々のconfigコマンド
```

これを変更し、使うLLMも指定できるようにした

```bash
ankitango config apikey <provider> <key> #新しいコマンド
```

現在対応しているのはopenAIとGeminiのみだが、今後ローカルLLMなども対応させていく予定。
またオプションとして使うモデルも変更できるようにした。
```bash
ankitango config apikey gemini "AIza...xyz" gemini-2.5-flash
```
