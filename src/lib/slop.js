export const REAL_STACK = ['React', 'Vue', 'Zustand', 'Three.js', 'Motion']
const FRAMEWORKS = ['Angular-but-louder', 'Svelte-in-a-div', 'NextNext.js', 'jQuery-quantum', 'Redux-for-your-Redux', 'Tailwind-with-feelings', 'Expressive.js', 'Webpack-as-a-service', 'Bun-in-a-Bun', 'EmotionalORM', 'Docker-in-the-browser', 'useWhatever()', 'AI-for-the-AI', 'Legacy-compat-compat']

export function nextFramework(index) {
  return `${FRAMEWORKS[index % FRAMEWORKS.length]}@${Math.floor(index / FRAMEWORKS.length) + 1}.0.0`
}

export function detectApp(prompt) {
  if (/電卓|計算|calculator|calc|税/i.test(prompt)) return 'calculator'
  if (/カウンタ|counter|count|数え/i.test(prompt)) return 'counter'
  return 'todo'
}

export function compilePrompt(prompt) {
  const request = prompt.trim().slice(0, 160)
  const mode = detectApp(request)
  return {
    request,
    mode,
    logs: [
      '仕様を読み込みました。気分で補完します。',
      'Gemini: グラデーションを追加。ロジックは次の人へ。',
      'Grok: 前の実装を削除。「シンプルになりました」',
      'Qwen: ダッシュボードを追加。誰も頼んでいない。',
      'Codex: 風刺を理解。念のため料金表を追加。',
      'ユーザー: 売るな。',
      '料金表を削除。代わりにVueをReactの中へ搬入。',
      '依存関係を検査: React → Vue → Zustand → Three.js → Motion',
      `ローカル生成器: ${mode === 'todo' ? 'タスク帳' : mode === 'calculator' ? '電卓' : 'カウンター'}を実装。これは本当に触れます。`,
      'BUILD COMPLETE. 理解した人: 0 / 動くボタン: いくつか',
    ],
  }
}

export const HEADLINES = [
  'AIが「最小限の変更」でCSSを宗教に書き換え',
  '人間、diffを開く　市場に動揺広がる',
  'エージェント8体が会議　仕事は9体目に引き継ぎ',
  'テスト全通過　ユーザーの期待値を修正したため',
  'READMEに新機能追加　実装はREADMEを参照',
  '金曜のデプロイ成功　月曜の担当者は未定',
  '「簡単なTODOアプリ」に認証・課金・Kubernetes',
  'AI「おっしゃる通りです」　反対意見にも同じ回答',
  '依存関係が依存先を探すための依存関係を追加',
  'コードレビュー担当の犬、散歩を優先',
  'バグを既知の制限へ移行　件数がゼロに',
  '4モデルがホームページ改善　5モデル目を募集中',
]

export function oracleAnswer(question, index) {
  if (!question.trim()) return '質問がありません。すでに仕様書と同じ完成度です。'
  const answers = [
    'おっしゃる通りです。逆の質問をしても、同じ強さで賛成します。',
    '問題ありません。問題があれば、次の会話の私に聞いてください。',
    'ベストプラクティスです。ソースは私がいま書いたREADMEです。',
    'まずフレームワークを2つ追加しましょう。質問との関係はあとで考えます。',
    '本番環境で検証してください。検証環境だと本番の気分が出ません。',
  ]
  return answers[index % answers.length]
}

export function guestEntry(name, message, id, time) {
  const text = message.trim().slice(0, 240)
  if (!text) return null
  return { id, name: name.trim().slice(0, 28) || '名無しのスロップ職人', message: text, time }
}

export const TRACKS = [
  { title: '01. npm install my feelings', bpm: 112, notes: [64, 67, 71, 76, 71, 67, 62, 67] },
  { title: '02. 金曜 23:59 の main', bpm: 138, notes: [57, 60, 64, 69, 67, 64, 60, 55] },
  { title: '03. lgtm (犬 remix)', bpm: 92, notes: [60, 64, 67, 72, 69, 67, 64, 62] },
]
