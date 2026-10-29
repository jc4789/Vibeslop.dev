# vibeslop.dev

自作OS **Nocturne OS** と中国語の没入型学習アプリ **「语言」** を紹介する、ネオン過剰な個人ポートフォリオ。作品は本物、看板は控えめ。AI開発の風刺とサンドバッグを残し、販売や会員登録はしません。

作品説明の参照元と画像の出典は [内容参照](docs/portfolio-content.md)。両プロジェクトの文書と既存スクリーンショットを紹介素材として読み、作品の監査・ビルド・テストは行っていません。

React 19, a real Vue 3 island inside React, Zustand, Three.js, Motion, Vite and Tailwind 4. Yes, this is unnecessary. That is part of the joke.

Build tooling requires Node 22.12+ (or a supported newer Node version).

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Check

```bash
npm test
npm run lint
npm run build
```

## The experience

- 非ユークリッド回廊：五枚の正方形の東辺と次室の南辺を接続。一周450°の頂点を持つ空間を、画素ごとの光線追跡と同じ座標変換で実際に歩けます。扉越しに隣室と実作品の画像が見え、展示から通常の作品紹介へ移動できます。
- 回廊は明示的に入ったときだけWebGL2コードを取得。静止時に連続描画せず、非表示・背景タブ・フォーカス離脱で歩行を停止。WASD・矢印・ドラッグ、タッチ用の移動ボタンに加え、連続移動不要の扉ボタンを用意。描画非対応でも同じ接続を辿れます。経路は保存・送信しません。
- 自己申告翻訳装置：「いつもの謙遜」「少し漏れる」「事実を述べる」で看板のコピーだけを切替。根拠のない百分率や能力スコアは表示せず、実際の機能説明や使用技術は変わりません。
- Nocturneの近況を、作者提供のFirefox / Gecko WASM実行画面と「+1,005,910行」のコミット明細で紹介。WebGL / WebGL2はMesaのソフトウェア描画、追加行数は依存コードの取り込みを含むことを明記。Claudeの共同著者記録と公開ソースへもリンクします。
- NocturneはREADMEの3枚を含む実スクリーンショットを切替・拡大。配信はロスレスWebPを優先し、元PNGも保持。ネイティブdialogがないブラウザーでは、元画像を別タブで開きます。
- 语言は作者提供の無加工スクリーンショット8枚を切替・拡大。読書、記事の保存確認、辞書ポップアップ、動画検索・再生、Jellyfinを掲載。辞書データは同梱せず、利用者が自分で用意して取り込みます。「読む・聴く → 選ぶ → 調べる → 残す」の紹介図は、補足として開けます。架空のアプリ画面やブラウザー版ではありません。
- 作品の公開リポジトリ・配布先は推測せず、存在しないダウンロード/連絡先を置きません。
- A CRT/Geocities portal, local visitor counter, popups you can drag, and a secret mode (press V three times outside an input).
- Vue renders the builder form and timed satirical log. A deterministic local generator creates working todo, calculator, or counter mini-apps; this does not use AI inference.
- A Three.js dependency graph: five genuinely used libraries, plus explicitly fictional packages you can add/remove. Capped at 64 nodes. It pauses offscreen/in background and respects reduced motion.
- SLOPAMP synthesizes three chiptune loops with Web Audio, has volume/track controls and a real frequency visualizer. No autoplay or external audio. Playback stops when the document is hidden.
- A fictional-news generator with clipboard copy, an unaccountable oracle, and a dog who agrees with opposite review instructions.
- Local-only guestbook, one-vote-per-browser poll, framework additions, and visit counter persist in localStorage. Guestbook input is plain text, not HTML; at most 30 entries are saved and 8 displayed. Guestbook removal can be undone until the page is reloaded.
- CRT-off and quiet visual modes, accessible controls, responsive layouts, and reduced-motion support. Popups become inline on phones.
- 重い実験用ライブラリは後から取得：Three.jsは実験室が画面に入ったとき、Vueの生成器は折りたたみを初めて開いたときに読み込みます。作品を見るだけの訪問に実験室の負担を乗せません。

Everything runs in the browser. No accounts, purchases, payments, trackers, remote fonts, AI calls, or deployments. No guestbook data leaves the browser. The production content security policy blocks all script-initiated network connections. The visitor counter is not a global traffic count; seed poll votes and seed guestbook entries are explicitly fictional. The five base libraries are really bundled; clicking “add framework” adds a graph node, not an npm installation.

## Production, locally

```bash
npm ci
npm run build
npm start
```

The production server serves **only `dist`**, defaults to port 3000, and honors `PORT` and `HOST`. `npm run preview` is for local inspection, not deployment ([Vite's deployment guide](https://vite.dev/guide/static-deploy.html)).

Builds include Brotli/gzip assets. Hashed assets are immutable; HTML revalidates so updates are not pinned in a browser cache. Restart the server after replacing a build. Missing files return 404, not the app shell.

### 画像の配信

- NocturneのPNGは事前生成したロスレスWebPを優先。生成時に展開後の画素が元画像と一致することを確認します。小さい表示には、容量も小さくなる場合だけ960px版を用意し、拡大では元解像度を使います。
- JPEGはすでに軽いため、再圧縮しません。元PNG/JPEGは残し、`picture`でWebP非対応ブラウザーへフォールバックします。遅延読込・非同期デコードも使用。
- WebPは内容ハッシュ付きのファイル名で1年間キャッシュ。画像を更新するとURLも変わります。VPSでの動的変換や追加サービスは不要です。
- 生成済み画像と `src/lib/image-assets.json` を一緒に保存します。元画像を交換した場合は、Sharpを利用できるローカル環境で `node scripts/optimize-images.mjs` を再実行。別の場所のSharpを使う場合は、引数にモジュールファイルのパスを渡せます。通常のビルド・配信にはSharpを必要としません。

## Deploy

Push, then on the VPS:

```bash
git clone https://github.com/jc4789/Vibeslop.dev.git
cd Vibeslop.dev

nixpacks build . --name vibeslop-app
docker run -d --name vibeslop-prod -p 127.0.0.1:3000:3000 --restart always vibeslop-app
```

The Nixpacks configuration explicitly installs build dependencies, runs lint/tests/build, then starts the production server. Its automatic Caddy setup is disabled so the same tested compression and security headers apply to both `npm start` and the container ([Nixpacks configuration](https://nixpacks.com/docs/providers/node)). Point the A record for `vibeslop.dev` at the machine and use an **HTTPS reverse proxy** to localhost port 3000. Do not expose the Vite development server. The built `dist` directory can alternatively be hosted by any static host.

The local Node server and browser flows are tested. A VPS/container build and public-domain TLS setup must still be verified in the deployment environment.

## Note

The model handoff order and the user's “cringe” feedback come from this site's actual revision history. The diagnostics, build-dialogue, news, and self-assessed confidence numbers are satire. There is no sales flow. Please read your diffs.
