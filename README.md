# Demo Storybook with modern CSS/JS bundled for legacy browsers

This repo uses:
- Modern tooling (Parcel) to bundle SCSS & ES6+ for both modern & legacy browsers.
- Storybook/HTML to author UI components, leveraging the `autodocs` feature to auto-generate documentation.
- Custom Node scripts to (1) update UI theme, and (2) rename/move the hashed CSS/JS generated by build scripts into the appropriate production folder (`build/ui/[theme-name]/`).

> - NOTE: Storybook won't run in IE, but you can see the transpiled CSS/JS in the `public` folder (including `postcss` fixes and JS polyfills).

## Compile CSS/JS and watch for UI changes
> - NOTE: Use the correct Node version as listed in `.nvmrc`. If necessary, install Node Version Manager (NVM).

Run both the following commands in **separate terminal instances** in order to be able to compile CSS/JS and test the UI in Storybook.

1. `npm start` - Installs Node modules (if not already installed) and launches Parcel bundler with default UI theme (i.e. equivalent to `npm run start:theme --theme=default`).
2. `npm run storybook` - Launches Storybook/HTML component library.

### UI themes
- Theme-specific CSS is located in `src/css/_THEMES` folder.
- Valid UI theme names are located in `scripts/theme-config.js`.
- To change the theme in `DEV MODE`, stop the Parcel Node process with `CTRL+C`, and start new theme with `npm run start:theme --theme=[theme-name]`. This uses an NPM config variable in `.npmrc`. The new theme will work in Storybook.
- Themes can also be toggled in Storybook. See the Storybook section further down.

## Bundle CSS/JS for production without watch
- `npm run build:theme --theme=[theme-name]` - See the section further down for details of Parcel's differential bundling.

