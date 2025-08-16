# Vercel Deploy Notes

This repo is a pnpm workspace. The actual Next.js app lives in `apps/quick-legal-biz/`.

We added a `vercel.json` at the root to force the Next.js builder for that subfolder and route all traffic to it.

On Vercel:
- Framework Preset: Next.js
- Root Directory: (repo root works with this `vercel.json`); otherwise set to `apps/quick-legal-biz`
- Install Command: pnpm install
- Build Command: pnpm build
- Output Directory: (leave blank, Next.js default)
