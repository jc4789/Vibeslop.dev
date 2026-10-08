# vibeslop.dev

An overbuilt, neon, late-1990s personal homepage satirizing AI-driven development. Not a product, a storefront, or a waitlist.

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
