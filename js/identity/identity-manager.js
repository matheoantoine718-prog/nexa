/*
NEXA V10
MODULE : IDENTITY / IDENTITY MANAGER

Rôle :
Coordonner l'ensemble du système
Identity Construct.

Architecture :

Galerie
   │
Caméra
   │
   ▼
Source Image
   │
   ▼
Face Detector
   │
   ▼
Face Scan
   │
   ▼
Profil Identité
   │
   ▼
Avatar
*/

const NEXA_IDENTITY_MANAGER = {

    status:
        "READY",

    lastSource:
        null,

    lastScan:
        null,


    /*
    =================================
    INITIALISATION
    =================================
    */

    init() {

        const identity =

            NEXA_IDENTITY
            .load();


        if (!identity) {

            NEXA_IDENTITY
                .create();

        }


        this.status =
            "READY";


        return {

            success:
                true,

            status:
                this.status

        };

    },


    /*
    =================================
    IMPORT GALERIE
    =================================
    */

    async importFromGallery(file) {

        const result =

            await NEXA_GALLERY
                .import(

                    file

                );


        if (
            !result.success
        ) {

            return result;

        }


        this.lastSource =
            "GALLERY";


        return {

            success:
                true,

            source:
                "GALLERY",

            image:
                result.image

        };

    },


    /*
    =================================
    CAPTURE CAMÉRA
    =================================
    */

    captureFromCamera(
        videoElement
    ) {

        const result =

            NEXA_CAMERA
                .capture(

                    videoElement

                );


        if (
            !result.success
        ) {

            return result;

        }


        this.lastSource =
            "CAMERA";


        return {

            success:
                true,

            source:
                "CAMERA",

            image:
                result.image

        };

    },


    /*
    =================================
    ANALYSE IDENTITÉ
    =================================
    */

    async analyze(
        image
    ) {

        if (!image) {

            return {

                success:
                    false,

                error:
                    "NO_IMAGE"

            };

        }


        /*
        Analyse faciale
        */

        const scan =

            await NEXA_FACE_SCAN
                .analyze(

                    image

                );


        if (
            !scan.success
        ) {

            return scan;

        }


        this.lastScan =
            scan.profile;


        /*
        Sauvegarde du profil
        */

        NEXA_IDENTITY
            .update({

                faceProfile:

                    scan.profile

            });


        return {

            success:
                true,

            profile:
                scan.profile

        };

    },


    /*
    =================================
    SAUVEGARDER AVATAR
    =================================
    */

    saveAvatar(
        image
    ) {

        if (!image) {

            return {

                success:
                    false,

                error:
                    "NO_AVATAR"

            };

        }


        NEXA_IDENTITY
            .setAvatar(

                image

            );


        return {

            success:
                true,

            avatar:
                image

        };

    },


    /*
    =================================
    PERSONNALISATION
    =================================
    */

    customize(
        config
    ) {

        const avatarConfig =

            NEXA_AVATAR
                .save(

                    config

                );


        return {

            success:
                true,

            config:
                avatarConfig

        };

    },


    /*
    =================================
    OBTENIR L'IDENTITÉ
    =================================
    */

    getIdentity() {

        return (

            NEXA_IDENTITY
                .load()

        );

    },


    /*
    =================================
    STATUT
    =================================
    */

    getStatus() {

        const identity =

            this.getIdentity();


        return {

            status:
                this.status,

            hasIdentity:
                !!identity,

            hasAvatar:
                !!(

                    identity &&

                    identity.avatar

                ),

            hasFaceProfile:
                !!(

                    identity &&

                    identity.faceProfile

                ),

            source:
                this.lastSource

        };

    }

};
