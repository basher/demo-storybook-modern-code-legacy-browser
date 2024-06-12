/** @type { import('@storybook/html').Preview } */
const preview = {
    parameters: {
        options: {
            storySort: {
            order: ['Components', 'Web Components'],
            },
        },
    },
};

export default preview;
