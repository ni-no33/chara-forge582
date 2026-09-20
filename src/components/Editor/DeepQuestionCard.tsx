import React, { useState } from 'react';
import { CharacterProfile } from '../../types/character';
import { DEEP_QUESTIONS, DeepQuestionItem } from '../../data/deepQuestions';
import { HelpCircle, ChevronDown, ChevronUp, Copy, Check, Lightbulb, Sparkles } from 'lucide-react';

interface Props {
  stepIndex: number;
  char: CharacterProfile;
  updateField: <K extends keyof CharacterProfile>(field: K, value: CharacterProfile[K]) => void;
}

export const DeepQuestionCard: React.FC<Props> = ({ stepIndex, char, updateField }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedExample, setCopiedExample] = useState<string | null>(null);

  const questions = DEEP_QUESTIONS.filter((q) => q.stepIndex === stepIndex);

  if (questions.length === 0) return null;

  const handleApplyExample = (q: DeepQuestionItem, exampleText: string) => {
    const currentVal = (char[q.targetField] as string) || '';
    if (!currentVal) {
      updateField(q.targetField, exampleText as any);
    } else {
      // Append if already has text
      updateField(q.targetField, (currentVal + '\n' + exampleText) as any);
    }
    setCopiedExample(exampleText);
    setTimeout(() => setCopiedExample(null), 1800);
  };

  return (
    <div className="bg-[#121620] border border-cyan-900/30 rounded-xl p-3.5 space-y-2.5 my-3 shadow-md">
      <div className="flex items-center justify-between border-b border-cyan-900/20 pb-2">
        <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
          <Lightbulb size={14} className="text-cyan-400" />
          深掘りインスピレーション質問（思考ガイド & 回答プリセット）
        </span>
        <span className="text-[10px] text-cyan-400/80 font-mono">
          {questions.length} 質問収録
        </span>
      </div>

      <div className="space-y-2">
        {questions.map((q) => {
          const isExpanded = expandedId === q.id;
          const isFilled = Boolean(char[q.targetField]);

          return (
            <div
              key={q.id}
              className={`rounded-lg border transition text-xs overflow-hidden ${
                isExpanded
                  ? 'bg-[#181d26] border-cyan-700/50'
                  : 'bg-[#151922] border-[#252e3d] hover:border-slate-600'
              }`}
            >
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="w-full text-left p-2.5 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/40 font-mono shrink-0">
                    {q.category}
                  </span>
                  <span className="font-medium text-slate-200 truncate">{q.question}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {isFilled && (
                    <span className="text-[10px] text-emerald-400 font-mono hidden sm:inline">
                      ✓ 入力済
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronUp size={14} className="text-slate-400" />
                  ) : (
                    <ChevronDown size={14} className="text-slate-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="p-3 pt-1 border-t border-[#252e3d] space-y-2.5 bg-[#10141d]/70">
                  <div className="text-[11px] text-slate-400 leading-relaxed bg-[#181d26]/80 p-2 rounded border border-[#252e3d]">
                    <span className="text-amber-400 font-bold block text-[10px] mb-0.5">
                      💡 思考のヒント:
                    </span>
                    {q.tips}
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-400 font-bold block">
                      ▼ 回答アイデア例（タップで入力欄に即時反映）:
                    </span>
                    {q.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="bg-[#181d26] hover:bg-[#202734] border border-[#252e3d] rounded p-2 flex items-center justify-between gap-2 transition group"
                      >
                        <span className="text-[11px] text-slate-300 flex-1 leading-snug">
                          {ex}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleApplyExample(q, ex)}
                          className="px-2 py-1 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800/60 text-cyan-300 rounded text-[10px] shrink-0 font-bold flex items-center gap-1 transition"
                        >
                          {copiedExample === ex ? (
                            <>
                              <Check size={11} className="text-emerald-400" />
                              <span className="text-emerald-400">反映済</span>
                            </>
                          ) : (
                            <>
                              <Sparkles size={11} />
                              <span>適用</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
