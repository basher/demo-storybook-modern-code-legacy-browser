export default class WebUIDisclosure extends HTMLElement {
    constructor() {
        super();

        this.trigger = this.querySelector('[data-trigger]');
        this.content = this.querySelector('[data-content]');
        this.bindEscapeKey = this.hasAttribute('data-bind-escape-key');
        this.bindClickOutside = this.hasAttribute('data-bind-click-outside');

        if (!this.trigger || !this.content) return;

        this.setupA11y();

        this.trigger?.addEventListener('click', this);
    }

    setupA11y() {
        this.trigger?.removeAttribute('hidden');
        this.trigger?.setAttribute('aria-expanded', 'false');
        this.content?.setAttribute('hidden', '');

        // Auto-generate unique 'id' and 'aria-controls' attributes, using button 'parentElement' className or nodeName as a sensible prefix.
        if (this.trigger?.parentElement) {
            const unique = this.randomString(
                this.trigger.parentElement.classList[0] ||
                    this.trigger.parentElement.nodeName.toLowerCase(),
            );
            this.content?.setAttribute('id', unique);
            this.trigger.setAttribute('aria-controls', unique);
        }
    }

    randomString(string) {
        const random = `${string}-${Math.random()
            .toString(36)
            .substring(2, 15)}`;

        return random;
    }

    hideContent(e) {
        if (this.trigger?.getAttribute('aria-expanded') === 'true') {
            this.trigger?.setAttribute('aria-expanded', 'false');
            this.content?.setAttribute('hidden', '');

            // Set keyboard :FOCUS on the trigger button.
            if (e?.type === 'keyup') {
                this.trigger?.focus();
            }
        }
    }

    handleGlobalKeyup(e) {
        if (this.bindEscapeKey && e.code === 'Escape') {
            this.hideContent(e);
        }
    }

    handleGlobalClick(e) {
        if (this.bindClickOutside) {
            const target = e.target;
            const insideButton = this.trigger?.contains(target);
            const insideContent = this.content?.contains(target);

            if (!insideButton && !insideContent) {
                this.hideContent();
            }
        }
    }

    // Handle constructor() event listeners.
    handleEvent(e) {
        const target = e.currentTarget;
        const isExpanded =
            target?.getAttribute('aria-expanded') === 'true' || false;

        target?.setAttribute('aria-expanded', Boolean(!isExpanded).toString());
        this.content?.toggleAttribute('hidden');
    }

    // Handle (global) event listeners which are not part of this web component.
    connectedCallback() {
        document.addEventListener('keyup', (e) =>
            this.handleGlobalKeyup(e),
        );
        document.addEventListener('click', (e) =>
            this.handleGlobalClick(e),
        );
    }

    disconnectedCallback() {
        document.removeEventListener('keyup', this.handleGlobalKeyup);
        document.removeEventListener('click', this.handleGlobalClick);
    }
}
