// Import Sass entry file ('default' theme).
import '../../src/css/index.scss';

// Import config and UI module initialisation.
import { browserSupportsAllFeatures } from './config/browser-supports-features';
import { uiInit } from './ui-init';

document.addEventListener('DOMContentLoaded', () => {
    if (browserSupportsAllFeatures()) {
        uiInit();
    } else {
        // Require 'promise' for Parcel, then dynamic import polyfills, then instantiate UI modules.
        require('core-js/es/promise');
        import('./utils/polyfills')
            .then(() => uiInit())
            .catch((e) => console.error(e));
    }
});
