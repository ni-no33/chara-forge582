import React, { useState } from 'react';
import {
  X,
  Download,
  Upload,
  HardDrive,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { CharacterProfile } from '../../types/character';
import { downloadBackupFile, restoreBackupFromJson } from '../../utils/storage';

interface BackupPwaModalProps {
  isOpen: boolean;
  onClose: () => void;
  characters: CharacterProfile[];
  onReloadCharacters: (chars: CharacterProfile[]) => void;
}

export const BackupPwaModal: React.FC<BackupPwaModalProps> = ({
  isOpen,
  onClose,
  characters,
  onReloadCharacters
}) => {
  const [restoreStatus, setRestoreStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownload = () => {
    downloadBackupFile();
  };

  const handleRestoreFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const res = restoreBackupFromJson(text);
      if (res.success && res.characters) {
        onReloadCharacters(res.characters);
        setRestoreStatus(`✅ 復元成功: ${res.count} 人のキャラクターデータを正常に復元しました。`);
      } else {
        setRestoreStatus(`❌ 復元失敗: ${res.message}`);
      }
    } catch {
      setRestoreStatus('❌ バックアップファイルの読み込みに失敗しました。正しいJSONファイルかご確認ください。');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#11141a] border border-[#252e3d] rounded-xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-[#252e3d] flex items-center justify-between bg-[#181d26]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <HardDrive size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">全データ一括バックアップ ＆ 復元</h3>
              <p className="text-[11px] text-slate-400">大切なキャラクター設定の安全退避・端末間移行</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-[#252e3d] rounded transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs text-slate-300">
          {/* Privacy & Safety Note */}
          <div className="p-3 bg-emerald-950/25 border border-emerald-800/40 rounded-lg flex items-start gap-2.5">
            <ShieldCheck className="text-emerald-400 shrink-0 mt-0.5" size={18} />
            <div className="text-[11px] leading-relaxed">
              <p className="font-bold text-emerald-300 mb-0.5">完全プライベート保存</p>
              <p className="text-slate-400">
                本アプリのキャラクター設定や画像はすべてお使いのブラウザ内部にのみ安全に保存されています。外部サーバーへの送信は一切行われません。
              </p>
            </div>
          </div>

          {/* Browser Cache Notice */}
          <div className="p-3 bg-amber-950/20 border border-amber-800/30 rounded-lg flex items-start gap-2.5">
            <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={17} />
            <div className="text-[11px] leading-relaxed">
              <p className="font-bold text-amber-300 mb-0.5">定期的なバックアップのおすすめ</p>
              <p className="text-slate-400">
                ブラウザの履歴やキャッシュを全消去した場合に備えて、定期的に「全キャラクター保存」でバックアップJSONをダウンロードしておくと安心です。
              </p>
            </div>
          </div>

          {/* Download Box */}
          <div className="bg-[#181d26] border border-[#252e3d] rounded-lg p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-100 text-xs flex items-center gap-1.5">
                  <Download size={14} className="text-amber-400" />
                  1. 全データの一括ダウンロード
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  登録済みの全 <span className="text-amber-300 font-bold">{characters.length} 人</span>のキャラクター（設定・画像・年表・秘密すべて）を1つのファイルにまとめて保存します。
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-bold rounded-lg transition flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20"
            >
              <Download size={15} />
              <span>全キャラクターを一括保存 (.json)</span>
            </button>
          </div>

          {/* Restore Box */}
          <div className="bg-[#181d26] border border-[#252e3d] rounded-lg p-4 space-y-2.5">
            <div>
              <h4 className="font-bold text-slate-100 text-xs flex items-center gap-1.5">
                <Upload size={14} className="text-cyan-400" />
                2. バックアップファイルから復元
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                以前ダウンロードした CharaForge のバックアップJSONを選択して、データを一括復元します。
              </p>
            </div>

            <label className="w-full py-2.5 bg-[#252e3d] hover:bg-[#303b4d] text-slate-200 font-bold rounded-lg transition flex items-center justify-center gap-2 cursor-pointer border border-[#374357]">
              <Upload size={15} className="text-cyan-400" />
              <span>バックアップJSONを選択して復元</span>
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleRestoreFile}
              />
            </label>

            {restoreStatus && (
              <div className="p-2.5 bg-[#11141a] rounded border border-[#252e3d] text-[11px] text-slate-200 flex items-center gap-2">
                <FileCheck size={14} className="text-emerald-400 shrink-0" />
                <span>{restoreStatus}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#252e3d] bg-[#181d26] flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <HelpCircle size={13} />
            保存先: お使いの端末のローカルストレージ
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#252e3d] hover:bg-[#303b4d] text-slate-200 rounded font-bold transition"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};