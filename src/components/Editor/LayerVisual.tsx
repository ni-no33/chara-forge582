import React from 'react';
import { CharacterProfile, WardrobeItem } from '../../types/character';
import { Sparkles, HelpCircle, Dice5 } from 'lucide-react';
import { drawGacha } from '../../utils/gachaData';
import { DeepQuestionCard } from './DeepQuestionCard';
import { SmartGeminiImportModal } from './SmartGeminiImportModal';

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

      {/* Clothing Legacy inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div>
          <label className="block text-slate-400 mb-1">普段着の概要（メイン）</label>
          <input
            type="text"
            value={char.defaultOutfit}
            onChange={(e) => updateField('defaultOutfit', e.target.value)}
            placeholder="例: オーバーサイズ黒ローブ、ノースリーブハイネック"
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">部屋着・下着の概要</label>
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

      {/* Wardrobe & Lookbook (Multi-outfit with images) */}
      <WardrobeEditor char={char} updateField={updateField} />

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

// Subcomponent: Wardrobe Editor
interface WardrobeEditorProps {
  char: CharacterProfile;
  updateField: <K extends keyof CharacterProfile>(field: K, value: CharacterProfile[K]) => void;
}

const WardrobeEditor: React.FC<WardrobeEditorProps> = ({ char, updateField }) => {
  const [isGeminiOpen, setIsGeminiOpen] = React.useState(false);
  const wardrobe = char.wardrobe || [];

  const handleAddOutfit = () => {
    const newItem: import('../../types/character').WardrobeItem = {
      id: `w-${Date.now()}`,
      title: '新しい衣装',
      category: 'everyday',
      description: '',
      underwearDetails: '',
      imageUrl: ''
    };
    updateField('wardrobe', [...wardrobe, newItem]);
  };

  const handleUpdateItem = (id: string, updates: Partial<import('../../types/character').WardrobeItem>) => {
    const next = wardrobe.map(w => (w.id === id ? { ...w, ...updates } : w));
    updateField('wardrobe', next);
  };

  const handleDeleteItem = (id: string) => {
    updateField('wardrobe', wardrobe.filter(w => w.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= wardrobe.length) return;
    const next = [...wardrobe];
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;
    updateField('wardrobe', next);
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        handleUpdateItem(id, { imageUrl: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddImported = (items: import('../../types/character').WardrobeItem[]) => {
    updateField('wardrobe', [...wardrobe, ...items]);
  };

  return (
    <div className="bg-[#13171f] border border-amber-500/40 rounded-lg p-3.5 space-y-3.5">
      {/* Wardrobe Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#252e3d] pb-2.5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold text-sm flex items-center gap-1.5">
              👗 衣装ワードローブ ＆ ルックブック（個別画像＋差分管理）
            </span>
            <span className="px-2 py-0.5 bg-amber-950/60 border border-amber-800 text-amber-300 text-[10px] rounded font-bold">
              {wardrobe.length} 着登録中
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            私服複数、部屋着（夏・冬）、下着（デイリー・勝負）などを好きな名前で個別管理。衣装ごとに画像も登録できます。
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsGeminiOpen(true)}
            className="px-2.5 py-1.5 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-300 rounded font-bold flex items-center gap-1.5 text-xs transition"
          >
            <Sparkles size={13} className="text-cyan-400" />
            <span>Geminiから一括取り込み</span>
          </button>

          <button
            type="button"
            onClick={handleAddOutfit}
            className="px-3 py-1.5 bg-[#d98b2b] hover:bg-amber-500 text-black rounded font-bold flex items-center gap-1 text-xs transition shadow"
          >
            <span>＋ 衣装を追加</span>
          </button>
        </div>
      </div>

      {/* Wardrobe Items List */}
      {wardrobe.length === 0 ? (
        <div className="p-6 text-center border border-dashed border-[#252e3d] rounded-lg text-slate-400 space-y-2">
          <p>まだ衣装バリエーションが登録されていません。</p>
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={handleAddOutfit}
              className="px-3 py-1 bg-[#181d26] hover:bg-[#252e3d] border border-amber-500/40 text-amber-400 rounded text-xs"
            >
              ＋ 衣装スロットを追加する
            </button>
            <button
              type="button"
              onClick={() => setIsGeminiOpen(true)}
              className="px-3 py-1 bg-[#181d26] hover:bg-[#252e3d] border border-cyan-500/40 text-cyan-400 rounded text-xs"
            >
              💡 Geminiに衣装案を出してもらう
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3.5">
          {wardrobe.map((item, index) => (
            <div
              key={item.id}
              className="bg-[#181d26] border border-[#252e3d] rounded-lg p-3 space-y-3 hover:border-slate-600 transition"
            >
              {/* Row 1: Title, Category, Actions */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#222936] pb-2">
                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                  <select
                    value={item.category}
                    onChange={(e) => handleUpdateItem(item.id, { category: e.target.value as any })}
                    className="bg-[#11141a] border border-[#252e3d] text-amber-400 rounded px-2 py-1 text-[11px] font-bold outline-none"
                  >
                    <option value="everyday">普段着・私服</option>
                    <option value="roomwear">部屋着・パジャマ</option>
                    <option value="underwear">下着・インナー</option>
                    <option value="formal">正装・フォーマル</option>
                    <option value="special">仕事着・戦闘服</option>
                    <option value="other">その他スタイル</option>
                  </select>

                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleUpdateItem(item.id, { title: e.target.value })}
                    placeholder="衣装名（例: 部屋着（夏・彼シャツ風）、勝負下着、真冬の私服）"
                    className="bg-[#11141a] border border-[#252e3d] rounded px-2.5 py-1 text-slate-100 font-bold text-xs flex-1 outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    className="px-1.5 py-1 bg-[#11141a] border border-[#252e3d] rounded text-slate-400 hover:text-slate-200 disabled:opacity-30"
                    title="上へ"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === wardrobe.length - 1}
                    className="px-1.5 py-1 bg-[#11141a] border border-[#252e3d] rounded text-slate-400 hover:text-slate-200 disabled:opacity-30"
                    title="下へ"
                  >
                    ▼
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    className="px-2 py-1 bg-rose-950/40 hover:bg-rose-900 border border-rose-800/40 text-rose-400 rounded text-[11px] transition ml-1"
                  >
                    削除
                  </button>
                </div>
              </div>

              {/* Row 2: Image & Details */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Outfit Image Thumbnail / Upload Box */}
                <div className="sm:w-32 shrink-0 flex flex-col items-center gap-1.5">
                  <div className="w-full aspect-[3/4] bg-[#11141a] border border-dashed border-[#374357] rounded-lg overflow-hidden flex flex-col items-center justify-center relative group">
                    {item.imageUrl ? (
                      <>
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleUpdateItem(item.id, { imageUrl: '' })}
                          className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-rose-900 text-slate-200 rounded text-[9px] opacity-0 group-hover:opacity-100 transition"
                          title="画像を削除"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <label className="w-full h-full flex flex-col items-center justify-center p-2 text-center cursor-pointer hover:bg-[#18202d] transition">
                        <span className="text-lg">📷</span>
                        <span className="text-[10px] text-slate-400 mt-1 font-bold">画像登録</span>
                        <span className="text-[8px] text-slate-500">タップして選択</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(item.id, e)}
                        />
                      </label>
                    )}
                  </div>
                  {item.imageUrl && (
                    <label className="text-[10px] text-cyan-400 hover:underline cursor-pointer">
                      画像を変更
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(item.id, e)}
                      />
                    </label>
                  )}
                </div>

                {/* Text Details */}
                <div className="flex-1 space-y-2.5">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      服のデザイン・着崩し方・素材・シルエット
                    </label>
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => handleUpdateItem(item.id, { description: e.target.value })}
                      placeholder="例: オーバーサイズのダボ白シャツ一枚にショートパンツ。胸元がはだけやすく、背中には尻尾用の穴が開いている。生地が薄く透けやすい。"
                      className="w-full bg-[#11141a] border border-[#252e3d] rounded p-2 text-slate-200 text-xs outline-none focus:border-amber-500 leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-amber-300 mb-0.5">
                        下着事情・着脱時の反応（ノーブラ・見せブラ・下着の色）
                      </label>
                      <input
                        type="text"
                        value={item.underwearDetails || ''}
                        onChange={(e) => handleUpdateItem(item.id, { underwearDetails: e.target.value })}
                        placeholder="例: 部屋では基本ノーブラ。下はシンプルな綿ショーツのみ"
                        className="w-full bg-[#11141a] border border-[#252e3d] rounded px-2 py-1 text-slate-200 text-xs outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-cyan-400 font-mono mb-0.5">
                        SDXL / 画像生成プロンプト補助タグ
                      </label>
                      <input
                        type="text"
                        value={item.sdxlTags || ''}
                        onChange={(e) => handleUpdateItem(item.id, { sdxlTags: e.target.value })}
                        placeholder="oversized shirt, shorts, messy hair, blushing"
                        className="w-full bg-[#11141a] border border-[#252e3d] rounded px-2 py-1 text-cyan-300 font-mono text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gemini Importer Modal */}
      <SmartGeminiImportModal
        isOpen={isGeminiOpen}
        onClose={() => setIsGeminiOpen(false)}
        char={char}
        initialTarget="wardrobe"
        onAddWardrobeItems={handleAddImported}
      />
    </div>
  );
};
