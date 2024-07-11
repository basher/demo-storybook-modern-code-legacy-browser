import { FormHtml } from './Form';

export default {
    title: 'Templates/Form Example',
    parameters: {
        status: {
            type: 'stable',
        },
    },
};

export const Form = {
    render: () => FormHtml(),
};
