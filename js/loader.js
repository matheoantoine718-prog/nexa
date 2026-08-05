/*
NEXA V10
MODULE LOADER

Charge les modules NEXA
dans le bon ordre.

IMPORTANT :
Les dépendances sont chargées
avant les modules qui les utilisent.
*/

(function () {

    "use strict";


    const modules = [

        /*
        =========================
        CORE
        =========================
        */

       /*
=========================
MEMORY
=========================
*/

"js/memory/memory.js",

"js/memory/feedback.js",


/*
=========================
CORE
=========================
*/

"js/core/intent.js",

"js/core/decisions.js",

"js/core/progression.js",

"js/core/context.js",

"js/core/brain.js",


        /*
        =========================
        AI
        =========================
        */

        "js/ai/ai-bridge.js",


        /*
        =========================
        IDENTITY
        =========================
        */

        "js/identity/identity.js",

        "js/identity/gallery.js",

        "js/identity/camera.js",

        "js/identity/avatar.js",

        "js/identity/face-scan.js",

        "js/identity/face-detector.js",

        "js/identity/mediapipe-detector.js",

       "js/identity/identity-manager.js",

"js/identity/identity-state.js",

"js/app.js"

];

    /*
    =================================
    CHARGER UN MODULE
    =================================
    */

    function loadScript(src) {

        return new Promise(

            (resolve, reject) => {

                const script =

                    document
                        .createElement(
                            "script"
                        );


                script.src =
                    src;

                script.async =
                    false;


                script.onload = () => {

                    console.log(

                        "NEXA MODULE LOADED:",

                        src

                    );


                    resolve();

                };


                script.onerror = () => {

                    console.error(

                        "NEXA MODULE ERROR:",

                        src

                    );


                    reject(

                        new Error(

                            "Impossible de charger " +
                            src

                        )

                    );

                };


                document
                    .head
                    .appendChild(

                        script

                    );

            }

        );

    }


    /*
    =================================
    CHARGEMENT SÉQUENTIEL
    =================================
    */

    async function loadAll() {

        try {

            for (
                const module
                of modules
            ) {

                await loadScript(

                    module

                );

            }


            console.log(

                "NEXA : tous les modules sont chargés."

            );


            /*
            Événement global
            */

            window
                .dispatchEvent(

                    new Event(

                        "NEXA_READY"

                    )

                );


        } catch (error) {

            console.error(

                "NEXA LOADER ERROR:",

                error

            );


            window
                .dispatchEvent(

                    new CustomEvent(

                        "NEXA_ERROR",

                        {

                            detail:
                                error

                        }

                    )

                );

        }

    }


    /*
    =================================
    DÉMARRAGE
    =================================
    */
console.log("=== NEXA LOADER START ===");
console.log(modules);
    loadAll()
.then(()=>{

    alert("NEXA LOADER COMPLET");

})
.catch(error=>{

    console.error(error);

});