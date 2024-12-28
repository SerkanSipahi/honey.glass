## 🚀 Project Structure

### Todo

- [x] add eslint & eslint-plugin-astro
- [x] when using dependabot, we have to run e2e tests (e.g. playwrite) to make sure the dependabot updates don't break the sites
- [ ] Disable a direct push to GitHub main branch
      [ ] - https://dev.to/pixiebrix/disable-a-direct-push-to-github-main-branch-8c2
- [ ] write a crawler which will crawl the site and create snapshots of every page with `await page.locator('body').ariaSnapshot()`
      in order to use them for playwrite tests before deploying the site.
- [ ] github actions
  - [ ] split test and deploy into separate workflow files

### How to deploy to cloudflare pages with github actions

- Deploy git strategy
  - when created a pull-request or pushed into it or when pushed to main
- What to do on cloudflare
  - dash.cloudflare.com > Workers & Pages > honey-glass > View Details > Build Settings > Settings
    - in `Branch Control` disable `Enable automatic production branch deployments`
    - This message is then displayed (which is fine):
      - Automatic production branch deployments are disabled for your git integration. Re-enable automatic deployments to resume builds triggered by git pushes.
    - in `Preview branch` enable `None (Disable automatic branch deployments)`
    - in `Build Configurations` empty `Build command` and `Output directory`
  - dash.cloudflare.com/profile/api-tokens
    - create token > create custom token
      - Account | Cloudflare Pages | Edit
      - User | User Details | Read
  - Copy `Account ID`
    - dash.cloudflare.com > honey.glass
      - Scroll down to `Account ID`
  - You can build up to 500 times per month on the Free plan
    - What counts a build in clouflare pages?
    - in our solution only when creatng a PR or pushing to main triggers a build
    - How to mesure the build Limit Count?
      - https://community.cloudflare.com/t/how-to-track-of-consumed-builds-on-cloudflare-pages/381331
- What to do on Gitub
  - https://github.com/{accountName}/{repositoryName}
    - Settings > Secrets & Variables > Actions > New repository secret
      - Name: `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`
- Tutorial which was useful
  - see https://www.youtube.com/watch?v=t068JaUiuj4

### Drafts Articles

see src/drafts/

### Inside the tests directory, you can run several commands:

**Runs the end-to-end tests:**
`pnpm exec playwright test`

**Starts the interactive UI mode:**
`pnpm exec playwright test --ui`

**Runs the tests only on Desktop Chrome:**
`pnpm exec playwright test --project=chromium`

**Runs the tests in a specific file:**
`pnpm exec playwright test example`

**Runs the tests in debug mode:**
`pnpm exec playwright test --debug`

**Auto generate tests with Codegen:**
`pnpm exec playwright codegen`

### Inside of theme, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── data/
│   ├── icons/
│   ├── layouts/
│   ├── pages/
│   ├── plugins/
│   ├── styles/
│   └── utils/
├── astro.config.mjs
├── package.json
├── README.md
├── tailwind.config.cjs
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro (`.astro`) components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## Astro.js Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## License

Licensed under the [GPL-3.0](https://github.com/JustGoodUI/dante-astro-theme/blob/main/LICENSE) license.
