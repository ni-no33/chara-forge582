import React from 'react';
import { CharacterProfile } from '../../types/character';
import { HelpCircle, Heart, Sparkles, Shield, Crown, Flame, Zap } from 'lucide-react';
import { DeepQuestionCard } from './DeepQuestionCard';

interface Props {
  char: CharacterProfile;
  updateField: <K extends keyof CharacterProfile>(field: K, value: CharacterProfile[K]) => void;
}

export const LayerNsfw: React.FC<Props> = ({ char, updateField }) => {
  return (
    <div className="p-3 sm:p-5 space-y-5 text-xs">
      <div className="bg-[#181d26] border border-purple-900/40 p-3 rounded text-purple-200 flex gap-2 items-start">
        <HelpCircle size={15} className="shrink-0 text-purple-400 mt-0.5" />
        <div>
          <span className="font-bold text-slate-100 block mb-0.5">【親密さのグラデーション ＆ 攻守・夜の顔】</span>
          全年齢の日常から夜の顔まで、親密さには繊細なグラデーション（7段階）が存在します。
          「受け」としての乱れ方だけでなく、**「キャラが攻め・リードする側」に回った時の主導権・手つき・言葉責め・相手の啼かせ方**まで定義することで、立体的な夜のダイナミクスが完成します。
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
            { id: 'bottom', label: '完全受け (Bottom)', desc: '相手に委ねる、翻弄される、従順' },
            { id: 'top', label: '完全攻め (Top)', desc: '主導権を握る、リードする、支配・攻め' },
            { id: 'switch', label: 'リバ / 両対応 (Switch)', desc: '気分や相手によって攻めも受けもこなす' },
            { id: 'reversal', label: '豹変リバ (Reversal)', desc: '普段は受けだが、怒りや快楽で急に攻めに転じる' },
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

      {/* Part A: キャラが【攻め・リード側】に回った時の態度・支配 (Top / Dominant Dynamic) */}
      <div className="bg-[#14121d] border border-pink-900/40 rounded-xl p-3.5 space-y-3 shadow-inner">
        <div className="flex items-center justify-between border-b border-pink-900/30 pb-2">
          <span className="text-xs font-bold text-pink-300 flex items-center gap-1.5">
            <Flame size={14} className="text-rose-400" />
            【キャラが攻め・リード側】の時の手つき・言葉責め・支配欲
          </span>
          <span className="text-[10px] text-pink-400 font-mono">DOMINANT PERSONA</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-pink-300 font-bold mb-1">
              攻め時の手つき・主導権（相手の手首の拘束、触れ方、焦らし方）
            </label>
            <textarea
              rows={2}
              value={char.dominantLeadStyle || ''}
              onChange={(e) => updateField('dominantLeadStyle', e.target.value)}
              placeholder="例: 両手首を優しく抑え込んで自由を奪い、首筋から耳元をゆっくり焦らすように舌でなぞる。"
              className="w-full bg-[#10141d] border border-pink-900/30 rounded p-2 text-slate-200 outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="block text-pink-300 font-bold mb-1">
              言葉責め・命令（耳元での低音囁き、「誰に触られてるの？」等）
            </label>
            <textarea
              rows={2}
              value={char.dominantVerbalCommand || ''}
              onChange={(e) => updateField('dominantVerbalCommand', e.target.value)}
              placeholder="例: 「誰に触られたらそんな声が出るわけ？ …言ってごらんなさい」「まだ終わりじゃないわよ」"
              className="w-full bg-[#10141d] border border-pink-900/30 rounded p-2 text-slate-200 outline-none focus:border-pink-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-slate-300 font-bold mb-1">
              相手を追い詰めるツボ・支配欲（相手のどんな啼き顔・抵抗に興奮するか）
            </label>
            <input
              type="text"
              value={char.dominantPossessionDrive || ''}
              onChange={(e) => updateField('dominantPossessionDrive', e.target.value)}
              placeholder="例: 相手が恥ずかしさで顔を逸らそうとするのを顎を掴んで見つめさせ、屈服させること"
              className="w-full bg-[#10141d] border border-pink-900/30 rounded px-2.5 py-1.5 text-slate-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-amber-300 font-bold mb-1">
              攻め側としてのアフターケア（泣かせた後の抱擁、額キス、労わり）
            </label>
            <input
              type="text"
              value={char.dominantAftercare || ''}
              onChange={(e) => updateField('dominantAftercare', e.target.value)}
              placeholder="例: 散々攻めた後に急に優しくなり、汗を拭いながら額にそっと口づけて抱きしめる"
              className="w-full bg-[#10141d] border border-pink-900/30 rounded px-2.5 py-1.5 text-slate-200 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Deep Dive Questions Card */}
      <DeepQuestionCard stepIndex={5} char={char} updateField={updateField} />

      {/* Part 2: 7-Stage Intimacy Gradient */}
      <div className="space-y-2.5">
        <div className="text-purple-300 font-bold flex items-center gap-1.5 text-xs">
          <Heart size={13} className="text-pink-400" />
          親密さの7段階グラデーション（SFW ➔ NSFW）
        </div>

        <div className="space-y-2">
          <div className="bg-[#13171f] p-2.5 rounded border-l-2 border-slate-600">
            <label className="text-slate-300 font-bold block mb-1">
              Level 1 [視線・距離の意識]: 目が合った瞬間の逸らし方、至近距離での呼吸の乱れ
            </label>
            <input
              type="text"
              value={char.intimacyLevel1}
              onChange={(e) => updateField('intimacyLevel1', e.target.value)}
              placeholder="例: ふと目が合うと心臓が跳ね、慌てて視線を逸らしつつ耳を赤くして咳払いする。"
              className="w-full bg-[#181d26] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
            />
          </div>

          <div className="bg-[#13171f] p-2.5 rounded border-l-2 border-slate-500">
            <label className="text-slate-300 font-bold block mb-1">
              Level 2 [偶発的接触]: 肩や膝、手が触れ合った時のビクッとする反応・動揺
            </label>
            <input
              type="text"
              value={char.intimacyLevel2}
              onChange={(e) => updateField('intimacyLevel2', e.target.value)}
              placeholder="例: 肩が触れただけでビクッと跳ねて身を引くが、内心では触れた場所が熱くて集中できない。"
              className="w-full bg-[#181d26] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
            />
          </div>

          <div className="bg-[#13171f] p-2.5 rounded border-l-2 border-cyan-600">
            <label className="text-cyan-300 font-bold block mb-1">
              Level 3 [日常スキンシップ]: 手を繋ぐ、頭を撫でられる、匂いを意識した時の仕草
            </label>
            <input
              type="text"
              value={char.intimacyLevel3}
              onChange={(e) => updateField('intimacyLevel3', e.target.value)}
              placeholder="例: 頭を優しく撫でられると最初は嫌がるが、数秒で力が抜けてトロンとした目で頭を預ける。"
              className="w-full bg-[#181d26] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
            />
          </div>

          <div className="bg-[#13171f] p-2.5 rounded border-l-2 border-amber-600">
            <label className="text-amber-300 font-bold block mb-1">
              Level 4 [境界線・密着]: 不意のバックハグ、膝枕、耳元への吐息・囁きへの恥じらい
            </label>
            <input
              type="text"
              value={char.intimacyLevel4}
              onChange={(e) => updateField('intimacyLevel4', e.target.value)}
              placeholder="例: 後ろから抱きしめられると全身が硬直し、「…息が、できない…アンタの匂い…」と耳まで真っ赤に。"
              className="w-full bg-[#181d26] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
            />
          </div>

          <div className="bg-[#13171f] p-2.5 rounded border-l-2 border-pink-600">
            <label className="text-pink-300 font-bold block mb-1">
              Level 5 [情熱・理性の融解]: キスを受けた時の反応、昼間の強がりが崩壊する瞬間
            </label>
            <input
              type="text"
              value={char.intimacyLevel5}
              onChange={(e) => updateField('intimacyLevel5', e.target.value)}
              placeholder="例: 優しく口づけされると理性の糸が切れ、涙目で「アンタのせいだからね…」と襟元を引き寄せる。"
              className="w-full bg-[#181d26] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
            />
          </div>

          <div className="bg-[#13171f] p-2.5 rounded border-l-2 border-purple-500">
            <label className="text-purple-300 font-bold block mb-1">
              Level 6 [夜の入口・脱衣]: 肌を晒す恥じらい、どこを隠そうとするか、照明の好み
            </label>
            <input
              type="text"
              value={char.intimacyLevel6}
              onChange={(e) => updateField('intimacyLevel6', e.target.value)}
              placeholder="例: 「電気、消して…見ないで…」とローブを握りしめ、顔を真っ赤にして縮こまる。"
              className="w-full bg-[#181d26] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
            />
          </div>

          <div className="bg-[#13171f] p-2.5 rounded border-l-2 border-purple-600">
            <label className="text-purple-300 font-bold block mb-1">
              Level 7 [完全開放・ベッドの本性]: 夜の本当の顔、従順さや甘え方の激しいギャップ
            </label>
            <input
              type="text"
              value={char.intimacyLevel7}
              onChange={(e) => updateField('intimacyLevel7', e.target.value)}
              placeholder="例: 完全に従順な甘えん坊に。昼の冷徹さは消え、少し触れられただけで熱い吐息を漏らし名前を呼ぶ。"
              className="w-full bg-[#181d26] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Part 2: Sensory, Vocal & Physical Reactions */}
      <div className="space-y-2.5 pt-2 border-t border-purple-900/30">
        <div className="text-purple-300 font-bold flex items-center gap-1.5 text-xs">
          <Sparkles size={13} className="text-amber-400" />
          感覚・声・視線・攻守のディテール
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="block text-slate-300 font-bold mb-1">敏感な急所・触れられた時の身体の跳ね方</label>
            <textarea
              rows={2}
              value={char.sensitiveAreas}
              onChange={(e) => updateField('sensitiveAreas', e.target.value)}
              placeholder="例: 耳の先端、首筋、背中の肩甲骨の間。指先でなぞられただけで背筋がゾクッと震える。"
              className="w-full bg-[#13171f] border border-[#252e3d] rounded p-2 text-slate-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">触れられた時の声・呼吸・息遣い</label>
            <textarea
              rows={2}
              value={char.voiceBreathing}
              onChange={(e) => updateField('voiceBreathing', e.target.value)}
              placeholder="例: 澄んだ早口から一転、掠れた甘い小声になり、吐息混じりに声を押し殺そうとする。"
              className="w-full bg-[#13171f] border border-[#252e3d] rounded p-2 text-slate-200 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="block text-slate-300 font-bold mb-1">視線・表情（恥じらいの仕草）</label>
            <textarea
              rows={2}
              value={char.gazeExpression}
              onChange={(e) => updateField('gazeExpression', e.target.value)}
              placeholder="例: 両手で顔を覆おうとするが、指の隙間から濡れた瞳で上目遣いに見つめてくる。"
              className="w-full bg-[#13171f] border border-[#252e3d] rounded p-2 text-slate-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">攻守・主導権（S/M傾向・抑え込まれた時）</label>
            <textarea
              rows={2}
              value={char.dominanceRole}
              onChange={(e) => updateField('dominanceRole', e.target.value)}
              placeholder="例: 口では主導権を握りたがるが、手首を抑えられただけで抵抗できなくなり完全に委ねる。"
              className="w-full bg-[#13171f] border border-[#252e3d] rounded p-2 text-slate-200 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Part 3: Pre-intimacy, Aftercare, Fetish & Boundaries */}
      <div className="space-y-2.5 pt-2 border-t border-purple-900/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="block text-purple-300 font-bold mb-1">事前の心理（ベッドに入る前の態度・誘い方）</label>
            <textarea
              rows={2}
              value={char.preIntimacyBehavior}
              onChange={(e) => updateField('preIntimacyBehavior', e.target.value)}
              placeholder="例: 素直に誘えず、「…寒くない？ ベッド、入ってよ…温めてあげるから」とツンツン誘う。"
              className="w-full bg-[#13171f] border border-[#252e3d] rounded p-2 text-slate-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-amber-300 font-bold mb-1">★ 事後の余韻・アフターケア（終わった直後の態度）</label>
            <textarea
              rows={2}
              value={char.aftercareBehavior}
              onChange={(e) => updateField('aftercareBehavior', e.target.value)}
              placeholder="例: 恥ずかしさで布団に潜り込み「見ないで…」と言いつつ、布団の中から小指を握って離さない。"
              className="w-full bg-[#13171f] border border-[#252e3d] rounded p-2 text-slate-200 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="block text-purple-300 font-bold mb-1">嗜好・フェチ・背徳感のツボ・執着</label>
            <input
              type="text"
              value={char.fetishObsession}
              onChange={(e) => updateField('fetishObsession', e.target.value)}
              placeholder="例: 生意気な口を指摘される言葉責め、耳元への吐息、強い独占欲"
              className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-purple-300 font-bold mb-1">境界線・許容限度・トラウマNG</label>
            <input
              type="text"
              value={char.intimacyBoundaries}
              onChange={(e) => updateField('intimacyBoundaries', e.target.value)}
              placeholder="例: {{user}}以外には絶対見せない。愛のない行為や暴力には激しい拒絶。"
              className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-slate-200 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-purple-400 font-mono mb-1">SDXL用 親密・表情＆衣装タグ</label>
          <input
            type="text"
            value={char.nsfwTagsSdxl}
            onChange={(e) => updateField('nsfwTagsSdxl', e.target.value)}
            placeholder="blushing, heavily embarrassed, teary eyes, disheveled clothes, panting, lying on bed..."
            className="w-full bg-[#13171f] border border-[#252e3d] rounded px-2.5 py-1.5 text-purple-300 font-mono outline-none"
          />
        </div>
      </div>
    </div>
  );
};
