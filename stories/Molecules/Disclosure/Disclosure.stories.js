import { DisclosureHtml } from './Disclosure';

export default {
    title: 'Molecules/Disclosure',
    parameters: {
        status: {
            type: 'stable',
        },
    },
    argTypes: {
        bindEscapeKey: {
            control: 'boolean',
            description: 'Close with ESC key.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            },
        },
        bindClickOutside: {
            control: 'boolean',
            description: 'Close by clicking outside',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            },
        },
    },
};

export const Disclosure = {
    args: {
        bindEscapeKey: false,
        bindClickOutside: false,
    },
    render: (args) => DisclosureHtml(args),
};
