export default {
    title: 'Design System/Colours',
    parameters: {
        status: {
            type: 'stable',
        },
    },
    loaders: [
        () =>
            fetch('exported-colors.json')
                .then((r) => r.json())
                .then((json) => json),
    ],
};

const style = `
<style>
    /* Hides the 1st empty auto-generated output from 'exported-colors.json'. */
    div h2:first-of-type,
    .grid:first-of-type {
        display: none;
    }

    .grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, 12.5rem);
        margin-block: 1rem 2rem;
    }
    .grid li {
        border: 1px solid;
        border-radius: 0.125rem;
        display: flex;
        flex-direction: column;
        font-size: 0.875rem;
        padding: 0.25rem;
    }
    .grid span {
        word-break: break-all;
    }
    .styled {
        height: 4rem;
    }
</style>
`;

export const Colours = (args, { loaded }) => `
${style}
<div>
<p style="margin-block-end: 1rem; padding: 1rem; background: lightgoldenrodyellow;">
<b>NOTE:</b>
Default theme <code>$color-brand</code> in will be updated in "<code>theme1</code>".
</p>
${
    // Build story HTML from 'exported-colors.json'.
    Object.keys(loaded)
        .map(
            (section) => `
                <h2>
                    ${
                        section.charAt(0).toUpperCase() +
                        section.slice(1).replace(/-/g, ' ')
                    }
                </h2>
                <ul class="grid">
                    ${loaded[section]
                        .map(
                            (color) => `
                                <li>
                                    <span
                                        class="styled"
                                        style="background: ${color.compiledValue}">
                                    </span>
                                    <span>
                                        ${color.name}
                                    </span>
                                    <span></span>
                                </li>
                            `,
                        )
                        .join('')}
                </ul>
            `,
        )
        .join('')
}
</div>

${
    window.addEventListener('DOMContentLoaded',
        () => {
            const styledSpan = document.querySelectorAll('.styled');
            styledSpan.forEach((span) => {
                const spanStyle = span.style.background;
                const spanStyleValue = spanStyle.substring(
                    spanStyle.indexOf('--'),
                    spanStyle.length - 1,
                );

                const computedSpan = span.nextElementSibling.nextElementSibling;
                computedSpan.innerHTML = `${getComputedStyle(span).getPropertyValue(spanStyleValue)}`;
            });
        }
    )
}
`;
