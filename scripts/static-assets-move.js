/**
 * Move files bundled by Parcel that are renamed by "static-assets-rename" script.
 *
 * @return {void}
 */

const fs = require('fs-extra');
const path = require('path');
const prodDirectoryPath = path.join(__dirname, '../build/ui');

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

// 1. Move file.
const moveFile = (file, type) => {
    let subFolder;
    if (type === 'js') {
        subFolder = 'javascript';
    }
    if (type === 'css') {
        subFolder = 'css';
    }

    fs.move(
        `${prodDirectoryPath}/${file}`,
        `${prodDirectoryPath}/${subFolder}/${file}`,
        (err) => {
            if (err) {
                return console.log(err);
            }
            console.log(`Successfully moved ${file}`);
        },
    );
};

readProdDirectory();
