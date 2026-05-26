// 記事本文から読了時間を計算する
// 英語: 約200 words/min、日本語: 約500 文字/min を目安に計算
//
// マーカー形式（# <!--en--> / # <!--ja-->）と旧形式（<section lang="x">）の両方に対応

export function getReadingTime(body: string): { en: number; ja: number } {
  let enText = '';
  let jaText = '';

  // 新形式: # <!--en--> / # <!--ja--> マーカーで分割
  const markerRe = /^#\s*<!--\s*(en|ja)\s*-->\s*$/;
  let currentLang: 'en' | 'ja' | null = null;
  let foundMarker = false;

  for (const line of body.split('\n')) {
    const m = line.match(markerRe);
    if (m) {
      currentLang = m[1] as 'en' | 'ja';
      foundMarker = true;
      continue;
    }
    if (currentLang === 'en') enText += line + '\n';
    else if (currentLang === 'ja') jaText += line + '\n';
  }

  // 旧形式フォールバック: <section lang="...">
  if (!foundMarker) {
    const enMatch = body.match(/<section lang="en">([\s\S]*?)<\/section>/);
    if (enMatch) enText = enMatch[1];
    const jaMatch = body.match(/<section lang="ja">([\s\S]*?)<\/section>/);
    if (jaMatch) jaText = jaMatch[1];
  }

  // 何も抽出できなければ body 全体から両方カウント
  if (!enText && !jaText) {
    enText = body;
    jaText = body;
  }

  const enWords = (enText.match(/[a-zA-Z]+(?:'[a-zA-Z]+)?/g) || []).length;
  const jaChars = (jaText.match(/[぀-ゟ゠-ヿ一-龯]/g) || []).length;

  return {
    en: Math.max(1, Math.ceil(enWords / 200)),
    ja: Math.max(1, Math.ceil(jaChars / 500)),
  };
}
