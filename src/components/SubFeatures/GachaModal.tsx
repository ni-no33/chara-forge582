import React, { useState } from 'react';
import { GachaItem, drawGacha, GACHA_DATABASE } from '../../utils/gachaData';
import { CharacterProfile } from '../../types/character';
import { X, Dice5, Sparkles, Check } from 'lucide-react';

interface GachaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyItem: (targetField: keyof CharacterProfile, content: string) => void;
}

export const GachaModal: React.FC<GachaModalProps> = ({ isOpen, onClose, onApplyItem }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentItem, setCurrentItem] = useState<GachaItem>(() => drawGacha());
  const [isSpinning, setIsSpinning] = useState(false);
  const [applied, setApplied] = useState(false);

  if (!isOpen) return null;

  const categories = ['all', '意外な弱点', '人生の転換点', '固有記号', '究極の選択'];

  const handleDraw = () => {
    setIsSpinning(true);
    setApplied(false);
    setTimeout(() => {
      const item = drawGacha(selectedCategory === 'all' ? undefined : selectedCategory);
      setCurrentItem(item);
      setIsSpinning(false);
    }, 250);
  };

  const handleApply = () => {
    onApplyItem(currentItem.targetField as keyof CharacterProfile, currentItem.description);
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-4 sm:p-6 space-y-4 shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Dice5 size={22} className="text-amber-400" />
          <h2 className="text-base sm:text-lg font-bold text-white">
            発想の種ガチャ（インスピレーション・スロット）
          </h2>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-1.5 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded transition ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white font-bold'
                  : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {cat === 'all' ? 'すべて' : cat}
            </button>
          ))}
        </div>

        {/* Gacha Card Result */}
        <div className={`p-4 bg-slate-950 rounded-lg border border-amber-500/40 space-y-2 transition-all ${isSpinning ? 'opacity-40 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
              {currentItem.category}
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              対象スロット: {currentItem.targetField}
            </span>
          </div>

          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-400" />
            {currentItem.title}
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded border border-slate-800">
            {currentItem.description}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleDraw}
            disabled={isSpinning}
            className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition border border-slate-700"
          >
            <Dice5 size={16} className={isSpinning ? 'animate-spin' : ''} />
            もう一度引く
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition shadow"
          >
            {applied ? <Check size={16} className="text-emerald-300" /> : <Sparkles size={16} />}
            {applied ? '設定に反映しました！' : 'このアイデアを採用'}
          </button>
        </div>
      </div>
    </div>
  );
};
