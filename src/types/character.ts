export interface TimelineEvent {
  id: string;
  ageOrPeriod: string;
  eventTitle: string;
  description: string;
  mentalImprint: string;
  triggerKeywords: string;
}

export interface RadarStats {
  aggression: number;   // 攻撃性/好戦度
  rationality: number;  // 理性/冷静さ
  fragility: number;    // 精神的脆さ/情緒不安定
  sociability: number;  // 社交性/人当たり
  attachment: number;   // 執着/依存度
  desire: number;       // 欲望/野心
}

export interface CharacterImageSlot {
  id: string;
  label: string; // 例: "職業・制服", "日常・私服", "正装・特殊形態", "夜・親密"
  url: string;   // Base64 data URL
  outfitNotes?: string; // 衣装の特徴・着用シチュエーション
}

export interface CharacterProfile {
  id: string;
  name: string;
  title: string;
  world: string;
  summary: string;
  avatarImage: string; // メインポートレート (Base64 or URL)
  galleryImages?: CharacterImageSlot[]; // 衣装・差分ギャラリー（メイン以外に4枚等）
  dangerLevel: 'S' | 'A' | 'B' | 'C' | 'UNKNOWN';

  // 基本属性・社会的立場
  occupation: string;    // 職業・役職・身分
  affiliation: string;   // 所属組織・勢力・ギルド・学術機関
  occupationalHabit: string; // 職業病・仕事モードでの態度・無意識の癖
  socialStatus: string;  // 社会的地位・生活水準・世間からの扱われ方

  // Layer 1: Visual Signature (SDXL & Anatomy)
  apparentAge: string;
  gender: string;
  species: string;
  bodyBuild: string;     // 骨格・体型（華奢、むっちり、引き締まり等）
  height: string;
  weightBuild: string;   // 体重感・肉づき
  skinDetails: string;   // 肌の色・肌質（色白、褐色、すべすべ、火照りやすさ）
  hairStyle: string;     // 髪型・ボリューム・結び方
  hairColor: string;     // 髪色・光の反射
  hairTexture: string;   // 髪質（猫っ毛、直毛、癖毛、さらさら）
  eyeColor: string;      // 瞳の色（オッドアイ、光彩）
  eyeFeatures: string;   // 目つき（タレ目、ツリ目、ジト目、まつ毛）
  anchorFeatures: string;// 影絵でも分かる固有の識別記号（ほくろ、傷跡、アクセサリー）
  scentDetails: string;  // 体臭・纏っている匂い（香水、石鹸、古書、甘い匂い等）
  personalColors: string;// パーソナルカラー
  defaultOutfit: string; // 普段着の細部
  underwearRoomwear: string; // 部屋着・下着の好み
  outfitVariations: string;  // 衣装差分
  sdxlBaseTags: string;      // SDXLプロンプト（外見・服装タグ）
  sdxlNegative: string;      // SDXLネガティブタグ

  // Layer: Subspecies & Modern Biology (亜人・種族・現代生態)
  demiType?: 'soft' | 'semi' | 'anthro' | 'inhuman'; // ソフト亜人(耳尻尾) / セミケモ(四肢・羽) / ガッツリ獣人(マズル・全身被毛) / 人外系
  demiSpeciesName?: string; // 具体的な種族名（例: 銀狼亜人、三毛猫獣人、白蛇妖異、小悪魔種等）
  demiFurryDegree?: string; // ケモ度・身体の獣化バランス解説
  demiEarsTailHorns?: string; // 耳・尻尾・角・翼の形状・位置・毛並み・動く仕組み
  demiPawsClawsSkin?: string; // 肉球・手足・爪・皮膚・被毛の手触り
  demiBodyTempScent?: string; // 平熱・種族特有の体香・睡眠リズム（昼夜行性）
  involuntaryEars?: string; // 耳の不随意反応（警戒時の飛行機耳、照れピク等）
  involuntaryTail?: string; // 尻尾の不随意反応（嬉しいバタバタ、股間巻き込み等）
  involuntaryVocal?: string; // 喉ゴロゴロ鳴き(Purring)、威嚇、鼻鳴らし、牙のチラ見え
  modernApparelTrouble?: string; // 服・靴・下着・イヤホン等の現代アイテムの悩み
  modernDailyFriction?: string; // 満員電車、スマホ画面、自動ドア、家具等との相性
  demiDietRestrictions?: string; // 人間食NG・アレルギー（ネギ/チョコ等）、肉食/草食、偏食
  groomingCare?: string; // {{user}}にだけ許すお手入れ（ブラッシング・耳掃除・肉球クリーム・角磨き）
  groomingReactions?: string; // ケアされている時のとろけ方・脱力・ゴロゴロ
  heatCycleSuppressor?: string; // 発情期(ヒート)の周期と現代抑制剤サプレッサーの服用
  markingInstinct?: string; // 匂い付けマーキング・甘噛み・首筋へのすり寄り
  demiWeakSensitivities?: string; // 耳根元、尻尾付け根、うなじ等、種族特有の急所・性感帯

  // Layer 2: Psychology & Conflict (Soul Core)
  persona: string;       // 外面（社会的ペルソナ）
  shadow: string;        // 内面の脆さ（自覚しているコンプレックス・自己嫌悪）
  coreValues: string;    // 人生の最優先価値観（愛、誇り、真理、平穏、復讐など）
  coreDesire: string;    // コアの欲求（何があれば満たされるか）
  coreFear: string;      // コアの恐怖（何を失ったら崩壊するか）
  triggers: string;      // 逆鱗・絶対に許せない地雷
  secret: string;        // 墓場まで持っていく秘密・罪悪感
  dilemmaChoice: string; // 究極の二者択一（大義vs個人、誇りvs命）
  motto: string;         // 人生の座右の銘・口癖のような信条
  solitudeTolerance: string; // 孤独への耐性（一人が平気か、極度の寂しがりか）

