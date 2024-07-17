/**
 * Theme-specific Sass compilation.
 *
 * Allows us to pass a "theme" argument that replaces the "{{ theme }}" token in "index.scss" with correct client Sass theme override.
 * If an invalid or null theme is passed, "default" will be used.
 *
 * @param {string} %npm_config_theme% - UI theme name.
 *
 * @return {void}
 */

const fs = require('fs');
const colors = require('colors/safe');
const themes = require('./theme-config');

let theme = process.argv[2]; // Only passing 1 arg in Node cmd = theme name
const sassFile = `./src/css/index.scss`;
const sassFileTemplate = `./src/css/_index-template.scss`;
let result;

const writeThemeSass = data =>
    new Promise((resolve, reject) => {
        fs.writeFile(sassFile, data, { flag: 'w', encoding: 'utf8' }, err => {
            if (err) {
                reject(console.log(colors.red.bold('ui-theme:', err)));
            } else {
                resolve(console.log(`"${sassFile}" updated with correct theme`));
            }
        });
    });

const updateFromSassTemplate = (data, whichTheme) =>
    new Promise((resolve, reject) => {
        fs.copyFile(sassFileTemplate, sassFile, err => {
            if (err) {
                reject(console.log(colors.red.bold('ui-theme:', err)));
            } else {
                resolve(
                    console.log(`"${sassFile}" successfully updated from template`)
            );

            if (whichTheme === undefined) {
                console.log(
                    colors.red.bold(
                        `Invalid or null theme: ${whichTheme}. Using "default" theme instead...`
                    )
                );
                theme = 'default';
            }

            // Update Sass @imports in 'index.scss' with correct theme filepath
            result = data.replace(/{{ theme }}/g, theme);
            writeThemeSass(result);
            }
        });
    });

// Read Sass template.
const readThemeSass = () =>
    new Promise((resolve, reject) => {
        fs.readFile(sassFileTemplate, 'utf8', (err, data) => {
            if (err) {
                reject(console.log(colors.red.bold('ui-theme:', err)));
            } else {
                resolve(updateFromSassTemplate(data, themes[theme]));
            }
        });
    });

readThemeSass();
