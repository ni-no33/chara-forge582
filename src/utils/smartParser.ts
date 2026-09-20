import { CharacterProfile, TimelineEvent } from '../types/character';

/**
 * Parses raw text from Gemini responses or roleplay logs to extract profile attributes
 */
export function parseSmartText(text: string): Partial<CharacterProfile> {
  const result: Partial<CharacterProfile> = {};

  // Simple keyword-based extraction patterns
  const lines = text.split(/\r?\n/);
  
  let currentKey: string | null = null;
  let currentBuffer: string[] = [];

  const flush = () => {
    if (!currentKey || currentBuffer.length === 0) return;
    const content = currentBuffer.join('\n').trim();
    if (!content) return;

    if (currentKey === 'name') result.name = content;
    else if (currentKey === 'persona') result.persona = content;
    else if (currentKey === 'shadow') result.shadow = content;
    else if (currentKey === 'coreDesire') result.coreDesire = content;
    else if (currentKey === 'coreFear') result.coreFear = content;
    else if (currentKey === 'triggers') result.triggers = content;
    else if (currentKey === 'secret') result.secret = content;
    else if (currentKey === 'dilemmaChoice') result.dilemmaChoice = content;
    else if (currentKey === 'roomState') result.roomState = content;
    else if (currentKey === 'holidayHabits') result.holidayHabits = content;
    else if (currentKey === 'reputationVsSelf') result.reputationVsSelf = content;
    else if (currentKey === 'clumsyArea') result.clumsyArea = content;
    else if (currentKey === 'phase1') result.phase1Early = content;
    else if (currentKey === 'phase2') result.phase2Softening = content;
    else if (currentKey === 'phase3') result.phase3Trust = content;
    else if (currentKey === 'phase4') result.phase4Attachment = content;
    else if (currentKey === 'sdxlBaseTags') result.sdxlBaseTags = content;
    else if (currentKey === 'compliment') result.stressTestCompliment = content;
    else if (currentKey === 'teased') result.stressTestTeased = content;
    else if (currentKey === 'crisis') result.stressTestCrisis = content;
    else if (currentKey === 'nightGap') result.intimacyLevel7 = content;
    else if (currentKey === 'weakPoints') result.voiceBreathing = content;
    else if (currentKey === 'kinks') result.fetishObsession = content;

    currentBuffer = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    
    // Pattern matchers
    if (/^(名前|キャラクター名|Name)[:：]\s*(.+)$/i.test(trimmed)) {
      flush();
      result.name = trimmed.replace(/^(名前|キャラクター名|Name)[:：]\s*/i, '');
      currentKey = null;
    } else if (/(外面|ペルソナ|表の顔|表向き)/i.test(trimmed)) {
      flush();
      currentKey = 'persona';
      const rem = trimmed.replace(/^.*?(外面|ペルソナ|表の顔|表向き)[^:：]*[:：]\s*/i, '');
      if (rem) currentBuffer.push(rem);
    } else if (/(内面|シャドウ|脆さ|本音|コンプレックス)/i.test(trimmed)) {
      flush();
      currentKey = 'shadow';
      const rem = trimmed.replace(/^.*?(内面|シャドウ|脆さ|本音|コンプレックス)[^:：]*[:：]\s*/i, '');
      if (rem) currentBuffer.push(rem);
    } else if (/(欲求|コアの欲求|Desire)/i.test(trimmed)) {
      flush();
      currentKey = 'coreDesire';
      const rem = trimmed.replace(/^.*?(欲求|コアの欲求|Desire)[^:：]*[:：]\s*/i, '');
      if (rem) currentBuffer.push(rem);
    } else if (/(恐怖|コアの恐怖|Fear)/i.test(trimmed)) {
      flush();
      currentKey = 'coreFear';
      const rem = trimmed.replace(/^.*?(恐怖|コアの恐怖|Fear)[^:：]*[:：]\s*/i, '');
      if (rem) currentBuffer.push(rem);
    } else if (/(逆鱗|地雷|Triggers)/i.test(trimmed)) {
      flush();
      currentKey = 'triggers';
      const rem = trimmed.replace(/^.*?(逆鱗|地雷|Triggers)[^:：]*[:：]\s*/i, '');
      if (rem) currentBuffer.push(rem);
    } else if (/(秘密|過去の罪|Secret)/i.test(trimmed)) {
      flush();
      currentKey = 'secret';
      const rem = trimmed.replace(/^.*?(秘密|過去の罪|Secret)[^:：]*[:：]\s*/i, '');
      if (rem) currentBuffer.push(rem);
    } else if (/(ポンコツ|不器用|得意|弱点)/i.test(trimmed)) {
      flush();
      currentKey = 'clumsyArea';
      const rem = trimmed.replace(/^.*?(ポンコツ|不器用|得意|弱点)[^:：]*[:：]\s*/i, '');
      if (rem) currentBuffer.push(rem);
    } else if (/(外聞|自己評価|噂)/i.test(trimmed)) {
      flush();
      currentKey = 'reputationVsSelf';
      const rem = trimmed.replace(/^.*?(外聞|自己評価|噂)[^:：]*[:：]\s*/i, '');
      if (rem) currentBuffer.push(rem);
    } else if (/(Danbooru|プロンプト|SDXLタグ|Base Tags)/i.test(trimmed)) {
      flush();
      currentKey = 'sdxlBaseTags';
      const rem = trimmed.replace(/^.*?(Danbooru|プロンプト|SDXLタグ|Base Tags)[^:：]*[:：]\s*/i, '');
      if (rem) currentBuffer.push(rem);
    } else if (currentKey) {
      currentBuffer.push(trimmed);
    }
  }
  flush();

  return result;
}

/**
 * Import from SillyTavern V2 or V1 character card JSON
 */
export function importFromSillyTavernJson(json: any): Partial<CharacterProfile> {
  const result: Partial<CharacterProfile> = {};
  const data = json.data || json; // V2 or V1

  if (data.name) result.name = data.name;
  if (data.description) result.summary = data.description.slice(0, 150) + '...';
  if (data.personality) result.persona = data.personality;
  if (data.first_mes) result.phase1Early = data.first_mes;

  // Extract timeline if character_book exists
  if (data.character_book && Array.isArray(data.character_book.entries)) {
    const events: TimelineEvent[] = data.character_book.entries.map((e: any, idx: number) => ({
      id: 'import-' + idx,
      ageOrPeriod: e.comment || '過去',
      eventTitle: e.comment || ('出来事 ' + (idx + 1)),
      description: e.content || '',
      mentalImprint: '',
      triggerKeywords: Array.isArray(e.keys) ? e.keys.join(', ') : ''
    }));
    result.timeline = events;
  }

  return result;
}
