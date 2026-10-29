# ポートフォリオの内容参照

2026-10-16更新。所有者指定の二作品のみを掲載。対象プロジェクトの監査・ビルド・テスト・変更は行わない。今回の更新ではNocturneのローカルリポジトリを読まず、実行も変更もしていない。以下のローカル文書参照は以前の紹介制作時の記録。

## Nocturne OS

- `D:/Programes/llm vibe slop os/README.md` の概要、What's inside、Persistent storage、Compiling C、AI agent、Limits。
- 自作x86-64カーネル、合成ウィンドウ管理、独自ネットワークとブラウザー描画、TinyCCでOS内制作、RAMルートとFAT32 `/data`。
- QEMU / Hyper-V向けの趣味OS。実機、日常利用、全サイト互換、GPUハードウェアアクセラレーションの完成とは区別する。
- Limine / BearSSL / Lexbor / QuickJS / TinyCC等を使うことは明示する。
- `public/projects/nocturne-{desktop,browser,agent}.png` は同READMEから参照される `docs/{desktop-menu,browser,agent}.png` の無加工コピー。実画面であり、サイト上の模擬OSや互換性の証明ではない。
- `public/projects/nocturne-live.png` は2026-10-09に作者がこの会話で提供した使用画面（1916×1200）。OS内のnestとDuckDuckGo検索を見せる。元画像は `C:/Users/cesta/AppData/Local/Temp/codex-clipboard-cb0619a3-4476-4ba7-a300-8c2527cd8690.png`。画面のAI発言は品質の独立評価やサイト互換の証明として扱わない。
- 新しい主役画像 `public/projects/nocturne-portfolio.png`（1918×1197）は、Nocturne内の独自ブラウザーに公開中のvibeslop.devを表示し、隣にnestの制作画面がある作者提供の無加工コピー。元画像は `C:/Users/cesta/AppData/Local/Temp/codex-clipboard-408b69e2-a2f5-4663-9a82-92b023404632.png`。
- `public/projects/nocturne-workbench.png`（1917×1200）は、nestの制作ログ、22:28・runningと進捗リングを表示するfocusd、vibeslop.dev上のNocturne紹介ページを並べた作者提供の無加工コピー。元画像は `C:/Users/cesta/AppData/Local/Temp/codex-clipboard-20cf102a-c27e-44b2-a4d2-dfdad2443b82.png`。25:00・readyの旧写真から作者の了承で差し替え。画面の制作ログを独立した検証結果にはせず、focusdも第三の掲載作品にはしない。下部の「语言」もWebの紹介ページであり、アプリをNocturneで実行した証拠ではない。

## 语言

- `D:/Programes/言語/语言/AGENTS.md` の概要と製品境界。
- `D:/Programes/言語/语言/docs/architecture.md` の現行対応表、Jellyfin、EPUB、Web記事取込、UI刷新。
- `D:/Programes/言語/语言/docs/architecture-v2.md` の名前・中国語先行・Android先行の仕様。
- `D:/Programes/言語/语言/docs/tts.md`、`core/dict/README.md`、`core/cards/README.md`。
- EPUB / 公開Web記事から語タップ・範囲選択、ページ内辞書、子popup、手動語状態、カードと.apkgへ。辞書データは同梱しない。利用者が自分で用意・取り込むYomitan形式の辞書を、自前Rustエンジンで扱う。
- YouTube / Bilibili / Jellyfinのカタログから独自プレイヤーへ。HW優先、必要時FFmpeg。端末内sherpa-onnxのモデルは利用者操作で導入。
- ローカル中心は完全オフラインの意味ではない。全形式、Windows製品版、全サービス互換、全モデルの品質保証を宣伝しない。
- `public/projects/yuyan-{reader,import,video,article-lookup,book-lookup}.jpg` は作者がこの会話で提供した5枚の無加工コピー。読書、公開Web記事の保存前確認、動画上の辞書、記事・本の本文上の辞書を掲載。縦画面は570×1280、動画の横画面は1280×570。端末外観から対応OSや製品版の完成を推測しない。
- 元画像は添付フォルダー `47df1b60-f51e-4325-97ce-fe38f5c34c34` 内の `1-7828.jpg` / `2-7826.jpg` / `3-7829.jpg` / `4-7851.jpg` / `5-7852.jpg`。画像上の本・記事・辞書・動画は実際の使用例であり、全作品への対応や収録・配布を約束するものではない。
- 追加の `public/projects/yuyan-{player,discover,jellyfin}.jpg` は作者提供の添付フォルダー `95ce13d4-2cad-456a-8a3e-901972dae073` の `1-7854.jpg` / `2-7853.jpg` / `3-7855.jpg` の無加工コピー（各570×1280）。動画の検索・再生、利用者のJellyfinカタログを示す。再生画像の撮影環境における復号・音声出力の制限表示を隠さない。
- 学習の流れを説明する紹介図は補足の折りたたみ内に残し、実アプリ画面と明確に区別する。

## 表現

- 公開用には元PNGからロスレスWebPを生成し、展開後の画素一致を確認。必要に応じて960pxの一覧表示用画像も生成する。元画像は保持し、非対応ブラウザー向けにも使う。JPEGは再圧縮しない。最適化は画像の出典・内容を変更するものではなく、拡大表示は元解像度のまま。

- 作品名・機能説明は固定。自己紹介は名前付きの翻訳モードで切替。根拠のない百分率は廃止し、達成率、性能、品質、AI能力の測定値を作らない。
- 控えめな看板と具体的な制作物の落差でサンドバッグと風刺を作る。虚偽の受賞、顧客、公開リポジトリ、ダウンロード先、連絡先を足さない。
- Nocturneの公開リポジトリは今回作者から指定された [jc4789/Nocturne-OS](https://github.com/jc4789/Nocturne-OS) を掲載。语言の公開先や配布URLは引き続き捏造しない。画像拡大、紹介図、制作メモは実際に操作可能。

## 2026-10-16：小変更の日報

- 作者の申告と、この会話に添付された実画面・コミット画面に基づく更新。OSの新規検証結果ではない。
- `public/projects/nocturne-firefox-wasm.png` は添付 `codex-clipboard-2989f454-92e9-42bb-8b0f-e8ebd49d2d3a.png` の無加工コピー（1920×1080）。Nocturneのブラウザー内でPuterのFirefox WASMが動き、その中でPuter.jsの文書が表示されている。
- `public/projects/nocturne-small-commit.png` は添付 `codex-clipboard-1ab199d3-e919-41a2-ad6a-96bb748a0a13.png` の無加工コピー（1654×454）。[コミット c5d1c41](https://github.com/jc4789/Nocturne-OS/commit/c5d1c41) のメッセージ、1,882ファイル変更、+1,005,910 / −784行、Claudeの共同著者表記を掲載。
- コミット画面にはMesaのGLSL/NIR、GLES3 state tracker、softpipeの取り込み、WebGL / WebGL2、WorkerのOffscreenCanvas接続、Puter Firefox WASMの既定描画で本文を表示した旨が記録されている。WebAssemblyとFirefox / Gecko WASMの動作は作者からも指定された。
- 100万行は差分の追加行数。依存コードを含むので、独自実装量・Claude単独の執筆量・品質の指標とはしない。ソフトウェア描画をGPUアクセラレーション完成とは言い換えない。
- 公開READMEは閲覧できたが、コミット詳細のWeb取得は失敗した。したがって今回のコミット数値と動作紹介の根拠は、作者提供画像と申告であることを表示する。
- 画像は既存の事前最適化経路でロスレスWebPを生成。原本を保持し、VPSの設定・ホスティング方法・既存配信経路は変更しない。
