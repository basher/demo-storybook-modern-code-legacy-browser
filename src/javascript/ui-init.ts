import Disclosure from './components/disclosure';

export const uiInit = () => {
    // 'postcss-logical' in conjunction with 'postcss-dir-pseudo-class' auto-generates [dir="ltr"] and [dir="rtl"] selectors in the compiled CSS. These act as fallbacks for older browsers that don't understand CSS logical properties. If <html dir="rtl"> has not been explicitly set, ensure that we programatically set default direction 'ltr' so that [dir="ltr"] CSS selector fires for older browsers:
    document.documentElement.dir = document.documentElement.dir || 'ltr';

    Disclosure.start();
};
