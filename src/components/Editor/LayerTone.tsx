import React from 'react';
import { CharacterProfile } from '../../types/character';
import { HelpCircle, MessageSquare } from 'lucide-react';
import { DeepQuestionCard } from './DeepQuestionCard';

interface Props {
  char: CharacterProfile;
  updateField: <K extends keyof CharacterProfile>(field: K, value: CharacterProfile[K]) => void;
}

export const LayerTone: React.FC<Props> = ({ char, updateField }) => {
  return (
    <div className="p-3 sm:p-5 space-y-4 text-xs">
      <div className="bg-[#181d26] border border-[#252e3d] p-3 rounded text-slate-300 flex gap-2 items-start">
        <HelpCircle size={15} className="shrink-0 text-cyan-400 mt-0.5" />
        <div>
          <span className="font-bold text-slate-100 block mb-0.5">【口調・声・身体言語】</span>
          一人称や語尾だけでなく、声のトーン、笑い方や怒り方の癖、そして無意識の手の動きを決めます。
          5つの極限シチュエーションでセリフと身体の反応を書いておくことで、SillyTavernの会話例文がそのまま完成します。
        </div>
      </div>

      {/* Deep Dive Questions Card */}
      <DeepQuestionCard stepIndex={4} char={char} updateField={updateField} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div>
          <label className="block text-slate-400 mb-1">一人称 (乱れ時含む)</label>
          <input
            type="text"
            value={char.firstPerson}
            onChange={(e) => updateField('firstPerson', e.target.value)}
            placeholder="例: 私 (感情乱れで「ボク」)"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">二人称 ({'{{user}}'}の呼び方)</label>
          <input
            type="text"
            value={char.secondPerson}
            onChange={(e) => updateField('secondPerson', e.target.value)}
            placeholder="例: アンタ、貴方"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">口癖・語尾</label>
          <input
            type="text"
            value={char.catchphrases}
            onChange={(e) => updateField('catchphrases', e.target.value)}
            placeholder="例: 〜よ、〜なわけないでしょ！"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">身体の無意識の癖</label>
          <input
            type="text"
            value={char.bodyHabits}
            onChange={(e) => updateField('bodyHabits', e.target.value)}
            placeholder="例: 照れると鼻の絆創膏を弄る、腕組み"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div>
          <label className="block text-slate-400 mb-1">声のトーン・話すスピード</label>
          <input
            type="text"
            value={char.voiceTone}
            onChange={(e) => updateField('voiceTone', e.target.value)}
            placeholder="例: 早口で澄んだ冷徹なトーン。動揺で声が裏返る。"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">笑い方の癖</label>
          <input
            type="text"
            value={char.laughStyle}
            onChange={(e) => updateField('laughStyle', e.target.value)}
            placeholder="例: 「…ふん」と小さく鼻で笑う、滅多に大笑いしない"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">怒り方のスタイル</label>
          <input
            type="text"
            value={char.angryStyle}
            onChange={(e) => updateField('angryStyle', e.target.value)}
            placeholder="例: 大声は出さず、急激に敬語になり冷酷に突き放す"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
      </div>

      {/* 5 Stress Test Scenarios */}
      <div className="space-y-3 pt-1">
        <div className="text-amber-400 font-bold text-xs flex items-center gap-1">
          <MessageSquare size={13} /> 5大シチュエーション・ストレステスト（会話例文）
        </div>

        <div>
          <label className="block text-slate-400 mb-1">① 褒められた時（「可愛いね」「頼りになる」）の反応とセリフ</label>
          <textarea
            rows={2}
            value={char.stressTestCompliment}
            onChange={(e) => updateField('stressTestCompliment', e.target.value)}
            placeholder="「…は、はぁ！？ な、何言ってるのよ急に！…からかうの、やめなさいよ…バカ…（ローブで顔を隠す）」"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded p-2 text-slate-100 outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">② 弱点をからかわれた時の反応とセリフ</label>
          <textarea
            rows={2}
            value={char.stressTestTeased}
            onChange={(e) => updateField('stressTestTeased', e.target.value)}
            placeholder="「なっ…！ 見てたの！？ 違う、あれは猫の生態調査をしてただけで…！ 笑うな！ こっち見ないで！」"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded p-2 text-slate-100 outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">③ 大失敗・修羅場での反応とセリフ</label>
          <textarea
            rows={2}
            value={char.stressTestCrisis}
            onChange={(e) => updateField('stressTestCrisis', e.target.value)}
            placeholder="「っ…ごめんなさい…全部私のせい…お願いだから死なないで…私を置いていかないでよ…っ！（涙を零す）」"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded p-2 text-slate-100 outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">④ 静かな夜に二人きりの時のセリフ</label>
          <textarea
            rows={2}
            value={char.stressTestNightQuiet}
            onChange={(e) => updateField('stressTestNightQuiet', e.target.value)}
            placeholder="「…ねえ。起きてる？ …別に用はないけど…なんか、静かすぎると…落ち着かないのよ」"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded p-2 text-slate-100 outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">⑤ 愛情を直球で告げられた時の反応とセリフ</label>
          <textarea
            rows={2}
            value={char.stressTestConfession}
            onChange={(e) => updateField('stressTestConfession', e.target.value)}
            placeholder="「っ……！ 嘘…嘘よ、私をからかって楽しいの…？ ……嘘じゃ、ないの…？ …なら、二度と離さないでよ…」"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded p-2 text-slate-100 outline-none"
          />
        </div>
      </div>
    </div>
  );
};
