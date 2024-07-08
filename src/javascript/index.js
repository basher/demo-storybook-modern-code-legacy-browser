// Import Sass entry file (whitelabel).
import '../../src/css/index.scss';

// Import Sass theme file(s).
import '../../src/css/theme1.scss';

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
