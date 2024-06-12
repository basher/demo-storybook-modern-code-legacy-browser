// Web Components.
import WebUIDisclosure from './web-components/webui-disclosure';

export const uiInit = () => {
    // Define Web Components
    !customElements.get('webui-disclosure') &&
        customElements.define('webui-disclosure', WebUIDisclosure);
};
