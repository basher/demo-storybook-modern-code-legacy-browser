/** @type { import('@storybook/html').Preview } */
const preview = {
    parameters: {
        options: {
            storySort: {
                order: ['Design System', 'Atoms', 'Molecules', 'Templates'],
            },
        },
    },
};

export default preview;
