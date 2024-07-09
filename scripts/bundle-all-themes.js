/**
 * Bundles all themes for use by Storybook.
 *
 * @return {void}
 */

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const colors = require('colors/safe');
const themes = require('./theme-config');

async function buildTheme(key) {
    try {
        await exec(`npm run build:theme --theme=${key}`);
    } catch (e) {
        console.error(colors.red.bold('bundle-all-themes:', e));
    }
}

for (const [key] of Object.entries(themes)) {
    buildTheme(key);
}
