import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Copy,
  Check,
  ClipboardPaste,
  ArrowRight,
  Shirt,
  Heart,
  MessageSquare,
  Plus
} from 'lucide-react';
import { CharacterProfile, WardrobeItem, SituationReaction } from '../../types/character';

interface SmartGeminiImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  char: CharacterProfile;
  initialTarget?: 'wardrobe' | 'phase' | 'situation';
  onAddWardrobeItems?: (items: WardrobeItem[]) => void;
  onAddPhasePatterns?: (phaseKey: string, patterns: string[]) => void;
  onAddSituationReactions?: (items: SituationReaction[]) => void;
}

export const SmartGeminiImportModal: React.FC<SmartGeminiImportModalProps> = ({
  isOpen,
  onClose,
  char,
  initialTarget = 'wardrobe',
  onAddWardrobeItems,
  onAddPhasePatterns,
  onAddSituationReactions
}) => {
  const [targetType, setTargetType] = useState<'wardrobe' | 'phase' | 'situation'>(initialTarget);
  const [selectedPhase, setSelectedPhase] = useState<string>('phase3Trust');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [rawText, setRawText] = useState<string>('');
  const [parsedItems, setParsedItems] = useState<{ title: string; content: string }[]>([]);

  if (!isOpen) return null;

  // Generate prompt for external Gemini
  const generatePrompt = (type: 'wardrobe' | 'phase' | 'situation') => {
    const species = char.demiSpeciesName ? `（種族: ${char.demiSpeciesName}）` : '';
    const persona = char.persona ? `\n【性格・ペルソナ】: ${char.persona}` : '';
    const shadow = char.shadow ? `\n【内面の脆さ・本音】: ${char.shadow}` : '';

    if (type === 'wardrobe') {
      return `あなたは創作キャラクターデザイナーです。以下のキャラクターの設定を踏まえて、私服や部屋着、下着などの衣装バリエーションの魅力的なアイデアを3パターン提案してください。

【キャラクター名】: ${char.name || '名称未設定'}${species}${persona}${shadow}

【出力フォーマット】:
各パターンを「1. 【衣装名】」から始めて、服のデザイン、素材、着崩し方、部屋着なら下着事情や種族特有の工夫（尻尾穴、耳への配慮等）を含めて具体的に書いてください。`;
    }

    if (type === 'phase') {
      return `あなたは創作シナリオライターです。以下のキャラクターの設定を踏まえて、【{{user}}に対する親密度や感情の変化（愛着・弱音・甘えなど）】の具体的な反応・行動・セリフパターンを3〜4つ提案してください。

【キャラクター名】: ${char.name || '名称未設定'}${species}${persona}${shadow}

【出力フォーマット】:
「1. 【シチュエーションまたは平常時/不意打ち時など】」から始めて、身体の癖や表情、代表的なセリフを含めて具体的に書いてください。`;
    }

    return `あなたは創作シナリオライターです。以下のキャラクターの設定を踏まえて、特定のシチュエーション（嫉妬したとき、からかわれたとき、寝起き、二人きりの夜など）における独特の反応や代表セリフを3パターン提案してください。

【キャラクター名】: ${char.name || '名称未設定'}${species}${persona}${shadow}

【出力フォーマット】:
各項目を「1. 【シチュエーション名】」から始めて、その時の身体の反応・行動、および「代表セリフ」を明記してください。`;
  };

  const handleCopyPrompt = (type: 'wardrobe' | 'phase' | 'situation') => {
    const text = generatePrompt(type);
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  // Parse raw text into discrete items
  const handleParseText = (text: string) => {
    setRawText(text);
    if (!text.trim()) {
      setParsedItems([]);
      return;
    }

    // Split by numbered items (e.g., 1. 2. or 【1】 or ◆ or ---)
    const lines = text.split(/\n+/);
    const results: { title: string; content: string }[] = [];
    let currentTitle = '';
    let currentContent: string[] = [];

    const flush = () => {
      if (currentTitle || currentContent.length > 0) {
        results.push({
          title: currentTitle.trim() || `案 ${results.length + 1}`,
          content: currentContent.join('\n').trim()
        });
        currentTitle = '';
        currentContent = [];
      }
    };

    const headerRegex = /^(\d+[\.、\)]|\【.*?\】|案\d+|パターン\d+|#+|-|\*|◆|■)/;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (headerRegex.test(trimmed) && trimmed.length < 60) {
        flush();
        // Clean title
        const cleanTitle = trimmed
          .replace(/^(\d+[\.、\)]|\*|-|◆|■)\s*/, '')
          .replace(/^[【「](.*?)[】」]/, '$1')
          .trim();
        currentTitle = cleanTitle || `案 ${results.length + 1}`;
      } else {
        if (!currentTitle && results.length === 0) {
          currentTitle = '提案 1';
        }
        currentContent.push(trimmed);
      }
    }
    flush();

    if (results.length === 0 && text.trim()) {
      results.push({ title: '提案 1', content: text.trim() });
    }

    setParsedItems(results);
  };

  // Apply to character
  const handleApply = () => {
    if (parsedItems.length === 0) return;

    if (targetType === 'wardrobe' && onAddWardrobeItems) {
      const newItems: WardrobeItem[] = parsedItems.map((item, idx) => ({
        id: `w-imported-${Date.now()}-${idx}`,
        title: item.title || `衣装案 ${idx + 1}`,
        category: item.title.includes('部屋') || item.title.includes('パジャマ')
          ? 'roomwear'
          : item.title.includes('下着')
          ? 'underwear'
          : 'everyday',
        description: item.content,
        underwearDetails: '',
        imageUrl: ''
      }));
      onAddWardrobeItems(newItems);
    } else if (targetType === 'phase' && onAddPhasePatterns) {
      const patterns = parsedItems.map(p => (p.title ? `【${p.title}】 ${p.content}` : p.content));
      onAddPhasePatterns(selectedPhase, patterns);
    } else if (targetType === 'situation' && onAddSituationReactions) {
      const reactions: SituationReaction[] = parsedItems.map((item, idx) => {
        // Try to extract dialogue quotes
        const matchDialogue = item.content.match(/[「『](.*?)[」』]/);
        const dialogue = matchDialogue ? matchDialogue[0] : '';
        const behavior = dialogue ? item.content.replace(dialogue, '').trim() : item.content;

        return {
          id: `sr-imported-${Date.now()}-${idx}`,
          situation: item.title || `シチュエーション ${idx + 1}`,
          behavior: behavior || item.content,
          dialogue: dialogue
        };
      });
      onAddSituationReactions(reactions);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#11141a] border border-[#252e3d] rounded-xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#252e3d] flex items-center justify-between bg-[#181d26]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <ClipboardPaste size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Geminiスマート一括取り込み ＆ プロンプト生成</h3>
              <p className="text-[11px] text-slate-400">外部AIの回答を貼り付けるだけで、自動で項目に分割・一括登録</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-[#252e3d] rounded transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 text-xs text-slate-300">
          {/* Step 1: Generate Prompt */}
          <div className="bg-[#181d26] border border-[#252e3d] rounded-lg p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles size={14} />
                ステップ 1: Geminiに投げる質問文をコピーする
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              ボタンを押すと、このキャラ（{char.name || '名称未設定'}）の種族や性格を含んだ質問文がコピーされます。別画面のGeminiにそのまま貼り付けて回答をもらってください。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleCopyPrompt('wardrobe')}
                className="p-2.5 bg-[#11141a] hover:bg-[#252e3d] border border-[#252e3d] hover:border-amber-500/50 rounded flex flex-col items-center justify-center text-center gap-1 transition group"
              >
                <Shirt size={16} className="text-amber-400 group-hover:scale-110 transition" />
                <span className="font-bold text-slate-200 text-[11px]">衣装・部屋着プロンプト</span>
                <span className="text-[9px] text-slate-400 flex items-center gap-0.5">
                  {copiedType === 'wardrobe' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  {copiedType === 'wardrobe' ? 'コピー完了！' : 'ワンタップでコピー'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleCopyPrompt('phase')}
                className="p-2.5 bg-[#11141a] hover:bg-[#252e3d] border border-[#252e3d] hover:border-cyan-500/50 rounded flex flex-col items-center justify-center text-center gap-1 transition group"
              >
                <Heart size={16} className="text-cyan-400 group-hover:scale-110 transition" />
                <span className="font-bold text-slate-200 text-[11px]">親密度・甘えプロンプト</span>
                <span className="text-[9px] text-slate-400 flex items-center gap-0.5">
                  {copiedType === 'phase' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  {copiedType === 'phase' ? 'コピー完了！' : 'ワンタップでコピー'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleCopyPrompt('situation')}
                className="p-2.5 bg-[#11141a] hover:bg-[#252e3d] border border-[#252e3d] hover:border-purple-500/50 rounded flex flex-col items-center justify-center text-center gap-1 transition group"
              >
                <MessageSquare size={16} className="text-purple-400 group-hover:scale-110 transition" />
                <span className="font-bold text-slate-200 text-[11px]">嫉妬・寝起きプロンプト</span>
                <span className="text-[9px] text-slate-400 flex items-center gap-0.5">
                  {copiedType === 'situation' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  {copiedType === 'situation' ? 'コピー完了！' : 'ワンタップでコピー'}
                </span>
              </button>
            </div>
          </div>

          {/* Step 2: Paste and Target */}
          <div className="bg-[#181d26] border border-[#252e3d] rounded-lg p-3.5 space-y-3">
            <span className="font-bold text-cyan-400 flex items-center gap-1.5">
              <ClipboardPaste size={14} />
              ステップ 2: Geminiの回答をまるごと貼り付ける
            </span>

            {/* Target selector */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 text-[11px]">投入先:</span>
              <button
                type="button"
                onClick={() => setTargetType('wardrobe')}
                className={`px-2.5 py-1 rounded font-bold transition flex items-center gap-1 text-[11px] ${
                  targetType === 'wardrobe'
                    ? 'bg-amber-500 text-black shadow'
                    : 'bg-[#11141a] text-slate-300 border border-[#252e3d]'
                }`}
              >
                <Shirt size={12} />
                <span>衣装ワードローブ</span>
              </button>

              <button
                type="button"
                onClick={() => setTargetType('phase')}
                className={`px-2.5 py-1 rounded font-bold transition flex items-center gap-1 text-[11px] ${
                  targetType === 'phase'
                    ? 'bg-cyan-500 text-black shadow'
                    : 'bg-[#11141a] text-slate-300 border border-[#252e3d]'
                }`}
              >
                <Heart size={12} />
                <span>親密度フェーズ</span>
              </button>

              <button
                type="button"
                onClick={() => setTargetType('situation')}
                className={`px-2.5 py-1 rounded font-bold transition flex items-center gap-1 text-[11px] ${
                  targetType === 'situation'
                    ? 'bg-purple-500 text-white shadow'
                    : 'bg-[#11141a] text-slate-300 border border-[#252e3d]'
                }`}
              >
                <MessageSquare size={12} />
                <span>シチュエーション反応帳</span>
              </button>

              {targetType === 'phase' && (
                <select
                  value={selectedPhase}
                  onChange={(e) => setSelectedPhase(e.target.value)}
                  className="bg-[#11141a] border border-[#252e3d] text-cyan-300 rounded px-2 py-1 text-[11px] outline-none"
                >
                  <option value="phase1Early">Phase 1 (初期警戒)</option>
                  <option value="phase2Softening">Phase 2 (軟化の契機)</option>
                  <option value="phase3Trust">Phase 3 (信頼・弱音)</option>
                  <option value="phase4Attachment">Phase 4 (親愛・執着)</option>
                  <option value="phase5Irreplaceable">Phase 5 (唯一無二)</option>
                </select>
              )}
            </div>

            {/* Paste textarea */}
            <textarea
              value={rawText}
              onChange={(e) => handleParseText(e.target.value)}
              placeholder="Geminiの回答（1. 【普段着】〜〜 2. 【部屋着】〜〜 などの箇条書き）をここにそのまま貼り付けてください..."
              className="w-full h-32 bg-[#11141a] border border-[#252e3d] rounded-lg p-2.5 text-xs text-slate-200 placeholder:text-slate-500 outline-none focus:border-cyan-500 resize-y leading-relaxed font-mono"
            />
          </div>

          {/* Step 3: Preview */}
          {parsedItems.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <Check size={13} />
                  自動分割プレビュー（{parsedItems.length} 件検出）
                </span>
                <span className="text-slate-400">内容を確認して問題なければ追加ボタンを押してください</span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {parsedItems.map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-[#141820] border border-[#252e3d] rounded-lg space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-cyan-950 border border-cyan-800 text-cyan-300 text-[10px] font-bold rounded">
                        #{idx + 1}
                      </span>
                      <span className="font-bold text-slate-200 text-xs">{item.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed whitespace-pre-line">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#252e3d] bg-[#181d26] flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#252e3d] hover:bg-[#303b4d] text-slate-300 rounded font-bold transition"
          >
            キャンセル
          </button>

          <button
            type="button"
            onClick={handleApply}
            disabled={parsedItems.length === 0}
            className={`px-5 py-2 rounded-lg font-bold flex items-center gap-1.5 transition shadow-lg ${
              parsedItems.length > 0
                ? 'bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-black shadow-cyan-900/30 cursor-pointer'
                : 'bg-[#252e3d] text-slate-500 cursor-not-allowed'
            }`}
          >
            <Plus size={15} />
            <span>検出した {parsedItems.length} 件を一括追加する</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
