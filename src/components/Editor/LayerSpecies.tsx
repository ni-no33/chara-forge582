import React, { useState } from 'react';
import { CharacterProfile } from '../../types/character';
import {
  PawPrint,
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Shirt,
  Heart,
  Flame,
  HelpCircle,
  Smile,
  ShieldAlert,
  Moon,
  Zap,
  Ear
} from 'lucide-react';

interface LayerSpeciesProps {
  char: CharacterProfile;
  onChange: (field: keyof CharacterProfile, val: any) => void;
  nsfwMask: boolean;
}

export const LayerSpecies: React.FC<LayerSpeciesProps> = ({
  char,
  onChange,
  nsfwMask
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // 種族・現代生活の深掘り質問デッキ
  const demiQuestions = [
    {
      q: '市販の服やイヤホン、靴はどうしてる？ どんな改造や工夫をしている？',
      hint: '人間の耳の位置にないため市販のイヤホンが使えなかったり、尻尾穴を開けたり、靴の爪で穴が空くリアル。',
      answers: [
        {
          label: '骨伝導＆自作スリット',
          text: '市販のイヤホンは届かないため「首掛け式骨伝導イヤホン」を愛用。服はすべて自分で後ろに切れ目を入れて「尻尾用スリット」をミシンで縫っている。'
        },
        {
          label: '角穴あき特注フード',
          text: '角が引っかかるため、フード付きパーカーの左右に専用のハトメ穴を開けている。帽子はサンバイザーか特注のベレー帽しか被れない。'
        },
        {
          label: '爪先補強スニーカー',
          text: '足の爪が鋭いため、普通のスニーカーだと2週間で親指部分が破れる。つま先がスチールトゥ仕様の安全靴か、革靴を加工して履いている。'
        }
      ],
      targetField: 'modernApparelTrouble' as keyof CharacterProfile
    },
    {
      q: '満員電車やスマホ、自動ドアなど、現代の設備で困る瞬間は？',
      hint: '人間規格の街で生きる亜人ならではの、地味でリアルなストレスやハプニング。',
      answers: [
        {
          label: '満員電車の尻尾挟まれ恐怖',
          text: '朝の通勤ラッシュで尻尾をドアや他人の革靴に踏まれるのが最大のトラウマ。乗車時は必ず尻尾を抱えて前に抱きかかえている。'
        },
        {
          label: '肉球・爪でスマホ誤反応',
          text: '指先が肉球で乾いているためスマホの静電容量タッチパネルがたまに反応しない。爪がカチカチ当たって画面保護ガラスに傷がつきやすい。'
        },
        {
          label: '自動ドアのセンサー無視',
          text: '体温が低め（または小柄で猫背）なため、コンビニの赤外線自動ドアに認識されず、目の前でバンと閉まってぶつかる。'
        }
      ],
      targetField: 'modernDailyFriction' as keyof CharacterProfile
    },
    {
      q: '本音を隠して強がっている時、耳や尻尾はどう動いてしまう？',
      hint: 'ポーカーフェイスを作っていても、本能器官が感情を全部ネタバレしてしまう愛嬌。',
      answers: [
        {
          label: 'イカ耳＆尻尾バタバタ',
          text: '顔はそっぽを向いて「別に嬉しくない」と睨みつけるが、耳は照れでペタリと横に倒れ（イカ耳）、尻尾が嬉しさを隠せず床をバンバンと強く叩いてしまう。'
        },
        {
          label: '耳ピク＆尻尾巻きつき',
          text: '{{user}}の足音が聞こえた瞬間、耳の先端がピクピクと前後に高速振動。不意に隣に座られると、無意識に尻尾が{{user}}の手首や太ももにスルスルと巻きつく。'
        },
        {
          label: '瞳孔拡大＆無意識ゴロゴロ',
          text: '暗がりや甘えたい瞬間は瞳孔がまん丸に拡大。頭を撫でられると、口では文句を言いながら喉の奥から「ゴロゴロ…グルル…」と重低音の歓喜音が漏れる。'
        }
      ],
      targetField: 'involuntaryEars' as keyof CharacterProfile
    },
    {
      q: '{{user}}にだけ許す「身体のお手入れ」と、その時のとろけ方は？',
      hint: '野生・亜人にとって急所である末端のケアは、絶対の信頼の証。最大のデレ要素。',
      answers: [
        {
          label: '尻尾ブラッシングで脱力',
          text: '専用のスリッカーブラシで尻尾の根元から毛並みを梳かされると、最初は「痛くしないで」と強がるが、1分で全身の力が抜け、{{user}}の膝の上に頭を預けてトロンと目を細める。'
        },
        {
          label: '肉球クリームマッサージ',
          text: '乾燥してひび割れやすい肉球に保湿クリームを塗り込まれると、くすぐったさと気持ちよさで足の指先をパッと開いたり閉じたりして悶絶する。'
        },
        {
          label: '耳掃除で完全に骨抜き',
          text: '繊細な耳の内側の汚れを綿棒で優しく拭き取られると、声にならない吐息を漏らし、完全に身を委ねて{{user}}の服の裾をぎゅっと握りしめる。'
        }
      ],
      targetField: 'groomingCare' as keyof CharacterProfile
    },
    {
      q: '現代社会での「発情期（ヒート）」や「抑制剤サプレッサー」はどうしている？',
      hint: '年に数回の本能の昂りと、薬が効かなくなるシチュエーション。',
      answers: [
        {
          label: '匂い過剰でサプレッサー無効化',
          text: '毎朝市販の亜人抑制サプリを飲んでいるが、{{user}}の匂いを至近距離で嗅いだり密着されると理性が吹き飛び、体温が急上昇して首筋にすがりつく。'
        },
        {
          label: '強烈な甘噛み・マーキング欲求',
          text: '発情期が近づくと独占欲が暴走し、{{user}}の首筋やうなじに自分の頬や顎を強く擦り付けて匂いを塗りたくり、消えない甘噛み痕をつけたがる。'
        },
        {
          label: '耳付け根・尻尾付け根の過敏化',
          text: 'ヒート中は種族急所の感度が異常に跳ね上がり、耳の付け根や尻尾の付け根を指で触れられただけで腰が砕けて嬌声を漏らしてしまう。'
        }
      ],
      targetField: 'heatCycleSuppressor' as keyof CharacterProfile
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-[#181d26] border border-[#252e3d] rounded-xl p-4 sm:p-5 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-32 h-32 bg-[#229288]/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-2.5 text-[#229288] mb-1">
          <PawPrint size={20} />
          <span className="text-xs font-mono font-bold tracking-wider uppercase">
            Layer: Subspecies & Modern Biology
          </span>
        </div>
        <h2 className="text-base sm:text-lg font-bold text-slate-100 mb-1.5">
          種族・生態・現代生活（亜人カルテ）
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          戦闘や魔法のない現代社会だからこそ映える、<strong>「ケモ度」「不随意な耳・尾の反応」「現代の服やイヤホンの悩み」「{"{{user}}"}にだけ許すお手入れ」</strong> を深掘りします。
        </p>
      </div>

      {/* 1. ケモ度・亜人タイプセレクター */}
      <div className="bg-[#181d26] border border-[#252e3d] rounded-xl p-4 sm:p-5 space-y-3">
        <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Zap size={14} className="text-amber-400" />
            ケモ度・亜人タイプ（大半の種族に対応）
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {char.demiType === 'soft' && '【ソフト亜人】耳・尾・角のみ'}
            {char.demiType === 'semi' && '【セミケモ】四肢肉球・羽・異種族'}
            {char.demiType === 'anthro' && '【ガッツリ獣人】マズル・全身被毛'}
            {char.demiType === 'inhuman' && '【人外・妖異系】水棲・妖魔等'}
          </span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'soft', label: 'ソフト亜人', desc: 'ケモ耳・尻尾・角など' },
            { id: 'semi', label: 'セミケモ亜人', desc: '手足肉球・羽・一部人外' },
            { id: 'anthro', label: 'ガッツリ獣人', desc: 'マズル・全身毛並み・獣脚' },
            { id: 'inhuman', label: '人外・妖異系', desc: '人魚・吸血鬼・鬼・妖魔' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange('demiType', item.id)}
              className={`p-2.5 rounded-lg border text-left transition flex flex-col justify-between ${
                (char.demiType || 'soft') === item.id
                  ? 'bg-[#229288]/15 border-[#229288] text-white shadow-sm'
                  : 'bg-[#11141a] border-[#252e3d] text-slate-400 hover:text-slate-200 hover:border-slate-600'
              }`}
            >
              <div className="font-bold text-xs mb-0.5">{item.label}</div>
              <div className="text-[10px] opacity-75">{item.desc}</div>
            </button>
          ))}
        </div>

        {/* 種族名 ＆ ケモ度メモ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="text-[11px] font-bold text-slate-300 mb-1 block">
              種族名・血統（モチーフ）
            </label>
            <input
              type="text"
              value={char.demiSpeciesName || ''}
              onChange={(e) => onChange('demiSpeciesName', e.target.value)}
              placeholder="例: ユキヒョウ種、白銀狼、スコティッシュフォールド亜人、吸血蝙蝠種"
              className="w-full bg-[#11141a] border border-[#252e3d] focus:border-[#229288] text-slate-200 text-xs rounded-lg px-3 py-2 outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-300 mb-1 block">
              外見・身体の獣化バランス解説
            </label>
            <input
              type="text"
              value={char.demiFurryDegree || ''}
              onChange={(e) => onChange('demiFurryDegree', e.target.value)}
              placeholder="例: 顔と体は人間ベースだが、頭頂部に猫耳、太い尻尾、手足の裏にぷにぷにの肉球"
              className="w-full bg-[#11141a] border border-[#252e3d] focus:border-[#229288] text-slate-200 text-xs rounded-lg px-3 py-2 outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. 身体器官・質感・体温 */}
      <div className="bg-[#181d26] border border-[#252e3d] rounded-xl p-4 sm:p-5 space-y-4">
        <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 border-b border-[#252e3d] pb-2">
          <PawPrint size={14} className="text-[#229288]" />
          身体の器官・毛並み・平熱・睡眠
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-300 block mb-1">
              耳・尻尾・角・翼の形状と動態
            </label>
            <textarea
              rows={2}
              value={char.demiEarsTailHorns || ''}
              onChange={(e) => onChange('demiEarsTailHorns', e.target.value)}
              placeholder="耳の位置・内側の毛、尻尾の長さ・太さ・毛量、角の生え方、興奮した時の動きなど"
              className="w-full bg-[#11141a] border border-[#252e3d] focus:border-[#229288] text-slate-200 text-xs rounded-lg p-2.5 outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-300 block mb-1">
                肉球・爪・皮膚・毛並みの質感
              </label>
              <textarea
                rows={2}
                value={char.demiPawsClawsSkin || ''}
                onChange={(e) => onChange('demiPawsClawsSkin', e.target.value)}
                placeholder="肉球の色（ピンク/黒）・弾力、爪の鋭さ、毛並みの手触り（さらさら/ふわもこ/密度の変化）"
                className="w-full bg-[#11141a] border border-[#252e3d] focus:border-[#229288] text-slate-200 text-xs rounded-lg p-2.5 outline-none resize-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-300 block mb-1">
                平熱・体香（匂い）・睡眠リズム
              </label>
              <textarea
                rows={2}
                value={char.demiBodyTempScent || ''}
                onChange={(e) => onChange('demiBodyTempScent', e.target.value)}
                placeholder="平熱（38℃台の湯たんぽ体温など）、特有の獣香・甘い匂い、夜行性/昼行性、冬眠欲"
                className="w-full bg-[#11141a] border border-[#252e3d] focus:border-[#229288] text-slate-200 text-xs rounded-lg p-2.5 outline-none resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. 感情の不随意露出（ポーカーフェイス vs 身体の裏切り） */}
      <div className="bg-[#181d26] border border-[#252e3d] rounded-xl p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#252e3d] pb-2">
          <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Ear size={14} className="text-cyan-400" />
            感情の不随意露出（本能器官によるネタバレ）
          </h3>
          <span className="text-[10px] text-cyan-300">★ クールな顔と身体のギャップ</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="font-bold text-slate-300 block mb-1">
              耳の動き（イカ耳・照れピク）
            </label>
            <textarea
              rows={3}
              value={char.involuntaryEars || ''}
              onChange={(e) => onChange('involuntaryEars', e.target.value)}
              placeholder="警戒時のペタンと伏せるイカ耳、褒められてピクピク揺れる、音のする方向に向くなど"
              className="w-full bg-[#11141a] border border-[#252e3d] focus:border-[#229288] text-slate-200 text-xs rounded-lg p-2.5 outline-none resize-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1">
              尻尾の動き（バタバタ・巻きつき）
            </label>
            <textarea
              rows={3}
              value={char.involuntaryTail || ''}
              onChange={(e) => onChange('involuntaryTail', e.target.value)}
              placeholder="嬉しい時の床バタバタ、嘘をつく時の先端ゆらゆら、{{user}}の脚に絡みつく無意識の甘え"
              className="w-full bg-[#11141a] border border-[#252e3d] focus:border-[#229288] text-slate-200 text-xs rounded-lg p-2.5 outline-none resize-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1">
              喉・声・表情（ゴロゴロ・牙）
            </label>
            <textarea
              rows={3}
              value={char.involuntaryVocal || ''}
              onChange={(e) => onChange('involuntaryVocal', e.target.value)}
              placeholder="撫でられて無意識に漏れる喉ゴロゴロ鳴き(Purring)、警戒の低音唸り、感情が高ぶると覗く八重歯/牙"
              className="w-full bg-[#11141a] border border-[#252e3d] focus:border-[#229288] text-slate-200 text-xs rounded-lg p-2.5 outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* 4. 現代生活との摩擦・悩み */}
      <div className="bg-[#181d26] border border-[#252e3d] rounded-xl p-4 sm:p-5 space-y-4">
        <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 border-b border-[#252e3d] pb-2">
          <Shirt size={14} className="text-amber-400" />
          現代生活・インフラとの摩擦（服・電車・食事）
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="font-bold text-slate-300 block mb-1">
              服・靴・イヤホン・下着の悩み
            </label>
            <textarea
              rows={3}
              value={char.modernApparelTrouble || ''}
              onChange={(e) => onChange('modernApparelTrouble', e.target.value)}
              placeholder="市販ズボンの尻尾穴あけ、角でパーカー被れない、市販イヤホンが届かない（骨伝導使用）など"
              className="w-full bg-[#11141a] border border-[#252e3d] focus:border-[#229288] text-slate-200 text-xs rounded-lg p-2.5 outline-none resize-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1">
              街・設備の不都合（満員電車・スマホ）
            </label>
            <textarea
              rows={3}
              value={char.modernDailyFriction || ''}
              onChange={(e) => onChange('modernDailyFriction', e.target.value)}
              placeholder="満員電車で尻尾を踏まれる恐怖、スマホが爪や肉球で反応しにくい、自動ドアに無視されるなど"
              className="w-full bg-[#11141a] border border-[#252e3d] focus:border-[#229288] text-slate-200 text-xs rounded-lg p-2.5 outline-none resize-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1">
              現代の食事事情・アレルギー
            </label>
            <textarea
              rows={3}
              value={char.demiDietRestrictions || ''}
              onChange={(e) => onChange('demiDietRestrictions', e.target.value)}
              placeholder="人間食NG（ネギ/チョコ等の中毒物）、無性に生肉を欲する偏食、高額な専用サプリ代など"
              className="w-full bg-[#11141a] border border-[#252e3d] focus:border-[#229288] text-slate-200 text-xs rounded-lg p-2.5 outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* 5. {{user}}にだけ許す「身体のお手入れ・甘え方」 */}
      <div className="bg-[#181d26] border border-[#252e3d] rounded-xl p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#252e3d] pb-2">
          <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Heart size={14} className="text-rose-400" />
            {"{{user}}"}にだけ許す身体のお手入れ（最強のデレ）
          </h3>
          <span className="text-[10px] text-rose-300">他人は威嚇・{"{{user}}"}には完全脱力</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="font-bold text-slate-300 block mb-1">
              お手入れ部位（ブラッシング・耳掃除・肉球）
            </label>
            <textarea
              rows={2}
              value={char.groomingCare || ''}
              onChange={(e) => onChange('groomingCare', e.target.value)}
              placeholder="尻尾のブラッシング、繊細な耳掃除、肉球クリーム塗り、角のオイル磨きなど"
              className="w-full bg-[#11141a] border border-[#252e3d] focus:border-[#229288] text-slate-200 text-xs rounded-lg p-2.5 outline-none resize-none"
            />
          </div>
          <div>
            <label className="font-bold text-slate-300 block mb-1">
              ケアされている時の態度・脱力
            </label>
            <textarea
              rows={2}
              value={char.groomingReactions || ''}
              onChange={(e) => onChange('groomingReactions', e.target.value)}
              placeholder="最初は強がるが1分で骨抜き、膝枕で丸くなって喉を鳴らす、服をぎゅっと掴むなど"
              className="w-full bg-[#11141a] border border-[#252e3d] focus:border-[#229288] text-slate-200 text-xs rounded-lg p-2.5 outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* 6. 現代亜人NSFW・本能（発情・抑制剤・マーキング） */}
      <div className="bg-[#181d26] border border-purple-900/40 rounded-xl p-4 sm:p-5 space-y-4 relative">
        <div className="flex items-center justify-between border-b border-[#252e3d] pb-2">
          <h3 className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
            <Flame size={14} className="text-purple-400" />
            🔞 現代亜人の本能・親密性（発情期・サプレッサー・マーキング）
          </h3>
          {nsfwMask && (
            <span className="text-[10px] text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800">
              シールドぼかし中
            </span>
          )}
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs ${nsfwMask ? 'blur-sm select-none opacity-40' : ''}`}>
          <div>
            <label className="font-bold text-slate-300 block mb-1">
              発情期（ヒート）周期と現代抑制剤
            </label>
            <textarea
              rows={3}
              value={char.heatCycleSuppressor || ''}
              onChange={(e) => onChange('heatCycleSuppressor', e.target.value)}
              placeholder="年1〜2回の周期、毎朝飲む抑制サプリ、{{user}}の匂いで薬効が吹き飛ぶハプニングなど"
              className="w-full bg-[#11141a] border border-[#252e3d] focus:border-purple-500 text-slate-200 text-xs rounded-lg p-2.5 outline-none resize-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1">
              匂い付けマーキング・甘噛み
            </label>
            <textarea
              rows={3}
              value={char.markingInstinct || ''}
              onChange={(e) => onChange('markingInstinct', e.target.value)}
              placeholder="{{user}}の首筋や服に頬を擦り付けて匂いを塗りたくる独占欲、甘噛み、首筋のマーキング痕"
              className="w-full bg-[#11141a] border border-purple-500 text-slate-200 text-xs rounded-lg p-2.5 outline-none resize-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1">
              種族特有の急所・性感帯
            </label>
            <textarea
              rows={3}
              value={char.demiWeakSensitivities || ''}
              onChange={(e) => onChange('demiWeakSensitivities', e.target.value)}
              placeholder="耳の付け根（腰が砕ける）、尻尾の付け根（急に触られると悲鳴）、うなじ（掴まれると大人しくなる）"
              className="w-full bg-[#11141a] border border-purple-500 text-slate-200 text-xs rounded-lg p-2.5 outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* 7. 深掘り質問デッキ（亜人・現代生活編） */}
      <div className="bg-[#181d26] border border-[#252e3d] rounded-xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <Sparkles size={14} />
            深掘り質問デッキ（亜人・現代生活編）
          </h3>
          <span className="text-[10px] text-slate-400">ワンタップで入力欄に適用</span>
        </div>

        <div className="space-y-2">
          {demiQuestions.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-[#252e3d] rounded-lg bg-[#11141a] overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-3 text-left flex items-center justify-between gap-2 hover:bg-[#181d26] transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                      Q
                    </span>
                    <span className="text-xs font-bold text-slate-200">{item.q}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp size={14} className="text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown size={14} className="text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-3 border-t border-[#252e3d] bg-[#141820] space-y-2.5 text-xs animate-in fade-in">
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <HelpCircle size={12} className="text-[#229288]" />
                      <span>{item.hint}</span>
                    </p>

                    <div className="space-y-1.5">
                      <div className="text-[10px] text-amber-400/90 font-bold uppercase tracking-wider">
                        ▼ 具体的なアイデア例（ワンタップ適用）
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {item.answers.map((ans, aIdx) => (
                          <div
                            key={aIdx}
                            className="p-2 bg-[#181d26] border border-[#252e3d] rounded flex flex-col justify-between gap-1.5 hover:border-[#229288]/50 transition"
                          >
                            <div>
                              <span className="text-[11px] font-bold text-slate-200 block mb-0.5">
                                {ans.label}
                              </span>
                              <p className="text-[10px] text-slate-400 leading-tight">
                                {ans.text}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                onChange(item.targetField, ans.text);
                              }}
                              className="mt-1 py-1 px-2 bg-[#229288]/20 hover:bg-[#229288] text-[#229288] hover:text-white rounded text-[10px] font-bold transition text-center"
                            >
                              この回答を適用 ✏️
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};