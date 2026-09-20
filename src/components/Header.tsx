import React from 'react';
import { CharacterProfile } from '../types/character';
import {
  ShieldAlert,
  Eye,
  EyeOff,
  Sparkles,
  Dice5,
  Plus,
  FileCode,
  FileText,
  Download,
  Flame,
  Smartphone,
  HardDrive
} from 'lucide-react';
import { downloadBackupFile } from '../utils/storage';

interface HeaderProps {
  characters: CharacterProfile[];
  activeCharId: string;
  onSelectCharacter: (id: string) => void;
  onNewCharacter: () => void;
  onImportJson: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentTab: 'dossier' | 'editor' | 'export';
  onChangeTab: (tab: 'dossier' | 'editor' | 'export') => void;
  nsfwMask: boolean;
  onToggleNsfwMask: () => void;
  onOpenGeminiModal: () => void;
  onOpenGachaModal: () => void;
  onOpenBackupModal: () => void;
  completionScore: number;
}

export const Header: React.FC<HeaderProps> = ({
  characters,
  activeCharId,
  onSelectCharacter,
  onNewCharacter,
  onImportJson,
  currentTab,
  onChangeTab,
  nsfwMask,
  onToggleNsfwMask,
  onOpenGeminiModal,
  onOpenGachaModal,
  onOpenBackupModal,
  completionScore
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#11141a]/95 backdrop-blur border-b border-[#252e3d] px-2.5 sm:px-6 py-2 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
        {/* Row 1: Logo & Character Switcher */}
        <div className="flex items-center justify-between gap-2 w-full md:w-auto">
          <div
            className="flex items-center gap-1.5 cursor-pointer shrink-0"
            onClick={() => onChangeTab('dossier')}
          >
            <div className="w-7 h-7 rounded bg-[#d98b2b] flex items-center justify-center shadow">
              <Flame size={16} className="text-[#11141a]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-100 font-mono tracking-wider">
                CHARAFORGE
              </span>
              <span className="text-[8px] text-slate-400 font-mono hidden sm:inline">
                DEPTH WORKBENCH
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <select
              value={activeCharId}
              onChange={(e) => onSelectCharacter(e.target.value)}
              className="bg-[#181d26] border border-[#252e3d] text-slate-200 text-xs rounded px-2 py-1 outline-none max-w-[125px] sm:max-w-[180px] truncate"
            >
              {characters.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name || '名称未設定'}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={onNewCharacter}
              className="p-1.5 bg-[#181d26] hover:bg-[#252e3d] text-amber-400 rounded border border-[#252e3d] transition"
              title="新規キャラクター作成"
            >
              <Plus size={14} />
            </button>

            <label
              className="p-1.5 bg-[#181d26] hover:bg-[#252e3d] text-slate-300 rounded border border-[#252e3d] cursor-pointer transition"
              title="カード読込 (JSON/PNG)"
            >
              <FileCode size={14} />
              <input type="file" accept=".json,image/png" className="hidden" onChange={onImportJson} />
            </label>

            <button
              type="button"
              onClick={downloadBackupFile}
              className="p-1.5 bg-[#181d26] hover:bg-[#252e3d] text-amber-400/90 rounded border border-[#252e3d] transition"
              title="全キャラ一括バックアップ保存 (.json)"
            >
              <HardDrive size={14} />
            </button>
          </div>
        </div>

        {/* Row 2: Tabs & Utilities (Responsive wrap) */}
        <div className="flex items-center justify-between md:justify-end gap-1.5 w-full md:w-auto text-xs overflow-x-auto scrollbar-none">
          {/* Main Navigation Tabs */}
          <div className="flex bg-[#181d26] p-0.5 rounded border border-[#252e3d] shrink-0">
            <button
              type="button"
              onClick={() => onChangeTab('dossier')}
              className={`px-2 sm:px-3 py-1 rounded font-bold transition flex items-center gap-1 ${
                currentTab === 'dossier'
                  ? 'bg-[#d98b2b] text-[#11141a] shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldAlert size={13} />
              <span>ドシエ</span>
            </button>

            <button
              type="button"
              onClick={() => onChangeTab('editor')}
              className={`px-2 sm:px-3 py-1 rounded font-bold transition flex items-center gap-1 ${
                currentTab === 'editor'
                  ? 'bg-[#229288] text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText size={13} />
              <span>深掘り</span>
            </button>

            <button
              type="button"
              onClick={() => onChangeTab('export')}
              className={`px-2 sm:px-3 py-1 rounded font-bold transition flex items-center gap-1 ${
                currentTab === 'export'
                  ? 'bg-[#8b5cf6] text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Download size={13} />
              <span>出力</span>
            </button>
          </div>

          {/* Subtools: Compact on mobile */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={onOpenGeminiModal}
              className="px-2 py-1 bg-[#181d26] hover:bg-[#252e3d] border border-[#252e3d] text-cyan-300 rounded font-bold flex items-center gap-1 transition"
              title="Gemini壁打ち"
            >
              <Sparkles size={13} className="text-cyan-400" />
              <span className="hidden sm:inline text-[11px]">壁打ち</span>
            </button>

            <button
              type="button"
              onClick={onOpenGachaModal}
              className="px-2 py-1 bg-[#181d26] hover:bg-[#252e3d] border border-[#252e3d] text-amber-300 rounded font-bold flex items-center gap-1 transition"
              title="発想ガチャ"
            >
              <Dice5 size={13} />
              <span className="hidden sm:inline text-[11px]">ガチャ</span>
            </button>

            <button
              type="button"
              onClick={onOpenBackupModal}
              className="px-2 py-1 bg-[#181d26] hover:bg-[#252e3d] border border-amber-700/50 text-amber-400 rounded font-bold flex items-center gap-1 transition"
              title="全データ一括バックアップ / 復元"
            >
              <HardDrive size={13} />
              <span className="hidden sm:inline text-[11px]">バックアップ</span>
            </button>

            <button
              type="button"
              onClick={onToggleNsfwMask}
              className={`p-1.5 rounded border transition flex items-center justify-center ${
                nsfwMask
                  ? 'bg-purple-950/60 border-purple-800 text-purple-400'
                  : 'bg-[#181d26] border-[#252e3d] text-slate-400 hover:text-slate-200'
              }`}
              title={nsfwMask ? 'NSFWシールドON (ぼかし中)' : 'NSFWシールドOFF (通常表示)'}
            >
              {nsfwMask ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>

            {/* Mobile-Safe Score Badge */}
            <div
              className="px-2 py-1 bg-[#181d26] border border-[#252e3d] rounded font-mono text-[11px] text-slate-300 shrink-0"
              title="深掘り解像度スコア"
            >
              <span className="hidden sm:inline text-slate-400">解像度: </span>
              <span className="text-[#229288] font-bold">⚡{completionScore}%</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
