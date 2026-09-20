import React from 'react';
import { CharacterProfile } from '../../types/character';
import {
  User,
  Sparkles,
  PawPrint,
  Brain,
  Coffee,
  HeartHandshake,
  MessageSquare,
  Clock,
  Shield,
  Upload,
  ArrowLeft,
  ArrowRight,
  Home
} from 'lucide-react';
import { LayerVisual } from './LayerVisual';
import { LayerSpecies } from './LayerSpecies';
import { LayerPsychology } from './LayerPsychology';
import { LayerLifestyle } from './LayerLifestyle';
import { LayerDynamics } from './LayerDynamics';
import { LayerTone } from './LayerTone';
import { LayerTimeline } from './LayerTimeline';
import { LayerNsfw } from './LayerNsfw';
import { MultiImageUploader } from '../Common/MultiImageUploader';

interface EditorTabProps {
  char: CharacterProfile;
  onChange: (updated: CharacterProfile) => void;
  nsfwMask: boolean;
  onOpenGachaModal: () => void;
  onReturnToDossier: () => void;
  initialStep?: number;
}

export const EditorTab: React.FC<EditorTabProps> = ({
  char,
  onChange,
  nsfwMask,
  onReturnToDossier,
  initialStep = 0
}) => {
  const [currentStep, setCurrentStep] = React.useState(initialStep);

  React.useEffect(() => {
    if (initialStep !== undefined) {
      setCurrentStep(initialStep);
    }
  }, [initialStep]);

  const steps = [
    { id: 0, title: '基本・アバター', icon: User },
    { id: 1, title: '外見・SDXL', icon: Sparkles },
    { id: 2, title: '🐾 種族・生態・現代生活', icon: PawPrint },
    { id: 3, title: '心理・魂のコア', icon: Brain },
    { id: 4, title: '生活感・愛嬌', icon: Coffee },
    { id: 5, title: '関係性・変化', icon: HeartHandshake },
    { id: 6, title: '口調・例文テスト', icon: MessageSquare },
    { id: 7, title: '🔞 親密グラデーション', icon: Shield },
    { id: 8, title: '時系列年表', icon: Clock }
  ];

  const updateField = <K extends keyof CharacterProfile>(field: K, value: CharacterProfile[K]) => {
    onChange({
      ...char,
      [field]: value,
      updatedAt: Date.now()
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 pb-28 animate-in fade-in duration-200">
      {/* Top Step Indicator Bar (Horizontally scrollable for mobile) */}
      <div className="bg-[#11141a] border border-[#252e3d] rounded-xl p-2 shadow-lg">
        <div className="flex items-center justify-between gap-2 border-b border-[#252e3d] pb-2 mb-2 px-1">
          <button
            type="button"
            onClick={onReturnToDossier}
            className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition"
          >
            <Home size={14} /> 完成ドシエに戻る
          </button>
          <span className="text-[11px] font-mono text-slate-400">
            STEP {currentStep + 1} / {steps.length}
          </span>
        </div>

        {/* Scrollable Step Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {steps.map((s) => {
            const Icon = s.icon;
            const isActive = currentStep === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentStep(s.id)}
                className={`px-3 py-1.5 rounded-lg shrink-0 font-medium transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-600 text-white font-bold shadow'
                    : 'bg-[#181d26] text-slate-400 hover:text-slate-200 hover:bg-[#252e3d]'
                }`}
              >
                <Icon size={14} />
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Focused Step Card (1 Screen 1 Topic) */}
      <div className="border border-[#252e3d] bg-[#141822] rounded-xl shadow-xl overflow-hidden min-h-[420px] flex flex-col justify-between">
        <div className="p-1">
          {/* Step 0: Basic & Multi-Avatar */}
          {currentStep === 0 && (
            <div className="p-4 sm:p-6 space-y-5 text-xs">
              <div className="border-b border-[#252e3d] pb-2.5">
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <User size={18} className="text-cyan-400" />
                  基本情報 ＆ アバター・衣装ギャラリー（最大5枚）
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">
                  キャラクターの骨組みとなる名前・職業・所属組織と、メイン画像＋シーン別衣装差分（4枚）を取り込みます。
                </p>
              </div>

              {/* Basic Fields */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      キャラクター名 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={char.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="例: ライラ・アルカディア"
                      className="w-full bg-[#181d26] border border-[#252e3d] rounded px-3 py-2 text-white text-sm outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">二つ名・肩書</label>
                    <input
                      type="text"
                      value={char.title}
                      onChange={(e) => updateField('title', e.target.value)}
                      placeholder="例: 白銀の落第魔導士"
                      className="w-full bg-[#181d26] border border-[#252e3d] rounded px-3 py-2 text-white text-sm outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">職業・役職</label>
                    <input
                      type="text"
                      value={char.occupation || ''}
                      onChange={(e) => updateField('occupation', e.target.value)}
                      placeholder="例: 帝国魔導情報部 観測官"
                      className="w-full bg-[#181d26] border border-[#252e3d] rounded px-3 py-2 text-white text-sm outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">所属組織・勢力</label>
                    <input
                      type="text"
                      value={char.affiliation || ''}
                      onChange={(e) => updateField('affiliation', e.target.value)}
                      placeholder="例: 帝国学術院 第四機密局"
                      className="w-full bg-[#181d26] border border-[#252e3d] rounded px-3 py-2 text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">世界観・舞台</label>
                    <input
                      type="text"
                      value={char.world}
                      onChange={(e) => updateField('world', e.target.value)}
                      placeholder="例: スチームパンク帝政期"
                      className="w-full bg-[#181d26] border border-[#252e3d] rounded px-3 py-2 text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">脅威度 / 危険ランク</label>
                    <select
                      value={char.dangerLevel}
                      onChange={(e) => updateField('dangerLevel', e.target.value as any)}
                      className="w-full bg-[#181d26] border border-[#252e3d] rounded px-3 py-2 text-white outline-none focus:border-cyan-500"
                    >
                      <option value="S">Sランク (極めて危険 / 破滅적)</option>
                      <option value="A">Aランク (要警戒 / 危険因子)</option>
                      <option value="B">Bランク (標準 / 条件付き安全)</option>
                      <option value="C">Cランク (無害 / 保護対象)</option>
                      <option value="UNKNOWN">UNKNOWN (未知 / 観測中)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">
                    一言コンセプト（キャラクターの核心）
                  </label>
                  <input
                    type="text"
                    value={char.summary}
                    onChange={(e) => updateField('summary', e.target.value)}
                    placeholder="例: プライドは高いが見捨てられる恐怖で震えている落ちこぼれ魔導士"
                    className="w-full bg-[#181d26] border border-[#252e3d] rounded px-3 py-2 text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Multi-Image Uploader (Main + 4 Outfits) */}
              <div className="pt-2 border-t border-[#252e3d]">
                <MultiImageUploader char={char} updateField={updateField} />
              </div>
            </div>
          )}

          {/* Step 1: Visual */}
          {currentStep === 1 && <LayerVisual char={char} updateField={updateField} />}

          {/* Step 2: Species & Modern Biology */}
          {currentStep === 2 && <LayerSpecies char={char} onChange={updateField} nsfwMask={nsfwMask} />}

          {/* Step 3: Psychology */}
          {currentStep === 3 && <LayerPsychology char={char} updateField={updateField} />}

          {/* Step 4: Lifestyle */}
          {currentStep === 4 && <LayerLifestyle char={char} updateField={updateField} />}

          {/* Step 5: Dynamics */}
          {currentStep === 5 && <LayerDynamics char={char} updateField={updateField} />}

          {/* Step 6: Tone */}
          {currentStep === 6 && <LayerTone char={char} updateField={updateField} />}

          {/* Step 7: Intimacy & Night Persona */}
          {currentStep === 7 && (
            <div className={nsfwMask ? 'blur-md select-none opacity-40 transition' : ''}>
              <LayerNsfw char={char} updateField={updateField} />
            </div>
          )}

          {/* Step 8: Timeline */}
          {currentStep === 8 && <LayerTimeline char={char} updateField={updateField} />}
        </div>

        {/* Step Navigation Bottom Bar */}
        <div className="border-t border-slate-800 p-3 sm:p-4 bg-slate-950/60 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition border border-slate-700"
          >
            <ArrowLeft size={14} />
            前へ
          </button>

          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
            {steps[currentStep].title}
          </span>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
              className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow"
            >
              次へ ({steps[currentStep + 1].title})
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onReturnToDossier}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow"
            >
              完成ドシエを見る
              <Home size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
