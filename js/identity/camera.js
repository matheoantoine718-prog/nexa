/*
NEXA V10
MODULE : IDENTITY / CAMERA

Rôle :
Gérer la caméra frontale de l'utilisateur.

Fonctions :
- Vérifier la compatibilité
- Demander l'autorisation
- Démarrer la caméra
- Arrêter la caméra
- Capturer une image

IMPORTANT :
La caméra fonctionne uniquement si le navigateur
autorise l'accès et si la page est servie dans
un contexte sécurisé (HTTPS ou environnement local
compatible).
*/

const NEXA_CAMERA = {

    stream: null,

    active: false,


    /*
    =================================
    COMPATIBILITÉ
    =================================
    */

    isSupported() {

        return !!(

            navigator.mediaDevices &&

            typeof navigator
                .mediaDevices
                .getUserMedia ===
                "function"

        );

    },


    /*
    =================================
    DÉMARRER LA CAMÉRA
    =================================
    */

    async start(videoElement) {

        if (!videoElement) {

            return {

                success: false,

                error:
                    "VIDEO_ELEMENT_MISSING"

            };

        }


        if (
            !this.isSupported()
        ) {

            return {

                success: false,

                error:
                    "CAMERA_NOT_SUPPORTED"

            };

        }


        /*
        Évite de démarrer plusieurs
        flux simultanément.
        */

        if (this.active) {

            return {

                success: true,

                status:
                    "ALREADY_ACTIVE"

            };

        }


        try {

            this.stream =

                await navigator
                    .mediaDevices
                    .getUserMedia({

                        video: {

                            facingMode:
                                "user",

                            width: {

                                ideal:
                                    1280

                            },

                            height: {

                                ideal:
                                    1280

                            }

                        },

                        audio: false

                    });


            videoElement.srcObject =

                this.stream;


            await videoElement.play();


            this.active = true;


            return {

                success: true,

                status:
                    "CAMERA_ACTIVE"

            };


        } catch (error) {

            console.error(

                "NEXA CAMERA ERROR:",

                error

            );


            this.stop();


            return {

                success: false,

                error:
                    this.getErrorType(

                        error

                    )

            };

        }

    },


    /*
    =================================
    CAPTURE
    =================================
    */

    capture(videoElement) {

        if (
            !this.active ||
            !videoElement
        ) {

            return {

                success: false,

                error:
                    "CAMERA_NOT_ACTIVE"

            };

        }


        if (
            !videoElement.videoWidth
        ) {

            return {

                success: false,

                error:
                    "VIDEO_NOT_READY"

            };

        }


        const canvas =

            document
                .createElement(

                    "canvas"

                );


        canvas.width =

            videoElement
                .videoWidth;


        canvas.height =

            videoElement
                .videoHeight;


        const context =

            canvas.getContext(

                "2d"

            );


        context.drawImage(

            videoElement,

            0,

            0,

            canvas.width,

            canvas.height

        );


        const image =

            canvas.toDataURL(

                "image/jpeg",

                0.9

            );


        return {

            success: true,

            image:
                image

        };

    },


    /*
    =================================
    ARRÊTER
    =================================
    */

    stop() {

        if (this.stream) {

            this.stream
                .getTracks()
                .forEach(

                    track => {

                        track.stop();

                    }

                );

        }


        this.stream =

            null;


        this.active =

            false;

    },


    /*
    =================================
    ERREURS
    =================================
    */

    getErrorType(error) {

        if (!error) {

            return "UNKNOWN_ERROR";

        }


        switch (
            error.name
        ) {

            case
            "NotAllowedError":

                return
                    "PERMISSION_DENIED";


            case
            "NotFoundError":

                return
                    "NO_CAMERA_FOUND";


            case
            "NotReadableError":

                return
                    "CAMERA_IN_USE";


            case
            "SecurityError":

                return
                    "SECURITY_ERROR";


            default:

                return
                    "CAMERA_ERROR";

        }

    }

};
