# vibeslop.dev

Describe the product. The site writes the company around it.

React 19, Vite, Tailwind 4.

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Deploy

Push, then on the VPS:

```bash
git clone https://github.com/jc4789/Vibeslop.dev.git
cd Vibeslop.dev

nixpacks build . --name vibeslop-app
docker run -d --name vibeslop-prod -p 3000:3000 --restart always vibeslop-app
```

Point the A record for `vibeslop.dev` at the machine, and proxy port 3000.

## Note

The numbers on the site are part of the site.
