# Subhu — Portfolio

Personal portfolio for **Subhu**, a junior frontend developer working on accessible interfaces, landing pages and frontend QA.

**Live site:** https://rony-890.github.io/portfolio/

---

## Stack

- Static HTML, CSS and vanilla JavaScript — no build step, no framework at runtime.
- Typography: Bebas Neue (display), Geist / Geist Mono (body).
- Deployed with GitHub Pages from `master`.

## Structure

```
index.html            single-page portfolio
404.html              custom not-found page
css/main.css          all styles, theme tokens at :root
js/main.js            interactions, scroll and motion
js/garden/            decorative canvas garden
img/                  webp artwork, project cards, og-cover.png
img/distinkt-teaser.mp4  project teaser video
robots.txt, llms.txt  crawler and AI-agent metadata
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Adding a project

1. Drop the card art into `img/projects/` as `.webp` (1600px wide is enough).
2. Add the markup block in `index.html` next to the other project cards.
3. Keep `alt` text on every image and reuse the existing class names.

## Deploying

Push to `master`. GitHub Pages serves the branch root, so every asset path stays relative.

## Contact

- GitHub: [rony-890](https://github.com/rony-890)
- LinkedIn: [subhu89000](https://www.linkedin.com/in/subhu89000/)
- Email: sdas169797@gmail.com

## License

Code is MIT licensed. The artwork, photographs and videos in `img/` are © Subhu and may not be reused.