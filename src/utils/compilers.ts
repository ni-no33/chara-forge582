import { CharacterProfile } from '../types/character';

export function compileToSillyTavernV2(char: CharacterProfile): any {
  const descriptionParts: string[] = [
    '【名前】' + char.name + ' (' + (char.title || '') + ')',
    '【種族・亜人タイプ】' + (char.demiSpeciesName || char.species || '人間') +
      (char.demiType ? ' [' + (char.demiType === 'soft' ? 'ソフト亜人(耳・尾)' : char.demiType === 'semi' ? 'セミケモ(四肢・羽)' : char.demiType === 'anthro' ? 'ガッツリ獣人' : '人外・妖異系') + ']' : '') +
      (char.demiFurryDegree ? '\n・ケモ度/身体バランス: ' + char.demiFurryDegree : '') +
      (char.demiEarsTailHorns ? '\n・耳/尾/角の構造: ' + char.demiEarsTailHorns : '') +
      (char.demiPawsClawsSkin ? '\n・肉球/爪/毛並み質感: ' + char.demiPawsClawsSkin : '') +
      (char.demiBodyTempScent ? '\n・平熱/体香/睡眠: ' + char.demiBodyTempScent : ''),
    '【感情の不随意露出 (身体のネタバレ)】' +
      (char.involuntaryEars ? '\n・耳の反応(イカ耳/照れピク): ' + char.involuntaryEars : '') +
      (char.involuntaryTail ? '\n・尻尾の反応(バタバタ/巻きつき): ' + char.involuntaryTail : '') +
      (char.involuntaryVocal ? '\n・喉鳴き/声(ゴロゴロ/Purring/牙): ' + char.involuntaryVocal : ''),
    '【現代生活との摩擦・日常の悩み】' +
      (char.modernApparelTrouble ? '\n・服/靴/イヤホン/下着の工夫: ' + char.modernApparelTrouble : '') +
      (char.modernDailyFriction ? '\n・街/満員電車/スマホ画面の不便: ' + char.modernDailyFriction : '') +
      (char.demiDietRestrictions ? '\n・食事制限/アレルギー/生肉欲: ' + char.demiDietRestrictions : ''),
    '【{{user}}にだけ許す身体のお手入れ (最大デレ)】' +
      (char.groomingCare ? '\n・ケア部位(ブラッシング/肉球/耳掃除): ' + char.groomingCare : '') +
      (char.groomingReactions ? '\n・とろけ反応/脱力/ゴロゴロ: ' + char.groomingReactions : ''),
    '【職業・所属】' + (char.occupation ? char.occupation : '自由') + (char.affiliation ? ' (所属: ' + char.affiliation + ')' : ''),
    '【社会的立場・境遇】' + (char.socialStatus || '未設定') + (char.occupationalHabit ? '\n【職業病・癖】' + char.occupationalHabit : ''),
    '【外見・体型】見かけ' + (char.apparentAge || '不詳') + ', 性別:' + (char.gender || '不詳') + ', 身長:' + (char.height || '標準') + ', 体格:' + (char.bodyBuild || '標準'),
    '【頭部・顔立ち】髪型:' + (char.hairStyle || '未設定') + ', 髪色:' + (char.hairColor || '未設定') + ', 瞳:' + (char.eyeColor || '未設定') + ', 目元:' + (char.eyeFeatures || '特になし'),
    '【固有の特徴・記号】' + (char.anchorFeatures || '特になし'),
    '【パーソナルカラー】' + (char.personalColors || '未設定'),
    '【普段着】' + (char.defaultOutfit || '未設定'),
    '【服装バリエーション・衣装ギャラリー】' + (char.outfitVariations || '') +
      (char.galleryImages && char.galleryImages.length > 0
        ? '\n' + char.galleryImages.map(g => '・' + g.label + (g.outfitNotes ? ': ' + g.outfitNotes : '')).join('\n')
        : ''),
    '【生活感・日常】\n・部屋の様子: ' + (char.roomState || '未設定') + '\n・休日の過ごし方: ' + (char.holidayHabits || '未設定') + '\n・食の好み: ' + (char.foodPreferences || '未設定') + '\n・嗜好品(酒/煙草): ' + (char.drinkTobacco || '未設定') + '\n・睡眠習慣: ' + (char.sleepHabits || '未設定')
  ];

  const personalityParts: string[] = [
    '【表の顔 (Persona)】' + (char.persona || '未設定'),
    '【内面の脆さ (Shadow)】' + (char.shadow || '未設定'),
    '【コアの欲求】' + (char.coreDesire || '未設定'),
    '【コアの恐怖】' + (char.coreFear || '未設定'),
    '【逆鱗・地雷】' + (char.triggers || '絶対に触れてはならない'),
    '【秘密・過去の罪】' + (char.secret || '誰にも明かせない'),
    '【究極の二者択一 (倫理観)】' + (char.dilemmaChoice || '未設定'),
    '【外聞と自己評価のギャップ】\n' + (char.reputationVsSelf || '未設定'),
    '【得意と致命的ポンコツ】\n' + (char.clumsyArea || '未設定')
  ];

  // Enriched Intimacy & Night Persona (Level 1 - Level 7)
  if (
    char.intimacyLevel1 ||
    char.intimacyLevel4 ||
    char.intimacyLevel7 ||
    char.voiceBreathing ||
    char.aftercareBehavior
  ) {
    personalityParts.push(
      '【親愛・親密グラデーション＆夜の態度 (7-Stage Intimacy Gradient)】\n' +
      '・攻守ポジション: ' + (char.positionType === 'top' ? '完全攻め(Top)' : char.positionType === 'bottom' ? '完全受け(Bottom)' : char.positionType === 'switch' ? 'リバ/両対応' : char.positionType === 'reversal' ? '豹変リバ' : '未設定') + '\n' +
      (char.dominantLeadStyle ? '・【攻め時の手つき・主導権】: ' + char.dominantLeadStyle + '\n' : '') +
      (char.dominantVerbalCommand ? '・【攻め時の言葉責め・支配命令】: ' + char.dominantVerbalCommand + '\n' : '') +
      (char.dominantPossessionDrive ? '・【相手を追い詰めるツボ・支配欲】: ' + char.dominantPossessionDrive + '\n' : '') +
      (char.dominantAftercare ? '・【攻め側のアフターケア・甘やかし】: ' + char.dominantAftercare + '\n' : '') +
      '・Level 1 [視線・距離の意識]: ' + (char.intimacyLevel1 || '未設定') + '\n' +
      '・Level 2 [偶発的接触]: ' + (char.intimacyLevel2 || '未設定') + '\n' +
      '・Level 3 [日常スキンシップ]: ' + (char.intimacyLevel3 || '未設定') + '\n' +
      '・Level 4 [境界線・密着]: ' + (char.intimacyLevel4 || '未設定') + '\n' +
      '・Level 5 [理性の融解]: ' + (char.intimacyLevel5 || '未設定') + '\n' +
      '・Level 6 [夜の入口・脱衣]: ' + (char.intimacyLevel6 || '未設定') + '\n' +
      '・Level 7 [完全開放・夜の顔]: ' + (char.intimacyLevel7 || '未設定') + '\n' +
      '・急所・敏感ゾーン: ' + (char.sensitiveAreas || '未設定') + '\n' +
      '・触れられた時の息遣い・声: ' + (char.voiceBreathing || '未設定') + '\n' +
      '・視線・恥じらいの仕草: ' + (char.gazeExpression || '未設定') + '\n' +
      '・主導権・攻守ダイナミクス: ' + (char.dominanceRole || '未設定') + '\n' +
      '・事前の誘い方・戸惑い: ' + (char.preIntimacyBehavior || '未設定') + '\n' +
      '・★ 事後の余韻・アフターケア: ' + (char.aftercareBehavior || '未設定') + '\n' +
      '・嗜好・フェチ・執着: ' + (char.fetishObsession || '未設定') + '\n' +
      '・境界線・許容限度・NG: ' + (char.intimacyBoundaries || '未設定') +
      (char.heatCycleSuppressor ? '\n・【発情期(ヒート)と現代抑制剤】: ' + char.heatCycleSuppressor : '') +
      (char.markingInstinct ? '\n・【匂い付けマーキング・甘噛み】: ' + char.markingInstinct : '') +
      (char.demiWeakSensitivities ? '\n・【種族特有の急所・性感帯】: ' + char.demiWeakSensitivities : '')
    );
  }

  const scenarioParts: string[] = [
    '【世界観・舞台】' + (char.world || '未設定'),
    '【{{user}}との関係性】' + (char.userRelation || '未設定'),
    '【初期警戒度 / 心の壁】' + char.wallThickness + '%',
    '【初対面時の内面品定め】' + (char.firstImpression || '未設定'),
    '【関係性の変化段階 (Relationship Progression)】',
    '・Phase 1 [初期態度・警戒]: ' + (char.phase1Early || '未設定'),
    '・Phase 2 [困惑と軟化の契機]: ' + (char.phase2Softening || '未設定'),
    '・Phase 3 [信頼と弱音の開示]: ' + (char.phase3Trust || '未設定'),
    '・Phase 4 [親愛と執着]: ' + (char.phase4Attachment || '未設定'),
    '・Phase 5 [唯一無二・魂の依存]: ' + (char.phase5Irreplaceable || '未設定'),
    '【嫉妬・独占欲の表れ方】' + (char.jealousyBehavior || '未設定'),
    '【喧嘩・衝突時の態度】' + (char.quarrelBehavior || '未設定')
  ];

  let mesExample = '';
  if (char.stressTestCompliment) {
    mesExample += '<START>\n{{user}}: 「可愛いね、よく似合ってるよ」\n{{char}}: ' + char.stressTestCompliment + '\n';
  }
  if (char.stressTestTeased) {
    mesExample += '<START>\n{{user}}: （ちょっと意地悪にからかう）\n{{char}}: ' + char.stressTestTeased + '\n';
  }
  if (char.stressTestCrisis) {
    mesExample += '<START>\n{{user}}: 「大丈夫か…！？ 無茶するな！」\n{{char}}: ' + char.stressTestCrisis + '\n';
  }
  if (char.stressTestNightQuiet) {
    mesExample += '<START>\n{{user}}: （静かな夜、ふたりきりの部屋で隣に座る）\n{{char}}: ' + char.stressTestNightQuiet + '\n';
  }
  if (char.stressTestConfession) {
    mesExample += '<START>\n{{user}}: 「君のことが本当に好きだよ」\n{{char}}: ' + char.stressTestConfession + '\n';
  }

  const firstMes = char.phase1Early
    ? '「' + char.name + 'よ。…何を見てるの？ 私に用でもあるわけ？」\n\n（警戒するように値踏みする視線を向けている。心の壁は厚いようだ）'
    : '「…あなたが{{user}}？ よろしく。」';

  return {
    spec: 'chara_card_v2',
    spec_version: '2.0',
    data: {
      name: char.name,
      description: descriptionParts.join('\n\n'),
      personality: personalityParts.join('\n\n'),
      scenario: scenarioParts.join('\n\n'),
      first_mes: firstMes,
      mes_example: mesExample,
      creator_notes: 'Created with CharaForge Character Depth Studio',
      system_prompt: '{{char}}は上記の設定・心理・口調に忠実にロールプレイしてください。外面と内面のギャップを繊細に演じ、{{user}}との関係性の変化（Phase）や親密さの段階（Stage）を意識して、徐々に心の壁を溶かしてください。',
      post_history_instructions: '',
      alternate_greetings: [],
      tags: [char.species || 'Chara', char.gender || 'Person', 'CharaForge'],
      character_book: compileToLorebook(char)
    }
  };
}

