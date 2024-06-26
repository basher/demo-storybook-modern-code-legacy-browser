import { ButtonHtml } from './Button';

export default {
    title: 'Atoms/Button',
    parameters: {
        status: {
            type: 'stable',
        },
    },
    argTypes: {
        label: { control: 'text' },
        buttonType: {
            control: 'select',
            options: ['primary', 'secondary'],
        },
    },
};

export const TextButton = {
    args: {
        label: 'Button',
    },
    render: (args) => ButtonHtml(args),
};
