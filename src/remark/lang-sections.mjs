// 言語マーカー形式の H1（# <!--en--> や # <!--ja-->）を <section lang="x"> に変換する remark プラグイン
//
// 入力 (Markdown):
//   # <!--en-->
//   ## Heading
//   Content
//   # <!--ja-->
//   ## 見出し
//   コンテンツ
//
// 出力 (AST → 最終的な HTML):
//   <section lang="en">
//     <h2>Heading</h2>
//     <p>Content</p>
//   </section>
//   <section lang="ja">
//     <h2>見出し</h2>
//     <p>コンテンツ</p>
//   </section>

function getMarkerLang(node) {
  // H1 で、唯一の子が <!--en--> または <!--ja--> という HTML コメントの場合のみマーカーと判定
  if (node.type !== 'heading' || node.depth !== 1) return null;
  if (!node.children || node.children.length !== 1) return null;
  const child = node.children[0];
  if (child.type !== 'html') return null;
  const match = child.value.match(/^<!--\s*(en|ja)\s*-->$/);
  return match ? match[1] : null;
}

export function remarkLangSections() {
  return (tree) => {
    const newChildren = [];
    let currentLang = null;

    for (const node of tree.children) {
      const markerLang = getMarkerLang(node);

      if (markerLang) {
        // 直前の section を閉じる
        if (currentLang) {
          newChildren.push({ type: 'html', value: '</section>' });
        }
        // 新しい section を開く
        newChildren.push({ type: 'html', value: `<section lang="${markerLang}">` });
        currentLang = markerLang;
        // マーカー H1 自体は出力しない
      } else {
        newChildren.push(node);
      }
    }

    // 最後の section を閉じる
    if (currentLang) {
      newChildren.push({ type: 'html', value: '</section>' });
    }

    tree.children = newChildren;
  };
}
