/*
NEXA V10
MODULE : IDENTITY / FACE SCAN

Rôle :
Préparer l'analyse locale du visage
pour Identity Construct.

Le module fonctionne avec une couche
d'analyse interchangeable.

Objectif :
Image caméra
    ↓
Analyse locale
    ↓
Points / caractéristiques
    ↓
Profil abstrait
    ↓
Personnalisation Avatar

IMPORTANT :
Cette version ne réalise pas encore
de reconnaissance biométrique.

Elle prépare une architecture compatible
avec un futur moteur de détection faciale
fonctionnant côté client.
*/

const NEXA_FACE_SCAN = {

    status:
        "READY",

    detector:
        null,

    lastResult:
        null,


    /*
    =================================
    INITIALISATION
    =================================
    */

    init(detector = null) {

        if (
            detector
        ) {

            this.detector =
                detector;

            this.status =
                "DETECTOR_CONNECTED";

        } else {

            this.status =
                "LOCAL_ANALYSIS_READY";

        }


        return {

            success:
                true,

            status:
                this.status

        };

    },


    /*
    =================================
    ANALYSE
    =================================
    */

    async analyze(imageSource) {

        if (
            !imageSource
        ) {

            return {

                success:
                    false,

                error:
                    "NO_IMAGE"

            };

        }


        /*
        Si un détecteur externe
        compatible est connecté,
        nous l'utilisons.
        */

        if (
            this.detector &&
            typeof
                this.detector.analyze
            ===
                "function"
        ) {

            try {

                const result =

                    await this.detector
                        .analyze(

                            imageSource

                        );


                const profile =

                    this.createProfile(

                        result

                    );


                this.lastResult =
                    profile;


                return {

                    success:
                        true,

                    profile:
                        profile

                };

            } catch (error) {

                console.error(

                    "FACE SCAN ERROR:",

                    error

                );

            }

        }


        /*
        Mode local de secours.

        On ne fabrique pas de faux
        points biométriques.

        On retourne simplement
        un profil neutre indiquant
        que l'analyse avancée
        n'est pas encore disponible.
        */

        const fallback = {

            status:
                "ANALYSIS_PENDING",

            message:
                "Analyse faciale avancée non connectée.",

            features: null,

            createdAt:
                new Date()
                    .toISOString()

        };


        this.lastResult =
            fallback;


        return {

            success:
                true,

            profile:
                fallback

        };

    },


    /*
    =================================
    CRÉATION DU PROFIL
    =================================
    */

    createProfile(data = {}) {

        return {

            status:
                "ANALYZED",

            features:
                data.features ||
                null,

            landmarks:
                data.landmarks ||
                null,

            expression:
                data.expression ||
                null,

            quality:
                data.quality ||
                null,

            createdAt:
                new Date()
                    .toISOString()

        };

    },


    /*
    =================================
    DERNIER SCAN
    =================================
    */

    getLastResult() {

        return this.lastResult;

    },


    /*
    =================================
    RÉINITIALISER
    =================================
    */

    reset() {

        this.lastResult =
            null;

        this.status =
            "READY";

    }

};
