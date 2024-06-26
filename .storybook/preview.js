/** @type { import('@storybook/html').Preview } */
const preview = {
    parameters: {
        options: {
            storySort: {
                order: ['Atoms', 'Molecules', 'Templates'],
            },
        },
    },
};

export default preview;
