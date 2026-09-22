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

      {/* 5 Stress Test Scenarios with Multi-Patterns */}
      <div className="space-y-4 pt-1">
        <div className="flex items-center justify-between">
          <div className="text-amber-400 font-bold text-xs flex items-center gap-1">
            <MessageSquare size={13} /> 5大シチュエーション・会話例文（マルチパターン対応）
          </div>
          <span className="text-[10px] text-slate-500">
            ※攻め／受け／余裕／クール等、キャラの性格に合わせた返しを自由に記録
          </span>
        </div>

        {/* ① 褒められた時 */}
        <ToneScenarioCard
          title="① 褒められた時（「可愛いね」「頼りになる」「かっこいい」等）"
          mainValue={char.stressTestCompliment}
          onMainChange={(val) => updateField('stressTestCompliment', val)}
          patterns={char.tonePatterns?.['compliment'] || []}
          onAddPattern={() => {
            const current = char.tonePatterns?.['compliment'] || [];
            updateField('tonePatterns', { ...(char.tonePatterns || {}), compliment: [...current, ''] });
          }}
          onUpdatePattern={(idx, val) => {
            const current = [...(char.tonePatterns?.['compliment'] || [])];
            current[idx] = val;
            updateField('tonePatterns', { ...(char.tonePatterns || {}), compliment: current });
          }}
          onDeletePattern={(idx) => {
            const current = [...(char.tonePatterns?.['compliment'] || [])];
            current.splice(idx, 1);
            updateField('tonePatterns', { ...(char.tonePatterns || {}), compliment: current });
          }}
          placeholder="例: 「ふふ、お世辞でも嬉しいよ。もっと言って？」（余裕・攻め） / 「……っ、急にそういうこと言うなバカ」（照れ） / 「当然の結果よ」（クール）"
        />

        {/* ② からかわれた時 */}
        <ToneScenarioCard
          title="② 弱点や隙を突かれてからかわれた時"
          mainValue={char.stressTestTeased}
          onMainChange={(val) => updateField('stressTestTeased', val)}
          patterns={char.tonePatterns?.['teased'] || []}
          onAddPattern={() => {
            const current = char.tonePatterns?.['teased'] || [];
            updateField('tonePatterns', { ...(char.tonePatterns || {}), teased: [...current, ''] });
          }}
          onUpdatePattern={(idx, val) => {
            const current = [...(char.tonePatterns?.['teased'] || [])];
            current[idx] = val;
            updateField('tonePatterns', { ...(char.tonePatterns || {}), teased: current });
          }}
          onDeletePattern={(idx) => {
            const current = [...(char.tonePatterns?.['teased'] || [])];
            current.splice(idx, 1);
            updateField('tonePatterns', { ...(char.tonePatterns || {}), teased: current });
          }}
          placeholder="例: 「いい度胸ね。私をからかった報いは高くつくわよ？」（好戦的・反撃） / 「…からかっても何も出ないわよ」（無関心） / 「なっ…見てたの！？」（動揺）"
        />

        {/* ③ 大失敗・修羅場 */}
        <ToneScenarioCard
          title="③ 大失敗・修羅場・危機的状況"
          mainValue={char.stressTestCrisis}
          onMainChange={(val) => updateField('stressTestCrisis', val)}
          patterns={char.tonePatterns?.['crisis'] || []}
          onAddPattern={() => {
            const current = char.tonePatterns?.['crisis'] || [];
            updateField('tonePatterns', { ...(char.tonePatterns || {}), crisis: [...current, ''] });
          }}
          onUpdatePattern={(idx, val) => {
            const current = [...(char.tonePatterns?.['crisis'] || [])];
            current[idx] = val;
            updateField('tonePatterns', { ...(char.tonePatterns || {}), crisis: current });
          }}
          onDeletePattern={(idx) => {
            const current = [...(char.tonePatterns?.['crisis'] || [])];
            current.splice(idx, 1);
            updateField('tonePatterns', { ...(char.tonePatterns || {}), crisis: current });
          }}
          placeholder="例: 「下がってろ、私が片付ける」（頼れる主導） / 「っ…お願い、私を置いていかないで…！」（弱さ崩壊） / 「慌てるな、次の一手を打つ」（冷静）"
        />

        {/* ④ 静かな夜に二人きり */}
        <ToneScenarioCard
          title="④ 静かな夜に二人きりの時のセリフ・空気感"
          mainValue={char.stressTestNightQuiet}
          onMainChange={(val) => updateField('stressTestNightQuiet', val)}
          patterns={char.tonePatterns?.['nightQuiet'] || []}
          onAddPattern={() => {
            const current = char.tonePatterns?.['nightQuiet'] || [];
            updateField('tonePatterns', { ...(char.tonePatterns || {}), nightQuiet: [...current, ''] });
          }}
          onUpdatePattern={(idx, val) => {
            const current = [...(char.tonePatterns?.['nightQuiet'] || [])];
            current[idx] = val;
            updateField('tonePatterns', { ...(char.tonePatterns || {}), nightQuiet: current });
          }}
          onDeletePattern={(idx) => {
            const current = [...(char.tonePatterns?.['nightQuiet'] || [])];
            current.splice(idx, 1);
            updateField('tonePatterns', { ...(char.tonePatterns || {}), nightQuiet: current });
          }}
          placeholder="例: 「……二人きりだと、時計の音がやけに響くね。こっちにおいでよ」（誘い・余裕） / 「…起きてる？ 静かすぎると落ち着かないの」（素直な甘え）"
        />

        {/* ⑤ 愛情を直球で告げられた時 */}
        <ToneScenarioCard
          title="⑤ 愛情や好意を直球で告げられた時"
          mainValue={char.stressTestConfession}
          onMainChange={(val) => updateField('stressTestConfession', val)}
          patterns={char.tonePatterns?.['confession'] || []}
          onAddPattern={() => {
            const current = char.tonePatterns?.['confession'] || [];
            updateField('tonePatterns', { ...(char.tonePatterns || {}), confession: [...current, ''] });
          }}
          onUpdatePattern={(idx, val) => {
            const current = [...(char.tonePatterns?.['confession'] || [])];
            current[idx] = val;
            updateField('tonePatterns', { ...(char.tonePatterns || {}), confession: current });
          }}
          onDeletePattern={(idx) => {
            const current = [...(char.tonePatterns?.['confession'] || [])];
            current.splice(idx, 1);
            updateField('tonePatterns', { ...(char.tonePatterns || {}), confession: current });
          }}
          placeholder="例: 「……ふふ、言わせちゃった。もう逃がさないよ？」（独占・攻め） / 「っ……！ 嘘じゃないの…？ なら二度と離さないで」（受け） / 「言葉だけじゃ信用できない、行動で見せて」（試す）"
        />
      </div>
    </div>
  );
};

