import React from 'react';
import { CharacterProfile, TimelineEvent } from '../../types/character';
import {
  Plus,
  Trash2,
  HelpCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface Props {
  char: CharacterProfile;
  updateField: <K extends keyof CharacterProfile>(field: K, value: CharacterProfile[K]) => void;
}

export const LayerTimeline: React.FC<Props> = ({ char, updateField }) => {
  const timeline = char.timeline || [];

  const addTimelineEvent = (custom?: Partial<TimelineEvent>) => {
    const newEvent: TimelineEvent = {
      id: 'tl-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      ageOrPeriod: custom?.ageOrPeriod || '',
      eventTitle: custom?.eventTitle || '',
      description: custom?.description || '',
      mentalImprint: custom?.mentalImprint || '',
      triggerKeywords: custom?.triggerKeywords || ''
    };
    updateField('timeline', [...timeline, newEvent]);
  };

  const updateTimelineEvent = (id: string, updates: Partial<TimelineEvent>) => {
    const updated = timeline.map(ev => (ev.id === id ? { ...ev, ...updates } : ev));
    updateField('timeline', updated);
  };

  const removeTimelineEvent = (id: string) => {
    updateField('timeline', timeline.filter(ev => ev.id !== id));
  };

  const moveEvent = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= timeline.length) return;
    const newTimeline = [...timeline];
    const temp = newTimeline[index];
    newTimeline[index] = newTimeline[targetIndex];
    newTimeline[targetIndex] = temp;
    updateField('timeline', newTimeline);
  };

  const applyTemplate = () => {
    const templateEvents: TimelineEvent[] = [
      {
        id: 'tl-tpl-1',
        ageOrPeriod: '7歳 (幼少期)',
        eventTitle: '原体験・種族としての最初の記憶',
        description: '人間社会との違いを初めて自覚した出来事、あるいは家族や生まれ故郷での原風景。',
        mentalImprint: '「自分は他の誰とも違う」という強い自意識、または最初のトラウマや憧れ。',
        triggerKeywords: '幼少期, 家族, 生まれ, 最初の記憶'
      },
      {
        id: 'tl-tpl-2',
        ageOrPeriod: '15歳 (思春期・転機)',
        eventTitle: '価値観を決定づけた挫折・事件',
        description: '信じていた者からの裏切り、大切な居場所の喪失、あるいは種族特有の偏見や法規制に直面した出来事。',
        mentalImprint: '「軽々しく人を信じない」「強くなければ生き残れない」という心の壁が完成。',
        triggerKeywords: '過去, 事件, トラウマ, 挫折'
      },
      {
        id: 'tl-tpl-3',
        ageOrPeriod: '半年前〜現在',
        eventTitle: '{{user}}との遭遇・日常の変容',
        description: '孤独に生きていた日常に{{user}}が入り込んできたきっかけ。警戒しながらも拒みきれなかった出来事。',
        mentalImprint: '失うことへの恐怖と、隣にいてほしいという矛盾した依存心の芽生え。',
        triggerKeywords: '現在, {{user}}, 出会い, 共同生活'
      }
    ];
    updateField('timeline', templateEvents);
  };

  return (
    <div className="p-4 sm:p-6 space-y-5 text-xs animate-in fade-in duration-200">
      {/* Header Guide */}
      <div className="bg-[#181d26] border border-[#252e3d] p-4 rounded-xl space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <Clock size={16} />
          <span className="font-mono uppercase tracking-wider text-xs">Layer 8: Chronological Timeline</span>
        </div>
        <p className="text-slate-300 text-xs leading-relaxed">
          キャラクターがどんな過去を経て現在の性格・トラウマ・心の壁を築いたのかを時系列で記録します。
          出来事そのものだけでなく、<strong>「心に刻まれた心理的刻印（トラウマ・こだわり）」</strong> を書くことで、AIが深い感情の機微を表現します。
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-[#11141a] p-3 rounded-lg border border-[#252e3d]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-200 text-xs">登録イベント数:</span>
          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono text-xs">
            {timeline.length} 件
          </span>
        </div>

        <div className="flex items-center gap-2">
          {timeline.length === 0 && (
            <button
              type="button"
              onClick={applyTemplate}
              className="px-3 py-1.5 bg-[#181d26] hover:bg-[#252e3d] text-amber-300 border border-amber-500/40 rounded-lg flex items-center gap-1.5 font-bold transition text-xs shadow-sm"
              title="3大転機の雛形を一括投入"
            >
              <Sparkles size={13} className="text-amber-400" />
              <span>おすすめ年表テンプレートを適用</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => addTimelineEvent()}
            className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center gap-1.5 font-bold transition text-xs shadow"
          >
            <Plus size={14} />
            <span>出来事を追加</span>
          </button>
        </div>
      </div>

      {/* Timeline Events List */}
      {timeline.length > 0 ? (
        <div className="space-y-3.5">
          {timeline.map((ev, index) => (
            <div
              key={ev.id}
              className="p-4 bg-[#181d26] rounded-xl border border-[#252e3d] space-y-3 relative group shadow-md hover:border-cyan-900/50 transition"
            >
              {/* Event Header Controls */}
              <div className="flex items-center justify-between gap-2 border-b border-[#252e3d] pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-700/60 flex items-center justify-center font-mono font-bold text-[10px]">
                    {index + 1}
                  </span>
                  <span className="font-mono text-slate-400 text-[11px]">EVENT // #{index + 1}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveEvent(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-20 hover:bg-[#252e3d] rounded transition"
                    title="上へ移動"
                  >
                    <ArrowUp size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveEvent(index, 'down')}
                    disabled={index === timeline.length - 1}
                    className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-20 hover:bg-[#252e3d] rounded transition"
                    title="下へ移動"
                  >
                    <ArrowDown size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeTimelineEvent(ev.id)}
                    className="p-1 text-slate-400 hover:text-red-400 hover:bg-red-950/40 rounded transition ml-1"
                    title="この出来事を削除"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 text-[11px] font-bold mb-1 flex items-center gap-1">
                    <Calendar size={11} className="text-cyan-400" />
                    時期・年齢
                  </label>
                  <input
                    type="text"
                    value={ev.ageOrPeriod}
                    onChange={(e) => updateTimelineEvent(ev.id, { ageOrPeriod: e.target.value })}
                    placeholder="例: 7歳、3年前、半年前"
                    className="w-full bg-[#11141a] border border-[#252e3d] focus:border-cyan-500 rounded px-2.5 py-1.5 text-white outline-none text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-400 text-[11px] font-bold mb-1">
                    出来事のタイトル
                  </label>
                  <input
                    type="text"
                    value={ev.eventTitle}
                    onChange={(e) => updateTimelineEvent(ev.id, { eventTitle: e.target.value })}
                    placeholder="例: アルカディア本家からの追放、{{user}}との最初の出会い"
                    className="w-full bg-[#11141a] border border-[#252e3d] focus:border-cyan-500 rounded px-2.5 py-1.5 text-white font-bold outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] font-bold mb-1">
                  詳細エピソード（何が起きたか）
                </label>
                <textarea
                  rows={2}
                  value={ev.description}
                  onChange={(e) => updateTimelineEvent(ev.id, { description: e.target.value })}
                  placeholder="例: 名門魔導一族に生まれるも、異端魔導が発現したため出来損ないとして離れに追いやられた。"
                  className="w-full bg-[#11141a] border border-[#252e3d] focus:border-cyan-500 rounded p-2 text-slate-200 outline-none resize-none text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-[#252e3d]/80">
                <div>
                  <label className="block text-amber-400 text-[11px] mb-1 font-bold flex items-center gap-1">
                    <Sparkles size={12} />
                    心理的刻印（心に刻まれたこだわり・恐怖）
                  </label>
                  <input
                    type="text"
                    value={ev.mentalImprint}
                    onChange={(e) => updateTimelineEvent(ev.id, { mentalImprint: e.target.value })}
                    placeholder="例: 「完璧な成果を出さなければ居場所がない」という強迫観念"
                    className="w-full bg-[#11141a] border border-amber-900/40 focus:border-amber-500 rounded px-2.5 py-1.5 text-amber-200 outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-cyan-400 text-[11px] mb-1 font-mono flex items-center gap-1">
                    <Clock size={11} />
                    SillyTavern連動キーワード（カンマ区切り）
                  </label>
                  <input
                    type="text"
                    value={ev.triggerKeywords}
                    onChange={(e) => updateTimelineEvent(ev.id, { triggerKeywords: e.target.value })}
                    placeholder="例: 本家, 出来損ない, 追放, 幼少期"
                    className="w-full bg-[#11141a] border border-[#252e3d] focus:border-cyan-500 rounded px-2.5 py-1.5 text-cyan-300 font-mono outline-none text-xs"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Bottom Add Button */}
          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={() => addTimelineEvent()}
              className="px-5 py-2 bg-cyan-600/20 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-cyan-700/50 rounded-lg flex items-center gap-1.5 font-bold transition text-xs shadow-sm"
            >
              <Plus size={14} />
              <span>次の出来事を追加する</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 px-4 bg-[#181d26] rounded-xl border border-dashed border-[#252e3d] space-y-4">
          <Clock size={36} className="mx-auto text-slate-600" />
          <div className="space-y-1">
            <h3 className="font-bold text-slate-200 text-sm">出来事がまだ登録されていません</h3>
            <p className="text-slate-400 text-xs max-w-md mx-auto leading-relaxed">
              キャラクターの原体験や転機を記録することで、AIとの会話で過去のトラウマや思い出が生々しく蘇ります。
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={applyTemplate}
              className="px-4 py-2 bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/50 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
            >
              <Sparkles size={14} />
              おすすめ雛形（3大転機）を一発適用
            </button>
            <button
              type="button"
              onClick={() => addTimelineEvent()}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
            >
              <Plus size={14} />
              自分で出来事を追加
            </button>
          </div>
        </div>
      )}
    </div>
  );
};