import React, { useRef } from 'react';
import { CharacterProfile, CharacterImageSlot } from '../../types/character';
import { Upload, Trash2, Tag, Shirt, Briefcase, Moon, Sparkles, Image as ImageIcon } from 'lucide-react';

interface Props {
  char: CharacterProfile;
  updateField: <K extends keyof CharacterProfile>(field: K, value: CharacterProfile[K]) => void;
}

const DEFAULT_SLOT_PRESETS = [
  { id: 'slot-job', label: '職業・制服 / 戦闘装束', icon: Briefcase, placeholder: '仕事着、研究服、軍服、戦闘装備など' },
  { id: 'slot-casual', label: '日常・私服 / 部屋着', icon: Shirt, placeholder: '休日の私服、ダボダボの部屋着、寝巻きなど' },
  { id: 'slot-special', label: '正装・特殊形態 / 過去', icon: Sparkles, placeholder: '礼装、潜入用、過去の姿、暴走形態など' },
  { id: 'slot-night', label: '夜・プライベート / 親密', icon: Moon, placeholder: '薄着、ナイトウェア、ベッド用、NSFW差分など' },
];

export const MultiImageUploader: React.FC<Props> = ({ char, updateField }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadSlot, setActiveUploadSlot] = React.useState<string | null>(null);

  const gallery = char.galleryImages || [];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeUploadSlot) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        if (activeUploadSlot === 'main') {
          updateField('avatarImage', reader.result);
        } else {
          const existingIndex = gallery.findIndex((g) => g.id === activeUploadSlot);
          let newGallery = [...gallery];
          const preset = DEFAULT_SLOT_PRESETS.find((p) => p.id === activeUploadSlot);
          const label = preset ? preset.label : '衣装差分';

          if (existingIndex >= 0) {
            newGallery[existingIndex] = {
              ...newGallery[existingIndex],
              url: reader.result
            };
          } else {
            newGallery.push({
              id: activeUploadSlot,
              label,
              url: reader.result,
              outfitNotes: ''
            });
          }
          updateField('galleryImages', newGallery);
        }
      }
      setActiveUploadSlot(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = (slotId: string) => {
    setActiveUploadSlot(slotId);
    fileInputRef.current?.click();
  };

  const removeImage = (slotId: string) => {
    if (slotId === 'main') {
      updateField('avatarImage', '');
    } else {
      const newGallery = gallery.filter((g) => g.id !== slotId);
      updateField('galleryImages', newGallery);
    }
  };

  const updateSlotNote = (slotId: string, notes: string) => {
    const newGallery = gallery.map((g) => (g.id === slotId ? { ...g, outfitNotes: notes } : g));
    updateField('galleryImages', newGallery);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Main Avatar Slot */}
      <div className="bg-[#10141d] border border-amber-500/30 rounded-xl p-3.5 flex flex-col sm:flex-row gap-4 items-start">
        <div className="w-28 h-36 shrink-0 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden relative group flex flex-col items-center justify-center mx-auto sm:mx-0 shadow-inner">
          {char.avatarImage ? (
            <img src={char.avatarImage} alt="Main Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="text-slate-500 text-center p-2 text-[10px]">
              <Upload size={20} className="mx-auto mb-1 text-slate-600" />
              メイン画像未設定
            </div>
          )}
          <button
            type="button"
            onClick={() => triggerUpload('main')}
            className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 flex items-center justify-center transition text-amber-300 font-bold text-[11px]"
          >
            {char.avatarImage ? '画像を変更' : 'アップロード'}
          </button>
        </div>

        <div className="flex-1 w-full space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <ImageIcon size={14} /> ★ メインポートレート（基本の立ち絵・顔）
            </span>
            {char.avatarImage && (
              <button
                type="button"
                onClick={() => removeImage('main')}
                className="text-slate-500 hover:text-red-400 text-[11px] flex items-center gap-0.5 transition"
              >
                <Trash2 size={12} /> 削除
              </button>
            )}
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            ドシエの表紙やキャラカード（PNG）の表紙に埋め込まれるメイン画像です。
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={() => triggerUpload('main')}
              className="px-3 py-1.5 bg-[#181d26] hover:bg-[#252e3d] text-amber-300 rounded border border-[#252e3d] text-xs font-medium flex items-center gap-1.5 transition"
            >
              <Upload size={13} />
              <span>{char.avatarImage ? 'メイン画像を差し替える' : '画像ファイルを選択'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Extra Outfit Slots */}
      <div className="border border-[#252e3d] bg-[#121620] rounded-xl p-3.5 space-y-3">
        <div className="flex items-center justify-between border-b border-[#252e3d] pb-2">
          <div>
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Shirt size={14} className="text-cyan-400" />
              衣装差分・シチュエーション別ギャラリー（追加4枠）
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              職業着・私服・正装・夜の姿など、シーン別の画像を登録してドシエで着せ替えできます。
            </span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
            {gallery.length} / 4 登録済
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {DEFAULT_SLOT_PRESETS.map((preset) => {
            const Icon = preset.icon;
            const slotData = gallery.find((g) => g.id === preset.id);

            return (
              <div
                key={preset.id}
                className="bg-[#181d26] border border-[#252e3d] rounded-lg p-2.5 flex gap-3 items-start relative group"
              >
                {/* Thumbnail */}
                <div className="w-20 h-24 shrink-0 bg-[#0f1319] rounded border border-[#252e3d] overflow-hidden relative flex flex-col items-center justify-center">
                  {slotData?.url ? (
                    <img src={slotData.url} alt={preset.label} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-slate-600 text-center p-1 text-[9px]">
                      <Icon size={16} className="mx-auto mb-1 text-slate-600" />
                      未登録
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => triggerUpload(preset.id)}
                    className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 flex items-center justify-center transition text-cyan-300 font-bold text-[10px]"
                  >
                    変更
                  </button>
                </div>

                {/* Details & Notes */}
                <div className="flex-1 min-w-0 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200 text-[11px] flex items-center gap-1 truncate">
                      <Icon size={12} className="text-amber-400 shrink-0" />
                      {preset.label}
                    </span>
                    {slotData?.url && (
                      <button
                        type="button"
                        onClick={() => removeImage(preset.id)}
                        className="text-slate-500 hover:text-red-400 text-[10px] p-0.5 transition"
                        title="画像を削除"
                      >
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>

                  <p className="text-[10px] text-slate-400 line-clamp-1">{preset.placeholder}</p>

                  <div className="pt-0.5">
                    {slotData?.url ? (
                      <input
                        type="text"
                        value={slotData.outfitNotes || ''}
                        onChange={(e) => updateSlotNote(preset.id, e.target.value)}
                        placeholder="衣装の特徴・メモ（例: 白衣、眼鏡、腕まくり）"
                        className="w-full bg-[#10141d] border border-[#252e3d] rounded px-2 py-1 text-[11px] text-slate-200 outline-none focus:border-cyan-500"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => triggerUpload(preset.id)}
                        className="w-full py-1 bg-[#10141d] hover:bg-[#202734] text-slate-300 border border-[#252e3d] rounded text-[10px] flex items-center justify-center gap-1 transition"
                      >
                        <Upload size={11} />
                        <span>画像を取り込む</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
