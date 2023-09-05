# Remix Indie Stack

![The Remix Indie Stack](https://repository-images.githubusercontent.com/465928257/a241fa49-bd4d-485a-a2a5-5cb8e4ee0abf)

Learn more about [Remix Stacks](https://remix.run/stacks).

```sh
npx create-remix@latest --template remix-run/indie-stack
```

## What's in the stack

- [Fly app deployment](https://fly.io) with [Docker](https://www.docker.com/)
- Production-ready [SQLite Database](https://sqlite.org)
- Healthcheck endpoint for [Fly backups region fallbacks](https://fly.io/docs/reference/configuration/#services-http_checks)
- [GitHub Actions](https://github.com/features/actions) for deploy on merge to production and staging environments
- Email/Password Authentication with [cookie-based sessions](https://remix.run/utils/sessions#md-createcookiesessionstorage)
- Database ORM with [Prisma](https://prisma.io)
- Styling with [Tailwind](https://tailwindcss.com/)
- End-to-end testing with [Cypress](https://cypress.io)
- Local third party request mocking with [MSW](https://mswjs.io)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

## Development

- Initial setup:

  ```sh
  npm run setup
  ```

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.

The database seed script creates a new user with some data you can use to get started:

- Email: `rachel@remix.run`
- Password: `racheliscool`

### Relevant code:

This is a pretty simple note-taking app, but it's a good example of how you can build a full stack app with Prisma and Remix. The main functionality is creating users, logging in and out, and creating and deleting notes.

- creating users, and logging in and out [./app/models/user.server.ts](./app/models/user.server.ts)
- user sessions, and verifying them [./app/session.server.ts](./app/session.server.ts)
- creating, and deleting notes [./app/models/note.server.ts](./app/models/note.server.ts)

## Deployment

This Remix Stack comes with two GitHub Actions that handle automatically deploying your app to production and staging environments.

Prior to your first deployment, you'll need to do a few things:

- [Install Fly](https://fly.io/docs/getting-started/installing-flyctl/)

- Sign up and log in to Fly

  ```sh
  fly auth signup
  ```

  > **Note:** If you have more than one Fly account, ensure that you are signed into the same account in the Fly CLI as you are in the browser. In your terminal, run `fly auth whoami` and ensure the email matches the Fly account signed into the browser.

- Remove docker-related and Fly config file in order to use new Fly setups:

  ```sh
  rm -f Dockerfile .dockerignore fly.toml
  ```

- Initialize Fly apps. This will automatically recreate 3 files that we've just removed and also configure everything for Fly as recommended:

  > Until Remix complete the process of simplify and modernize deploy flow with Fly, we'll use this setup. Details of rethinking Remix/Indie stack & Fly deploy setup can be find in [Indie stack's issue #252](https://github.com/remix-run/indie-stack/issues/252)

  ```sh
  fly launch
  ```

- Give permission to run the `start.sh` script on docker: In Dockerfile, change the `ENTRYPOINT` line to

  ```
  RUN chmod +x "./start.sh"
  ENTRYPOINT [ "./start.sh" ]
  ```

- Deploy our apps to Fly:

  ```sh
  fly deploy
  ```

- Initialize Git.

  ```sh
  git init
  ```

- Create a new [GitHub Repository](https://repo.new), and then add it as the remote for your project. **Do not push your app yet!**

  ```sh
  git remote add origin <ORIGIN_URL>
  ```

- Add a `FLY_API_TOKEN` to your GitHub repo. To do this, go to your user settings on Fly and create a new [token](https://web.fly.io/user/personal_access_tokens/new), then add it to [your repo secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) with the name `FLY_API_TOKEN`.

Now that everything is set up you can commit and push your changes to your repo. Every commit to your `main` branch will trigger a deployment to your production environment, and every commit to your `dev` branch will trigger a deployment to your staging environment.

> Fly has a default value `auto_stop_machines = true` and `auto_start_machines = true`, so the apps can take around ~10s to restart. We'll keep it this way for cost-reduction.

### Connecting to your database

The sqlite database lives at `/data/sqlite.db` in your deployed application. You can connect to the live database by running `fly ssh console -C database-cli`.

### Getting Help with Deployment

If you run into any issues deploying to Fly, make sure you've followed all of the steps above and if you have, then post as many details about your deployment (including your app name) to [the Fly support community](https://community.fly.io). They're normally pretty responsive over there and hopefully can help resolve any of your deployment issues and questions.

## GitHub Actions

We use GitHub Actions for continuous integration and deployment. Anything that gets into the `main` branch will be deployed to production after running tests/build/etc. Anything in the `dev` branch will be deployed to staging.

## Testing

### Cypress

We use Cypress for our End-to-End tests in this project. You'll find those in the `cypress` directory. As you make changes, add to an existing file or create a new file in the `cypress/e2e` directory to test your changes.

We use [`@testing-library/cypress`](https://testing-library.com/cypress) for selecting elements on the page semantically.

To run these tests in development, run `npm run test:e2e:dev` which will start the dev server for the app as well as the Cypress client. Make sure the database is running in docker as described above.

We have a utility for testing authenticated features without having to go through the login flow:

```ts
cy.login();
// you are now logged in as a new user
```

We also have a utility to auto-delete the user at the end of your test. Just make sure to add this in each test file:

```ts
afterEach(() => {
  cy.cleanupUser();
});
```

That way, we can keep your local db clean and keep your tests isolated from one another.

### Vitest

For lower level tests of utilities and individual components, we use `vitest`. We have DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.

## Import svg

This project uses [React-SVGR](https://react-svgr.com/) to transform SVG Elements into React Elements, since React Elements are easier to use and type-safe.

Our conventions recommend adding SVG files to `public/svgs` and run

```sh
npm run svg
```

React components will be automatically created at `app/components/svgs`. There's a setup in [SVGR's docs for Remix](https://react-svgr.com/docs/remix/) but we decided not to use it since it requires using a Prettier plugin, which can possibly conflict with other Prettier plugins.

# Styling Guideline

## Animation

### Duration

- For short animation (small UI components):

```
duration-200
```

### Transition

- Recommended (almost all the cases):

```
ease-out
```

## Accessibility

- For keyboard-interaction input:

```
focus-visible:outline-[choose-your-color]
```

- For anything else (mouse/touchscreen):

```
focus:outline-[choose-your-color]
```

# TODO List

- Feature: Preview for markdowns
- Feature: error handling for inputs
- Feature: confirm modal on delete blog
- Feature: username for accounts
- Feature: Tag system for Blogs
- Restructure design system & tailwind config
- Feature: Permissions (admin, user, guest)
- Chore: Remove notes
- New page: All Links
- New page: Portfolio
- Feature: Embed Rick Astley to unauthorized access
- Feature: Blog Pagination
- Feature: Blog filter/sort
- Feature: Footer with contact
- Feature: Dark mode (dark/light/system)
- Feature: Responsive UI (3 breakpoints)
- New page: Reports and suggestions
- New page: Showcase
- New page: Landing page (replacement for current root page)
- Feature: Change favicon, metadata & try SEO optimizing
- Testing (cypress, vitest)
- Feature: Image hosting for Blog
- Feature: Mail collector - Subscription (Mailgun?)

# Coding Guideline

## Conventions

### Key for React Elements

```
`${componentName}-${itemId}`
```

For example, a Blog object in url `blog` will be rendered with the key:

```
`blog-${blog.id}`
```

## Quality Assurance

### User flows

#### Guest

- Sign up (join)
- Sign in
- See all blogs
- Read a blog

#### User

- **All Guest's flows**
- Sign out

#### Me

- **All User's flows**
- Post a blog
