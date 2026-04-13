# Abhishek Sundaresan - LinkedIn Portfolio (AI + CI/CD)

This project is a production-style starter portfolio based on your LinkedIn profile URL:

- <https://www.linkedin.com/in/abhishek-sundaresan-4396a7142/>

> LinkedIn may hide some profile details behind authentication, so `script.js` includes safe editable placeholders where details are uncertain.

## What is included

- `index.html`: Portfolio layout (hero, about, experience, education, skills, AI summary, tech stack).
- `styles.css`: Responsive UI style.
- `script.js`: Profile data model, dynamic rendering, AI summary button logic.
- `api/generate-summary.js`: Vercel-style serverless endpoint for OpenAI Responses API.
- `netlify/functions/generate-summary.js`: Netlify serverless endpoint for OpenAI Responses API.
- `netlify.toml`: Redirect from `/api/generate-summary` to Netlify function path.
- `.github/workflows/ci.yml`: CI checks.
- `.github/workflows/deploy-pages.yml`: CD deployment to GitHub Pages.

## Generative AI stack

The page sends a profile-derived prompt and tries endpoints in this order:

1. `/api/generate-summary`
2. `/.netlify/functions/generate-summary`

If both are unavailable, it falls back to a local deterministic summary in-browser.

## Local run

```bash
python3 -m http.server 8080
```

Open <http://localhost:8080>.

## Configure OpenAI backend

### Netlify

1. Add environment variable in **Site settings → Environment variables**:
   - `OPENAI_API_KEY=...`
2. Ensure this file exists (already included): `netlify.toml`
3. Deploy.

### Vercel

1. Add `OPENAI_API_KEY` in Project Settings → Environment Variables.
2. Deploy with `api/generate-summary.js`.

## CI/CD setup

### CI (GitHub Actions)

`ci.yml` runs on pushes and pull requests:

- `node --check script.js`
- `node --check api/generate-summary.js`
- `node --check netlify/functions/generate-summary.js`
- HTML smoke check (`test -f index.html`)

### CD (GitHub Pages)

`deploy-pages.yml` deploys on push to `main`.

To enable once in GitHub repo settings:

1. Go to **Settings → Pages**.
2. Source: **GitHub Actions**.
3. Push to `main` branch.

Your site will be published at your GitHub Pages URL.


## LinkedIn data population note

I pre-filled `script.js` using publicly visible profile information from LinkedIn snippets and public resume/portfolio pages (beatBread roles, CMU MISM, Anna University, and product-management background).
Please review and correct any fields that are hidden by LinkedIn privacy/login requirements.

## Personalization checklist

Update `script.js`:

- `headline`, `about`, `email`, `experience`, `education`, and `skills`.
- Keep `linkedinUrl` as your canonical LinkedIn profile.
