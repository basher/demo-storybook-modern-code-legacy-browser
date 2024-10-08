export default class Disclosure {
    private disclosure: Element;
    private trigger: HTMLButtonElement | null;
    private content: HTMLElement | null;
    private bindEscapeKey?: boolean;
    private bindClickOutside?: boolean;

    constructor(disclosure: Element) {
        this.disclosure = disclosure;
        this.trigger = this.disclosure.querySelector('[data-trigger]');
        this.content = this.disclosure.querySelector('[data-content]');
        this.bindEscapeKey = this.disclosure.hasAttribute(
            'data-bind-escape-key',
        );
        this.bindClickOutside = this.disclosure.hasAttribute(
            'data-bind-click-outside',
        );

        this.init();
    }

    public static start(): void {
        const disclosureComponents = document.querySelectorAll(
            '[data-module="disclosure"]',
        );

        disclosureComponents.forEach((disclosure) => {
            const instance = new Disclosure(disclosure);
            return instance;
        });
    }

    private init(): void {
        if (!this.trigger || !this.content) return;

        this.setupA11y();

        this.trigger?.addEventListener('click', (e) => this.handleClick(e));

        // Handle (global) events which are not part of this component.
        document.addEventListener('keyup', (e) => this.handleGlobalKeyup(e));
        document.addEventListener('click', (e) => this.handleGlobalClick(e));
    }

    private setupA11y(): void {
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

    private randomString(string: string): string {
        const random = `${string}-${Math.random()
            .toString(36)
            .substring(2, 15)}`;

        return random;
    }

    private hideContent(e?: KeyboardEvent): void {
        if (this.trigger?.getAttribute('aria-expanded') === 'true') {
            this.trigger?.setAttribute('aria-expanded', 'false');
            this.content?.setAttribute('hidden', '');

            // Set keyboard :FOCUS on the trigger button.
            if (e?.type === 'keyup') {
                this.trigger?.focus();
            }
        }
    }

    private handleClick(e: MouseEvent): void {
        const target = e.currentTarget as HTMLElement;
        const isExpanded =
            target?.getAttribute('aria-expanded') === 'true' || false;

        target?.setAttribute('aria-expanded', Boolean(!isExpanded).toString());
        this.content?.toggleAttribute('hidden');
    }

    private handleGlobalKeyup(e: KeyboardEvent): void {
        if (this.bindEscapeKey && e.code === 'Escape') {
            this.hideContent(e);
        }
    }

    private handleGlobalClick(e: MouseEvent): void {
        if (this.bindClickOutside) {
            const target = e.target as HTMLElement;
            const insideButton = this.trigger?.contains(target);
            const insideContent = this.content?.contains(target);

            if (!insideButton && !insideContent) {
                this.hideContent();
            }
        }
    }
}
