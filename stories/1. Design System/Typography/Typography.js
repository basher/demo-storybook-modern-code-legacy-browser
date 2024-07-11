const style = `
<style>
    * + * {
        margin-block-start: 1rem;
    }
</style>
`;

export const TypographyHtml = () => `
${style}
<p style="margin: 0; padding: 1rem; background: lightgoldenrodyellow;">
<b>NOTE:</b>
Default theme <code>font-family</code> in will be updated in "<code>theme1</code>".
</p>

<h1>Heading level 1 <br/>with line break to test line-height</h1>

<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, totam molestiae. Soluta voluptatem deleniti excepturi laudantium. Officia at repudiandae quo nulla reiciendis optio modi nemo.</p>

<h2>Heading level 2 <br/>with line break to test line-height</h2>

<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, totam molestiae. Soluta voluptatem deleniti excepturi laudantium. Officia at repudiandae quo nulla reiciendis optio modi nemo.</p>
`;
