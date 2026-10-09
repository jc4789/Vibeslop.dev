// 作品の事実は docs/portfolio-content.md の参照元に基づく。自己紹介の声量だけを変える。
export const SELF_PR = [
  { label: 'いつもの謙遜', output: 20, heading: 'ちょっと、作っています。', description: 'OSをひとつ。語学アプリをひとつ。大げさな自己紹介は後回し。' },
  { label: '少し漏れる', output: 55, heading: '小さいと言い張っています。', description: '窓を開くためにカーネルを。単語を調べるためにプレイヤーを。' },
  { label: '事実を述べる', output: 100, heading: 'OSと、学習アプリを作っています。', description: '低レイヤーから、読む・聴く・調べる体験まで。個人で制作中です。' },
]

export const PROJECTS = [
  {
    id: 'nocturne', number: '01', name: 'Nocturne OS', kind: '自作OS', badge: '夜更かしの副産物',
    claims: ['ちょっと窓を開くだけ。', '窓の下も、だいたい作っています。', 'カーネルから作る、夜のためのOS。'],
    description: 'Cで作る、x86-64の趣味OS。自作カーネルの上にデスクトップ、ネットワーク、ブラウザーを積みました。静かな夜空を眺めるには、ずいぶん遠回りです。',
    status: '趣味OS · 仮想マシン向け · 開発中',
    tags: ['C', 'x86-64', 'QEMU / Hyper-V', 'Lexbor + QuickJS', 'TinyCC'],
    features: [
      ['窓だけ、ではない', '合成ウィンドウ管理、タスクバー、通知、クリップボード。月と夜空の壁紙は手続き生成。'],
      ['ブラウザーも内側から', 'HTML/CSSのレイアウトと描画はNocturne側。HTML解析にLexbor、JavaScriptにQuickJSを組み合わせる。'],
      ['OSの中で、次を作る', 'TinyCCでCをコンパイル・実行。内蔵エージェントはコードを書く、起動する、画面を見るところまでつなぐ。'],
      ['消える場所と、残る場所', 'ルートはRAM。残したいファイルはFAT32の /data へ。再起動にまで空気を読ませない。'],
    ],
    note: 'QEMU / Hyper-V向けの実験的なOSです。日常利用OSや、全Webサイト互換を名乗ってはいません。',
    credit: 'Limine、BearSSL、Lexbor、QuickJS、TinyCCなどの力も借りています。「全部ゼロから」の一行で消さない。',
  },
  {
    id: 'yuyan', number: '02', name: '语言', kind: '没入型学習アプリ', badge: '読書のついで（当社比）',
    claims: ['ちょっと単語を調べるだけ。', '読みたいだけなのに、道具が増えました。', '読む・聴く・調べる・残すをつなぐ。'],
    description: '中国語から始める、Android先行の学習アプリ。本や記事、動画から出会った言葉を、その場で調べて手元に残す。「勉強するために別のアプリへ移動」を減らしたい。',
    status: 'Android先行 · ローカル中心 · 開発中',
    tags: ['Kotlin Multiplatform', 'Compose', 'Rust / UniFFI', '独自プレイヤー', 'sherpa-onnx'],
    features: [
      ['原文のまま、読む', 'EPUBと公開Web記事を共通の読書経路へ。語タップや範囲選択から、ページ内の辞書を開く。'],
      ['好きな動画から、聴く', 'YouTube、Bilibili、Jellyfinのカタログを独自プレイヤーへ。字幕・弾幕と学習をつなぐ。'],
      ['辞書は同梱なし。自分で取り込む', '利用者が自分で用意したYomitan形式の辞書データを取り込み、自前のRustエンジンで保存・検索。語を見ただけで「覚えた」にしない。'],
      ['残す、読み上げる', '語状態を手動で変え、カードを作り、.apkgへ書き出す。標準TTSや端末内sherpa-onnxで読み上げる。'],
    ],
    note: '開発中。Android先行で、Windows製品版や全形式対応はまだ看板にしません。ローカル中心ですが、動画・記事取得などには通信を使います。',
    credit: '辞書データと音声モデルは利用者が選んで導入。AIも自分の接続先で手動実行。勝手に賢くなったことにしない。',
  },
]

export const NOCTURNE_SHOTS = [
  { label: '本番の看板', src: '/projects/nocturne-portfolio.png', width: 1918, height: 1197, source: '作者提供の実画面', alt: 'Nocturneのデスクトップで、右の独自ブラウザーに公開中のvibeslop.devのポートフォリオを表示。左ではnestが次のアプリを制作している。', caption: '「ちょっと窓を開くだけ」の窓に、このサイトを表示。隣ではnestが次のアプリを制作中。看板まで自分のOSで見ています。' },
  { label: '制作中の机', src: '/projects/nocturne-workbench.png', width: 1917, height: 1200, source: '作者提供の実画面', alt: 'Nocturne上で左にnestの制作ログと、22:28・runningと進捗リングを表示するfocusd。右の独自ブラウザーにはNocturne自身の作品紹介ページを表示している。', caption: '左に22:28と進捗リング、右にOS自身の紹介。「ちょっと窓を開くだけ」と言い張っていますが、机の上が黙ってくれません。' },
  { label: '実際の使用画面', src: '/projects/nocturne-live.png', width: 1916, height: 1200, source: '作者提供の実画面', alt: 'Nocturne内のnestにOSがAIスロップか質問し、隣の独自ブラウザーで同じ問いをDuckDuckGo検索している実画面。', caption: '自作OSの中で「これはスロップ？」とAIに聞く。隣の自作ブラウザーでも検索。審査員もOSの中にいます。' },
  { label: 'デスクトップ', src: '/projects/nocturne-desktop.png', width: 1280, height: 800, source: '実際の画面 / READMEより', alt: 'Nocturneの月と夜空のデスクトップ。スタートメニューと端末が開いている。', caption: '実際のNocturne。月、窓、タスクバー。その下のOSも制作物です。' },
  { label: 'ブラウザー', src: '/projects/nocturne-browser.png', width: 1280, height: 800, source: '実際の画面 / READMEより', alt: 'Nocturneの独自ブラウザーでWikipediaの月の記事を表示した画面。', caption: '自作ブラウザーで月の記事を表示。これは一つの画面で、全サイト対応の宣言ではありません。' },
  { label: 'OS内で制作', src: '/projects/nocturne-agent.png', width: 1280, height: 800, source: '実際の画面 / READMEより', alt: 'Nocturne内のエージェントが生成したBounceのウィンドウと端末。', caption: 'OS内のエージェントが作ったBounce。道具の中で、また道具を作る。' },
]

