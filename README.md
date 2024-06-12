# Demo Storybook with modern CSS/JS bundled for legacy browsers

## Compile and watch for UI changes
> - Use the correct Node version as listed in `.nvmrc`. If necessary, install Node Version Manager (NVM).

Run both the following commands in **separate terminal instances** in order to be able to compile CSS/JavaScript and test the UI in Storybook.

- `npm start` - Installs Node modules (if not already installed) and launches Parcel bundler.
- `npm run storybook` - Launches Storybook/HTML component library.

## Bundle CSS/JavaScript for production without watch
- `npm run build` - See below for more details about Parcel's differential bundling.

### Linking to compiled CSS/JavaScript
There is a difference between `development` and `production` environments in terms of the locations of the compiled CSS/JavaScript.

#### DEVELOPMENT
Uses the Storybook dev server.
```
<link rel="stylesheet" href="http://localhost:6006/index.css">
```
```
<script src="http://localhost:6006/index.js"></script>
```

#### PRODUCTION
Uses whatever build folder has been defined for the web application.
```
<link rel="stylesheet" href="/path/to/build/folder/app/css/index.css">
```
```
<script defer type="module" src="/path/to/build/folder/app/javascript/index.js"></script>
<script defer nomodule src="/path/to/build/folder/app/javascript/legacy.js"></script>
```

## Supported browsers
- The [default browserslist configuration](https://github.com/browserslist/browserslist#best-practices) has been extended in `package.json` to support IE10-11.
- Run `npx browserslist` to see a list of supported browsers.

## Parcel bundler
```
"start:parcel": "parcel watch src/javascript/index.js --hmr-port 1234 --target app"
```
- The command above starts the Parcel server, but it does not need to be run as `npm start` does it.
- See the `HMR` section further down for an explanation of the `--hmr-port 1234` argument.
- The `--target app` argument enables transpilation of both CSS and JavaScript in **local DEV mode**. By default, Parcel only does this for production builds.

### JavaScript transpilation and differential bundling
- See [Parcel default Babel presets](https://parceljs.org/languages/javascript/#default-presets).
- See [Parcel differential bundling](https://parceljs.org/features/targets/#differential-bundling).

### Polyfills
- A separate `polyfills` bundle is created for browsers that don't support the required features in `src/javascript/config/browser-supports-features.js`.

### Sass
- Sass compilation is done automatically.
    - If Parcel sees Sass files in the project, it automatically installs `@parcel/transformer-sass`.

### Dev dependencies
- There is no need for a `.babelrc` file with additional presets (e.g. `@babel/preset-env`) and plugins.

## Storybook/HTML component library

### Hot module reloading (HMR)
- The `start:parcel` NPM script mentioned earlier doesn't actually start the default Parcel server.
- Instead, it simply [watches files and defines a port for the HMR server](https://parceljs.org/features/cli/#parcel-watch-%3Centries%3E).
- This means that Storybook updates automatically with any CSS/JavaScript changes.

### Re-ordering stories in sidebar navigation
- All stories and docs are ordered according to the `storySort` configuration in `ui/.storybook/preview.js`.

## Trouble-shooting bundling and build issues
- If bundling breaks, or UI is not updated (in DEV mode) to reflect latest CSS/JavaScript changes:
    - Kill the Parcel Node process with `CTRL+C`.
    - Run `npm start` again.


## Build and publish Storybook
- `npm run publish-storybook` - this runs a Parcel build to bundle CSS/JavaScript in the `public` folder, as defined in `.storybook/main.js`.
- `npx http-server ./storybook-static` - to test production build on local server.

## Additional required files in project root directory
- `.editorconfig` ensures all code uses the same indentation.

## Out of scope
- No TypeScript.
- No Stylelint, Eslint, Prettier.
- No Git commit hooks (Husky).
