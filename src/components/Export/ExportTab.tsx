import React, { useState } from 'react';
import { CharacterProfile } from '../../types/character';
import { compileToSillyTavernV2, compileToLorebook, compileToSdxlPrompt } from '../../utils/compilers';
import { embedTavernCardIntoPng, generateDefaultCanvasPng } from '../../utils/pngMetadata';
import { Download, Copy, Check, Sparkles, Image, FileCode, BookOpen } from 'lucide-react';

interface ExportTabProps {
  char: CharacterProfile;
}

export const ExportTab: React.FC<ExportTabProps> = ({ char }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isExportingPng, setIsExportingPng] = useState(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const downloadJson = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadSillyTavernPng = async () => {
    setIsExportingPng(true);
    try {
      const tavernJson = compileToSillyTavernV2(char);
      let pngBuffer: ArrayBuffer;

      if (char.avatarImage) {
        // Convert base64 avatar to PNG ArrayBuffer using Canvas
        const img = new window.Image();
        img.src = char.avatarImage;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 400;
        canvas.height = img.naturalHeight || 600;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
          if (blob) {
            pngBuffer = await blob.arrayBuffer();
          } else {
            pngBuffer = await generateDefaultCanvasPng(char.name, char.title);
          }
        } else {
          pngBuffer = await generateDefaultCanvasPng(char.name, char.title);
        }
      } else {
        pngBuffer = await generateDefaultCanvasPng(char.name, char.title);
      }

      // Embed Tavern metadata chunk
      const finalBytes = embedTavernCardIntoPng(pngBuffer, tavernJson);
      const finalBlob = new Blob([finalBytes as any], { type: 'image/png' });
      const url = URL.createObjectURL(finalBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${char.name || 'character'}_card.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Failed to export PNG card:', e);
      alert('PNGカードのエクスポートに失敗しました。JSONダウンロードをお試しください。');
    } finally {
      setIsExportingPng(false);
    }
  };

  const baseSdxl = compileToSdxlPrompt(char, 'base');
  const sheetSdxl = compileToSdxlPrompt(char, 'sheet');
  const casualSdxl = compileToSdxlPrompt(char, 'casual');
  const nsfwSdxl = compileToSdxlPrompt(char, 'nsfw');

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 animate-in fade-in duration-300">
      {/* SillyTavern Section */}
      <div className="border border-slate-800 bg-slate-900/90 rounded-lg p-4 sm:p-6 shadow-xl space-y-4">
        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Image size={20} className="text-cyan-400" />
              SillyTavern 連携エクスポート
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              キャラクターカードV2規格に準拠したPNG画像およびJSONを出力します。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* PNG Card Button */}
          <button
            type="button"
            onClick={handleDownloadSillyTavernPng}
            disabled={isExportingPng}
            className="p-4 bg-gradient-to-br from-cyan-900/60 to-slate-900 hover:from-cyan-800/80 hover:to-slate-800 border border-cyan-500/40 rounded-lg text-left transition group shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-cyan-300 text-sm flex items-center gap-1.5">
                <Image size={16} /> キャラカード (PNG)
              </span>
              <Download size={16} className="text-cyan-400 group-hover:translate-y-0.5 transition" />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              画像に全設定が埋め込まれたPNGカード。SillyTavernにそのままドラッグ＆ドロップして遊べます。
            </p>
          </button>

          {/* V2 JSON Button */}
          <button
            type="button"
            onClick={() => downloadJson(compileToSillyTavernV2(char), `${char.name || 'character'}_v2.json`)}
            className="p-4 bg-slate-950/80 hover:bg-slate-900 border border-slate-800 rounded-lg text-left transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                <FileCode size={16} className="text-amber-400" /> カード (JSON)
              </span>
              <Download size={16} className="text-slate-400 group-hover:translate-y-0.5 transition" />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              TavernCard V2 仕様の軽量な純粋JSONファイル。
            </p>
          </button>

          {/* Lorebook JSON Button */}
          <button
            type="button"
            onClick={() => {
              const lb = compileToLorebook(char);
              if (!lb) {
                alert('年表イベントが登録されていません。');
                return;
              }
              downloadJson(lb, `${char.name || 'character'}_lorebook.json`);
            }}
            className="p-4 bg-slate-950/80 hover:bg-slate-900 border border-slate-800 rounded-lg text-left transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                <BookOpen size={16} className="text-pink-400" /> 年表記憶 (Lorebook)
              </span>
              <Download size={16} className="text-slate-400 group-hover:translate-y-0.5 transition" />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              年表の各出来事をキーワード発火式にしたWorld Info (JSON)。
            </p>
          </button>
        </div>
      </div>

      {/* SDXL Section */}
      <div className="border border-slate-800 bg-slate-900/90 rounded-lg p-4 sm:p-6 shadow-xl space-y-4">
        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles size={20} className="text-amber-400" />
              SDXL / 画像生成プロンプト
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              深掘りしたビジュアル設定から生成したプロンプトをワンタップでコピーできます。
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          {/* Base Prompt */}
          <div className="bg-slate-950/80 p-3.5 rounded border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 text-xs">① 基本アイデンティティ（Base Prompt）</span>
              <button
                type="button"
                onClick={() => copyToClipboard(baseSdxl.prompt, 'base')}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded flex items-center gap-1 text-[11px]"
              >
                {copiedKey === 'base' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                {copiedKey === 'base' ? 'コピー完了' : 'コピー'}
              </button>
            </div>
            <p className="text-slate-300 font-mono text-[11px] break-words bg-slate-900/60 p-2 rounded">
              {baseSdxl.prompt}
            </p>
          </div>

          {/* Character Sheet Prompt */}
          <div className="bg-slate-950/80 p-3.5 rounded border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-400 text-xs">② キャラクター三面図・設定シート用</span>
              <button
                type="button"
                onClick={() => copyToClipboard(sheetSdxl.prompt, 'sheet')}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded flex items-center gap-1 text-[11px]"
              >
                {copiedKey === 'sheet' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                {copiedKey === 'sheet' ? 'コピー完了' : 'コピー'}
              </button>
            </div>
            <p className="text-slate-300 font-mono text-[11px] break-words bg-slate-900/60 p-2 rounded">
              {sheetSdxl.prompt}
            </p>
          </div>

          {/* Casual / Room Prompt */}
          <div className="bg-slate-950/80 p-3.5 rounded border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-300 text-xs">③ 部屋着・日常リラックス差分</span>
              <button
                type="button"
                onClick={() => copyToClipboard(casualSdxl.prompt, 'casual')}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded flex items-center gap-1 text-[11px]"
              >
                {copiedKey === 'casual' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                {copiedKey === 'casual' ? 'コピー完了' : 'コピー'}
              </button>
            </div>
            <p className="text-slate-300 font-mono text-[11px] break-words bg-slate-900/60 p-2 rounded">
              {casualSdxl.prompt}
            </p>
          </div>

          {/* NSFW Prompt */}
          <div className="bg-slate-950/80 p-3.5 rounded border border-purple-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400 text-xs">④ 🔞 親密・NSFW 表情＆シチュエーション差分</span>
              <button
                type="button"
                onClick={() => copyToClipboard(nsfwSdxl.prompt, 'nsfw')}
                className="px-2.5 py-1 bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 rounded flex items-center gap-1 text-[11px] border border-purple-800/40"
              >
                {copiedKey === 'nsfw' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                {copiedKey === 'nsfw' ? 'コピー完了' : 'コピー'}
              </button>
            </div>
            <p className="text-purple-200/90 font-mono text-[11px] break-words bg-slate-900/60 p-2 rounded">
              {nsfwSdxl.prompt}
            </p>
          </div>

          {/* Negative Prompt */}
          <div className="bg-slate-950/80 p-3.5 rounded border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-red-400 text-xs">ネガティブプロンプト</span>
              <button
                type="button"
                onClick={() => copyToClipboard(baseSdxl.negative, 'neg')}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded flex items-center gap-1 text-[11px]"
              >
                {copiedKey === 'neg' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                {copiedKey === 'neg' ? 'コピー完了' : 'コピー'}
              </button>
            </div>
            <p className="text-slate-400 font-mono text-[11px] break-words bg-slate-900/60 p-2 rounded">
              {baseSdxl.negative}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