export const YUYAN_SHOTS = [
  { label: '読書と辞書', src: '/projects/yuyan-article-lookup.jpg', width: 570, height: 1280, source: '作者提供の実画面', alt: '语言で中国語の記事を読み、「半空」の辞書を本文の上に開いた実画面。発音と複数の辞書の語義が表示されている。', caption: '「半空」で立ち止まって、その場で辞書を開く。「ちょっと調べるだけ」のために、読書画面ごと作りました。' },
  { label: '本を読む', src: '/projects/yuyan-reader.jpg', width: 570, height: 1280, source: '作者提供の実画面', alt: '语言の読書画面で中国語の本の総序を表示。本文の語に色付きの下線があり、目次・表示・ページ移動の操作が見える。', caption: '本の原文と、ことばの目印。学習アプリですが、まず本が読めます。そこは謙遜しなくていい気がします。' },
  { label: '記事を取り込む', src: '/projects/yuyan-import.jpg', width: 570, height: 1280, source: '作者提供の実画面', alt: '语言のWeb記事の保存前確認画面。取得した中国語の本文と編集できるタイトル、「保存して読む」ボタンを表示している。', caption: '取り込む前に、本文を確認・修正。取れた部分を見せます。全文を取れたことにする方が、たしかに楽でした。' },
  { label: '動画と辞書', src: '/projects/yuyan-video.jpg', width: 1280, height: 570, source: '作者提供の実画面', alt: '语言の横向き動画画面で、中国語字幕の上に「反正」の辞書ポップアップを開き、発音と日本語の語義を表示している。', caption: '動画の上でも、辞書は同じ居場所に。なお、動画を見るだけで中国語が突然わかる機能は実装していません。' },
  { label: '本の中で調べる', src: '/projects/yuyan-book-lookup.jpg', width: 570, height: 1280, source: '作者提供の実画面', alt: '语言で本を読んでいる途中に「新鲜」の辞書を開いた実画面。発音・語義・例文と、背後の本文が見える。', caption: '「新鲜」を原文の上で調べる。背後に本、手前に意味。「未知」は未知のまま。開いただけでは覚えた扱いにしません。' },
  { label: '動画を探す', src: '/projects/yuyan-discover.jpg', width: 570, height: 1280, source: '作者提供の実画面', alt: '语言の「探す」画面。Bilibili、YouTube、Jellyfinの切替と動画検索、Bilibiliのおすすめ動画が表示されている。', caption: '本を読むつもりが、動画も探せるようになりました。Bilibili・YouTube・Jellyfinの入口を、ここに。' },
  { label: '再生画面', src: '/projects/yuyan-player.jpg', width: 570, height: 1280, source: '作者提供の実画面', alt: '语言の動画再生画面。字幕・弾幕、シークバー、10秒移動、字幕と音声の操作、撮影環境の復号・音声出力の制限表示が見える。', caption: 'シーク、字幕、音声、弾幕。「動画を見るだけ」にも道具が増えました。撮影環境の復号・音声出力の制限表示も、そのまま載せています。' },
  { label: 'Jellyfin', src: '/projects/yuyan-jellyfin.jpg', width: 570, height: 1280, source: '作者提供の実画面', alt: '语言のJellyfinホーム画面。ホーム・ライブラリ・最近追加・続きを見るの切替と、視聴中や次に見る作品の一覧が表示されている。', caption: '自分のJellyfinから、続きとライブラリへ。語学のためです。たぶん。画像内の作品は利用例で、アプリへの同梱ではありません。' },
]

export const LEARNING_STEPS = [
  { verb: '読む・聴く', title: '教材を先に、道具を背景に。', detail: 'EPUB・公開Web記事、YouTube・Bilibili・Jellyfin。興味のある原文や動画を入口にします。', token: '原文', footer: '本棚 / 記事 / 動画カタログ' },
  { verb: '選ぶ', title: '知らない言葉で、立ち止まる。', detail: '語をタップ、または範囲を選択。原文の位置を保ったまま、その場所から検索につなぎます。', token: '選択', footer: '語タップ / 範囲選択 / 元の文脈' },
  { verb: '調べる', title: '辞書の中の語も、もう一度。', detail: 'ページ内の辞書ポップアップと子ポップアップ。利用者が取り込んだ辞書を、自前のRustエンジンで検索します。', token: '辞書', footer: 'Yomitan形式 / 中国語検索 / 子ポップアップ' },
  { verb: '残す', title: '覚えたかどうかは、人間が決める。', detail: '語状態の変更とカード保存は明示操作。.apkg書き出しや読み上げへつなぎ、見ただけで既知扱いにはしません。', token: '記録', footer: '手動の語状態 / カード / .apkg' },
]
