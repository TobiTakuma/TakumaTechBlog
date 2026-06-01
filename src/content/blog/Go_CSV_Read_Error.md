---
title: go言語CSVファイル読み取りエラー「wrong number of fields」
title_en: Go lang CSV read Error "wrong number of fields"
pubDate: 2026-06-01T09:26
description: go言語csv読み取り時のエラー解説
tags:
  - DevLog
url: Go_CSV_Read_Error
---

# <!--en-->

## Problem
Original Code
```Go
package main

import "encoding/csv"

func readWord(path string) {
	file, err := os.Open(path)
	if err != nil {
		fmt.Println("Error: could not open file: ", path)
		return []string{}
	}
	defer file.Close()

	var words []string
	
	reader := csv.NewReader(file)
	records, err := reader.ReadAll()　//read csv file
	if err != nil {
		fmt.Println("Error: failed to read CSV: ", err)
		return []string{}
	}
	for _, record := range records {
		for _, cell := range record {
			w := strings.TrimSpace(cell)
			if w != "" {
				words = append(words, w)
			}
		}
	}
	return words
}
```
CSV file
```csv
apple,banana,orange

grape,melon

strawberry
```

This error means one row has a different number of cells than the first row. By default, `ReadAll()` expects every row to have the same number of cells as the first row. So when rows have different numbers of cells, like the CSV above, it does not work.

## Solution
```Go
package main

import "encoding/csv"

func readWord(path string) {
	file, err := os.Open(path)
	if err != nil {
		fmt.Println("Error: could not open file: ", path)
		return []string{}
	}
	defer file.Close()

	var words []string
	
	reader := csv.NewReader(file) //read csv file
	reader.FieldsPerRecord = -1
	records, err := reader.ReadAll()
	if err != nil {
		fmt.Println("Error: failed to read CSV: ", err)
		return []string{}
	}
	for _, record := range records {
		for _, cell := range record {
			w := strings.TrimSpace(cell)
			if w != "" {
				words = append(words, w)
			}
		}
	}
	return words
}
```

Insert `reader.FieldsPerRecord = -1` between `reader := csv.NewReader(file)` and `records, err := reader.ReadAll()` (line 16). As mentioned earlier, by default it uses the first row's cell count, but adding this option lets it read the file even when each row has a different number of cells.

# <!--ja-->

## 問題
元のコード
```Go
package main

import "encoding/csv"

func readWord(path string) {
	file, err := os.Open(path)
	if err != nil {
		fmt.Println("Error: could not open file: ", path)
		return []string{}
	}
	defer file.Close()

	var words []string
	
	reader := csv.NewReader(file)
	records, err := reader.ReadAll()　//読み取っている部分
	if err != nil {
		fmt.Println("Error: failed to read CSV: ", err)
		return []string{}
	}
	for _, record := range records {
		for _, cell := range record {
			w := strings.TrimSpace(cell)
			if w != "" {
				words = append(words, w)
			}
		}
	}
	return words
}
```
CSVファイル
```csv
apple,banana,orange

grape,melon

strawberry
```

このエラーは「二行目のセルが他と違う」というエラー。16行目の`ReadAll()`は１行目のセル数を基準とするため、今回のように１行目と２行目のセル数が異なる場合正しく動作しない。

## 解決法
```Go
package main

import "encoding/csv"

func readWord(path string) {
	file, err := os.Open(path)
	if err != nil {
		fmt.Println("Error: could not open file: ", path)
		return []string{}
	}
	defer file.Close()

	var words []string
	
	reader := csv.NewReader(file) //読み取っている部分
	reader.FieldsPerRecord = -1
	records, err := reader.ReadAll()
	if err != nil {
		fmt.Println("Error: failed to read CSV: ", err)
		return []string{}
	}
	for _, record := range records {
		for _, cell := range record {
			w := strings.TrimSpace(cell)
			if w != "" {
				words = append(words, w)
			}
		}
	}
	return words
}
```

15行目`reader := csv.NewReader(file)`の後に`reader.FieldsPerRecord = -1`を入れる。  
前述の通りデフォルトでは１行目のセル数を参照するが、このオプションを足すことでバラバラの行数でも読むことができる。