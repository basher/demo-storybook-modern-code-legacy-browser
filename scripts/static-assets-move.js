/**
 * Move files bundled by Parcel that are renamed by "static-assets-rename" script.
 *
 * @return {void}
 */

const fs = require('fs-extra');
const path = require('path');

const theme = process.argv[2]; // Only passing 1 arg in Node cmd = theme name
const prodDirectoryPath = path.join(__dirname, `../build/ui`);

// 1. Read the renamed files in PRODUCTION folder.
const readProdDirectory = () => {
    fs.readdir(prodDirectoryPath, (err, files) => {
        if (err) {
            return console.log(err);
        }

        files.forEach((file) => {
            let fileType;

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
    let subFolder;
    if (fileType === 'js') {
        // Ignore unwanted "runtime" JS files.
        if (fileType === 'js' && file.indexOf('runtime') > -1) {
            return;
        }

        subFolder = `${theme}/javascript`;
    }
    if (fileType === 'css') {
        subFolder = `${theme}/css`;
    }

    fs.move(
        `${prodDirectoryPath}/${file}`,
        `${prodDirectoryPath}/${subFolder}/${file}`,
        (err) => {
            if (err) {
                return console.log(err);
            } else {
                console.log(`Successfully moved ${file}`);
            }
        },
    );
};

readProdDirectory();
