import React from 'react';
import { CharacterProfile } from '../../types/character';
import { Sparkles, HelpCircle, Dice5 } from 'lucide-react';
import { drawGacha } from '../../utils/gachaData';
import { DeepQuestionCard } from './DeepQuestionCard';

interface Props {
  char: CharacterProfile;
  updateField: <K extends keyof CharacterProfile>(field: K, value: CharacterProfile[K]) => void;
}

export const LayerVisual: React.FC<Props> = ({ char, updateField }) => {
  return (
    <div className="p-3 sm:p-5 space-y-4 text-xs">
      <div className="bg-[#181d26] border border-[#252e3d] p-3 rounded text-slate-300 flex gap-2 items-start">
        <HelpCircle size={15} className="shrink-0 text-amber-400 mt-0.5" />
        <div>
          <span className="font-bold text-slate-100 block mb-0.5">【外見・身体の深掘り】</span>
          白黒の影絵にした時のシルエット、骨格や肉づき、肌の質感、そして纏っている匂いまで定義します。
          「固有の識別記号」を1つ決めるだけで、SDXLでも一発でそのキャラと分かるようになります。
        </div>
      </div>

      {/* Deep Dive Questions Card */}
      <DeepQuestionCard stepIndex={0} char={char} updateField={updateField} />

      {/* Anchor Feature (Top Priority) */}
      <div className="bg-[#13171f] p-3 rounded border border-amber-500/40">
        <div className="flex items-center justify-between mb-1">
          <label className="text-amber-400 font-bold block flex items-center gap-1">
            <Sparkles size={13} /> 固有の識別記号 (Anchor Feature) - 最重要
          </label>
          <button
            type="button"
            onClick={() => {
              const item = drawGacha('固有記号');
              updateField('anchorFeatures', item.description);
            }}
            className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <Dice5 size={12} /> ガチャ
          </button>
        </div>
        <input
          type="text"
          value={char.anchorFeatures}
          onChange={(e) => updateField('anchorFeatures', e.target.value)}
          placeholder="例: 鼻梁の小さな絆創膏、左目の泣きぼくろ、だぼだぼ黒ローブ、真鍮製片眼鏡"
          className="w-full bg-[#181d26] border border-[#252e3d] rounded px-3 py-2 text-slate-100 outline-none"
        />
      </div>

      {/* Biometrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div>
          <label className="block text-slate-400 mb-1">見かけ年齢</label>
          <input
            type="text"
            value={char.apparentAge}
            onChange={(e) => updateField('apparentAge', e.target.value)}
            placeholder="例: 17歳（実年齢19歳）"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">性別</label>
          <input
            type="text"
            value={char.gender}
            onChange={(e) => updateField('gender', e.target.value)}
            placeholder="例: 女性"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">種族・血統</label>
          <input
            type="text"
            value={char.species}
            onChange={(e) => updateField('species', e.target.value)}
            placeholder="例: 人間（古代微弱血統）"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">身長</label>
          <input
            type="text"
            value={char.height}
            onChange={(e) => updateField('height', e.target.value)}
            placeholder="例: 152cm"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
      </div>

      {/* Body build, skin, scent */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div>
          <label className="block text-slate-400 mb-1">骨格・体型</label>
          <input
            type="text"
            value={char.bodyBuild}
            onChange={(e) => updateField('bodyBuild', e.target.value)}
            placeholder="例: 小柄で華奢、やや痩せ気味"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">肌の色・肌質・体温</label>
          <input
            type="text"
            value={char.skinDetails}
            onChange={(e) => updateField('skinDetails', e.target.value)}
            placeholder="例: 透き通るような色白、火照りやすい"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">体臭・纏っている匂い</label>
          <input
            type="text"
            value={char.scentDetails}
            onChange={(e) => updateField('scentDetails', e.target.value)}
            placeholder="例: 古書とほのかな乾燥ラベンダーの香り"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
      </div>

      {/* Head & Eyes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div>
          <label className="block text-slate-400 mb-1">髪型・結び方</label>
          <input
            type="text"
            value={char.hairStyle}
            onChange={(e) => updateField('hairStyle', e.target.value)}
            placeholder="例: 無造作なローツインテール、アホ毛"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">髪色・髪質</label>
          <input
            type="text"
            value={char.hairColor}
            onChange={(e) => updateField('hairColor', e.target.value)}
            placeholder="例: プラチナシルバー（銀髪、光で蒼に透ける）"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">瞳の色・目つき（特徴）</label>
          <input
            type="text"
            value={char.eyeColor}
            onChange={(e) => updateField('eyeColor', e.target.value)}
            placeholder="例: オッドアイ（右目が赤、左目が紫）、ジト目"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
      </div>

      {/* Clothing */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div>
          <label className="block text-slate-400 mb-1">普段着・着こなし</label>
          <input
            type="text"
            value={char.defaultOutfit}
            onChange={(e) => updateField('defaultOutfit', e.target.value)}
            placeholder="例: オーバーサイズ黒ローブ、ノースリーブハイネック"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">部屋着・下着の好み</label>
          <input
            type="text"
            value={char.underwearRoomwear}
            onChange={(e) => updateField('underwearRoomwear', e.target.value)}
            placeholder="例: だぼだぼの大きめシャツ1枚、シンプルな綿下着"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">パーソナルカラー (配分)</label>
          <input
            type="text"
            value={char.personalColors}
            onChange={(e) => updateField('personalColors', e.target.value)}
            placeholder="例: ネイビー(60%), シルバー(30%), 赤(10%)"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
      </div>

      {/* SDXL Prompt Tags */}
      <div>
        <label className="block text-cyan-400 font-mono mb-1">SDXL / Danbooru ベースタグ</label>
        <textarea
          rows={2}
          value={char.sdxlBaseTags}
          onChange={(e) => updateField('sdxlBaseTags', e.target.value)}
          placeholder="1girl, silver hair, low twintails, heterochromia, mole under eye, bandaid on nose, oversized robe..."
          className="w-full bg-[#13171f] border border-[#252e3d] rounded p-2 text-cyan-300 font-mono text-xs outline-none"
        />
      </div>
    </div>
  );
};
