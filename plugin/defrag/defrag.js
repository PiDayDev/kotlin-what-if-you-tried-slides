// Press V to view all fragments in current slide
const Defrag = (function (Reveal, global) {

    function skipToLastFragment() {
        let {h, v} = Reveal.getIndices();
        Reveal.slide(h, v, +Infinity);
    }

    function installKeyBindings() {
        const config = Reveal.getConfig();
        const shortcut = 'V';
        if (!config.keyboard) {
            return;
        }
        const keyboard = config.keyboard === true ? {} : config.keyboard;
        keyboard[shortcut.toUpperCase().charCodeAt(0)] = skipToLastFragment;

        Reveal.registerKeyboardShortcut(shortcut, 'Defrag');
        Reveal.configure({
            keyboard: keyboard
        });
    }

    function configure(o) {
    }

    function install() {
        installKeyBindings();
    }

    install();

    return {
        configure: configure
    };

})(Reveal, window);