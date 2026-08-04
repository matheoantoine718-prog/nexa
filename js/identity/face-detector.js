/*
NEXA V10
MODULE : IDENTITY / FACE DETECTOR

Rôle :
Gérer le moteur de détection faciale.

Ce module ne stocke aucune image.
Il sert uniquement de couche de connexion
entre NEXA et un futur moteur de détection
fonctionnant côté client.

Architecture :

Caméra / Galerie
        ↓
Face Detector
        ↓
Face Scan
        ↓
Profil abstrait
        ↓
Avatar
*/

const NEXA_FACE_DETECTOR = {

    status: "NOT_INITIALIZED",

    engine: null,

    initialized: false,


    /*
    =================================
    INITIALISATION
    =================================
    */

    async init(engine = null) {

        if (engine) {

            this.engine =
                engine;

            this.initialized =
                true;

            this.status =
                "ENGINE_CONNECTED";


            return {

                success: true,

                status:
                    this.status

            };

        }


        /*
        Aucun moteur externe connecté.
        */

        this.initialized =
            false;

        this.status =
            "WAITING_FOR_ENGINE";


        return {

            success: true,

            status:
                this.status,

            message:
                "Moteur de détection en attente."

        };

    },


    /*
    =================================
    VÉRIFIER LA DISPONIBILITÉ
    =================================
    */

    isReady() {

        return (

            this.initialized &&

            this.engine &&

            typeof
                this.engine.detect
            ===
                "function"

        );

    },


    /*
    =================================
    DÉTECTER UN VISAGE
    =================================
    */

    async detect(imageSource) {

        if (
            !imageSource
        ) {

            return {

                success: false,

                error:
                    "NO_IMAGE"

            };

        }


        /*
        Vérification du moteur
        */

        if (
            !this.isReady()
        ) {

            return {

                success: false,

                error:
                    "DETECTOR_NOT_READY",

                message:
                    "Le moteur de détection faciale n'est pas encore connecté."

            };

        }


        try {

            const result =

                await this.engine
                    .detect(

                        imageSource

                    );


            return {

                success: true,

                detection:
                    result

            };


        } catch (error) {

            console.error(

                "NEXA FACE DETECTOR ERROR:",

                error

            );


            return {

                success: false,

                error:
                    "DETECTION_FAILED"

            };

        }

    },


    /*
    =================================
    OBTENIR LE STATUT
    =================================
    */

    getStatus() {

        return {

            initialized:
                this.initialized,

            status:
                this.status,

            ready:
                this.isReady()

        };

    },


    /*
    =================================
    RÉINITIALISER
    =================================
    */

    reset() {

        this.engine =
            null;

        this.initialized =
            false;

        this.status =
            "NOT_INITIALIZED";

    }

};
