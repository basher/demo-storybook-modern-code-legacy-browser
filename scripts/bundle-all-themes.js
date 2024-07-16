/**
 * Bundles all themes for use by Storybook.
 *
 * @return {void}
 */

const { exec } = require('node:child_process');
const themes = require('./theme-config');

let strNpm = '';
for (const [key] of Object.entries(themes)) {
    strNpm += `npm run build:theme --theme=${key} && `;
}

// strNpm = strNpm.substring(0, strNpm.lastIndexOf('&&') - 1);
strNpm = 'npm run build:theme --theme=theme1';
exec(strNpm);
