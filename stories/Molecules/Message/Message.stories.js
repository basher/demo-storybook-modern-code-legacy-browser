import { MessageHtml } from './Message';

export default {
    title: 'Molecules/Message>',
    parameters: {
        status: {
            type: 'stable',
        },
    },
    argTypes: {
        notificationType: {
            control: 'select',
            options: ['info', 'error'],
        }
    },
};

export const Message = {
    render: (args) => MessageHtml(args),
};
