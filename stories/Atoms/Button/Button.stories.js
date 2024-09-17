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
            table: { defaultValue: { summary: 'Any non-empty string' } },
        },
        buttonType: {
            control: 'select',
            options: ['primary', 'secondary'],
            description: 'Button style override.',
            table: { defaultValue: { summary: 'N/A' } },
        },
    },
};

export const TextButton = {
    args: {
        label: 'Button',
    },
    render: (args) => ButtonHtml(args),
};
