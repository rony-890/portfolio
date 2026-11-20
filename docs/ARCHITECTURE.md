# Portfolio Architecture

## Runtime

This is a static single-page portfolio. `index.html` is the entry point,
`css/main.css` contains layout and animation styling, and `js/main.js` owns
the scroll-camera scene and interactions.

## Sections

The information architecture is:

1. Hero
2. About
3. By the numbers
4. Journey
5. What I do
6. Selected Work
7. Assist-Ding spotlight
8. Contact

## 3D scroll camera

Each `.st` element is a stop. Its `data-gap`, `data-hold`, `data-a`, and
`data-ma` values determine vertical scroll spacing and camera targets.
Each `.el` is placed by `data-p`, `data-mp`, `data-z`, and `data-f`.

The active scroll camera is eased in `js/main.js`, so browser `window.scrollY`
and rendered scene position can differ during motion.

## Hero

`js/garden/garden-standalone.js` draws the Garden-based “SUBHU” canvas.
The DOM title performs the initial reveal and then hands visibility to the
canvas. `js/curved-line-patch.js` supplies the decorative hero line.

## Work

Project cards are generated from the project data in `js/main.js`.
The project dialog uses URL query state (`?project=<slug>`) so direct refresh
and browser history remain possible.

## Assets

`img/` contains poses, project artwork, and video assets. `img/projects/`
contains PNG and WebP copies. Runtime display should prefer WebP, while PNG
copies remain source/editing assets.

## Responsive behavior

The 3D scene switches to a mobile camera below 760 px.
Mobile and desktop layouts are intentionally tested separately because spacing,
perspective scale, and text wrapping differ.

## Accessibility

The static HTML includes semantic sections, keyboard-focus styles, accessible
labels, reduced-motion handling, and project-dialog close behavior. Remaining
checks include cross-browser focus restoration and mobile touch interaction.
