// 記事本文から読了時間を計算する
// 英語: 約200 words/min、日本語: 約500 文字/min を目安に計算

export function getReadingTime(body: string): { en: number; ja: number } {
  // 英語セクションを抽出（なければ body 全体から英単語をカウント）
  const enMatch = body.match(/<section lang="en">([\s\S]*?)<\/section>/);
  const enText = enMatch ? enMatch[1] : body;
  const enWords = (enText.match(/[a-zA-Z]+(?:'[a-zA-Z]+)?/g) || []).length;

  // 日本語セクションを抽出（なければ body 全体から CJK 文字をカウント）
  const jaMatch = body.match(/<section lang="ja">([\s\S]*?)<\/section>/);
  const jaText = jaMatch ? jaMatch[1] : body;
  const jaChars = (jaText.match(/[぀-ゟ゠-ヿ一-龯]/g) || []).length;

  return {
    en: Math.max(1, Math.ceil(enWords / 200)),
    ja: Math.max(1, Math.ceil(jaChars / 500)),
  };
}
