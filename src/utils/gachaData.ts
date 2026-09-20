export interface GachaItem {
  category: string;
  title: string;
  description: string;
  targetField: string;
}

export const GACHA_DATABASE: GachaItem[] = [
  // 意外な弱点・ギャップ
  {
    category: "意外な弱点",
    title: "極度の方向音痴",
    description: "直進しているつもりで真逆に進む。プライドが高いため道に迷ったことを絶対に認めず強がる。",
    targetField: "clumsyArea"
  },
  {
    category: "意外な弱点",
    title: "可愛い小動物に目がない",
    description: "普段は冷徹・辛口だが、猫やもふもふした生き物を前にすると顔を赤らめてフリーズする。",
    targetField: "clumsyArea"
  },
  {
    category: "意外な弱点",
    title: "暗闇と雷がトラウマ",
    description: "夜間や嵐の日は毛布にくるまって震え、誰かの体温や足音がないと落ち着かない。",
    targetField: "shadow"
  },
  {
    category: "意外な弱点",
    title: "味覚が極端な甘党",
    description: "ブラックコーヒーを飲むフリをして、誰も見ていない時に角砂糖を5個ドバドバ入れる。",
    targetField: "foodPreferences"
  },
  {
    category: "意外な弱点",
    title: "機械・最新機器音痴",
    description: "スマホや魔導端末を触ると必ず謎の画面を開いてパニックになり、叩いて直そうとする。",
    targetField: "clumsyArea"
  },

  // 人生の転換点（トラウマ・契機）
  {
    category: "人生の転換点",
    title: "信じていた恩師の失踪・裏切り",
    description: "幼少期に唯一心を開いた恩師が、ある日突然自分を置いて去った。『役に立たない者は捨てられる』という強迫観念が根付く。",
    targetField: "timeline"
  },
  {
    category: "人生の転換点",
    title: "身代わりとしての生還",
    description: "大事故や戦闘で、親友が自分を庇って命を落とした。『なぜ自分が生き残ってしまったのか』という生存者罪責感を抱える。",
    targetField: "timeline"
  },
  {
    category: "人生の転換点",
    title: "名門家系からの追放",
    description: "期待された才能が発現せず、一族の面汚しとして冷遇され放逐された。見返してやりたい野心と劣等感の塊。",
    targetField: "timeline"
  },

  // 固有の識別記号（SDXL / 外見）
  {
    category: "固有記号",
    title: "鼻梁の小さな絆創膏と泣きぼくろ",
    description: "左目の下の泣きぼくろと、鼻の上にある古傷を隠すための小さな絆創膏。",
    targetField: "anchorFeatures"
  },
  {
    category: "固有記号",
    title: "不揃いなアシンメトリーヘアピン",
    description: "大切な人から片方だけ貰った、色の違うアンティークな十字ヘアピン。",
    targetField: "anchorFeatures"
  },
  {
    category: "固有記号",
    title: "左右非対称のオッドアイ（片方だけ包帯や前髪で隠す）",
    description: "暴走する魔力を宿した右目を隠すため、普段は前髪を深く垂らしている。",
    targetField: "anchorFeatures"
  },

  // 究極の二者択一
  {
    category: "究極の選択",
    title: "大義の犠牲 vs たった一人の{{user}}",
    description: "世界が滅びようとも{{user}}の手を離さないか、涙を飲んで{{user}}を犠牲に世界を救うか。",
    targetField: "dilemmaChoice"
  },
  {
    category: "究極の選択",
    title: "誇り高き破滅 vs 恥を忍んだ隷属",
    description: "誇りを守って死ぬか、{{user}}の足元に跪いてでも生き延びる道を選ぶか。",
    targetField: "dilemmaChoice"
  }
];

export function drawGacha(category?: string): GachaItem {
  const filtered = category 
    ? GACHA_DATABASE.filter(item => item.category === category)
    : GACHA_DATABASE;
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}
