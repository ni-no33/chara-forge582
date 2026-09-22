import React, { useState } from 'react';
import { CharacterProfile, RadarStats } from '../../types/character';
import { RadarChart } from './RadarChart';
import {
  ShieldAlert,
  FileText,
  Lock,
  Unlock,
  Heart,
  Flame,
  Sparkles,
  Clock,
  Eye,
  AlertTriangle,
  Edit3,
  Briefcase,
  Building2,
  Shirt,
  Layers,
  Coffee,
  Crown,
  PawPrint,
  Ear,
  Zap,
  Plus,
  MessageSquare
} from 'lucide-react';

interface DossierViewProps {
  char: CharacterProfile;
  onUpdateStats: (newStats: RadarStats) => void;
  onAvatarUpload: (base64: string) => void;
  nsfwMask: boolean;
  onJumpToStep?: (stepIndex: number) => void;
}

export const DossierView: React.FC<DossierViewProps> = ({
  char,
  onUpdateStats,
  onAvatarUpload,
  nsfwMask,
  onJumpToStep
}) => {
  const [unlockedSecrets, setUnlockedSecrets] = useState<Record<string, boolean>>({});
  const [activeImageId, setActiveImageId] = useState<string>('main');

  const toggleUnlock = (key: string) => {
    setUnlockedSecrets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onAvatarUpload(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const dangerColors = {
    S: 'border-red-500/60 text-red-400 bg-red-950/30',
    A: 'border-amber-500/60 text-amber-400 bg-amber-950/30',
    B: 'border-cyan-500/60 text-cyan-400 bg-cyan-950/30',
    C: 'border-emerald-500/60 text-emerald-400 bg-emerald-950/30',
    UNKNOWN: 'border-slate-600 text-slate-400 bg-slate-900/30',
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-28 animate-in fade-in duration-300">
      {/* Dossier Header Bar */}
      <div className="border border-slate-800 bg-slate-900/90 rounded-xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 tracking-wider uppercase">
              <ShieldAlert size={14} className="text-amber-400" />
              <span>CLASSIFIED INTELLIGENCE DOSSIER // TOP SECRET</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1 flex items-center gap-3">
              {char.name || '名称未設定'}
              <span className="text-xs sm:text-sm font-normal text-slate-400 font-mono">
                [{char.title || 'RECORD'}]
              </span>
            </h1>

            {/* Subspecies, Occupation & Affiliation Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
              {char.demiSpeciesName && (
                <span className="px-2.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 font-medium flex items-center gap-1.5 shadow-sm">
                  <PawPrint size={12} className="text-emerald-400" />
                  <span>{char.demiSpeciesName}</span>
                </span>
              )}
              {char.occupation && (
                <span className="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 font-medium flex items-center gap-1.5 shadow-sm">
                  <Briefcase size={12} className="text-cyan-400" />
                  <span>{char.occupation}</span>
                </span>
              )}
              {char.affiliation && (
                <span className="px-2.5 py-0.5 rounded bg-[#181d26] border border-[#252e3d] text-slate-300 font-medium flex items-center gap-1.5">
                  <Building2 size={12} className="text-slate-400" />
                  <span>{char.affiliation}</span>
                </span>
              )}
              <span className="text-slate-400 font-mono text-[11px]">
                管轄/世界: {char.world || '未指定'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`px-3 py-1 rounded border font-mono text-xs font-bold uppercase tracking-wider ${dangerColors[char.dangerLevel]}`}>
              THREAT LEVEL: {char.dangerLevel}
            </div>
            {onJumpToStep && (
              <button
                type="button"
                onClick={() => onJumpToStep(0)}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition shadow"
              >
                <Edit3 size={13} /> 基本設定
              </button>
            )}
          </div>
        </div>

        {/* Summary Quote */}
        {char.summary && (
          <div className="mt-4 text-xs sm:text-sm text-slate-300 italic bg-slate-950/60 p-3 rounded-lg border-l-2 border-amber-500">
            "{char.summary}"
          </div>
        )}
      </div>

      {/* Main Grid: Photo + Radar + Basic Vitals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Photo & Radar (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Photo Clip Card with Multi-Outfit Viewer */}
          <div className="border border-slate-800 bg-slate-900/90 rounded-xl p-4 shadow-lg relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Eye size={13} className="text-cyan-400" />
                VISUAL IDENTIFICATION (着せ替え・衣装差分)
              </span>
              <div className="flex items-center gap-2">
                {onJumpToStep && (
                  <button
                    type="button"
                    onClick={() => onJumpToStep(0)}
                    className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <Edit3 size={11} /> 画像管理
                  </button>
                )}
              </div>
            </div>

            {/* Active Display Image & Wardrobe Lookbook Viewer */}
            {(() => {
              const wardrobe = char.wardrobe || [];
              const gallery = char.galleryImages || [];

              // Determine current selected item
              let displayUrl = char.avatarImage;
              let slotTitle = 'メインポートレート';
              let outfitDesc = char.defaultOutfit || null;
              let underwearInfo = char.underwearRoomwear || null;

              if (activeImageId !== 'main') {
                const wardrobeItem = wardrobe.find((w) => w.id === activeImageId);
                if (wardrobeItem) {
                  displayUrl = wardrobeItem.imageUrl || char.avatarImage;
                  slotTitle = wardrobeItem.title;
                  outfitDesc = wardrobeItem.description || null;
                  underwearInfo = wardrobeItem.underwearDetails || null;
                } else {
                  const gallerySlot = gallery.find((g) => g.id === activeImageId);
                  if (gallerySlot) {
                    displayUrl = gallerySlot.url || char.avatarImage;
                    slotTitle = gallerySlot.label;
                    outfitDesc = gallerySlot.outfitNotes || null;
                  }
                }
              }

              return (
                <div className="space-y-2.5">
                  <div className="relative aspect-[3/4] max-h-80 w-full bg-slate-950 rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center group shadow-inner">
                    {displayUrl ? (
                      <img
                        src={displayUrl}
                        alt={slotTitle}
                        className="w-full h-full object-cover object-top transition duration-200"
                      />
                    ) : (
                      <div className="text-center p-6 space-y-2">
                        <div className="w-16 h-16 rounded-full bg-slate-800/80 border border-slate-700 mx-auto flex items-center justify-center text-slate-500 text-2xl">
                          ◈
                        </div>
                        <div className="text-xs text-slate-400 font-mono">NO IMAGE REGISTERED</div>
                        {onJumpToStep && (
                          <button
                            type="button"
                            onClick={() => onJumpToStep(1)}
                            className="inline-block px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs rounded border border-slate-700 cursor-pointer"
                          >
                            衣装・画像を登録する
                          </button>
                        )}
                      </div>
                    )}

                    {/* Paperclip simulation */}
                    <div className="absolute top-2 right-4 w-4 h-9 border-2 border-slate-400 rounded-full opacity-60 pointer-events-none" />

                    {/* Active Label Badge */}
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/85 backdrop-blur text-[11px] font-bold text-amber-300 border border-amber-500/40 pointer-events-none flex items-center gap-1.5 shadow-lg">
                      <Shirt size={12} className="text-amber-400" />
                      <span>{slotTitle}</span>
                    </div>
                  </div>

                  {/* Wardrobe Lookbook Description Box */}
                  {(outfitDesc || underwearInfo) && (
                    <div className="bg-[#121620] p-2.5 rounded-lg border border-[#252e3d] space-y-1.5 text-xs text-slate-300 animate-in fade-in">
                      {outfitDesc && (
                        <p className="leading-relaxed">
                          <span className="text-slate-400 text-[10px] font-bold block mb-0.5">【衣装・シルエット】</span>
                          {outfitDesc}
                        </p>
                      )}
                      {underwearInfo && (
                        <div className="pt-1 border-t border-slate-800/80 text-[11px] text-amber-300/90 flex items-start gap-1">
                          <span className="shrink-0 font-bold">👙 下着事情:</span>
                          <span>{underwearInfo}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Wardrobe & Outfit Thumbnail Strip */}
                  <div className="pt-1">
                    <span className="text-[10px] font-mono text-slate-400 block mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Layers size={11} className="text-amber-400" />
                        ワードローブ着せ替え ({wardrobe.length > 0 ? `${wardrobe.length} 着` : '基本'}):
                      </span>
                      {onJumpToStep && (
                        <button
                          type="button"
                          onClick={() => onJumpToStep(1)}
                          className="text-[10px] text-amber-400 hover:underline flex items-center gap-0.5"
                        >
                          ＋衣装を追加
                        </button>
                      )}
                    </span>

                    {/* Scrollable / Grid Outfit Cards */}
                    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {/* Main Avatar Slot */}
                      <button
                        type="button"
                        onClick={() => setActiveImageId('main')}
                        className={`w-14 h-14 shrink-0 rounded-lg border overflow-hidden relative transition ${
                          activeImageId === 'main'
                            ? 'border-amber-400 ring-2 ring-amber-400/50'
                            : 'border-slate-800 opacity-70 hover:opacity-100'
                        }`}
                        title="基本メイン"
                      >
                        {char.avatarImage ? (
                          <img src={char.avatarImage} alt="Main" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-slate-900 flex items-center justify-center text-[9px] text-slate-500">
                            基本
                          </div>
                        )}
                        <span className="absolute bottom-0 inset-x-0 bg-black/85 text-[8px] text-center text-amber-300 truncate px-0.5">
                          基本
                        </span>
                      </button>

                      {/* Wardrobe Items */}
                      {wardrobe.map((w) => {
                        const hasImg = Boolean(w.imageUrl);
                        return (
                          <button
                            key={w.id}
                            type="button"
                            onClick={() => setActiveImageId(w.id)}
                            className={`w-14 h-14 shrink-0 rounded-lg border overflow-hidden relative transition ${
                              activeImageId === w.id
                                ? 'border-amber-400 ring-2 ring-amber-400/50'
                                : 'border-slate-800 opacity-70 hover:opacity-100'
                            }`}
                            title={w.title}
                          >
                            {hasImg ? (
                              <img src={w.imageUrl} alt={w.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center text-[8px] text-slate-400 p-0.5">
                                <span>👗</span>
                              </div>
                            )}
                            <span className="absolute bottom-0 inset-x-0 bg-black/85 text-[8px] text-center text-slate-200 truncate px-0.5">
                              {w.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Anchor Features */}
            <div className="mt-3 p-2.5 bg-slate-950/80 rounded border border-slate-800/80">
              <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1 font-bold">
                <Sparkles size={11} /> 固有の識別記号 (Anchor Feature)
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {char.anchorFeatures || '未登録（特徴的なアクセ、傷、ほくろ等）'}
              </p>
            </div>
          </div>

          {/* Radar Chart Card */}
          <div className="border border-slate-800 bg-slate-900/90 rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                <Flame size={13} className="text-cyan-400" />
                PSYCHO-METRIC RADAR (精神特性分析)
              </span>
              <span className="text-[10px] font-mono text-slate-500">6-AXIS METRIC</span>
            </div>

            <RadarChart stats={char.stats} onChange={onUpdateStats} editable={true} />
          </div>
        </div>

        {/* Right Column: Vitals, Mind Report, Secrets (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Basic Vitals Badge Grid */}
          <div className="border border-slate-800 bg-slate-900/90 rounded-xl p-4 shadow-lg">
            <div className="text-xs font-mono text-slate-400 mb-2 border-b border-slate-800 pb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileText size={13} className="text-cyan-400" /> BIOMETRIC SPECIFICATIONS
              </span>
              {onJumpToStep && (
                <button
                  type="button"
                  onClick={() => onJumpToStep(1)}
                  className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans"
                >
                  <Edit3 size={11} /> 編集
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">見かけ年齢 / 性別</span>
                <span className="text-slate-200 font-medium">{char.apparentAge || '-'} / {char.gender || '-'}</span>
              </div>
              <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">種族 / 体格</span>
                <span className="text-slate-200 font-medium">{char.species || '-'} / {char.bodyBuild || '-'}</span>
              </div>
              <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">身長</span>
                <span className="text-slate-200 font-medium">{char.height || '-'}</span>
              </div>
              <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">髪型 / 髪色</span>
                <span className="text-slate-200 font-medium">{char.hairStyle || '-'} ({char.hairColor || '-'})</span>
              </div>
              <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">瞳色 / 特徴</span>
                <span className="text-slate-200 font-medium">{char.eyeColor || '-'}</span>
              </div>
              <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">パーソナルカラー</span>
                <span className="text-slate-200 font-medium truncate block">{char.personalColors || '-'}</span>
              </div>
            </div>
          </div>

          {/* Psychology: Persona vs Shadow */}
          <div className="border border-slate-800 bg-slate-900/90 rounded-xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 font-bold">
                <FileText size={13} /> PSYCHOLOGICAL PROFILE: PERSONA VS SHADOW
              </span>
              {onJumpToStep && (
                <button
                  type="button"
                  onClick={() => onJumpToStep(3)}
                  className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans"
                >
                  <Edit3 size={11} /> 編集
                </button>
              )}
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950/70 p-3 rounded border-l-2 border-cyan-500">
                <span className="font-bold text-cyan-400 block text-[11px] mb-1">【外面 (Persona)】他人に見せている仮面</span>
                <p className="text-slate-300 leading-relaxed whitespace-pre-line">{char.persona || '未設定'}</p>
              </div>

              <div className="bg-slate-950/70 p-3 rounded border-l-2 border-amber-500">
                <span className="font-bold text-amber-400 block text-[11px] mb-1">【内面 (Shadow)】自覚している脆さ・本音</span>
                <p className="text-slate-300 leading-relaxed whitespace-pre-line">{char.shadow || '未設定'}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-950/50 p-2.5 rounded border border-slate-800/80">
                  <span className="text-emerald-400 font-bold block text-[10px]">★ コアの最優先欲求 (Desire)</span>
                  <p className="text-slate-300 text-xs mt-0.5">{char.coreDesire || '未設定'}</p>
                </div>
                <div className="bg-slate-950/50 p-2.5 rounded border border-slate-800/80">
                  <span className="text-red-400 font-bold block text-[10px]">⚠ コアの最悪の恐怖 (Fear)</span>
                  <p className="text-slate-300 text-xs mt-0.5">{char.coreFear || '未設定'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Redacted Secrets */}
          <div className="border border-slate-800 bg-slate-900/90 rounded-xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono text-red-400 flex items-center gap-1.5 font-bold">
                <AlertTriangle size={13} /> RESTRICTED INTELLIGENCE (極秘指定・地雷と秘密)
              </span>
              <span className="text-[10px] text-slate-500 font-mono">TAP TO DECLASSIFY</span>
            </div>

            <div className="space-y-2 text-xs">
              <div
                onClick={() => toggleUnlock('trigger')}
                className="cursor-pointer group p-3 bg-slate-950/80 rounded border border-slate-800 hover:border-red-500/50 transition"
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-red-400 mb-1">
                  <span>【逆鱗・地雷 (Triggers)】</span>
                  {unlockedSecrets['trigger'] ? <Unlock size={12} className="text-emerald-400" /> : <Lock size={12} className="text-slate-500" />}
                </div>
                {unlockedSecrets['trigger'] ? (
                  <p className="text-slate-200 animate-in fade-in">{char.triggers || '特になし'}</p>
                ) : (
                  <div className="h-5 bg-slate-800 rounded flex items-center justify-center text-[10px] font-mono text-slate-500 group-hover:text-red-400 select-none">
                    ████████ [機密指定: タップして閲覧権限解除] ████████
                  </div>
                )}
              </div>

              <div
                onClick={() => toggleUnlock('secret')}
                className="cursor-pointer group p-3 bg-slate-950/80 rounded border border-slate-800 hover:border-amber-500/50 transition"
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-amber-400 mb-1">
                  <span>【墓場まで持っていく秘密 (Confidential)】</span>
                  {unlockedSecrets['secret'] ? <Unlock size={12} className="text-emerald-400" /> : <Lock size={12} className="text-slate-500" />}
                </div>
                {unlockedSecrets['secret'] ? (
                  <p className="text-slate-200 animate-in fade-in">{char.secret || '特になし'}</p>
                ) : (
                  <div className="h-5 bg-slate-800 rounded flex items-center justify-center text-[10px] font-mono text-slate-500 group-hover:text-amber-400 select-none">
                    ████████ [機密指定: タップして閲覧権限解除] ████████
                  </div>
                )}
              </div>

              {char.dilemmaChoice && (
                <div className="p-3 bg-slate-950/60 rounded border border-slate-800/80 text-xs">
                  <span className="font-bold text-purple-400 block text-[11px] mb-1">【究極の二者択一 (倫理観)】</span>
                  <p className="text-slate-300 leading-relaxed">{char.dilemmaChoice}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Subspecies, Biology & Modern Constraints */}
      <div className="border border-slate-800 bg-slate-900/90 rounded-xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#229288] font-bold">
            <PawPrint size={14} />
            <span>SUB-SPECIES & MODERN BIOLOGY (亜人種族・身体ギミック・現代生活のリアル)</span>
          </div>
          {onJumpToStep && (
            <button
              type="button"
              onClick={() => onJumpToStep(2)}
              className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans"
            >
              <Edit3 size={11} /> 編集
            </button>
          )}
        </div>

        {/* Demi Type Banner */}
        <div className="bg-slate-950/70 p-3.5 rounded-lg border border-[#229288]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#229288]/20 border border-[#229288]/50 text-[#229288] font-bold font-mono">
              {char.demiType === 'soft' && 'TYPE-A // ソフト亜人 (ケモ耳・尾)'}
              {char.demiType === 'semi' && 'TYPE-B // セミケモ亜人 (四肢肉球・羽)'}
              {char.demiType === 'anthro' && 'TYPE-C // ガッツリ獣人 (マズル・全身被毛)'}
              {char.demiType === 'inhuman' && 'TYPE-D // 人外・妖異系'}
              {!char.demiType && 'TYPE-A // ソフト亜人'}
            </span>
            <span className="font-bold text-slate-200">
              {char.demiSpeciesName || '種族未指定'}
            </span>
          </div>
          {char.demiFurryDegree && (
            <p className="text-slate-400 text-[11px] leading-tight">
              {char.demiFurryDegree}
            </p>
          )}
        </div>

        {/* Grid: Anatomy & Involuntary Reactions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Anatomy & Physical quirks */}
          <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800 space-y-2">
            <span className="text-[#229288] font-bold block text-[11px] flex items-center gap-1">
              <PawPrint size={12} /> 【器官構造・平熱・睡眠】
            </span>
            <div className="space-y-1.5 text-slate-300 leading-relaxed">
              {char.demiEarsTailHorns && (
                <p><strong className="text-slate-400">耳・尾・角:</strong> {char.demiEarsTailHorns}</p>
              )}
              {char.demiPawsClawsSkin && (
                <p><strong className="text-slate-400">肉球・爪・毛並み:</strong> {char.demiPawsClawsSkin}</p>
              )}
              {char.demiBodyTempScent && (
                <p><strong className="text-slate-400">平熱・体香・リズム:</strong> {char.demiBodyTempScent}</p>
              )}
              {!char.demiEarsTailHorns && !char.demiPawsClawsSkin && !char.demiBodyTempScent && (
                <p className="text-slate-500 italic">身体器官の詳細は未設定です</p>
              )}
            </div>
          </div>

          {/* Involuntary Reactions */}
          <div className="bg-slate-950/80 p-3.5 rounded-lg border border-cyan-900/30 space-y-2">
            <span className="text-cyan-400 font-bold block text-[11px] flex items-center gap-1">
              <Ear size={12} /> 【感情の不随意露出 (身体のネタバレ)】
            </span>
            <div className="space-y-1.5 text-slate-300 leading-relaxed">
              {char.involuntaryEars && (
                <p><strong className="text-cyan-300">耳:</strong> {char.involuntaryEars}</p>
              )}
              {char.involuntaryTail && (
                <p><strong className="text-cyan-300">尻尾:</strong> {char.involuntaryTail}</p>
              )}
              {char.involuntaryVocal && (
                <p><strong className="text-cyan-300">喉・声:</strong> {char.involuntaryVocal}</p>
              )}
              {!char.involuntaryEars && !char.involuntaryTail && !char.involuntaryVocal && (
                <p className="text-slate-500 italic">不随意反応は未設定です</p>
              )}
            </div>
          </div>
        </div>

        {/* Modern Friction & Caregiving */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Modern Friction */}
          <div className="bg-slate-950/80 p-3.5 rounded-lg border border-amber-900/30 space-y-1.5">
            <span className="text-amber-400 font-bold block text-[11px] flex items-center gap-1">
              <Shirt size={12} /> 【現代生活との摩擦・悩み】
            </span>
            <div className="space-y-1 text-slate-300 leading-relaxed">
              {char.modernApparelTrouble && (
                <p><strong className="text-amber-300/90">服・イヤホン:</strong> {char.modernApparelTrouble}</p>
              )}
              {char.modernDailyFriction && (
                <p><strong className="text-amber-300/90">街・満員電車:</strong> {char.modernDailyFriction}</p>
              )}
              {char.demiDietRestrictions && (
                <p><strong className="text-amber-300/90">食事・アレルギー:</strong> {char.demiDietRestrictions}</p>
              )}
              {!char.modernApparelTrouble && !char.modernDailyFriction && !char.demiDietRestrictions && (
                <p className="text-slate-500 italic">現代生活の摩擦は未設定です</p>
              )}
            </div>
          </div>

          {/* Caregiving */}
          <div className="bg-slate-950/80 p-3.5 rounded-lg border border-rose-900/30 space-y-1.5">
            <span className="text-rose-400 font-bold block text-[11px] flex items-center gap-1">
              <Heart size={12} /> 【{"{{user}}"}にだけ許すお手入れ (デレ)】
            </span>
            <div className="space-y-1 text-slate-300 leading-relaxed">
              {char.groomingCare && (
                <p><strong className="text-rose-300/90">ケア部位:</strong> {char.groomingCare}</p>
              )}
              {char.groomingReactions && (
                <p><strong className="text-rose-300/90">とろけ反応:</strong> {char.groomingReactions}</p>
              )}
              {!char.groomingCare && !char.groomingReactions && (
                <p className="text-slate-500 italic">お手入れ設定は未設定です</p>
              )}
            </div>
          </div>
        </div>

        {/* NSFW Instinct Banner */}
        {(char.heatCycleSuppressor || char.markingInstinct || char.demiWeakSensitivities) && (
          <div className={`p-3 bg-purple-950/40 rounded-lg border border-purple-800/50 space-y-2 text-xs ${nsfwMask ? 'blur-sm select-none opacity-40' : ''}`}>
            <span className="text-purple-300 font-bold block text-[11px] flex items-center gap-1">
              <Flame size={12} className="text-purple-400" /> 🔞 【種族の本能・親密性 (発情期・マーキング・急所)】
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-300">
              {char.heatCycleSuppressor && (
                <div>
                  <strong className="text-purple-400 block mb-0.5">発情期・サプレッサー:</strong>
                  <p>{char.heatCycleSuppressor}</p>
                </div>
              )}
              {char.markingInstinct && (
                <div>
                  <strong className="text-purple-400 block mb-0.5">匂い付け・甘噛み:</strong>
                  <p>{char.markingInstinct}</p>
                </div>
              )}
              {char.demiWeakSensitivities && (
                <div>
                  <strong className="text-purple-400 block mb-0.5">種族急所・性感帯:</strong>
                  <p>{char.demiWeakSensitivities}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Humanity, Lifestyle & Occupation (Layer 3) */}
      <div className="border border-slate-800 bg-slate-900/90 rounded-xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold">
            <Coffee size={14} />
            <span>HUMANITY, OCCUPATION & REALISM (職業・日常の生態・致命的ポンコツ)</span>
          </div>
          {onJumpToStep && (
            <button
              type="button"
              onClick={() => onJumpToStep(4)}
              className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans"
            >
              <Edit3 size={11} /> 編集
            </button>
          )}
        </div>

        {/* Occupation & Social Standing */}
        {(char.occupation || char.affiliation || char.occupationalHabit || char.socialStatus) && (
          <div className="bg-slate-950/70 p-3.5 rounded-lg border border-cyan-900/30 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 block font-bold mb-0.5">
                【職業・役職】
              </span>
              <p className="text-slate-200 font-medium">{char.occupation || '未設定'}</p>
              {char.affiliation && (
                <p className="text-slate-400 text-[11px] mt-0.5">所属: {char.affiliation}</p>
              )}
            </div>
            <div>
              <span className="text-[10px] font-mono text-cyan-400 block font-bold mb-0.5">
                【職業病・仕事モードの癖】
              </span>
              <p className="text-slate-300 leading-relaxed">{char.occupationalHabit || '特になし'}</p>
            </div>
            {char.socialStatus && (
              <div className="sm:col-span-2 pt-1 border-t border-slate-800/80 text-[11px] text-slate-400">
                <span className="text-slate-500 font-bold">社会的地位・境遇: </span>
                {char.socialStatus}
              </div>
            )}
          </div>
        )}

        {/* Clumsy Area vs Reputation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-950/80 p-3.5 rounded-lg border border-amber-900/40">
            <span className="text-amber-400 font-bold block text-[11px] mb-1 flex items-center gap-1">
              <Coffee size={12} /> 【得意領域 vs 致命的ポンコツ (愛嬌の源泉)】
            </span>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {char.clumsyArea || '未設定'}
            </p>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800">
            <span className="text-cyan-300 font-bold block text-[11px] mb-1">
              【外聞（世間の噂）vs 自己評価（本人の本音）】
            </span>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {char.reputationVsSelf || '未設定'}
            </p>
          </div>
        </div>

        {/* Daily Habits Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
          <div className="bg-slate-950/50 p-2.5 rounded border border-slate-800">
            <span className="text-slate-500 block text-[10px]">部屋の様子</span>
            <p className="text-slate-300 text-[11px] mt-0.5 line-clamp-2">{char.roomState || '-'}</p>
          </div>
          <div className="bg-slate-950/50 p-2.5 rounded border border-slate-800">
            <span className="text-slate-500 block text-[10px]">休日の過ごし方</span>
            <p className="text-slate-300 text-[11px] mt-0.5 line-clamp-2">{char.holidayHabits || '-'}</p>
          </div>
          <div className="bg-slate-950/50 p-2.5 rounded border border-slate-800">
            <span className="text-slate-500 block text-[10px]">嗜好品 (酒・煙草)</span>
            <p className="text-slate-300 text-[11px] mt-0.5 line-clamp-2">{char.drinkTobacco || '-'}</p>
          </div>
          <div className="bg-slate-950/50 p-2.5 rounded border border-slate-800">
            <span className="text-slate-500 block text-[10px]">睡眠・寝相</span>
            <p className="text-slate-300 text-[11px] mt-0.5 line-clamp-2">{char.sleepHabits || '-'}</p>
          </div>
        </div>
      </div>

      {/* Dynamics with {{user}} */}
      <div className="border border-slate-800 bg-slate-900/90 rounded-xl p-4 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
            <Heart size={14} className="text-red-400" />
            <span>RELATIONAL DYNAMICS WITH {'{{user}}'} (心の壁溶解ベクトル)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              初期警戒度: <span className="text-amber-400 font-bold">{char.wallThickness}%</span>
            </span>
            {onJumpToStep && (
              <button
                type="button"
                onClick={() => onJumpToStep(5)}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans"
              >
                <Edit3 size={11} /> 編集
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {/* Phase 1 */}
          <div className="bg-slate-950/80 p-3.5 rounded-lg border-t-2 border-red-500 flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[10px] font-mono text-red-400 block font-bold">PHASE 1 // 初期警戒</span>
              <p className="text-slate-300 mt-1 leading-relaxed">{char.phase1Early || '未設定'}</p>
              {char.phasePatterns?.['phase1Early'] && char.phasePatterns['phase1Early'].length > 0 && (
                <div className="mt-2 pt-2 border-t border-slate-800/80 space-y-1">
                  <span className="text-[9px] text-slate-500 font-bold block">差分パターン:</span>
                  {char.phasePatterns['phase1Early'].map((pat, i) => (
                    <p key={i} className="text-[11px] text-red-300/90 bg-red-950/30 p-1.5 rounded border border-red-900/30">
                      {pat}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-2 text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-1">壁厚: 80-100%</div>
          </div>

          {/* Phase 2 */}
          <div className="bg-slate-950/80 p-3.5 rounded-lg border-t-2 border-amber-500 flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[10px] font-mono text-amber-400 block font-bold">PHASE 2 // 軟化の契機</span>
              <p className="text-slate-300 mt-1 leading-relaxed">{char.phase2Softening || '未設定'}</p>
              {char.phasePatterns?.['phase2Softening'] && char.phasePatterns['phase2Softening'].length > 0 && (
                <div className="mt-2 pt-2 border-t border-slate-800/80 space-y-1">
                  <span className="text-[9px] text-slate-500 font-bold block">差分パターン:</span>
                  {char.phasePatterns['phase2Softening'].map((pat, i) => (
                    <p key={i} className="text-[11px] text-amber-300/90 bg-amber-950/30 p-1.5 rounded border border-amber-900/30">
                      {pat}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-2 text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-1">壁厚: 50-70%</div>
          </div>

          {/* Phase 3 */}
          <div className="bg-slate-950/80 p-3.5 rounded-lg border-t-2 border-cyan-500 flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 block font-bold">PHASE 3 // 信頼と弱音</span>
              <p className="text-slate-300 mt-1 leading-relaxed">{char.phase3Trust || '未設定'}</p>
              {char.phasePatterns?.['phase3Trust'] && char.phasePatterns['phase3Trust'].length > 0 && (
                <div className="mt-2 pt-2 border-t border-slate-800/80 space-y-1">
                  <span className="text-[9px] text-slate-500 font-bold block">差分パターン:</span>
                  {char.phasePatterns['phase3Trust'].map((pat, i) => (
                    <p key={i} className="text-[11px] text-cyan-300/90 bg-cyan-950/30 p-1.5 rounded border border-cyan-900/30">
                      {pat}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-2 text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-1">壁厚: 20-40%</div>
          </div>

          {/* Phase 4 */}
          <div className="bg-slate-950/80 p-3.5 rounded-lg border-t-2 border-pink-500 flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[10px] font-mono text-pink-400 block font-bold">PHASE 4 // 親愛と執着</span>
              <p className="text-slate-300 mt-1 leading-relaxed">{char.phase4Attachment || '未設定'}</p>
              {char.phasePatterns?.['phase4Attachment'] && char.phasePatterns['phase4Attachment'].length > 0 && (
                <div className="mt-2 pt-2 border-t border-slate-800/80 space-y-1">
                  <span className="text-[9px] text-slate-500 font-bold block">差分パターン:</span>
                  {char.phasePatterns['phase4Attachment'].map((pat, i) => (
                    <p key={i} className="text-[11px] text-pink-300/90 bg-pink-950/30 p-1.5 rounded border border-pink-900/30">
                      {pat}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-2 text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-1">壁厚: 0% (完全開錠)</div>
          </div>

          {/* Phase 5 */}
          <div className="bg-slate-950/80 p-3.5 rounded-lg border-t-2 border-purple-500 flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[10px] font-mono text-purple-400 block font-bold">PHASE 5 // 唯一無二</span>
              <p className="text-slate-300 mt-1 leading-relaxed">{char.phase5Irreplaceable || '未設定'}</p>
              {char.phasePatterns?.['phase5Irreplaceable'] && char.phasePatterns['phase5Irreplaceable'].length > 0 && (
                <div className="mt-2 pt-2 border-t border-slate-800/80 space-y-1">
                  <span className="text-[9px] text-slate-500 font-bold block">差分パターン:</span>
                  {char.phasePatterns['phase5Irreplaceable'].map((pat, i) => (
                    <p key={i} className="text-[11px] text-purple-300/90 bg-purple-950/30 p-1.5 rounded border border-purple-900/30">
                      {pat}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-2 text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-1">共依存 / 魂の結びつき</div>
          </div>
        </div>

        {/* Situation Reactions Book Display */}
        {char.situationReactions && char.situationReactions.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-purple-300 font-bold flex items-center gap-1.5">
                <MessageSquare size={13} className="text-purple-400" />
                SITUATION REACTIONS (シチュエーション別言動・代表セリフ帳):
              </span>
              {onJumpToStep && (
                <button
                  type="button"
                  onClick={() => onJumpToStep(5)}
                  className="text-[10px] text-purple-300 hover:underline"
                >
                  ＋お題を追加
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {char.situationReactions.map((sr) => (
                <div
                  key={sr.id}
                  className="p-3 bg-[#131722] rounded-lg border border-purple-900/40 space-y-1.5 text-xs hover:border-purple-600/50 transition"
                >
                  <div className="font-bold text-purple-300 text-[11px] flex items-center gap-1 border-b border-purple-900/30 pb-1">
                    <span>📌</span>
                    <span>{sr.situation}</span>
                  </div>
                  {sr.behavior && (
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {sr.behavior}
                    </p>
                  )}
                  {sr.dialogue && (
                    <div className="p-1.5 bg-purple-950/40 rounded border border-purple-800/40 text-purple-200 text-[11px] font-medium leading-relaxed italic">
                      {sr.dialogue}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enriched Intimacy / Night Persona Card */}
      <div className={`border border-purple-900/40 bg-purple-950/20 rounded-xl p-4 sm:p-6 shadow-xl transition duration-300 ${nsfwMask ? 'blur-md select-none opacity-40' : ''}`}>
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-purple-300 font-bold">
              🔞 INTIMACY SPECIFICATIONS (親密さのグラデーション＆夜の顔)
            </span>
          </div>
          {onJumpToStep && (
            <button
              type="button"
              onClick={() => onJumpToStep(7)}
              className="text-[11px] text-purple-300 hover:text-white flex items-center gap-1 font-sans font-bold"
            >
              <Edit3 size={11} /> 親密設定を深掘り
            </button>
          )}
        </div>

        {/* Position Badge & Dominant Persona Block */}
        <div className="bg-[#12101b] border border-pink-900/30 rounded-lg p-3 mb-4 space-y-2.5 text-xs">
          <div className="flex items-center justify-between border-b border-pink-900/20 pb-1.5">
            <span className="font-bold text-pink-300 flex items-center gap-1.5 text-xs">
              <Crown size={13} className="text-amber-400" />
              夜の攻守ポジション:
              <span className="px-2 py-0.5 rounded bg-purple-900/60 text-purple-200 border border-purple-700/50 font-mono text-[11px] ml-1">
                {char.positionType === 'top' ? '完全攻め (Top)' : char.positionType === 'bottom' ? '完全受け (Bottom)' : char.positionType === 'switch' ? 'リバ / 両対応 (Switch)' : char.positionType === 'reversal' ? '豹変リバ (Reversal)' : '未設定'}
              </span>
            </span>
            <span className="text-[10px] text-pink-400 font-mono">POSITION & DYNAMICS</span>
          </div>

          {(char.dominantLeadStyle || char.dominantVerbalCommand || char.dominantPossessionDrive || char.dominantAftercare) ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {char.dominantLeadStyle && (
                <div className="bg-[#181424] p-2.5 rounded border border-pink-900/20">
                  <span className="text-pink-300 font-bold block text-[10px] mb-0.5">【攻め/リード時の手つき・主導権・距離感】</span>
                  <p className="text-slate-300 text-xs leading-relaxed">{char.dominantLeadStyle}</p>
                  {char.dominantPatterns?.['dominantLeadStyle'] && char.dominantPatterns['dominantLeadStyle'].length > 0 && (
                    <div className="mt-1.5 pt-1.5 border-t border-pink-950/60 space-y-1">
                      {char.dominantPatterns['dominantLeadStyle'].map((pat, i) => (
                        <p key={i} className="text-[10px] text-pink-300/80 bg-pink-950/30 px-1.5 py-0.5 rounded">
                          ↳ {pat}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {char.dominantVerbalCommand && (
                <div className="bg-[#181424] p-2.5 rounded border border-pink-900/20">
                  <span className="text-rose-300 font-bold block text-[10px] mb-0.5">【攻め/リード時の言葉責め・命令・吐息】</span>
                  <p className="text-slate-300 text-xs leading-relaxed">{char.dominantVerbalCommand}</p>
                  {char.dominantPatterns?.['dominantVerbalCommand'] && char.dominantPatterns['dominantVerbalCommand'].length > 0 && (
                    <div className="mt-1.5 pt-1.5 border-t border-pink-950/60 space-y-1">
                      {char.dominantPatterns['dominantVerbalCommand'].map((pat, i) => (
                        <p key={i} className="text-[10px] text-rose-300/80 bg-pink-950/30 px-1.5 py-0.5 rounded">
                          ↳ {pat}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {char.dominantPossessionDrive && (
                <div className="bg-[#181424] p-2.5 rounded border border-pink-900/20">
                  <span className="text-slate-300 font-bold block text-[10px] mb-0.5">【相手を追い詰めるツボ・支配欲・独占心】</span>
                  <p className="text-slate-300 text-xs leading-relaxed">{char.dominantPossessionDrive}</p>
                  {char.dominantPatterns?.['dominantPossessionDrive'] && char.dominantPatterns['dominantPossessionDrive'].length > 0 && (
                    <div className="mt-1.5 pt-1.5 border-t border-pink-950/60 space-y-1">
                      {char.dominantPatterns['dominantPossessionDrive'].map((pat, i) => (
                        <p key={i} className="text-[10px] text-purple-300/80 bg-pink-950/30 px-1.5 py-0.5 rounded">
                          ↳ {pat}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {char.dominantAftercare && (
                <div className="bg-[#181424] p-2.5 rounded border border-pink-900/20">
                  <span className="text-amber-300 font-bold block text-[10px] mb-0.5">【攻め/リード側としてのアフターケア・甘やかし】</span>
                  <p className="text-slate-300 text-xs leading-relaxed">{char.dominantAftercare}</p>
                  {char.dominantPatterns?.['dominantAftercare'] && char.dominantPatterns['dominantAftercare'].length > 0 && (
                    <div className="mt-1.5 pt-1.5 border-t border-pink-950/60 space-y-1">
                      {char.dominantPatterns['dominantAftercare'].map((pat, i) => (
                        <p key={i} className="text-[10px] text-amber-300/80 bg-pink-950/30 px-1.5 py-0.5 rounded">
                          ↳ {pat}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p className="text-slate-500 text-[11px] italic">攻め・リード側の態度・言葉責めは未設定です。</p>
          )}
        </div>

        {/* 7-Stage Intimacy Gradient */}
        <div className="space-y-2 mb-4 text-xs">
          <div className="text-[11px] font-bold text-purple-300 mb-1 flex items-center justify-between">
            <span>【親愛・親密グラデーション (Level 1〜7)】</span>
            <span className="text-[10px] text-purple-400 font-mono">SFW ➔ NSFW GRADATION</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-1.5">
            {[
              { lv: 'Lv1 視線・距離感', text: char.intimacyLevel1, key: 'intimacyLevel1', col: 'text-slate-400' },
              { lv: 'Lv2 偶発的接触', text: char.intimacyLevel2, key: 'intimacyLevel2', col: 'text-cyan-300' },
              { lv: 'Lv3 スキンシップ', text: char.intimacyLevel3, key: 'intimacyLevel3', col: 'text-emerald-300' },
              { lv: 'Lv4 境界線・密着', text: char.intimacyLevel4, key: 'intimacyLevel4', col: 'text-amber-300' },
              { lv: 'Lv5 理性の融解', text: char.intimacyLevel5, key: 'intimacyLevel5', col: 'text-rose-300' },
              { lv: 'Lv6 夜の入口', text: char.intimacyLevel6, key: 'intimacyLevel6', col: 'text-pink-300' },
              { lv: 'Lv7 完全開放', text: char.intimacyLevel7, key: 'intimacyLevel7', col: 'text-purple-300' },
            ].map((slot) => {
              const patterns = char.intimacyPatterns?.[slot.key] || [];
              return (
                <div key={slot.key} className="bg-[#10141d] p-2 rounded border border-purple-900/30 flex flex-col justify-between">
                  <div>
                    <span className={`${slot.col} font-bold block text-[10px]`}>{slot.lv}</span>
                    <p className="text-slate-300 text-[11px] mt-1 line-clamp-3 leading-snug">{slot.text || '未設定'}</p>
                    {patterns.length > 0 && (
                      <div className="mt-1 pt-1 border-t border-purple-900/40 space-y-0.5">
                        {patterns.map((p, idx) => (
                          <p key={idx} className="text-[9px] text-purple-300/80 truncate" title={p}>
                            + {p}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sensory, Dynamic & Aftercare Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs pt-2 border-t border-purple-900/30">
          {[
            { label: '急所・敏感ゾーン', text: char.sensitiveAreas, key: 'sensitiveAreas', col: 'text-purple-300' },
            { label: '息遣い・声のトーン', text: char.voiceBreathing, key: 'voiceBreathing', col: 'text-purple-300' },
            { label: '視線・表情・仕草', text: char.gazeExpression, key: 'gazeExpression', col: 'text-purple-300' },
            { label: '主導権・攻守ダイナミクス', text: char.dominanceRole, key: 'dominanceRole', col: 'text-pink-300' },
            { label: '事前の誘い方・戸惑い', text: char.preIntimacyBehavior, key: 'preIntimacyBehavior', col: 'text-amber-300' },
            { label: '★ 事後の余韻・アフターケア', text: char.aftercareBehavior, key: 'aftercareBehavior', col: 'text-amber-300' },
          ].map((item) => {
            const patterns = char.dominantPatterns?.[item.key] || [];
            return (
              <div key={item.key} className="bg-[#10141d] p-2.5 rounded border border-purple-900/30">
                <span className={`${item.col} font-bold block text-[11px] mb-1`}>{item.label}</span>
                <p className="text-slate-300 text-xs leading-relaxed">{item.text || '未設定'}</p>
                {patterns.length > 0 && (
                  <div className="mt-1.5 pt-1.5 border-t border-purple-950/60 space-y-1">
                    {patterns.map((pat, i) => (
                      <p key={i} className="text-[10px] text-purple-300/80 bg-purple-950/40 px-1.5 py-0.5 rounded">
                        ↳ {pat}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {(char.fetishObsession || char.intimacyBoundaries) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2.5 text-xs">
            {char.fetishObsession && (
              <div className="bg-[#10141d] p-2.5 rounded border border-purple-900/20">
                <span className="text-purple-300 font-bold block text-[10px] mb-0.5">嗜好・フェチ・執着</span>
                <p className="text-slate-300 text-xs leading-relaxed">{char.fetishObsession}</p>
                {char.dominantPatterns?.['fetishObsession'] && char.dominantPatterns['fetishObsession'].length > 0 && (
                  <div className="mt-1.5 pt-1.5 border-t border-purple-950/60 space-y-1">
                    {char.dominantPatterns['fetishObsession'].map((pat, i) => (
                      <p key={i} className="text-[10px] text-purple-300/80 bg-purple-950/40 px-1.5 py-0.5 rounded">
                        ↳ {pat}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
            {char.intimacyBoundaries && (
              <div className="bg-[#10141d] p-2.5 rounded border border-purple-900/20">
                <span className="text-slate-400 font-bold block text-[10px] mb-0.5">境界線・許容限度・NG</span>
                <p className="text-slate-300 text-xs leading-relaxed">{char.intimacyBoundaries}</p>
                {char.dominantPatterns?.['intimacyBoundaries'] && char.dominantPatterns['intimacyBoundaries'].length > 0 && (
                  <div className="mt-1.5 pt-1.5 border-t border-purple-950/60 space-y-1">
                    {char.dominantPatterns['intimacyBoundaries'].map((pat, i) => (
                      <p key={i} className="text-[10px] text-slate-400/80 bg-slate-950/40 px-1.5 py-0.5 rounded">
                        ↳ {pat}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chronological Timeline */}
      <div className="border border-slate-800 bg-slate-900/90 rounded-xl p-4 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
            <Clock size={14} />
            <span>CHRONOLOGICAL TIMELINE (生きてきた年表・心理的刻印)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500">{char.timeline?.length || 0} EVENTS</span>
            {onJumpToStep && (
              <button
                type="button"
                onClick={() => onJumpToStep(8)}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans font-bold"
              >
                <Edit3 size={11} /> 年表編集
              </button>
            )}
          </div>
        </div>

        {char.timeline && char.timeline.length > 0 ? (
          <div className="relative pl-6 border-l-2 border-slate-800 space-y-5 text-xs">
            {char.timeline.map((event) => (
              <div key={event.id} className="relative group">
                <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-cyan-500 border-2 border-slate-950 group-hover:scale-125 transition" />
                <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800/90 shadow">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-white text-sm">{event.eventTitle}</span>
                    <span className="font-mono text-cyan-400 text-[11px] bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                      {event.ageOrPeriod}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed mt-1 whitespace-pre-line">{event.description}</p>
                  {event.mentalImprint && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] text-amber-300/90 flex items-start gap-1.5">
                      <span className="text-amber-500 font-bold shrink-0">心理的刻印:</span>
                      <span>{event.mentalImprint}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 px-4 bg-slate-950/60 rounded-lg border border-dashed border-slate-800 space-y-3">
            <Clock size={28} className="mx-auto text-slate-600" />
            <div>
              <p className="text-slate-300 font-bold text-xs mb-1">
                年表イベントがまだ登録されていません
              </p>
              <p className="text-slate-500 text-[11px]">
                幼少期の原体験や人生の転機、性格に刻まれた変化を登録しましょう。
              </p>
            </div>
            {onJumpToStep && (
              <button
                type="button"
                onClick={() => onJumpToStep(8)}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition inline-flex items-center gap-1.5 shadow"
              >
                <Plus size={14} /> 出来事を追加・編集する
              </button>
            )}
          </div>
        )}
      </div>

      {/* Dialogue Quotes */}
      <div className="border border-slate-800 bg-slate-900/90 rounded-xl p-4 sm:p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1.5">
            <Sparkles size={14} /> REPRESENTATIVE DIALOGUE (代表台詞・仕草)
          </span>
          {onJumpToStep && (
            <button
              type="button"
              onClick={() => onJumpToStep(6)}
              className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans"
            >
              <Edit3 size={11} /> 口調編集
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {[
            { label: '① 褒められた時', text: char.stressTestCompliment, key: 'stressTestCompliment' },
            { label: '② からかわれた時', text: char.stressTestTeased, key: 'stressTestTeased' },
            { label: '③ 修羅場での反応', text: char.stressTestCrisis, key: 'stressTestCrisis' },
            { label: '④ 静かな夜・二人きりの時', text: char.stressTestNightQuiet, key: 'stressTestNightQuiet' },
            { label: '⑤ 好意の告白・自覚時', text: char.stressTestConfession, key: 'stressTestConfession' },
          ].map((item) => {
            const patterns = char.tonePatterns?.[item.key] || [];
            if (!item.text && patterns.length === 0) return null;
            return (
              <div key={item.key} className="bg-slate-950/80 p-3 rounded border border-slate-800 space-y-1.5">
                <span className="text-amber-400/90 block text-[10px] font-mono font-bold">{item.label}</span>
                {item.text && <p className="text-slate-200 italic">「{item.text}」</p>}
                {patterns.length > 0 && (
                  <div className="pt-1.5 border-t border-slate-800/80 space-y-1">
                    {patterns.map((pat, i) => (
                      <p key={i} className="text-[10px] text-amber-300/80 bg-slate-900/80 p-1 rounded">
                        ↳ 「{pat}」
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
