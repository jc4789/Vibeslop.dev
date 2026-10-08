# vibeslop.dev ✨

> *"Zero syntax errors. Zero architecture. Pure unadulterated vibe."*

The premier satirical web portal for vibe coding, autonomous agent hallucinations, and $42M pitch deck generation. Acquired for a mere $8.

---

## 🚀 Features

- **Series A Slop Engine**: Generates unassailable $10M+ tech startup pitches, with instant term sheet acceptance, confetti, and cash register sounds.
- **The Slop-O-Meter™**: Interactive slider calibrating vibe density from boring legacy software engineering to transcendent void slop.
- **Rogue Agent Swarm Feed**: Live simulated feed of autonomous AI subagents committing questionable acts in production.
- **Vibe Credential Generator**: Claim your official "Certified 1000x Vibe Engineer" certificate.
- **Web Audio Soundboard**: Pure in-browser oscillator synth effects (no external audio files required).

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build & Deploy Tooling**: [Nixpacks](https://nixpacks.com/) (zero Dockerfiles needed)
- **Production Server**: Caddy (auto-configured by Nixpacks)

---

## 💻 Local Testing

Start the local development server:

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser. Any edits you make will instantly update in real-time.

---

## 🚢 Deploying to your VPS with Nixpacks

### 1. Push to GitHub
```bash
git add .
git commit -m "feat: vibeslop launch"
git push -u origin main
```

### 2. On your VPS
SSH into your server and pull the repository:

```bash
git clone https://github.com/jc4789/Vibeslop.dev.git
cd Vibeslop.dev

# Build & containerize with Nixpacks
nixpacks build . --name vibeslop-app

# Run the container (bind to port 3000)
docker run -d --name vibeslop-prod -p 3000:3000 --restart always vibeslop-app
```

### 3. Domain & Reverse Proxy
Point your DNS (A Record) for `vibeslop.dev` to your VPS IP address, and route traffic to port 3000 with Caddy or Nginx.

---

## 📜 License & Disclaimer
Satire project. No unit tests or compilers were harmed in the making of this slop.
Crafted with pure chaotic energy. ありがとう(>᎑<`๑)♡
