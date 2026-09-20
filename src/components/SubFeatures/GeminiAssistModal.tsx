import React, { useState } from 'react';
import { CharacterProfile } from '../../types/character';
import { GEMINI_PROMPTS } from '../../utils/promptGenerators';
import { parseSmartText } from '../../utils/smartParser';
import { X, Copy, Check, Sparkles, MessageSquare, ArrowDownToLine } from 'lucide-react';

interface GeminiAssistModalProps {
  char: CharacterProfile;
  isOpen: boolean;
  onClose: () => void;
  onApplyParsed: (updates: Partial<CharacterProfile>) => void;
}

export const GeminiAssistModal: React.FC<GeminiAssistModalProps> = ({
  char,
  isOpen,
  onClose,
  onApplyParsed
}) => {
  const [selectedPromptId, setSelectedPromptId] = useState<string>(GEMINI_PROMPTS[0].id);
  const [copied, setCopied] = useState(false);
  const [responseInput, setResponseInput] = useState('');
  const [appliedCount, setAppliedCount] = useState<number | null>(null);

  if (!isOpen) return null;

  const currentPromptObj = GEMINI_PROMPTS.find(p => p.id === selectedPromptId) || GEMINI_PROMPTS[0];
  const generatedText = currentPromptObj.generate(char);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleParseAndApply = () => {
    if (!responseInput.trim()) return;
    const parsed = parseSmartText(responseInput);
    const keysCount = Object.keys(parsed).length;
    if (keysCount > 0) {
      onApplyParsed(parsed);
      setAppliedCount(keysCount);
      setTimeout(() => setAppliedCount(null), 3000);
    } else {
      alert('解析可能な項目が見つかりませんでした。キーワード「外面:」「内面:」「欲求:」「逆鱗:」等が含まれているか確認してください。');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-3xl w-full p-4 sm:p-6 space-y-4 shadow-2xl relative my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Sparkles size={20} className="text-cyan-400" />
          <h2 className="text-base sm:text-lg font-bold text-white">
            Gemini 壁打ち＆ロールプレイ支援アシスト
          </h2>
        </div>

        {/* Step 1: Generate Prompt */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-cyan-400">
            <span>STEP 1: 相談テーマを選択してプロンプトをコピー</span>
            <span className="text-slate-500 font-normal">Geminiアプリに貼り付けて壁打ち！</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {GEMINI_PROMPTS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPromptId(p.id)}
                className={`px-3 py-1.5 rounded text-xs transition ${
                  selectedPromptId === p.id
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          <div className="relative">
            <textarea
              rows={6}
              readOnly
              value={generatedText}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-300 font-mono text-xs outline-none select-all"
            />
            <button
              type="button"
              onClick={handleCopyPrompt}
              className="absolute top-3 right-3 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-bold flex items-center gap-1.5 shadow"
            >
              {copied ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
              {copied ? 'コピーしました！' : 'プロンプトをコピー'}
            </button>
          </div>
        </div>

        {/* Step 2: Paste Response */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-amber-400">
            <span>STEP 2: Geminiの回答やロールプレイログを貼り付けて自動反映</span>
            {appliedCount !== null && (
              <span className="text-emerald-400 font-bold animate-pulse">
                ✓ {appliedCount} 箇所の項目を反映しました！
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400">
            Geminiが返してくれたテキストや会話ログをそのまま貼り付けると、外面・内面・欲求・弱点・セリフなどを自動で抜き出して反映します。
          </p>

          <textarea
            rows={5}
            value={responseInput}
            onChange={(e) => setResponseInput(e.target.value)}
            placeholder="Geminiの回答テキスト、またはロールプレイ会話ログをここに貼り付けてください..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 text-xs outline-none focus:border-amber-500"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleParseAndApply}
              disabled={!responseInput.trim()}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow"
            >
              <ArrowDownToLine size={15} />
              設定シートに自動取り込み・反映
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
