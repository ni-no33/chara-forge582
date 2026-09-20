import { CharacterProfile } from '../types/character';

export interface PromptTemplate {
  id: string;
  category: string;
  title: string;
  description: string;
  generate: (char: CharacterProfile) => string;
}

export const GEMINI_PROMPTS: PromptTemplate[] = [
  {
    id: 'deepen-conflict',
    category: '深掘り・葛藤',
    title: '生々しい葛藤と弱みの深掘り',
    description: 'ありがちなテンプレ設定を壊し、人間味のある哀愁やコンプレックスを引き出すプロンプト',
    generate: (char: CharacterProfile) => [
      'あなたは厳しい視点を持つ熟練のキャラクタープロデューサー・劇作家です。',
      '以下のキャラクターの骨組みを読み、ありがちな「テンプレキャラ」から脱却して、実在の人間のような【生々しい葛藤・弱み・コンプレックス】を持たせるためのアイデアを3パターン提案してください。',
      '',
      '特に以下の観点を掘り下げてください：',
      '1. 「本人が絶対に隠したい恥ずかしい本音」',
      '2. 「なぜその外面（ペルソナ）を演じるようになったのかの痛ましい契機」',
      '3. 「何を踏みにじられたら普段の態度が完全に崩壊するか（逆鱗）」',
      '',
      '【対象キャラクター情報】',
      '名前: ' + char.name + ' (' + (char.title || '') + ')',
      '世界観: ' + char.world,
      '概要: ' + char.summary,
      '現在の外面: ' + char.persona,
      '現在の内面: ' + char.shadow,
      'コアの恐怖: ' + char.coreFear
    ].join('\n')
  },
  {
    id: 'deepen-gap',
    category: 'ギャップ・生活感',
    title: '外聞と自己評価のギャップ＆生活感',
    description: '周囲の評判と本人の本音のズレ、愛着が湧く致命的なポンコツ領域を発掘するプロンプト',
    generate: (char: CharacterProfile) => [
      'あなたはキャラクターの生活感や愛嬌（ギャップ萌え）を引き出す演出家です。',
      '以下のキャラクターに「生きて呼吸しているリアリティ」と「愛すべき不器用さ」を加えるため、以下の項目を具体的に3パターン提案してください。',
      '',
      '1. 【外聞と自己評価のズレ】周囲からどう噂され、それに対して本人は内心どう凹んでいるか',
      '2. 【致命的なポンコツ領域】戦闘や研究は一流なのに、私生活で信じられないほど不器用なこと',
      '3. 【休日の過ごし方・部屋の散らかり方】誰も見ていないプライベート空間での無防備な姿',
      '',
      '【対象キャラクター情報】',
      '名前: ' + char.name,
      '性格概要: ' + char.persona + ' / ' + char.shadow,
      '口調: 一人称「' + char.firstPerson + '」、二人称「' + char.secondPerson + '」'
    ].join('\n')
  },
  {
    id: 'deepen-dynamics',
    category: '対人関係',
    title: '{{user}}との心の壁が溶ける4段階プロセス',
    description: '警戒心から信頼、そして重い愛着に至るグラデーションを鮮やかに描くプロンプト',
    generate: (char: CharacterProfile) => [
      'あなたは心理描写に長けたライトノベル作家・シナリオライターです。',
      '以下のキャラクターと【{{user}}】との距離感が、出会いから徐々に縮まり、最終的にかけがえのない存在に至るまでの「4段階の変化ストーリー」を提案してください。',
      '',
      '特に「どんな具体的な出来事や一言がきっかけで心の壁（警戒度）にヒビが入るか」をドラマチックに描いてください。',
      '',
      '【対象キャラクター情報】',
      '名前: ' + char.name,
      '現在の関係: ' + char.userRelation,
      '性格: ' + char.persona + ' (内面: ' + char.shadow + ')',
      '一人称: ' + char.firstPerson + ' / 二人称: ' + char.secondPerson
    ].join('\n')
  },
  {
    id: 'safe-intimacy',
    category: '親密性・NSFW',
    title: '情緒的・親密なギャップと弱点の深掘り（安全フィルター対応）',
    description: 'AIのセーフティに引っかからない情緒的・心理的表現で、夜の態度や弱点を相談するプロンプト',
    generate: (char: CharacterProfile) => [
      'あなたは繊細な恋愛・人間ドラマを描く作家です。',
      '以下のキャラクターが、心から信頼した相手（{{user}}）と二人きりの親密な空間で見せる「普段との劇的なギャップ・脆さ・無防備な甘え方」を心理学的に掘り下げてください。',
      '',
      '直接的な露骨な表現を避け、以下の情緒的・身体的なサインを中心に3パターン提案してください：',
      '1. 普段は強がっているキャラが、触れられた時に見せる恥じらい・視線・声の震え',
      '2. 言葉責めやからかいに対する無力な反応',
      '3. 相手に対する独占欲や「見捨てないで」という執着の表れ方',
      '',
      '【対象キャラクター情報】',
      '名前: ' + char.name,
      '外面: ' + char.persona,
      '内面: ' + char.shadow,
      '口癖・セリフ例: ' + (char.stressTestCompliment || char.catchphrases)
    ].join('\n')
  },
  {
    id: 'sdxl-tags',
    category: 'SDXL・外見',
    title: 'Danbooruタグ＆プロンプト最適化',
    description: '現在の外見設定から、SDXL/Pony/Animagineで破綻しないDanbooruタグを生成させるプロンプト',
    generate: (char: CharacterProfile) => [
      'あなたは画像生成AI（Stable Diffusion XL / Animagine XL / Pony Diffusion）のプロンプトエンジニアです。',
      '以下のキャラクター外見設定を読み取り、画像生成AIで一発でそのキャラの特徴を再現できる【Danbooruタグ形式のベースプロンプト】と【ネガティブプロンプト】を作成してください。',
      '',
      '特に「シルエットで識別できる固有記号」を明確にタグ化してください。',
      '',
      '【キャラクター外見】',
      '名前: ' + char.name,
      '性別・種族: ' + char.gender + ', ' + char.species,
      '髪型・色: ' + char.hairStyle + ', ' + char.hairColor,
      '瞳: ' + char.eyeColor + ' (' + char.eyeFeatures + ')',
      '固有の特徴: ' + char.anchorFeatures,
      '服装: ' + char.defaultOutfit,
      'パーソナルカラー: ' + char.personalColors
    ].join('\n')
  },
  {
    id: 'etude-roleplay',
    category: 'ロールプレイ',
    title: '【即興劇】Geminiにキャラを演じてもらうエチュード',
    description: 'Geminiにこのキャラになりきってもらい、対話しながら反応をテストするプロンプト',
    generate: (char: CharacterProfile) => [
      'あなたは今から以下の設定を持つ【' + char.name + '】としてロールプレイを行ってください。',
      '私は【{{user}}】としてあなたと対話します。',
      '',
      '【あなたのキャラクター設定】',
      '名前: ' + char.name + ' (' + (char.title || '') + ')',
      '外面: ' + char.persona,
      '内面: ' + char.shadow,
      '一人称: ' + char.firstPerson + ' / 二人称: ' + char.secondPerson,
      '口調・特徴: ' + (char.voiceTone || char.catchphrases),
      '現在の{{user}}との関係: ' + char.userRelation,
      '',
      '【初期シチュエーション】',
      '雨が激しく降る夜、人里離れた隠れ家のリビング。暖炉の前で濡れた服を乾かしながら二人きりで過ごしている。',
      'あなたは普段通り強がって距離を取ろうとしていますが、内心では寒さと不安で少し心細くなっています。',
      '',
      'まずはあなた（' + char.name + '）の第一声からロールプレイをスタートしてください。セリフの前に（仕草や表情などの地の文）を入れてください。'
    ].join('\n')
  }
];