### Linking to compiled CSS/JS
- There is a difference between `development` and `production` environments in terms of the locations of the compiled CSS/JS.```
- The `<link>` and `<script>` tags in `.storybook/preview-head.html` use placeholders, which reference **environment variables** defined in `.env` files:
```
<link href="%STORYBOOK_CSS_PATH%" rel="stylesheet" />
<script defer src="%STORYBOOK_JS_PATH%"></script>
```

#### DEVELOPMENT
- Uses the Storybook dev server, with paths defined in `.env.development`:
```
STORYBOOK_CSS_PATH=index.css
STORYBOOK_JS_PATH=index.js
```

#### PRODUCTION
- Uses whatever build folder has been defined for the website / web application in `.env.production`:

```
STORYBOOK_CSS_PATH=build/ui/default/css/index.css
STORYBOOK_JS_PATH=build/ui/default/javascript/index.js
```

## Code authoring guidelines & accessibility
- All UI components are authored with **semantic HTML5** markup, which is **progressively enhanced** with JavaScript and `WAI-ARIA` as appropriate.

## Linting
This boilerplate provides lint configurations for both JavaScript and CSS.

### Linter configuration
- Install the following VSCode extensions:
    - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).
    - [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint).
    - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).
- Where appropriate, additional NPM packages have been installed according to the `parser`, `extends`, `plugins` and `rules` fields in these configs:
    - `.eslintrc.js`
    - `.stylelintrc`
    - `.prettierrc`

> NOTES:
> - `Eslint` errors will only be shown in VSCode if you open VSCode from the project root directory, not a parent directory.
> - In order for `.eslintignore` to work correctly, there's a custom `.vscode/settings.json` in the root directory which defines the correct working directory.
> - `Postcss` has been installed as a `devDependency`, otherwise `stylelint` throws type errors due to its own postcss dependencies.
> - The VSCode `stylelint` extension introduced changes that break the `stylelint v14` NPM package. To fix this, the following settings have been added in the custom VSCode `settings.json` file:
> ```
> "css.validate": false,
> "scss.validate": false,
> "stylelint.enable": true,
> "stylelint.validate": [
>     "scss",
>     "postcss"
> ]
> ```

### Git pre-commit hooks
Configured using `husky` and `lint-staged` to ensure no linting errors are committed to the remote codebase.

> NOTE:
> Run `npm run prepare` from `ui` directory to install husky shell script. Do this just ONCE after cloning the repo.

## Supported browsers
- The [default browserslist configuration](https://github.com/browserslist/browserslist#best-practices) has been extended in `package.json` to support IE11.
- Run `npx browserslist` to see a list of supported browsers.

## Parcel bundler
```
"start:parcel": "parcel watch src/javascript/index.js --hmr-port 1234 --target app"
```
- This command does not need to be explicitly run as `npm run start:theme --theme=[theme-name]` does it for you.
- See the `HMR` section further down for an explanation of the `--hmr-port 1234` argument.
- The `--target app` argument enables transpilation of both CSS and JS in **local DEV mode**. By default, Parcel only does this for production builds.

### JS transpilation and differential bundling
- There's no need for a `.babelrc` config. See [Parcel default Babel presets](https://parceljs.org/languages/javascript/#default-presets).
    - Note that `babel-eslint` has been [deprecated](https://github.com/babel/babel-eslint) in favour of `@babel/eslint-parser`.
    - `@typescript-eslint/parser` is also needed, due to TypeScript usage.
    - Parcel leverages the `browserslist` config in `package.json` to determine what level of transpilation to perform.
- The JS bundles contain non-transpiled `ES6+` code for modern browsers, and transpiled `ES5` code for legacy browsers. See [Parcel differential bundling](https://parceljs.org/features/targets/#differential-bundling).

### TypeScript
- Parcel [automatically transpiles TypeScript](https://parceljs.org/languages/typescript/).
    - The `typescript` NPM package is required for `ESLint` and `Prettier` to work together.
    - A `tsconfig.json` is needed, even if it's empty. Otherwise, TypeScript errors/warnings are not displayed in the editor.

### Polyfills
- A separate `polyfills` bundle is created for browsers that don't support the required features in `src/javascript/config/browser-supports-features.ts`.
- For demo purposes, `dialog-polyfill` has been added.

### Sass
- Sass compilation is done automatically.
    - If Parcel sees Sass files in the project, it automatically installs `@parcel/transformer-sass`.

### Dev dependencies
- There is no need for a `.babelrc` file with additional presets (e.g. `@babel/preset-env`) and plugins.

## Trouble-shooting bundling and build issues
- If bundling breaks, or UI is not updated (in DEV mode) to reflect latest CSS/JS changes:
    - Stop the Parcel Node process with `CTRL+C`.
    - `npm start` or `npm run start:theme --theme=[theme-name]`.

## Storybook/HTML component library

### Hot module reloading (HMR)
- The `start:parcel` NPM script mentioned earlier doesn't actually start the default Parcel server.
- Instead, it simply [watches files and defines a port for the HMR server](https://parceljs.org/features/cli/#parcel-watch-%3Centries%3E).
- This means that Storybook updates automatically with any CSS/JS changes.

### Re-ordering stories in sidebar navigation
- All stories and docs are ordered according to the `storySort` configuration in `ui/.storybook/preview.js`.

### Toggling UI themes in Storybook
- Use the `storybook-theme-switch-addon` button in the toolbar (paint brush icon).
- This works in local `DEV MODE` and in the published Storybook.
- Theme CSS file paths are defined in `.storybook/preview.js`.

### Build and publish Storybook
- `npm run publish-storybook` - Runs Parcel build (using the `default` theme) to bundle CSS/JS in the `public` folder, which then gets copied to `storybook-static` folder.
- This script also gets run in the Github pages workflow (`.github/static.yml`) to publish Storybook online.
- `npx http-server ./storybook-static` - Test Storybook production build on local server.

### Publish using GitHub pages
- Uses the workflow defined in `.github/workflows/static.yml`.
- Live Storybook URL = https://basher.github.io/demo-storybook-modern-code-legacy-browser/

## Additional required files in project root directory
- `.vscode/settings.json` defines the correct working directory for `.eslintignore` and `.stylelintrc`.
- `.editorconfig` ensures all code uses the same indentation.