  // Layer 3: Lifestyle & Realism (Humanity)
  roomState: string;     // 部屋の散らかり具合・インテリア
  holidayHabits: string; // 休日の過ごし方・タイムスケジュール
  moneySense: string;    // 金銭感覚（浪費、倹約、偏った使い道）
  foodPreferences: string;// 食の好み（味覚、甘党/辛党、偏食、自炊スキル）
  drinkTobacco: string;  // 嗜好品（酒癖、煙草、カフェイン中毒度）
  sleepHabits: string;   // 睡眠リズム・寝相・寝起き
  reputationVsSelf: string;// 外聞（周囲の噂）vs 自己評価（本人の本音）
  clumsyArea: string;    // 得意な領域 vs 致命的なポンコツ領域

  // Layer 4: Dynamics with {{user}}
  userRelation: string;  // 基本的な立場・出会いの経緯
  wallThickness: number; // 初期の心の壁の厚さ (0-100%)
  firstImpression: string; // 初対面時の内心の品定め
  phase1Early: string;   // Phase 1 [初期警戒・威嚇]
  phase2Softening: string;// Phase 2 [困惑と軟化の契機]
  phase3Trust: string;   // Phase 3 [信頼と弱音の開示]
  phase4Attachment: string;// Phase 4 [親愛と執着]
  phase5Irreplaceable: string;// Phase 5 [唯一無二・魂の依存]
  jealousyBehavior: string; // 嫉妬・独占欲の表れ方
  quarrelBehavior: string;  // 喧嘩した時の態度（頑固、泣く、理詰め等）

  // Layer 5: Tone, Voice & Body Language
  firstPerson: string;   // 一人称（感情乱れ時の変化含む）
  secondPerson: string;  // 二人称（{{user}}の呼び方）
  thirdPerson: string;   // 三人称
  catchphrases: string;  // 口癖・語尾
  voiceTone: string;     // 声のトーン・話すスピード
  laughStyle: string;    // 笑い方の癖（ふっ、くすくす、あはは等）
  angryStyle: string;    // 怒った時のトーン（声を荒げる/冷徹に無言）
  bodyHabits: string;    // 無意識の身体の癖（嘘をつく時、照れた時、動揺時）
  stressTestCompliment: string; // ① 褒められた時の反応とセリフ
  stressTestTeased: string;     // ② からかわれた時の反応とセリフ
  stressTestCrisis: string;     // ③ 大失敗・修羅場での反応とセリフ
  stressTestNightQuiet: string; // ④ 静かな夜に二人きりの時のセリフ
  stressTestConfession: string; // ⑤ 愛情を直球で告げられた時の反応

  // Layer 6: Intimacy & Night Persona (7-Stage Gradient, Sensory & Top/Bottom Dynamics)
  positionType: 'top' | 'bottom' | 'switch' | 'reversal'; // 攻め / 受け / リバ / 豹変リバ
  dominanceRole: string;  // 攻守傾向・主導権・S/Mダイナミクス
  dominantLeadStyle: string; // 【攻め時の手つき・主導権】相手の抑え込み、触れ方、焦らし方
  dominantVerbalCommand: string; // 【攻め時の言葉責め・命令】耳元での囁き、「啼いてごらん」等の支配セリフ
  dominantPossessionDrive: string; // 【相手を追い詰めるツボ・支配欲・嗜虐心】相手のどんな啼き顔・抵抗に興奮するか
  dominantAftercare: string; // 【攻め時のアフターケア・甘やかし】泣かせた後の抱擁、額キス、労わり
  intimacyLevel1: string; // Level 1 [視線・距離の意識]: 目が合った時、至近距離の動揺
  intimacyLevel2: string; // Level 2 [偶発的接触]: 肩や手が触れた時のビクッとする反応
  intimacyLevel3: string; // Level 3 [日常スキンシップ]: 手繋ぎ、頭ポンポン、匂い意識
  intimacyLevel4: string; // Level 4 [境界線・密着]: バックハグ、耳元囁き、服の乱れ
  intimacyLevel5: string; // Level 5 [理性の融解]: キスを受けた時の反応、強がりの崩壊
  intimacyLevel6: string; // Level 6 [夜の入口・脱衣]: 肌を晒す恥じらい、照明の好み
  intimacyLevel7: string; // Level 7 [完全開放・夜の顔]: ベッドでの本性・甘え方
  sensitiveAreas: string; // 敏感な急所・触れられた時の身体の跳ね方
  voiceBreathing: string; // 息遣い・声のトーン（掠れ、押し殺し、甘えた小声）
  gazeExpression: string; // 視線・表情（顔を覆う、濡れた瞳での上目遣い、噛む唇）
  preIntimacyBehavior: string; // ベッドに入る前の態度・誘い方の不器用さ
  aftercareBehavior: string;   // ★ 事後の余韻（終わった直後の態度・甘え方・小指握り）
  fetishObsession: string;     // 嗜好・フェチ・背徳感のツボ・執着
  intimacyBoundaries: string;  // 境界線・許容限度・トラウマNG
  nsfwTagsSdxl: string;

  // Layer 7: Timeline
  timeline: TimelineEvent[];

  // Radar Stats
  stats: RadarStats;

  updatedAt: number;
}
