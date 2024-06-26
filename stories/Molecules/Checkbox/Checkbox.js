export const CheckboxHtml = () => `
<div class="checkbox">
    <input
        type="checkbox"
        id="checkbox"
        class="checkbox__input"
    />
    <label for="checkbox" class="checkbox__label">Checkbox label</label>
</div>
`;

export const CheckboxGroupHtml = () => `
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
            />
            <label for="checkbox1" class="checkbox__label">Checkbox 1 label</label>
        </div>
        <div class="checkbox">
            <input
                type="checkbox"
                id="checkbox2"
                class="checkbox__input"
            />
            <label for="checkbox2" class="checkbox__label">Checkbox 2 label</label>
        </div>
        <div class="checkbox">
            <input
                type="checkbox"
                id="checkbox3"
                class="checkbox__input"
            />
            <label for="checkbox3" class="checkbox__label">Checkbox 3 label</label>
        </div>
    </fieldset>
</div>
`;
