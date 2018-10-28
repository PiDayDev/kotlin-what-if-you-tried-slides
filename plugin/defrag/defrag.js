// Press D to disable all fragments. And again to enable them again.
var Defrag = ( function( Reveal, global ){

    var hasFrag = true;

    var classOn = 'fragment';
    var classOff = 'no-fragment';

    function defrag() {
        [...document.getElementsByClassName(classOn)].forEach(y => {
            y.classList.add(classOff);
            y.classList.remove(classOn);
        });
    }
    function refrag() {
        [...document.getElementsByClassName(classOff)].forEach(y => {
            y.classList.add(classOn);
            y.classList.remove(classOff);
        });
    }

    function toggleFrag() {
        if (hasFrag) defrag();
        else refrag();
        hasFrag = !hasFrag;
    }

    function installKeyBindings(){
        var config = Reveal.getConfig();
        var shortcut = 'D';
        if( !config.keyboard ){
            return;
        }
        var keyboard = config.keyboard === true ? {} : config.keyboard;
        keyboard[ shortcut.toUpperCase().charCodeAt( 0 ) ] = toggleFrag;

        Reveal.registerKeyboardShortcut( shortcut, 'Defrag' );
        Reveal.configure({
            keyboard: keyboard
        });
    }

    function installDependencyCallback( c ){
        var config = Reveal.getConfig();
        if( !config.dependencies.length ){
            // user configured no scripts so we can
            // run our callback immediately
            c();
        }else{
            var dep = config.dependencies[ config.dependencies.length - 1 ];
            var old_c = dep.callback;
            dep.callback = function(){
                if( old_c ){
                    old_c();
                }
                c();
            }
        }
    }

    function configure( o ){
    }

    function install(){
        installKeyBindings();
        installDependencyCallback( function(){

        });
    }

    install();

    return {
        configure: configure
    };

})( Reveal, window );