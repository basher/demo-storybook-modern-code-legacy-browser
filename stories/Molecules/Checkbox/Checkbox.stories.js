import { CheckboxHtml, CheckboxGroupHtml } from './Checkbox';

export default {
    title: 'Molecules/Checkbox',
    parameters: {
        status: {
            type: 'stable',
        },
    },
};

export const Checkbox = {
    render: () => CheckboxHtml(),
};

export const CheckboxGroup = {
    render: () => CheckboxGroupHtml(),
};