// Subcomponent: Tone Scenario Card
interface ToneScenarioCardProps {
  title: string;
  mainValue: string;
  onMainChange: (val: string) => void;
  patterns: string[];
  onAddPattern: () => void;
  onUpdatePattern: (idx: number, val: string) => void;
  onDeletePattern: (idx: number) => void;
  placeholder: string;
}

const ToneScenarioCard: React.FC<ToneScenarioCardProps> = ({
  title,
  mainValue,
  onMainChange,
  patterns,
  onAddPattern,
  onUpdatePattern,
  onDeletePattern,
  placeholder
}) => {
  return (
    <div className="bg-[#13171f] border border-[#252e3d] rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-slate-300 font-bold text-xs">{title}</label>
        <button
          type="button"
          onClick={onAddPattern}
          className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 px-1.5 py-0.5 bg-[#181d26] rounded border border-[#252e3d] transition"
        >
          <span>＋ パターン追加</span>
        </button>
      </div>

      <textarea
        rows={2}
        value={mainValue}
        onChange={(e) => onMainChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#181d26] border border-[#252e3d] rounded p-2 text-slate-100 text-xs outline-none focus:border-amber-500 leading-relaxed"
      />

      {patterns.length > 0 && (
        <div className="space-y-1.5 pl-2 border-l-2 border-cyan-800/60 mt-1.5">
          {patterns.map((pat, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="text-[10px] text-cyan-400 shrink-0">差分{idx + 1}:</span>
              <input
                type="text"
                value={pat}
                onChange={(e) => onUpdatePattern(idx, e.target.value)}
                placeholder="別シチュエーションでのセリフや反応差分..."
                className="flex-1 bg-[#181d26] border border-[#252e3d] rounded px-2 py-1 text-slate-200 text-[11px] outline-none focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={() => onDeletePattern(idx)}
                className="px-1.5 py-1 text-slate-500 hover:text-rose-400 text-xs"
                title="パターン削除"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
