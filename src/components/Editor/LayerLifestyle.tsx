import React from 'react';
import { CharacterProfile } from '../../types/character';
import { Dice5, HelpCircle, Coffee, Briefcase, Building2 } from 'lucide-react';
import { drawGacha } from '../../utils/gachaData';
import { DeepQuestionCard } from './DeepQuestionCard';

interface Props {
  char: CharacterProfile;
  updateField: <K extends keyof CharacterProfile>(field: K, value: CharacterProfile[K]) => void;
}

export const LayerLifestyle: React.FC<Props> = ({ char, updateField }) => {
  return (
    <div className="p-3 sm:p-5 space-y-4 text-xs">
      <div className="bg-[#181d26] border border-[#252e3d] p-3 rounded text-slate-300 flex gap-2 items-start">
        <HelpCircle size={15} className="shrink-0 text-amber-400 mt-0.5" />
        <div>
          <span className="font-bold text-slate-100 block mb-0.5">【職業・日常・生活感・人間味】</span>
          職業や所属組織、仕事中の癖（職業病）、そして私生活での金銭感覚や酒癖、「仕事は完璧なのに生活で信じられないほど不器用なこと」を定義します。
          この生活感こそが、キャラの愛着と実在感の源泉です。
        </div>
      </div>

      {/* Deep Dive Questions Card */}
      <DeepQuestionCard stepIndex={2} char={char} updateField={updateField} />

      {/* Occupation & Social Status Section */}
      <div className="bg-[#121620] border border-cyan-900/30 rounded-xl p-3.5 space-y-3">
        <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5 border-b border-cyan-900/20 pb-1.5">
          <Briefcase size={14} className="text-cyan-400" />
          <span>職業・社会的立場・所属 (Occupation & Status)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 font-bold mb-1">職業・役職・身分</label>
            <input
              type="text"
              value={char.occupation || ''}
              onChange={(e) => updateField('occupation', e.target.value)}
              placeholder="例: 帝国魔導情報部 観測官（二等魔導官） / 落ちこぼれ研究員"
              className="w-full bg-[#181d26] border border-[#252e3d] rounded px-3 py-2 text-slate-100 outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">所属組織・勢力・学術機関</label>
            <input
              type="text"
              value={char.affiliation || ''}
              onChange={(e) => updateField('affiliation', e.target.value)}
              placeholder="例: 帝国学術院 第四機密局、元アルカディア名門家"
              className="w-full bg-[#181d26] border border-[#252e3d] rounded px-3 py-2 text-slate-100 outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-slate-400 mb-1">職業病・仕事モード時の無意識の癖</label>
            <input
              type="text"
              value={char.occupationalHabit || ''}
              onChange={(e) => updateField('occupationalHabit', e.target.value)}
              placeholder="例: 指先にインク染み、部屋に入ると死角と出入口を確認してしまう"
              className="w-full bg-[#181d26] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">社会的地位・生活水準・世間からの扱われ方</label>
            <input
              type="text"
              value={char.socialStatus || ''}
              onChange={(e) => updateField('socialStatus', e.target.value)}
              placeholder="例: 家柄から追放寸前で薄給。世間からは腫れ物扱い"
              className="w-full bg-[#181d26] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-amber-400 font-bold block flex items-center gap-1">
              <Coffee size={13} /> 得意領域 vs 致命的ポンコツ (愛嬌の源泉)
            </label>
            <button
              type="button"
              onClick={() => {
                const item = drawGacha('意外な弱点');
                updateField('clumsyArea', item.description);
              }}
              className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <Dice5 size={12} /> ガチャ
            </button>
          </div>
          <textarea
            rows={2}
            value={char.clumsyArea}
            onChange={(e) => updateField('clumsyArea', e.target.value)}
            placeholder="例: 【得意】精密な術式解読、毒舌\n【ポンコツ】料理をすると必ず謎の紫色の煙で爆発する。極度の方向音痴。"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded p-2 text-slate-100 outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-bold mb-1">外聞（世間の噂）vs 自己評価（本人の本音）</label>
          <textarea
            rows={2}
            value={char.reputationVsSelf}
            onChange={(e) => updateField('reputationVsSelf', e.target.value)}
            placeholder="例: 【世間】冷酷な天才毒舌魔導士\n【本音】「なんでみんな話しかけてくれないの…？」と陰で凹んでいる"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded p-2 text-slate-100 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div>
          <label className="block text-slate-400 mb-1">部屋の様子・インテリア</label>
          <input
            type="text"
            value={char.roomState}
            onChange={(e) => updateField('roomState', e.target.value)}
            placeholder="例: 書類と魔導書が床に山積み"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">休日の過ごし方</label>
          <input
            type="text"
            value={char.holidayHabits}
            onChange={(e) => updateField('holidayHabits', e.target.value)}
            placeholder="例: 昼過ぎまで毛布に丸まってメモを書く"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">金銭感覚・使い道</label>
          <input
            type="text"
            value={char.moneySense}
            onChange={(e) => updateField('moneySense', e.target.value)}
            placeholder="例: 古書には全財産注ぎ込むが食事は乾燥パン"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div>
          <label className="block text-slate-400 mb-1">食の好み・味覚</label>
          <input
            type="text"
            value={char.foodPreferences}
            onChange={(e) => updateField('foodPreferences', e.target.value)}
            placeholder="例: 角砂糖5個入れる極度の甘党、辛い物は涙目"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">嗜好品（酒癖・煙草・カフェイン）</label>
          <input
            type="text"
            value={char.drinkTobacco}
            onChange={(e) => updateField('drinkTobacco', e.target.value)}
            placeholder="例: お酒は一杯で真っ赤になって絡み酒になる"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">睡眠リズム・寝相・寝起き</label>
          <input
            type="text"
            value={char.sleepHabits}
            onChange={(e) => updateField('sleepHabits', e.target.value)}
            placeholder="例: 極度の夜型。寝起きは不機嫌で抱き枕に執着"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
      </div>
    </div>
  );
};
