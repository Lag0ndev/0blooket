# 0blooket – Fake Blooket

Minimal recreation of the Blooket dashboard (Market + My Blooks).

## Live routes (after Vercel deploy)

- `/` or `/market` → Market page
- `/blooks` → My Blooks page

## Features

- Purple sidebar with Market / Blooks nav (hover = white)
- Market: Spooky pack card + purchase modal
- My Blooks: all packs (no Hidden Blooks), exact Font Awesome lock icons on every blook
- Path-based routing works with `vercel.json` rewrites
- No extra body scroll past the packs area

## Deploy

Connect the repo to Vercel. The included `vercel.json` rewrites `/blooks` and `/market` to `index.html` so client-side page switching works with clean URLs.

Open `index.html` locally or visit the Vercel URL after deploy.