export function compileToLorebook(char: CharacterProfile): any {
  if (!char.timeline || char.timeline.length === 0) return null;

  const entries = char.timeline.map((event, index) => {
    const keys = event.triggerKeywords
      ? event.triggerKeywords.split(',').map(k => k.trim()).filter(Boolean)
      : [event.eventTitle, event.ageOrPeriod];

    return {
      id: index + 1,
      keys: keys,
      secondary_keys: [],
      comment: event.eventTitle,
      content: '【過去の記憶: ' + event.eventTitle + ' (' + event.ageOrPeriod + ')】\n出来事: ' + event.description + '\n心理的影響: ' + event.mentalImprint,
      constant: false,
      selective: false,
      insertion_order: 100,
      enabled: true,
      position: 'before_char',
      extensions: {}
    };
  });

  return {
    name: char.name + ' - Memory Timeline',
    description: 'Lorebook containing chronological events and mental imprints for ' + char.name,
    scan_depth: 5,
    token_budget: 500,
    recursive_scanning: false,
    entries: entries
  };
}

export function compileToSdxlPrompt(
  char: CharacterProfile,
  variant: 'base' | 'nsfw' | 'sheet' | 'casual' = 'base'
): { prompt: string; negative: string } {
  const promptParts: string[] = [];

  if (char.sdxlBaseTags && char.sdxlBaseTags.trim()) {
    promptParts.push(char.sdxlBaseTags.trim());
  } else {
    const pieces: string[] = [];
    if (char.gender) pieces.push(char.gender === '女性' ? '1girl' : char.gender === '男性' ? '1boy' : '');
    if (char.hairColor && char.hairStyle) pieces.push(char.hairColor + ' hair, ' + char.hairStyle);
    if (char.eyeColor) pieces.push(char.eyeColor + ' eyes');
    if (char.anchorFeatures) pieces.push(char.anchorFeatures);
    if (char.defaultOutfit) pieces.push(char.defaultOutfit);
    pieces.push('masterpiece, best quality, highly detailed');
    promptParts.push(pieces.filter(Boolean).join(', '));
  }

  if (variant === 'sheet') {
    promptParts.push('character sheet, multiple views, front view, side view, back view, full body, white background, simple background');
  } else if (variant === 'casual') {
    promptParts.push('casual clothes, sitting in messy room, relaxed expression, soft lighting');
  } else if (variant === 'nsfw') {
    if (char.nsfwTagsSdxl && char.nsfwTagsSdxl.trim()) {
      promptParts.push(char.nsfwTagsSdxl.trim());
    } else {
      promptParts.push('blushing, heavily embarrassed, teary eyes, disheveled clothes, lying on bed, soft lighting');
    }
  }

  const prompt = promptParts.join(', ');
  const negative = char.sdxlNegative || 'lowres, bad anatomy, bad hands, missing fingers, worst quality, low quality, blurry';

  return { prompt, negative };
}
