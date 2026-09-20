import React from 'react';
import { CharacterProfile } from '../../types/character';
import { HelpCircle, Dice5, Brain } from 'lucide-react';
import { drawGacha } from '../../utils/gachaData';
import { DeepQuestionCard } from './DeepQuestionCard';

interface Props {
  char: CharacterProfile;
  updateField: <K extends keyof CharacterProfile>(field: K, value: CharacterProfile[K]) => void;
}

export const LayerPsychology: React.FC<Props> = ({ char, updateField }) => {
  return (
    <div className="p-3 sm:p-5 space-y-4 text-xs">
      <div className="bg-[#181d26] border border-[#252e3d] p-3 rounded text-slate-300 flex gap-2 items-start">
        <HelpCircle size={15} className="shrink-0 text-cyan-400 mt-0.5" />
        <div>
          <span className="font-bold text-slate-100 block mb-0.5">【心理・葛藤・魂のコア】</span>
          「他人にどう見られたいか（外面）」と「一人になった時の脆い本音（内面）」のギャップを定義します。
          人生で何を一番求め、何を一番恐れ、何を踏みにじられたら我を忘れるか。これらがキャラの行動原理になります。
        </div>
      </div>

      {/* Deep Dive Questions Card */}
      <DeepQuestionCard stepIndex={1} char={char} updateField={updateField} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-cyan-300 font-bold mb-1">【外面 (Persona)】他人に見せている仮面</label>
          <textarea
            rows={3}
            value={char.persona}
            onChange={(e) => updateField('persona', e.target.value)}
            placeholder="例: 冷徹で合理主義な優秀な研究官。生意気な毒舌で他人を遠ざける。"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded p-2.5 text-slate-100 outline-none"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-amber-400 font-bold block">【内面 (Shadow)】自覚している脆さ・本音</label>
            <button
              type="button"
              onClick={() => {
                const item = drawGacha('意外な弱点');
                updateField('shadow', item.description);
              }}
              className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <Dice5 size={12} /> ガチャ
            </button>
          </div>
          <textarea
            rows={3}
            value={char.shadow}
            onChange={(e) => updateField('shadow', e.target.value)}
            placeholder="例: 自分は無能だという劣等感。誰の役にも立てなくなった瞬間に捨てられるという恐怖。"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded p-2.5 text-slate-100 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div>
          <label className="block text-emerald-300 font-bold mb-1">人生の最優先価値観</label>
          <input
            type="text"
            value={char.coreValues}
            onChange={(e) => updateField('coreValues', e.target.value)}
            placeholder="例: 存在意義の証明、信じた人への誠実さ"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-emerald-400 font-bold mb-1">★ コアの最優先欲求 (Desire)</label>
          <input
            type="text"
            value={char.coreDesire}
            onChange={(e) => updateField('coreDesire', e.target.value)}
            placeholder="例: 「お前が必要だ」と無条件に認めてもらうこと"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-red-400 font-bold mb-1">⚠ コアの最悪の恐怖 (Fear)</label>
          <input
            type="text"
            value={char.coreFear}
            onChange={(e) => updateField('coreFear', e.target.value)}
            placeholder="例: 価値がないと見切られ、誰からも必要とされず孤立すること"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-red-400 font-bold mb-1">逆鱗・絶対に許せない地雷 (Triggers)</label>
          <input
            type="text"
            value={char.triggers}
            onChange={(e) => updateField('triggers', e.target.value)}
            placeholder="例: 「努力しても無駄」「落ちこぼれ」と才能や存在を侮辱されること"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-3 py-2 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-purple-300 font-bold mb-1">墓場まで持っていく秘密・罪悪感 (Secret)</label>
          <input
            type="text"
            value={char.secret}
            onChange={(e) => updateField('secret', e.target.value)}
            placeholder="例: かつて実験事故で友人を巻き込み、自分だけが無傷で生き残ったこと"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-3 py-2 text-slate-200 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-slate-400 mb-1">人生の座右の銘・信条 (Motto)</label>
          <input
            type="text"
            value={char.motto}
            onChange={(e) => updateField('motto', e.target.value)}
            placeholder="例: 「他人は信じない、信じられるのは自分で紡いだ術式だけ」"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-3 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">孤独への耐性</label>
          <input
            type="text"
            value={char.solitudeTolerance}
            onChange={(e) => updateField('solitudeTolerance', e.target.value)}
            placeholder="例: 一人で平気と強がるが、夜間の完全な沈黙には耐えられない"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-3 py-1.5 text-slate-200 outline-none"
          />
        </div>
      </div>

      {/* Dilemma Choice */}
      <div className="bg-[#13171f] p-3 rounded border border-purple-500/30">
        <div className="flex items-center justify-between mb-1">
          <label className="text-purple-300 font-bold block flex items-center gap-1">
            <Brain size={13} /> 究極の二者択一（意思決定の倫理的優先順位）
          </label>
          <button
            type="button"
            onClick={() => {
              const item = drawGacha('究極の選択');
              updateField('dilemmaChoice', item.description);
            }}
            className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <Dice5 size={12} /> ガチャ
          </button>
        </div>
        <input
          type="text"
          value={char.dilemmaChoice}
          onChange={(e) => updateField('dilemmaChoice', e.target.value)}
          placeholder="例: 世界を救う大義と、たった一人の{{user}}の命。迷わず世界を捨てて{{user}}の手を取る。"
          className="w-full bg-[#181d26] border border-[#252e3d] rounded px-3 py-2 text-slate-100 outline-none"
        />
      </div>
    </div>
  );
};
