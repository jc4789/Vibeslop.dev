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

- 自己PR出力制限装置：20 / 55 / 100%で看板のコピーだけを切替。能力測定値でも、作品の達成率でもありません。実際の説明や使用技術は変わりません。
- Nocturneは作者提供の使用画面を主役に、READMEの3枚を含む無加工の実スクリーンショット4枚を切替・拡大。ネイティブdialogがないブラウザーでは、画像そのものを別タブで開きます。
- 语言は作者提供の無加工スクリーンショット8枚を切替・拡大。読書、記事の保存確認、辞書ポップアップ、動画検索・再生、Jellyfinを掲載。辞書データは同梱せず、利用者が自分で用意して取り込みます。「読む・聴く → 選ぶ → 調べる → 残す」の紹介図は、補足として開けます。架空のアプリ画面やブラウザー版ではありません。
- 作品の公開リポジトリ・配布先は推測せず、存在しないダウンロード/連絡先を置きません。
- A CRT/Geocities portal, local visitor counter, popups you can drag, and a secret mode (press V three times outside an input).
- Vue renders the builder form and timed satirical log. A deterministic local generator creates working todo, calculator, or counter mini-apps; this does not use AI inference.
- A Three.js dependency graph: five genuinely used libraries, plus explicitly fictional packages you can add/remove. Capped at 64 nodes. It pauses offscreen/in background and respects reduced motion.
- SLOPAMP synthesizes three chiptune loops with Web Audio, has volume/track controls and a real frequency visualizer. No autoplay or external audio. Playback stops when the document is hidden.
- A fictional-news generator with clipboard copy, an unaccountable oracle, and a dog who agrees with opposite review instructions.
- Local-only guestbook, one-vote-per-browser poll, framework additions, and visit counter persist in localStorage. Guestbook input is plain text, not HTML; at most 30 entries are saved and 8 displayed. Guestbook removal can be undone until the page is reloaded.
- CRT-off and quiet visual modes, accessible controls, responsive layouts, and reduced-motion support. Popups become inline on phones.

Everything runs in the browser. No accounts, purchases, payments, trackers, remote fonts, AI calls, or deployments. No guestbook data leaves the browser. The production content security policy blocks all script-initiated network connections. The visitor counter is not a global traffic count; seed poll votes and seed guestbook entries are explicitly fictional. The five base libraries are really bundled; clicking “add framework” adds a graph node, not an npm installation.

## Production, locally

```bash
npm ci
npm run build
npm start
```

The production server serves **only `dist`**, defaults to port 3000, and honors `PORT` and `HOST`. `npm run preview` is for local inspection, not deployment ([Vite's deployment guide](https://vite.dev/guide/static-deploy.html)).

Builds include Brotli/gzip assets. Hashed assets are immutable; HTML revalidates so updates are not pinned in a browser cache. Restart the server after replacing a build. Missing files return 404, not the app shell.

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
