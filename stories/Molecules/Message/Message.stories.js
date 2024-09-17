import { MessageHtml } from './Message';

export default {
    title: 'Molecules/Message',
    parameters: {
        status: {
            type: 'stable',
        },
    },
    argTypes: {
        messageType: {
            control: 'select',
            options: ['info', 'error'],
            description: 'Message type.',
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: 'N/A' }
            },
        }
    },
};

export const Message = {
    render: (args) => MessageHtml(args),
};
