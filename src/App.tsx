import React, { useState, useEffect, useMemo } from 'react';
import { CharacterProfile, RadarStats } from './types/character';
import {
  loadCharacters,
  saveCharacters,
  getActiveCharacterId,
  setActiveCharacterId,
  createNewCharacter
} from './utils/storage';
import { extractTavernCardFromPng } from './utils/pngMetadata';
import { importFromSillyTavernJson } from './utils/smartParser';
import { Header } from './components/Header';
import { EditorTab } from './components/Editor/EditorTab';
import { DossierView } from './components/Dossier/DossierView';
import { ExportTab } from './components/Export/ExportTab';
import { GeminiAssistModal } from './components/SubFeatures/GeminiAssistModal';
import { GachaModal } from './components/SubFeatures/GachaModal';
import { BackupPwaModal } from './components/SubFeatures/BackupPwaModal';
import { ErrorBoundary } from './components/Common/ErrorBoundary';
import { ShieldAlert, FileText, Download } from 'lucide-react';

export function App() {
  const [characters, setCharacters] = useState<CharacterProfile[]>(() => loadCharacters());
  const [activeId, setActiveId] = useState<string>(() => getActiveCharacterId());
  const [currentTab, setCurrentTab] = useState<'dossier' | 'editor' | 'export'>('dossier');
  const [editorStep, setEditorStep] = useState<number>(0);
  const [nsfwMask, setNsfwMask] = useState<boolean>(false);
  const [isGeminiOpen, setIsGeminiOpen] = useState<boolean>(false);
  const [isGachaOpen, setIsGachaOpen] = useState<boolean>(false);
  const [isBackupOpen, setIsBackupOpen] = useState<boolean>(false);

  // Active character
  const activeChar = useMemo(() => {
    return characters.find(c => c.id === activeId) || characters[0];
  }, [characters, activeId]);

  // Persist on change
  useEffect(() => {
    if (characters.length > 0) {
      saveCharacters(characters);
    }
  }, [characters]);

  useEffect(() => {
    if (activeId) {
      setActiveCharacterId(activeId);
    }
  }, [activeId]);

  const handleUpdateActiveChar = (updated: CharacterProfile) => {
    setCharacters(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  };

  const handleNewCharacter = () => {
    const newChar = createNewCharacter();
    setCharacters(prev => [newChar, ...prev]);
    setActiveId(newChar.id);
    setEditorStep(0);
    setCurrentTab('editor');
  };

  const handleUpdateStats = (newStats: RadarStats) => {
    if (!activeChar) return;
    handleUpdateActiveChar({
      ...activeChar,
      stats: newStats
    });
  };

  const handleAvatarUpload = (base64: string) => {
    if (!activeChar) return;
    handleUpdateActiveChar({
      ...activeChar,
      avatarImage: base64
    });
  };

  const handleApplyGacha = (targetField: keyof CharacterProfile, content: string) => {
    if (!activeChar) return;
    handleUpdateActiveChar({
      ...activeChar,
      [targetField]: content
    });
  };

  const handleApplyParsed = (updates: Partial<CharacterProfile>) => {
    if (!activeChar) return;
    handleUpdateActiveChar({
      ...activeChar,
      ...updates
    });
  };

  const handleJumpToEditorStep = (stepIndex: number) => {
    setEditorStep(stepIndex);
    setCurrentTab('editor');
  };

  // Import JSON or PNG
  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (file.name.endsWith('.png')) {
        const buffer = await file.arrayBuffer();
        const extracted = extractTavernCardFromPng(buffer);
        if (extracted) {
          const partial = importFromSillyTavernJson(extracted);
          const newChar = {
            ...createNewCharacter(),
            ...partial,
            name: partial.name || file.name.replace('.png', ''),
            avatarImage: await new Promise<string>((res) => {
              const reader = new FileReader();
              reader.onloadend = () => res(reader.result as string);
              reader.readAsDataURL(file);
            })
          };
          setCharacters(prev => [newChar, ...prev]);
          setActiveId(newChar.id);
          alert(`SillyTavern PNGカード「${newChar.name}」を取り込みました！`);
        } else {
          alert('PNG内にSillyTavernのキャラクターデータが見つかりませんでした。画像として取り込みます。');
          const reader = new FileReader();
          reader.onloadend = () => {
            if (activeChar && typeof reader.result === 'string') {
              handleAvatarUpload(reader.result);
            }
          };
          reader.readAsDataURL(file);
        }
      } else {
        const text = await file.text();
        const json = JSON.parse(text);
        const partial = importFromSillyTavernJson(json);
        const newChar = {
          ...createNewCharacter(),
          ...partial,
          name: partial.name || file.name.replace('.json', '')
        };
        setCharacters(prev => [newChar, ...prev]);
        setActiveId(newChar.id);
        alert(`キャラクター設定「${newChar.name}」を取り込みました！`);
      }
    } catch (err) {
      console.error('Failed to import file:', err);
      alert('ファイルの読み込みに失敗しました。');
    }
  };

  // Depth Completion Score (0 - 100)
  const completionScore = useMemo(() => {
    if (!activeChar) return 0;
    const checks = [
      Boolean(activeChar.name),
      Boolean(activeChar.anchorFeatures),
      Boolean(activeChar.persona),
      Boolean(activeChar.shadow),
      Boolean(activeChar.coreDesire),
      Boolean(activeChar.coreFear),
      Boolean(activeChar.triggers),
      Boolean(activeChar.secret),
      Boolean(activeChar.dilemmaChoice),
      Boolean(activeChar.clumsyArea),
      Boolean(activeChar.demiSpeciesName),
      Boolean(activeChar.involuntaryEars || activeChar.involuntaryTail),
      Boolean(activeChar.modernApparelTrouble || activeChar.modernDailyFriction),
      Boolean(activeChar.groomingCare),
      Boolean(activeChar.userRelation),
      Boolean(activeChar.phase1Early),
      Boolean(activeChar.phase4Attachment),
      Boolean(activeChar.intimacyLevel1),
      Boolean(activeChar.intimacyLevel4),
      Boolean(activeChar.aftercareBehavior),
      Boolean(activeChar.stressTestCompliment),
      Boolean(activeChar.timeline && activeChar.timeline.length > 0)
    ];
    const filled = checks.filter(Boolean).length;
    return Math.round((filled / checks.length) * 100);
  }, [activeChar]);

  if (!activeChar) {
    return <div className="p-8 text-center text-slate-400">Loading CharaForge...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0f1319] text-slate-200 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Header Bar */}
      <Header
        characters={characters}
        activeCharId={activeId}
        onSelectCharacter={setActiveId}
        onNewCharacter={handleNewCharacter}
        onImportJson={handleImportFile}
        currentTab={currentTab}
        onChangeTab={setCurrentTab}
        nsfwMask={nsfwMask}
        onToggleNsfwMask={() => setNsfwMask(!nsfwMask)}
        onOpenGeminiModal={() => setIsGeminiOpen(true)}
        onOpenGachaModal={() => setIsGachaOpen(true)}
        onOpenBackupModal={() => setIsBackupOpen(true)}
        completionScore={completionScore}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-3 sm:p-6">
        <ErrorBoundary fallbackTitle="コンテンツ表示エラー">
          {currentTab === 'dossier' && (
            <DossierView
              char={activeChar}
              onUpdateStats={handleUpdateStats}
              onAvatarUpload={handleAvatarUpload}
              nsfwMask={nsfwMask}
              onJumpToStep={handleJumpToEditorStep}
            />
          )}

          {currentTab === 'editor' && (
            <EditorTab
              key={editorStep}
              char={activeChar}
              onChange={handleUpdateActiveChar}
              nsfwMask={nsfwMask}
              onOpenGachaModal={() => setIsGachaOpen(true)}
              onReturnToDossier={() => setCurrentTab('dossier')}
              initialStep={editorStep}
            />
          )}

          {currentTab === 'export' && (
            <ExportTab char={activeChar} />
          )}
        </ErrorBoundary>
      </main>

      {/* Mobile Bottom Navigation Bar (Dossier Home First) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0f1319]/95 backdrop-blur border-t border-slate-800 flex justify-around p-2 shadow-2xl">
        <button
          type="button"
          onClick={() => setCurrentTab('dossier')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold p-1 ${
            currentTab === 'dossier' ? 'text-amber-400' : 'text-slate-500'
          }`}
        >
          <ShieldAlert size={18} />
          <span>機密ドシエ</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentTab('editor')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold p-1 ${
            currentTab === 'editor' ? 'text-cyan-400' : 'text-slate-500'
          }`}
        >
          <FileText size={18} />
          <span>深掘り</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentTab('export')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold p-1 ${
            currentTab === 'export' ? 'text-purple-400' : 'text-slate-500'
          }`}
        >
          <Download size={18} />
          <span>出力</span>
        </button>
      </div>

      {/* Modals */}
      <GeminiAssistModal
        char={activeChar}
        isOpen={isGeminiOpen}
        onClose={() => setIsGeminiOpen(false)}
        onApplyParsed={handleApplyParsed}
      />

      <GachaModal
        isOpen={isGachaOpen}
        onClose={() => setIsGachaOpen(false)}
        onApplyItem={handleApplyGacha}
      />

      <BackupPwaModal
        isOpen={isBackupOpen}
        onClose={() => setIsBackupOpen(false)}
        characters={characters}
        onReloadCharacters={(chars) => {
          setCharacters(chars);
          if (chars.length > 0) {
            setActiveId(chars[0].id);
          }
        }}
      />
    </div>
  );
}

export default App;
