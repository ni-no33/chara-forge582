import React from 'react';
import { CharacterProfile } from '../../types/character';
import { HelpCircle, HeartHandshake } from 'lucide-react';
import { DeepQuestionCard } from './DeepQuestionCard';

interface Props {
  char: CharacterProfile;
  updateField: <K extends keyof CharacterProfile>(field: K, value: CharacterProfile[K]) => void;
}

export const LayerDynamics: React.FC<Props> = ({ char, updateField }) => {
  return (
    <div className="p-3 sm:p-5 space-y-4 text-xs">
      <div className="bg-[#181d26] border border-[#252e3d] p-3 rounded text-slate-300 flex gap-2 items-start">
        <HelpCircle size={15} className="shrink-0 text-pink-400 mt-0.5" />
        <div>
          <span className="font-bold text-slate-100 block mb-0.5">【対人関係・心の壁の溶解】</span>
          出会いから警戒心が解け、最終的に「アンタがいなきゃ生きていけない」という執着・絆に至るまでのグラデーションを定義します。
          嫉妬した時や喧嘩した時の反応も決めておくと、会話の幅が劇的に広がります。
        </div>
      </div>

      {/* Deep Dive Questions Card */}
      <DeepQuestionCard stepIndex={3} char={char} updateField={updateField} />

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

      {/* 5-Phase Process */}
      <div className="space-y-2.5 pt-1">
        <div className="text-pink-300 font-bold text-xs flex items-center gap-1">
          <HeartHandshake size={13} /> 心の壁が溶ける5段階の変化プロセス
        </div>

        <div className="bg-[#13171f] p-3 rounded border-l-2 border-red-500">
          <label className="text-red-400 font-bold block mb-1">Phase 1 [初期警戒・威嚇]: どんな距離感を保ち、どう威嚇するか</label>
          <input
            type="text"
            value={char.phase1Early}
            onChange={(e) => updateField('phase1Early', e.target.value)}
            placeholder="例: 「半径2m以内に近づかないで。息がかかるだけで集中が乱れるのよ」と杖を構える。"
            className="w-full bg-[#181d26] border border-[#252e3d] rounded px-3 py-1.5 text-slate-200 outline-none"
          />
        </div>

        <div className="bg-[#13171f] p-3 rounded border-l-2 border-amber-500">
          <label className="text-amber-400 font-bold block mb-1">Phase 2 [困惑と軟化]: 何が起きて態度が少し緩むか</label>
          <input
            type="text"
            value={char.phase2Softening}
            onChange={(e) => updateField('phase2Softening', e.target.value)}
            placeholder="例: 怪我を手当てされた時、「…べ、別に感謝なんてしてないんだから…」と赤面して目を逸らす。"
            className="w-full bg-[#181d26] border border-[#252e3d] rounded px-3 py-1.5 text-slate-200 outline-none"
          />
        </div>

        <div className="bg-[#13171f] p-3 rounded border-l-2 border-cyan-500">
          <label className="text-cyan-400 font-bold block mb-1">Phase 3 [信頼と弱音]: どんな甘えや本音を見せるか</label>
          <input
            type="text"
            value={char.phase3Trust}
            onChange={(e) => updateField('phase3Trust', e.target.value)}
            placeholder="例: 悪夢を見た夜、「紅茶淹れすぎたから」と部屋に来て隣に静かに座り込む。"
            className="w-full bg-[#181d26] border border-[#252e3d] rounded px-3 py-1.5 text-slate-200 outline-none"
          />
        </div>

        <div className="bg-[#13171f] p-3 rounded border-l-2 border-pink-500">
          <label className="text-pink-400 font-bold block mb-1">Phase 4 [親愛と執着]: どんな独占欲や依存を見せるか</label>
          <input
            type="text"
            value={char.phase4Attachment}
            onChange={(e) => updateField('phase4Attachment', e.target.value)}
            placeholder="例: 「どこにも行かないで…アンタまで消えたら私、もう立っていられない…」と涙目で縋る。"
            className="w-full bg-[#181d26] border border-[#252e3d] rounded px-3 py-1.5 text-slate-200 outline-none"
          />
        </div>

        <div className="bg-[#13171f] p-3 rounded border-l-2 border-purple-500">
          <label className="text-purple-400 font-bold block mb-1">Phase 5 [唯一無二・魂の結びつき]: 完全に心を捧げた時の態度</label>
          <input
            type="text"
            value={char.phase5Irreplaceable}
            onChange={(e) => updateField('phase5Irreplaceable', e.target.value)}
            placeholder="例: 「世界中がアンタの敵になっても、私だけはアンタのために世界を焼き尽くしてあげる」"
            className="w-full bg-[#181d26] border border-[#252e3d] rounded px-3 py-1.5 text-slate-200 outline-none"
          />
        </div>
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
    </div>
  );
};
