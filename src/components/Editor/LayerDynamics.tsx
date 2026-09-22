import React, { useState } from 'react';
import { CharacterProfile, SituationReaction } from '../../types/character';
import {
  HelpCircle,
  HeartHandshake,
  Sparkles,
  Plus,
  Trash2,
  MessageSquare,
  Flame,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { DeepQuestionCard } from './DeepQuestionCard';
import { SmartGeminiImportModal } from './SmartGeminiImportModal';

interface Props {
  char: CharacterProfile;
  updateField: <K extends keyof CharacterProfile>(field: K, value: CharacterProfile[K]) => void;
}

export const LayerDynamics: React.FC<Props> = ({ char, updateField }) => {
  const [isGeminiOpen, setIsGeminiOpen] = useState(false);
  const [geminiTarget, setGeminiTarget] = useState<'phase' | 'situation'>('phase');

  // Helpers for multi-pattern phases
  const phasePatterns = char.phasePatterns || {};

  const handleAddPhasePattern = (phaseKey: string) => {
    const current = phasePatterns[phaseKey] || [];
    updateField('phasePatterns', {
      ...phasePatterns,
      [phaseKey]: [...current, '']
    });
  };

  const handleUpdatePhasePattern = (phaseKey: string, index: number, value: string) => {
    const current = [...(phasePatterns[phaseKey] || [])];
    current[index] = value;
    updateField('phasePatterns', {
      ...phasePatterns,
      [phaseKey]: current
    });
  };

  const handleDeletePhasePattern = (phaseKey: string, index: number) => {
    const current = [...(phasePatterns[phaseKey] || [])];
    current.splice(index, 1);
    updateField('phasePatterns', {
      ...phasePatterns,
      [phaseKey]: current
    });
  };

  const handleAddImportedPhasePatterns = (phaseKey: string, patterns: string[]) => {
    const current = phasePatterns[phaseKey] || [];
    updateField('phasePatterns', {
      ...phasePatterns,
      [phaseKey]: [...current, ...patterns]
    });
  };

  // Helpers for Situation Reactions
  const situationReactions = char.situationReactions || [];

  const handleAddSituation = () => {
    const newReaction: SituationReaction = {
      id: `sr-${Date.now()}`,
      situation: '新しいシチュエーション',
      behavior: '',
      dialogue: ''
    };
    updateField('situationReactions', [...situationReactions, newReaction]);
  };

  const handleUpdateSituation = (id: string, updates: Partial<SituationReaction>) => {
    const next = situationReactions.map(sr => (sr.id === id ? { ...sr, ...updates } : sr));
    updateField('situationReactions', next);
  };

  const handleDeleteSituation = (id: string) => {
    updateField('situationReactions', situationReactions.filter(sr => sr.id !== id));
  };

  const handleAddImportedSituations = (items: SituationReaction[]) => {
    updateField('situationReactions', [...situationReactions, ...items]);
  };

  return (
    <div className="p-3 sm:p-5 space-y-5 text-xs">
      <div className="bg-[#181d26] border border-[#252e3d] p-3 rounded text-slate-300 flex gap-2 items-start">
        <HelpCircle size={15} className="shrink-0 text-pink-400 mt-0.5" />
        <div>
          <span className="font-bold text-slate-100 block mb-0.5">【対人関係・心の壁の溶解】</span>
          出会いから警戒心が解け、最終的に「アンタがいなきゃ生きていけない」という執着・絆に至るまでのグラデーションを定義します。
          同じ親密度でも「平常時」や「不意打ち時」などの複数パターンを残せます。
        </div>
      </div>

      {/* Deep Dive Questions Card */}
      <DeepQuestionCard stepIndex={3} char={char} updateField={updateField} />

      {/* Relation & Wall thickness */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-slate-400 font-medium mb-1">{'{{user}}'}との基本関係・立場</label>
          <input
            type="text"
            value={char.userRelation}
            onChange={(e) => updateField('userRelation', e.target.value)}
            placeholder="例: 監視対象と監視官（訳あって同居中）"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-3 py-1.5 text-slate-100 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 font-medium mb-1">
            初期警戒度 / 心の壁: <span className="text-amber-400 font-bold">{char.wallThickness}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={char.wallThickness}
            onChange={(e) => updateField('wallThickness', parseInt(e.target.value, 10))}
            className="w-full accent-amber-500 mt-1"
          />
        </div>
      </div>

      <div>
        <label className="block text-slate-400 mb-1">初対面時の第一印象 vs 現在の本音</label>
        <input
          type="text"
          value={char.firstImpression}
          onChange={(e) => updateField('firstImpression', e.target.value)}
          placeholder="例: 【最初】怪しくて役に立たない実験台 ➔ 【本音】誰よりも失いたくない居場所"
          className="w-full bg-[#13171f] border border-[#252e3d] rounded px-3 py-1.5 text-slate-200 outline-none"
        />
      </div>

      {/* 5-Phase Process with Multi-Patterns */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div className="text-pink-300 font-bold text-xs flex items-center gap-1.5">
            <HeartHandshake size={14} /> 心の壁が溶ける5段階の変化プロセス（複数パターン対応）
          </div>
          <button
            type="button"
            onClick={() => {
              setGeminiTarget('phase');
              setIsGeminiOpen(true);
            }}
            className="px-2.5 py-1 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-300 rounded font-bold flex items-center gap-1 text-[11px] transition"
          >
            <Sparkles size={12} />
            <span>Geminiからパターンを取り込む</span>
          </button>
        </div>

        {/* Phase 1 */}
        <PhaseCard
          phaseKey="phase1Early"
          title="Phase 1 [初期警戒・威嚇]: どんな距離感を保ち、どう威嚇するか"
          borderColor="border-red-500"
          titleColor="text-red-400"
          mainValue={char.phase1Early}
          onMainChange={(val) => updateField('phase1Early', val)}
          patterns={phasePatterns['phase1Early'] || []}
          onAddPattern={() => handleAddPhasePattern('phase1Early')}
          onUpdatePattern={(idx, val) => handleUpdatePhasePattern('phase1Early', idx, val)}
          onDeletePattern={(idx) => handleDeletePhasePattern('phase1Early', idx)}
          placeholder="基本態度: 「半径2m以内に近づかないで。息がかかるだけで集中が乱れるのよ」と杖を構える。"
        />

        {/* Phase 2 */}
        <PhaseCard
          phaseKey="phase2Softening"
          title="Phase 2 [困惑と軟化]: 何が起きて態度が少し緩むか"
          borderColor="border-amber-500"
          titleColor="text-amber-400"
          mainValue={char.phase2Softening}
          onMainChange={(val) => updateField('phase2Softening', val)}
          patterns={phasePatterns['phase2Softening'] || []}
          onAddPattern={() => handleAddPhasePattern('phase2Softening')}
          onUpdatePattern={(idx, val) => handleUpdatePhasePattern('phase2Softening', idx, val)}
          onDeletePattern={(idx) => handleDeletePhasePattern('phase2Softening', idx)}
          placeholder="基本態度: 怪我を手当てされた時、「…べ、別に感謝なんてしてないんだから…」と赤面して目を逸らす。"
        />

        {/* Phase 3 */}
        <PhaseCard
          phaseKey="phase3Trust"
          title="Phase 3 [信頼と弱音]: どんな甘えや本音を見せるか"
          borderColor="border-cyan-500"
          titleColor="text-cyan-400"
          mainValue={char.phase3Trust}
          onMainChange={(val) => updateField('phase3Trust', val)}
          patterns={phasePatterns['phase3Trust'] || []}
          onAddPattern={() => handleAddPhasePattern('phase3Trust')}
          onUpdatePattern={(idx, val) => handleUpdatePhasePattern('phase3Trust', idx, val)}
          onDeletePattern={(idx) => handleDeletePhasePattern('phase3Trust', idx)}
          placeholder="基本態度: 悪夢を見た夜、「紅茶淹れすぎたから」と部屋に来て隣に静かに座り込む。"
        />

        {/* Phase 4 */}
        <PhaseCard
          phaseKey="phase4Attachment"
          title="Phase 4 [親愛と執着]: どんな独占欲や依存を見せるか"
          borderColor="border-pink-500"
          titleColor="text-pink-400"
          mainValue={char.phase4Attachment}
          onMainChange={(val) => updateField('phase4Attachment', val)}
          patterns={phasePatterns['phase4Attachment'] || []}
          onAddPattern={() => handleAddPhasePattern('phase4Attachment')}
          onUpdatePattern={(idx, val) => handleUpdatePhasePattern('phase4Attachment', idx, val)}
          onDeletePattern={(idx) => handleDeletePhasePattern('phase4Attachment', idx)}
          placeholder="基本態度: 「どこにも行かないで…アンタまで消えたら私、もう立っていられない…」と涙目で縋る。"
        />

        {/* Phase 5 */}
        <PhaseCard
          phaseKey="phase5Irreplaceable"
          title="Phase 5 [唯一無二・魂の結びつき]: 完全に心を捧げた時の態度"
          borderColor="border-purple-500"
          titleColor="text-purple-400"
          mainValue={char.phase5Irreplaceable}
          onMainChange={(val) => updateField('phase5Irreplaceable', val)}
          patterns={phasePatterns['phase5Irreplaceable'] || []}
          onAddPattern={() => handleAddPhasePattern('phase5Irreplaceable')}
          onUpdatePattern={(idx, val) => handleUpdatePhasePattern('phase5Irreplaceable', idx, val)}
          onDeletePattern={(idx) => handleDeletePhasePattern('phase5Irreplaceable', idx)}
          placeholder="基本態度: 「世界中がアンタの敵になっても、私だけはアンタのために世界を焼き尽くしてあげる」"
        />
      </div>

      {/* Jealousy & Quarrel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div>
          <label className="block text-slate-400 mb-1">嫉妬・独占欲の表れ方</label>
          <input
            type="text"
            value={char.jealousyBehavior}
            onChange={(e) => updateField('jealousyBehavior', e.target.value)}
            placeholder="例: 平気な顔をするが、後で無言で袖をぎゅーっと引っ張って邪魔をする"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-3 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">喧嘩した時の態度</label>
          <input
            type="text"
            value={char.quarrelBehavior}
            onChange={(e) => updateField('quarrelBehavior', e.target.value)}
            placeholder="例: 意地を張って絶対に自分から謝らないが、夜になると泣きそうな顔で部屋の前をウロウロする"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-3 py-1.5 text-slate-200 outline-none"
          />
        </div>
      </div>

      {/* Situation Reactions Book */}
      <div className="bg-[#13171f] border border-purple-500/40 rounded-lg p-3.5 space-y-3 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#252e3d] pb-2.5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-purple-300 font-bold text-sm flex items-center gap-1.5">
                <MessageSquare size={16} /> シチュエーション別リアクション帳（言動・代表セリフ集）
              </span>
              <span className="px-2 py-0.5 bg-purple-950/60 border border-purple-800 text-purple-300 text-[10px] rounded font-bold">
                {situationReactions.length} 件登録中
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              「嫉妬したとき」「からかわれたとき」「朝起きた直後」「嘘をついたとき」など、特定の状況とセリフをカード形式で自由に追加できます。
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setGeminiTarget('situation');
                setIsGeminiOpen(true);
              }}
              className="px-2.5 py-1.5 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-300 rounded font-bold flex items-center gap-1 text-xs transition"
            >
              <Sparkles size={13} className="text-cyan-400" />
              <span>Geminiから一括取り込み</span>
            </button>

            <button
              type="button"
              onClick={handleAddSituation}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded font-bold flex items-center gap-1 text-xs transition shadow"
            >
              <Plus size={14} />
              <span>＋ シチュエーションを追加</span>
            </button>
          </div>
        </div>

        {/* Reaction Cards */}
        {situationReactions.length === 0 ? (
          <div className="p-6 text-center border border-dashed border-[#252e3d] rounded-lg text-slate-400 space-y-2">
            <p>まだシチュエーション反応が登録されていません。</p>
            <button
              type="button"
              onClick={handleAddSituation}
              className="px-3 py-1 bg-[#181d26] hover:bg-[#252e3d] border border-purple-500/40 text-purple-300 rounded text-xs"
            >
              ＋ 最初のお題（嫉妬やからかいなど）を追加
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {situationReactions.map((sr) => (
              <div
                key={sr.id}
                className="bg-[#181d26] border border-[#252e3d] rounded-lg p-3 space-y-2 hover:border-purple-500/50 transition"
              >
                <div className="flex items-center justify-between gap-2 border-b border-[#222936] pb-1.5">
                  <input
                    type="text"
                    value={sr.situation}
                    onChange={(e) => handleUpdateSituation(sr.id, { situation: e.target.value })}
                    placeholder="シチュエーション名（例: 嫉妬したとき、寝起き、褒められたとき）"
                    className="bg-[#11141a] border border-[#252e3d] rounded px-2 py-1 text-purple-300 font-bold text-xs flex-1 outline-none focus:border-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteSituation(sr.id)}
                    className="p-1 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded transition"
                    title="削除"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">身体反応・態度・無意識の癖</label>
                    <textarea
                      rows={2}
                      value={sr.behavior}
                      onChange={(e) => handleUpdateSituation(sr.id, { behavior: e.target.value })}
                      placeholder="例: 耳をペタッと倒して睨みつけるが、尻尾は嬉しそうに揺れている。"
                      className="w-full bg-[#11141a] border border-[#252e3d] rounded p-1.5 text-slate-200 text-xs outline-none focus:border-purple-500 leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-purple-300 mb-0.5">代表セリフ（台詞）</label>
                    <textarea
                      rows={2}
                      value={sr.dialogue}
                      onChange={(e) => handleUpdateSituation(sr.id, { dialogue: e.target.value })}
                      placeholder="例: 「……べ、別にアンタのことなんか気にしてないし！バカ！」"
                      className="w-full bg-[#11141a] border border-[#252e3d] rounded p-1.5 text-purple-200 text-xs outline-none focus:border-purple-500 leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Smart Gemini Importer Modal */}
      <SmartGeminiImportModal
        isOpen={isGeminiOpen}
        onClose={() => setIsGeminiOpen(false)}
        char={char}
        initialTarget={geminiTarget}
        onAddPhasePatterns={handleAddImportedPhasePatterns}
        onAddSituationReactions={handleAddImportedSituations}
      />
    </div>
  );
};

// Subcomponent: Phase Card with multi-patterns
interface PhaseCardProps {
  phaseKey: string;
  title: string;
  borderColor: string;
  titleColor: string;
  mainValue: string;
  onMainChange: (val: string) => void;
  patterns: string[];
  onAddPattern: () => void;
  onUpdatePattern: (index: number, val: string) => void;
  onDeletePattern: (index: number) => void;
  placeholder: string;
}

const PhaseCard: React.FC<PhaseCardProps> = ({
  title,
  borderColor,
  titleColor,
  mainValue,
  onMainChange,
  patterns,
  onAddPattern,
  onUpdatePattern,
  onDeletePattern,
  placeholder
}) => {
  return (
    <div className={`bg-[#13171f] p-3 rounded border-l-2 ${borderColor} space-y-2`}>
      <div className="flex items-center justify-between">
        <label className={`${titleColor} font-bold block text-xs`}>{title}</label>
        <button
          type="button"
          onClick={onAddPattern}
          className="text-[10px] text-slate-400 hover:text-cyan-300 flex items-center gap-0.5 px-1.5 py-0.5 bg-[#181d26] rounded border border-[#252e3d] transition"
        >
          <Plus size={11} /> パターン追加
        </button>
      </div>

      <input
        type="text"
        value={mainValue}
        onChange={(e) => onMainChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#181d26] border border-[#252e3d] rounded px-3 py-1.5 text-slate-200 outline-none focus:border-slate-500"
      />

      {/* Additional Patterns */}
      {patterns.length > 0 && (
        <div className="space-y-1.5 pl-2 border-l border-slate-700/60 mt-2">
          {patterns.map((pat, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="text-[10px] text-slate-500 shrink-0">差分{idx + 1}:</span>
              <input
                type="text"
                value={pat}
                onChange={(e) => onUpdatePattern(idx, e.target.value)}
                placeholder="例: 【不意打ち時】耳がピクピク跳ねて硬直 / 【弱り時】服の裾を握りしめる"
                className="flex-1 bg-[#161b24] border border-[#222936] rounded px-2 py-1 text-slate-200 text-[11px] outline-none focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={() => onDeletePattern(idx)}
                className="p-1 text-slate-500 hover:text-rose-400"
                title="パターン削除"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

