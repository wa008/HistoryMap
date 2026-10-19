# HistoryMap

A minimalist static timeline website for key world and Chinese history milestones.

## Features

- Two timeline views: **World History** and **China History**
- Default view: **World History**
- Unified data model for all timeline nodes:
  - `id`
  - `timeline`
  - `year`
  - `title`
  - `keywords`
  - `type`
  - `heat` (0-100)
  - `summary`
  - `details`
  - `source`
- Heat shown visually by node size and color depth
- Click any node to open detailed information

## Run locally

This project is plain static HTML/CSS/JS.

Open `/home/runner/work/HistoryMap/HistoryMap/index.html` in your browser.

## GitHub Pages auto deployment

The repository includes a GitHub Actions workflow:

- Workflow file: `/home/runner/work/HistoryMap/HistoryMap/.github/workflows/deploy-pages.yml`
- Trigger: push to `main`
- Output: deploy static files from repository root

After enabling GitHub Pages (Source: **GitHub Actions**), the site URL is expected to be:

`https://wa008.github.io/HistoryMap/`