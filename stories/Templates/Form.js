const style = `
<style>
    .message:not(:first-of-type) {
        margin-block: 1rem;
    }
</style>
`;

export const FormHtml = () => `
${style}
<div class="message message--error" id="checkbox_group-error">
    <p>Error message.</p>
</div>
<div class="message message--info">
    <p>Information message.</p>
</div>

<form class="form" action="#">
    <div class="form__field form__field--has-error">
        <fieldset class="fieldset">
            <legend class="legend">
                Checkbox group legend
            </legend>
            <div class="checkbox">
                <input
                    type="checkbox"
                    id="checkbox1"
                    class="checkbox__input"
                    aria-invalid="true"
                    aria-describedby="checkbox_group-error"
                />
                <label for="checkbox1" class="checkbox__label">Checkbox 1 label</label>
            </div>
            <div class="checkbox">
                <input
                    type="checkbox"
                    id="checkbox2"
                    class="checkbox__input"
                    aria-invalid="true"
                    aria-describedby="checkbox_group-error"
                />
                <label for="checkbox2" class="checkbox__label">Checkbox 2 label</label>
            </div>
            <div class="checkbox">
                <input
                    type="checkbox"
                    id="checkbox3"
                    class="checkbox__input"
                    aria-invalid="true"
                    aria-describedby="checkbox_group-error"
                />
                <label for="checkbox3" class="checkbox__label">Checkbox 3 label</label>
            </div>
        </fieldset>
    </div>

    <div>
        <button type="submit" class="button button--text button--primary">
            Submit
        </button>
    </div>
</form>
`;
