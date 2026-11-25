# Deployment

Hosted on GitHub Pages from the `master` branch root.

- Live: https://rony-890.github.io/portfolio/
- Repo: https://github.com/rony-890/portfolio

## Publish a change

```bash
git add -A
git commit -m "feat: ..."
git push
```

Pages rebuilds in roughly 30 to 60 seconds. Check progress with:

```bash
gh api repos/rony-890/portfolio/pages/builds/latest --jq .status
```

## Why every path is relative

Project Pages serve from `/portfolio/`, so `/img/x.webp` would resolve to the
domain root and 404. Keep `img/...`, `js/...`, `css/...` relative. The only
absolute URLs allowed are canonical, `og:*` and `twitter:*`.

## Custom domain, when you buy one

1. Add the domain in Settings, Pages, Custom domain.
2. At the DNS provider create `A` records to `185.199.108.153`, `185.199.109.153`,
   `185.199.110.153`, `185.199.111.153` for the apex, and `CNAME www` to
   `rony-890.github.io`.
3. Wait for the certificate, then tick Enforce HTTPS.
4. Update `canonical`, `og:url`, `og:image`, `twitter:image` in `index.html`
   and the URLs in `llms.txt`.

## Analytics (free, cookie-less)

Cloudflare dashboard, Web Analytics, Add a site, enter the domain, copy the
snippet, then paste it before `</body>` in `index.html`.

## Contact form (free)

Formspree: create a form, copy its endpoint, and post the fields to it from a
`<form>` in the Contact section. The email link already in the footer keeps
working as a fallback.

## Rolling back

`git revert <sha>` and push, or in Settings, Pages pick an older release branch.
