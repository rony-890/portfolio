# Project structure

```text
portfolio/
├── index.html                 entry point + all markup
├── 404.html                   custom not-found page
├── robots.txt
├── llms.txt                   machine-readable summary for AI agents
├── .nojekyll                  keep GitHub Pages from running Jekyll
├── css/main.css
├── js/
│   ├── projects.js            project data (single source of truth)
│   ├── main.js                scroll camera + rendering
│   ├── curved-line-patch.js
│   └── garden/garden-standalone.js
├── img/
│   ├── poses/                 pose-1.webp ... pose-8.webp
│   ├── projects/              project card + detail artwork
│   └── og-cover.png           social preview
├── docs/                      this folder
├── package.json               image-tooling devDependencies only
└── README.md, LICENSE
```

## Where to change what

| Task | File |
| --- | --- |
| add / edit / reorder a project | `js/projects.js` |
| change copy, headings, section order | `index.html` |
| colours, spacing, type scale | the `:root` block in `css/main.css` |
| scroll timing, card rendering, dialog | `js/main.js` |
| social preview image | `img/og-cover.png` + the `og:image` tag |

## Deliberately not in the repository

Source PNG originals, internal working notes, editor config, `node_modules/`
and archives. `.gitignore` covers all of them.

## Cache busting

Script and stylesheet URLs carry `?v=<n>`. Bump the number after editing that
file so returning visitors get the new version.
