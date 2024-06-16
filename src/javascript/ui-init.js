import Disclosure from './components/disclosure';
import WebUIDisclosure from './web-components/webui-disclosure';

export const uiInit = () => {
    Disclosure.start();
    // Define Web Components
    !customElements.get('webui-disclosure') &&
        customElements.define('webui-disclosure', WebUIDisclosure);
};
