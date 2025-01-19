## 🚀 Project Structure

### Run locally Github Actions

- How? https://github.com/nektos/act

### Todo

- [x] add eslint & eslint-plugin-astro
- [x] when using dependabot, we have to run e2e tests (e.g. playwrite) to make sure the dependabot updates don't break the sites
- [x] add linting to github action workflow
- [ ] change pipeline to scenario 1
    - [ ] maximizing Efficiency: Using GitHub Actions to Optimize Cloudflare Pages Free Build Limits
- [ ] remove resulation.esbuild from package.json (probably bug is fixed)
- [ ] write blogpost about how to deploy efficiency to cloudflare pages with github actions without going out of the 500 builds per month
- [ ] github actions, split test and deploy into separate workflow files
- [ ] run tests before commiting
- [ ] write an ai-agent proofs from time to time written content is up-to-date
- [ ] write a crawler which will crawl the site and create snapshots of every page with `await page.locator('body').ariaSnapshot()`
    - [ ] write a agnostic library for this and use them also in a custom GitHub action
    - [ ] https://crawlee.dev/docs/examples/playwright-crawler
    - [ ] write blogpost about how to autonoumously test, using dependabot a blog fully autonomously
- [ ] auto-merging Pull-Request from dependabot
    - [ ] screenshot testing is required for this
    - [ ] https://dev.to/slashgear_/how-to-automatically-merge-dependabot-pull-requests-with-github-actions--30pe
- [ ] Disable a direct push to GitHub main branch
      [ ] - https://dev.to/pixiebrix/disable-a-direct-push-to-github-main-branch-8c2
      in order to use them for playwrite tests before deploying the site.

### How to deploy to cloudflare pages with github actions

- Deploy git strategy

  - when created a pull-request or pushed into it or when pushed to main

    ```yaml
    pull_request:
      # We are using the different types to ensure that the pipeline does not run unnecessarily on every push.
      # This makes sense when we are using Cloudflare-Pages which are limited to 500 builds per month.
      types:
        # https://frontside.com/blog/2020-05-26-github-actions-pull_request/
        # https://github.com/orgs/community/discussions/24567#discussioncomment-8068482
        # https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=assigned#pull_request

        # This type triggers the workflow when a new pull request is created. It ensures that the
        # pipeline runs as soon as the pull request is initiated.
        - opened
        # This type triggers the workflow when commits are added, removed, or updated in an open
        # pull request. For instance, if you push new changes to the branch linked to the pull
        # request, the workflow will re-run.
        - synchronize
        # This type triggers the workflow when a previously closed pull request is reopened. It helps
        # ensure that the pipeline runs again if the pull request is revisited after being closed.
        - reopened
    ```

- When we want that dependabot should only runs for example only in test job
  ```yaml
  deploy:
    # The github.actor is a context variable in GitHub Actions that represents the username of
    # the user who triggered the workflow run. Here are some key points about github.actor
    if: ${{ github.actor != 'dependabot[bot]' }}
  ```
- What to do on cloudflare
- dash.cloudflare.com > Workers & Pages > honey-glass > View Details > Build > Settings
  - in `Branch Control` disable `Enable automatic production branch deployments`
  - This message is then displayed (which is fine):
    - Automatic production branch deployments are disabled for your git integration. Re-enable automatic deployments to resume builds triggered by git pushes.
  - in `Preview branch` enable `None (Disable automatic branch deployments)`
  - in `Build Configurations` empty `Build command` and `Output directory`
  - in `Git Repository` will redirect to Github. Suspend the Github-Plugin Cloudflare integration
    This makes sense when we are using Cloudflare-Pages which are limited to 500 builds per month.
    https://github.com/settings/installations (see `Cloudflare Pages`)
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
- How we can save more build times? By running Github Actions locally
    - https://github.com/nektos/act

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
