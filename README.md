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
js/projects.js        project data — the only file needed to add a project
js/main.js            scroll camera, cards, dialog, interactions
js/garden/            decorative canvas garden
img/                  webp artwork and og-cover.png
docs/                 architecture, structure, deployment, issues, roadmap
robots.txt, llms.txt  crawler and AI-agent metadata
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Adding a project

1. Drop the card art into `img/projects/` as `.webp` (1600px wide is enough).
2. Append one object to the array in `js/projects.js` — copy an existing entry and change the fields.
3. Bump `?v=` on `js/projects.js` in `index.html` so the new entry is fetched.

No layout code needs editing; cards and the project dialog are generated from the data.

## Deploying

Push to `master`. GitHub Pages serves the branch root, so every asset path stays relative.
See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for custom domain, analytics and rollback steps.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Project structure](docs/PROJECT_STRUCTURE.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Known issues](docs/KNOWN_ISSUES.md)
- [Roadmap and design rules](docs/ROADMAP.md)
- [Changelog](docs/CHANGELOG.md)

## Contact

- GitHub: [rony-890](https://github.com/rony-890)
- LinkedIn: [subhu89000](https://www.linkedin.com/in/subhu89000/)
- Email: sdas169797@gmail.com

## License

Code is MIT licensed. The artwork, photographs and videos in `img/` are © Subhu and may not be reused.