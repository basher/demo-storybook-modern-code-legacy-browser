/**
 * Move files bundled by Parcel that are renamed by "static-assets-rename" script.
 *
 * Allows us to pass a "theme" argument.
 * If an invalid or null theme is passed, default "whitelabel" will be used.
 *
 * @param {string} %npm_config_theme% - UI theme name.
 *
 * @return {void}
 */

const fs = require('fs-extra');
const path = require('path');
const colors = require('colors/safe');
const themes = require('./theme-config');

const theme = process.argv[2]; // Only passing 1 arg in Node cmd = theme name
const prodDirectoryPath = path.join(__dirname, `../public/build/ui`);

// 1. Read the renamed files in PRODUCTION folder.
const readProdDirectory = () => {
    fs.readdir(prodDirectoryPath, (err, files) => {
        if (err) {
            return console.log(colors.red.bold('static-assets-move:', err));
        }

        files.forEach((file) => {
            let fileType;

            // Ignore folders (i.e. other themes).
            if (file.indexOf('.') < 0) {
                return;
            }

            // Ignore HTML file used for Parcel build.
            if (file.indexOf('html') >= 0) {
                return;
            }

            if (file.indexOf('js') >= 0) {
                fileType = 'js';
            }

            if (file.indexOf('css') >= 0) {
                fileType = 'css';
            }

            // Fonts need to be in same folder as CSS.
            if (file.indexOf('woff') >= 0 || file.indexOf('ttf') >= 0) {
                fileType = 'css';
            }

            moveFile(file, fileType);
        });
    });
};

// 2. Move file.
const moveFile = (file, fileType) => {
    // Default to "whitelabel" if invalid theme is supplied.
    let themeName = themes[theme] !== undefined
        ? theme
        : 'whitelabel';
    let themeFolder = `${prodDirectoryPath}/${themeName}`;

    if (fileType === 'js') {
        // Ignore unwanted "runtime" JS files.
        if (fileType === 'js' && file.indexOf('runtime') > -1) {
            return;
        }
        themeFolder = `${themeFolder}/javascript`;
    }

    if (fileType === 'css') {
        themeFolder = `${themeFolder}/css`;
    }

    fs.move(
        `${prodDirectoryPath}/${file}`,
        `${themeFolder}/${file}`,
        (err) => {
            if (err) {
                return console.log(colors.red.bold('static-assets-move:', err));
            } else {
                console.log(`Successfully moved ${file}`);
            }
        },
    );
};

readProdDirectory();
