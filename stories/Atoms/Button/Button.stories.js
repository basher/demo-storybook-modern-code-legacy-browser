import { ButtonHtml } from './Button';

export default {
    title: 'Atoms/Button',
    parameters: {
        status: {
            type: 'stable',
        },
    },
    argTypes: {
        label: {
            control: 'text',
            description: 'Button label text.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Non-empty string' }
            },
        },
        buttonType: {
            control: 'select',
            options: ['primary', 'secondary'],
            description: 'Button style override.',
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: 'N/A' }
            },
        },
    },
};

export const TextButton = {
    args: {
        label: 'Button',
    },
    render: (args) => ButtonHtml(args),
};
