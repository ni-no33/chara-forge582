import React from 'react';
import { CharacterProfile } from '../../types/character';
import { HelpCircle, Heart, Sparkles, Crown, Flame, Plus, Trash2 } from 'lucide-react';
import { DeepQuestionCard } from './DeepQuestionCard';

interface Props {
  char: CharacterProfile;
  updateField: <K extends keyof CharacterProfile>(field: K, value: CharacterProfile[K]) => void;
}

export const LayerNsfw: React.FC<Props> = ({ char, updateField }) => {
  // Helper for intimacy multi-patterns
  const intimacyPatterns = char.intimacyPatterns || {};
  const dominantPatterns = char.dominantPatterns || {};

  const handleAddIntimacyPattern = (levelKey: string) => {
    const current = intimacyPatterns[levelKey] || [];
    updateField('intimacyPatterns', {
      ...intimacyPatterns,
      [levelKey]: [...current, '']
    });
  };

  const handleUpdateIntimacyPattern = (levelKey: string, idx: number, val: string) => {
    const current = [...(intimacyPatterns[levelKey] || [])];
    current[idx] = val;
    updateField('intimacyPatterns', {
      ...intimacyPatterns,
      [levelKey]: current
    });
  };

  const handleDeleteIntimacyPattern = (levelKey: string, idx: number) => {
    const current = [...(intimacyPatterns[levelKey] || [])];
    current.splice(idx, 1);
    updateField('intimacyPatterns', {
      ...intimacyPatterns,
      [levelKey]: current
    });
  };

  const handleAddDominantPattern = (domKey: string) => {
    const current = dominantPatterns[domKey] || [];
    updateField('dominantPatterns', {
      ...dominantPatterns,
      [domKey]: [...current, '']
    });
  };

  const handleUpdateDominantPattern = (domKey: string, idx: number, val: string) => {
    const current = [...(dominantPatterns[domKey] || [])];
    current[idx] = val;
    updateField('dominantPatterns', {
      ...dominantPatterns,
      [domKey]: current
    });
  };

  const handleDeleteDominantPattern = (domKey: string, idx: number) => {
    const current = [...(dominantPatterns[domKey] || [])];
    current.splice(idx, 1);
    updateField('dominantPatterns', {
      ...dominantPatterns,
      [domKey]: current
    });
  };

  return (
    <div className="p-3 sm:p-5 space-y-5 text-xs">
      <div className="bg-[#181d26] border border-purple-900/40 p-3 rounded text-purple-200 flex gap-2 items-start">
        <HelpCircle size={15} className="shrink-0 text-purple-400 mt-0.5" />
        <div>
          <span className="font-bold text-slate-100 block mb-0.5">【親密さのグラデーション ＆ 攻守・夜の顔】</span>
          全年齢の日常から夜の顔まで、親密さには繊細なグラデーションが存在します。
          攻め・受け・クール・好戦的など、**どんな性格のキャラクターでも自然に描けるオープンな仕様**です。
          状況に応じた複数の振る舞いを「＋ パターン追加」で何通りでも記録できます。
        </div>
      </div>

      {/* Position Selector (Top / Bottom / Switch / Reversal) */}
      <div className="bg-[#121620] border border-purple-900/40 rounded-xl p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-bold text-purple-300 flex items-center gap-1.5 text-xs">
            <Crown size={14} className="text-amber-400" />
            夜の攻守ポジション (Position & Dynamic)
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            現在: {char.positionType === 'top' ? '完全攻め' : char.positionType === 'bottom' ? '完全受け' : char.positionType === 'switch' ? 'リバ(両対応)' : char.positionType === 'reversal' ? '豹変リバ' : '未選択'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'bottom', label: '受け側 (Bottom)', desc: '相手に委ねる、翻弄される、受動・従順' },
            { id: 'top', label: '攻め側 (Top)', desc: '主導権を握る、リードする、支配・攻め' },
            { id: 'switch', label: 'リバ / 両対応 (Switch)', desc: '気分や相手の出方によって攻守を自在に切り替える' },
            { id: 'reversal', label: '豹変リバ (Reversal)', desc: '普段の立場と夜の立場が逆転する、または途中で豹変する' },
          ].map((p) => {
            const isSelected = char.positionType === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => updateField('positionType', p.id as any)}
                className={`p-2 rounded-lg border text-left transition ${
                  isSelected
                    ? 'bg-purple-950/80 border-purple-500 text-purple-200 ring-1 ring-purple-500/50'
                    : 'bg-[#181d26] border-[#252e3d] text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                <div className="font-bold text-[11px] text-slate-200 flex items-center justify-between">
                  <span>{p.label}</span>
                  {isSelected && <span className="text-amber-400 text-xs">●</span>}
                </div>
                <p className="text-[9px] text-slate-400 mt-1 leading-snug line-clamp-2">{p.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Part A: 攻め・リード側の主導権・手つき・支配 */}
      <div className="bg-[#14121d] border border-pink-900/40 rounded-xl p-3.5 space-y-3 shadow-inner">
        <div className="flex items-center justify-between border-b border-pink-900/30 pb-2">
          <span className="text-xs font-bold text-pink-300 flex items-center gap-1.5">
            <Flame size={14} className="text-rose-400" />
            【攻め・リード側】に回った時の手つき・言葉責め・主導権
          </span>
          <span className="text-[10px] text-pink-400 font-mono">DOMINANT PERSONA</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* 手つき・主導権 */}
          <NsfwFieldWithPatterns
            label="攻め時の手つき・主導権（拘束、触れ方、焦らし方、包容など）"
            mainValue={char.dominantLeadStyle || ''}
            onMainChange={(val) => updateField('dominantLeadStyle', val)}
            patterns={dominantPatterns['leadStyle'] || []}
            onAddPattern={() => handleAddDominantPattern('leadStyle')}
            onUpdatePattern={(idx, val) => handleUpdateDominantPattern('leadStyle', idx, val)}
            onDeletePattern={(idx) => handleDeleteDominantPattern('leadStyle', idx)}
            placeholder="例: 両手首を抑えて自由を奪い焦らす（支配） / 優しく髪を撫でながら包み込むように脱力させる（甘やかし） / 相手の反応を面白がりながら意地悪に触れる（玩弄）"
          />

          {/* 言葉責め・命令 */}
          <NsfwFieldWithPatterns
            label="言葉責め・声かけ（囁き、支配命令、甘い肯定など）"
            mainValue={char.dominantVerbalCommand || ''}
            onMainChange={(val) => updateField('dominantVerbalCommand', val)}
            patterns={dominantPatterns['verbal'] || []}
            onAddPattern={() => handleAddDominantPattern('verbal')}
            onUpdatePattern={(idx, val) => handleUpdateDominantPattern('verbal', idx, val)}
            onDeletePattern={(idx) => handleDeleteDominantPattern('verbal', idx)}
            placeholder="例: 「誰に触られてるのか、ちゃんと言ってごらん？」（命令） / 「上手だよ、もっと力抜いて…」（甘やかし） / 「まだ泣くのは早いわよ」（加虐）"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* 相手を追い詰めるツボ */}
          <NsfwFieldWithPatterns
            label="相手を追い詰めるツボ・興奮する瞬間（どんな表情・反応に嗜虐心や独占欲を刺激されるか）"
            mainValue={char.dominantPossessionDrive || ''}
            onMainChange={(val) => updateField('dominantPossessionDrive', val)}
            patterns={dominantPatterns['drive'] || []}
            onAddPattern={() => handleAddDominantPattern('drive')}
            onUpdatePattern={(idx, val) => handleUpdateDominantPattern('drive', idx, val)}
            onDeletePattern={(idx) => handleDeleteDominantPattern('drive', idx)}
            placeholder="例: 相手が恥ずかしさで顔を隠そうとするのを無理やり見つめさせること / 余裕のあった相手が自分に懇願してくる瞬間 / 自分の名前を泣きながら呼ぶ声"
          />

          {/* 攻め側としてのアフターケア */}
          <NsfwFieldWithPatterns
            label="攻め側としてのアフターケア（事後の抱擁、労わり、甘やかしなど）"
            mainValue={char.dominantAftercare || ''}
            onMainChange={(val) => updateField('dominantAftercare', val)}
            patterns={dominantPatterns['aftercare'] || []}
            onAddPattern={() => handleAddDominantPattern('aftercare')}
            onUpdatePattern={(idx, val) => handleUpdateDominantPattern('aftercare', idx, val)}
            onDeletePattern={(idx) => handleDeleteDominantPattern('aftercare', idx)}
            placeholder="例: 散々いじめた後に急に優しくなり、汗を拭って抱きしめる / 満足そうに相手の髪を撫でながら微笑む / 無言で温かい飲み物を渡して寄り添う"
          />
        </div>
      </div>

      {/* Deep Dive Questions Card */}
      <DeepQuestionCard stepIndex={5} char={char} updateField={updateField} />

      {/* Part B: 親密さの7段階グラデーション（SFW ➔ NSFW） */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-purple-300 font-bold flex items-center gap-1.5 text-xs">
            <Heart size={13} className="text-pink-400" />
            親密さの7段階グラデーション（全性格対応・マルチパターン）
          </div>
          <span className="text-[10px] text-slate-500">
            ※攻め／受け／平常／不意打ち等の差分を「＋ パターン追加」で自由に記録
          </span>
        </div>

        <div className="space-y-2.5">
          {/* Level 1 */}
          <NsfwLevelCard
            levelBadge="Level 1"
            title="[視線・距離の意識]: 目が合った時の視線の向け方、至近距離での間合いの取り方"
            borderColor="border-slate-600"
            mainValue={char.intimacyLevel1}
            onMainChange={(val) => updateField('intimacyLevel1', val)}
            patterns={intimacyPatterns['level1'] || []}
            onAddPattern={() => handleAddIntimacyPattern('level1')}
            onUpdatePattern={(idx, val) => handleUpdateIntimacyPattern('level1', idx, val)}
            onDeletePattern={(idx) => handleDeleteIntimacyPattern('level1', idx)}
            placeholder="例: 目が合うと不敵に微笑んで見つめ返す（攻め・余裕） / 観察するようにじっと見つめる（クール） / 慌てて逸らしつつ耳が赤くなる（照れ）"
          />

          {/* Level 2 */}
          <NsfwLevelCard
            levelBadge="Level 2"
            title="[偶発的接触]: 肩や手、膝などが不意に触れ合った時の挙動・態度"
            borderColor="border-slate-500"
            mainValue={char.intimacyLevel2}
            onMainChange={(val) => updateField('intimacyLevel2', val)}
            patterns={intimacyPatterns['level2'] || []}
            onAddPattern={() => handleAddIntimacyPattern('level2')}
            onUpdatePattern={(idx, val) => handleUpdateIntimacyPattern('level2', idx, val)}
            onDeletePattern={(idx) => handleDeleteIntimacyPattern('level2', idx)}
            placeholder="例: 触れたまま離さず指先を絡め取る（攻め） / 「わざと当てたの？」と楽しそうに覗き込む（挑発） / ビクッと身を引く（動揺） / 全く動じず平然としている（クール）"
          />

          {/* Level 3 */}
          <NsfwLevelCard
            levelBadge="Level 3"
            title="[日常スキンシップ]: 手繋ぎ、身体の接触、触れられた／触れた際の振る舞い"
            borderColor="border-cyan-600"
            mainValue={char.intimacyLevel3}
            onMainChange={(val) => updateField('intimacyLevel3', val)}
            patterns={intimacyPatterns['level3'] || []}
            onAddPattern={() => handleAddIntimacyPattern('level3')}
            onUpdatePattern={(idx, val) => handleUpdateIntimacyPattern('level3', idx, val)}
            onDeletePattern={(idx) => handleDeleteIntimacyPattern('level3', idx)}
            placeholder="例: 自分から相手の手を力強く引いて歩く（主導） / 相手の指先をいじって戯れる（余裕） / 照れ隠しで口先だけ小言を言う（ツンデレ） / 自然と寄り添う（無自覚）"
          />

          {/* Level 4 */}
          <NsfwLevelCard
            levelBadge="Level 4"
            title="[境界線・密着]: 至近距離の密着、バックハグ、耳元への囁き等での空気感"
            borderColor="border-amber-600"
            mainValue={char.intimacyLevel4}
            onMainChange={(val) => updateField('intimacyLevel4', val)}
            patterns={intimacyPatterns['level4'] || []}
            onAddPattern={() => handleAddIntimacyPattern('level4')}
            onUpdatePattern={(idx, val) => handleUpdateIntimacyPattern('level4', idx, val)}
            onDeletePattern={(idx) => handleDeleteIntimacyPattern('level4', idx)}
            placeholder="例: 相手を壁際に追い込んで逃げ場をなくす（支配） / 「心臓、すごい音してるよ？」と耳元に息を吹きかける（挑発） / 抱きしめられて全身が固まり顔を埋める（受け身）"
          />

          {/* Level 5 */}
          <NsfwLevelCard
            levelBadge="Level 5"
            title="[情熱・理性の融解]: キスや決定的な接触時の変化・衝動の表れ方"
            borderColor="border-pink-600"
            mainValue={char.intimacyLevel5}
            onMainChange={(val) => updateField('intimacyLevel5', val)}
            patterns={intimacyPatterns['level5'] || []}
            onAddPattern={() => handleAddIntimacyPattern('level5')}
            onUpdatePattern={(idx, val) => handleUpdateIntimacyPattern('level5', idx, val)}
            onDeletePattern={(idx) => handleDeleteIntimacyPattern('level5', idx)}
            placeholder="例: 相手から仕掛けられても立場を逆転させて深く奪い返す（攻め） / 欲望を隠さなくなり瞳が獣のように据わる（本能） / 理性が崩れて襟元にしがみつく（陥落）"
          />

          {/* Level 6 */}
          <NsfwLevelCard
            levelBadge="Level 6"
            title="[夜の入口・脱衣]: 肌を晒す際や一線を越える直前の空気感・所作"
            borderColor="border-purple-500"
            mainValue={char.intimacyLevel6}
            onMainChange={(val) => updateField('intimacyLevel6', val)}
            patterns={intimacyPatterns['level6'] || []}
            onAddPattern={() => handleAddIntimacyPattern('level6')}
            onUpdatePattern={(idx, val) => handleUpdateIntimacyPattern('level6', idx, val)}
            onDeletePattern={(idx) => handleDeleteIntimacyPattern('level6', idx)}
            placeholder="例: 相手の服をゆっくり焦らすように脱がせる（リード・余裕） / 飢えた視線で見つめ手早く脱ぎ捨てる（好戦） / 「電気消して…」と顔を隠す（恥じらい）"
          />

          {/* Level 7 */}
          <NsfwLevelCard
            levelBadge="Level 7"
            title="[完全開放・本性]: 最も深い親密状態での態度・主導権・本能の露わになり方"
            borderColor="border-purple-600"
            mainValue={char.intimacyLevel7}
            onMainChange={(val) => updateField('intimacyLevel7', val)}
            patterns={intimacyPatterns['level7'] || []}
            onAddPattern={() => handleAddIntimacyPattern('level7')}
            onUpdatePattern={(idx, val) => handleUpdateIntimacyPattern('level7', idx, val)}
            onDeletePattern={(idx) => handleDeleteIntimacyPattern('level7', idx)}
            placeholder="例: 相手を完全に支配し啼き顔を愉しむ（加虐・S気質） / 全てを受け止めて甘やかす（包容・愛撫） / 完全に甘えてすがりつく（従属・M気質） / 獣のように激しく求める（衝動）"
          />
        </div>
      </div>

      {/* Part C: 感覚・声・視線・攻守のディテール */}
      <div className="space-y-3 pt-2 border-t border-purple-900/30">
        <div className="text-purple-300 font-bold flex items-center gap-1.5 text-xs">
          <Sparkles size={13} className="text-amber-400" />
          感覚・声・視線・攻守のディテール
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <NsfwFieldWithPatterns
            label="敏感な急所・触れられた時の身体の反応"
            mainValue={char.sensitiveAreas}
            onMainChange={(val) => updateField('sensitiveAreas', val)}
            patterns={dominantPatterns['sensitive'] || []}
            onAddPattern={() => handleAddDominantPattern('sensitive')}
            onUpdatePattern={(idx, val) => handleUpdateDominantPattern('sensitive', idx, val)}
            onDeletePattern={(idx) => handleDeleteDominantPattern('sensitive', idx)}
            placeholder="例: 耳の先端、首筋、背中の肩甲骨の間。指先でなぞられただけで背筋がゾクッと震える。"
          />

          <NsfwFieldWithPatterns
            label="触れられた時・攻めている時の声・呼吸・息遣い"
            mainValue={char.voiceBreathing}
            onMainChange={(val) => updateField('voiceBreathing', val)}
            patterns={dominantPatterns['voice'] || []}
            onAddPattern={() => handleAddDominantPattern('voice')}
            onUpdatePattern={(idx, val) => handleUpdateDominantPattern('voice', idx, val)}
            onDeletePattern={(idx) => handleDeleteDominantPattern('voice', idx)}
            placeholder="例: 掠れた低音で耳元に囁く（攻め） / 吐息混じりに声を押し殺そうとする（我慢） / 喉を甘く鳴らす（従順）"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <NsfwFieldWithPatterns
            label="視線・表情（見つめ方、流し目、瞳の据わり方など）"
            mainValue={char.gazeExpression}
            onMainChange={(val) => updateField('gazeExpression', val)}
            patterns={dominantPatterns['gaze'] || []}
            onAddPattern={() => handleAddDominantPattern('gaze')}
            onUpdatePattern={(idx, val) => handleUpdateDominantPattern('gaze', idx, val)}
            onDeletePattern={(idx) => handleDeleteDominantPattern('gaze', idx)}
            placeholder="例: 獲物を値踏みするように妖しく細められた瞳（攻め） / 濡れた瞳での上目遣い（受け身） / 視線を逸らさず堂々と見つめ返す（対等）"
          />

          <NsfwFieldWithPatterns
            label="攻守・主導権ダイナミクス（立場が逆転するツボなど）"
            mainValue={char.dominanceRole}
            onMainChange={(val) => updateField('dominanceRole', val)}
            patterns={dominantPatterns['role'] || []}
            onAddPattern={() => handleAddDominantPattern('role')}
            onUpdatePattern={(idx, val) => handleUpdateDominantPattern('role', idx, val)}
            onDeletePattern={(idx) => handleDeleteDominantPattern('role', idx)}
            placeholder="例: 普段は相手に任せるが、相手が弱気になった瞬間に主導権を奪い返す / 徹底的に支配して自分のペースを崩さない"
          />
        </div>
      </div>

      {/* Part D: 事前・アフターケア・嗜好・境界線 */}
      <div className="space-y-3 pt-2 border-t border-purple-900/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <NsfwFieldWithPatterns
            label="事前の心理（ベッドに入る前の態度・誘い方のスタイル）"
            mainValue={char.preIntimacyBehavior}
            onMainChange={(val) => updateField('preIntimacyBehavior', val)}
            patterns={dominantPatterns['pre'] || []}
            onAddPattern={() => handleAddDominantPattern('pre')}
            onUpdatePattern={(idx, val) => handleUpdateDominantPattern('pre', idx, val)}
            onDeletePattern={(idx) => handleDeleteDominantPattern('pre', idx)}
            placeholder="例: 無言で相手の手を引いて部屋の鍵をかける（強引・攻め） / 「…寒くない？ ベッド入って温めてあげる」（不器用な誘い） / 相手からの誘いを待って試すように微笑む（待ち）"
          />

          <NsfwFieldWithPatterns
            label="★ 事後の余韻・アフターケア（終わった直後の態度・甘え方）"
            mainValue={char.aftercareBehavior}
            onMainChange={(val) => updateField('aftercareBehavior', val)}
            patterns={dominantPatterns['after'] || []}
            onAddPattern={() => handleAddDominantPattern('after')}
            onUpdatePattern={(idx, val) => handleUpdateDominantPattern('after', idx, val)}
            onDeletePattern={(idx) => handleDeleteDominantPattern('after', idx)}
            placeholder="例: 相手を腕の中に抱き込んで額にキスを落とし労わる（包容） / 疲れて胸元に顔を埋めてそのまま眠る（甘え） / 「…悪くなかったわよ」と満足げに煙草を吸う（余裕）"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-purple-300 font-bold mb-1">嗜好・フェチ・背徳感のツボ・執着</label>
            <input
              type="text"
              value={char.fetishObsession}
              onChange={(e) => updateField('fetishObsession', e.target.value)}
              placeholder="例: 首筋への執着、命令口調、耳元への吐息、相手を啼かせること、強い独占欲"
              className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-purple-300 font-bold mb-1">境界線・許容限度・トラウマNG</label>
            <input
              type="text"
              value={char.intimacyBoundaries}
              onChange={(e) => updateField('intimacyBoundaries', e.target.value)}
              placeholder="例: {{user}}以外には絶対に見せない。暴力や同意のない行為は激しく拒絶。"
              className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-purple-400 font-mono mb-1">SDXL用 親密・表情＆衣装タグ</label>
          <input
            type="text"
            value={char.nsfwTagsSdxl}
            onChange={(e) => updateField('nsfwTagsSdxl', e.target.value)}
            placeholder="blushing, smirking, intense gaze, disheveled clothes, lying on bed..."
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-purple-300 font-mono outline-none"
          />
        </div>
      </div>
    </div>
  );
};

// Subcomponent: Nsfw Level Card
interface NsfwLevelCardProps {
  levelBadge: string;
  title: string;
  borderColor: string;
  mainValue: string;
  onMainChange: (val: string) => void;
  patterns: string[];
  onAddPattern: () => void;
  onUpdatePattern: (idx: number, val: string) => void;
  onDeletePattern: (idx: number) => void;
  placeholder: string;
}

const NsfwLevelCard: React.FC<NsfwLevelCardProps> = ({
  levelBadge,
  title,
  borderColor,
  mainValue,
  onMainChange,
  patterns,
  onAddPattern,
  onUpdatePattern,
  onDeletePattern,
  placeholder
}) => {
  return (
    <div className={`bg-[#13171f] p-3 rounded border-l-2 ${borderColor} space-y-2`}>
      <div className="flex items-center justify-between">
        <label className="text-slate-200 font-bold text-xs flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 bg-purple-950 border border-purple-800 text-purple-300 rounded font-mono text-[10px]">
            {levelBadge}
          </span>
          <span>{title}</span>
        </label>
        <button
          type="button"
          onClick={onAddPattern}
          className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 px-1.5 py-0.5 bg-[#181d26] rounded border border-[#252e3d] transition"
        >
          <Plus size={11} /> パターン追加
        </button>
      </div>

      <textarea
        rows={2}
        value={mainValue}
        onChange={(e) => onMainChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#181d26] border border-[#252e3d] rounded p-2 text-slate-200 text-xs outline-none focus:border-purple-500 leading-relaxed"
      />

      {patterns.length > 0 && (
        <div className="space-y-1.5 pl-2 border-l-2 border-purple-800/60 mt-1.5">
          {patterns.map((pat, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="text-[10px] text-purple-400 shrink-0">差分{idx + 1}:</span>
              <input
                type="text"
                value={pat}
                onChange={(e) => onUpdatePattern(idx, e.target.value)}
                placeholder="別シチュエーション（攻め時、受動時、二人きり時など）の反応差分..."
                className="flex-1 bg-[#181d26] border border-[#252e3d] rounded px-2 py-1 text-slate-200 text-[11px] outline-none focus:border-purple-500"
              />
              <button
                type="button"
                onClick={() => onDeletePattern(idx)}
                className="p-1 text-slate-500 hover:text-rose-400"
                title="パターン削除"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Subcomponent: Nsfw Field with multi-patterns
interface NsfwFieldWithPatternsProps {
  label: string;
  mainValue: string;
  onMainChange: (val: string) => void;
  patterns: string[];
  onAddPattern: () => void;
  onUpdatePattern: (idx: number, val: string) => void;
  onDeletePattern: (idx: number) => void;
  placeholder: string;
}

const NsfwFieldWithPatterns: React.FC<NsfwFieldWithPatternsProps> = ({
  label,
  mainValue,
  onMainChange,
  patterns,
  onAddPattern,
  onUpdatePattern,
  onDeletePattern,
  placeholder
}) => {
  return (
    <div className="bg-[#10141d] border border-pink-900/30 rounded-lg p-2.5 space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-pink-300 font-bold text-[11px] leading-tight">{label}</label>
        <button
          type="button"
          onClick={onAddPattern}
          className="text-[10px] text-pink-400 hover:text-pink-300 flex items-center gap-0.5 px-1.5 py-0.5 bg-[#181d26] rounded border border-pink-900/40 transition shrink-0"
        >
          <Plus size={10} /> 追加
        </button>
      </div>

      <textarea
        rows={2}
        value={mainValue}
        onChange={(e) => onMainChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#141824] border border-[#252e3d] rounded p-2 text-slate-200 text-xs outline-none focus:border-pink-500 leading-relaxed"
      />

      {patterns.length > 0 && (
        <div className="space-y-1.5 pl-2 border-l-2 border-pink-900/60 mt-1">
          {patterns.map((pat, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="text-[10px] text-pink-400 shrink-0">差分{idx + 1}:</span>
              <input
                type="text"
                value={pat}
                onChange={(e) => onUpdatePattern(idx, e.target.value)}
                placeholder="別の手つき・セリフ・態度差分..."
                className="flex-1 bg-[#141824] border border-[#252e3d] rounded px-2 py-1 text-slate-200 text-[11px] outline-none focus:border-pink-500"
              />
              <button
                type="button"
                onClick={() => onDeletePattern(idx)}
                className="p-1 text-slate-500 hover:text-rose-400"
                title="差分削除"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
