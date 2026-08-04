/*
NEXA V10
MODULE : IDENTITY / MEDIAPIPE DETECTOR

Rôle :
Adaptateur entre NEXA Identity Construct
et un moteur de détection faciale local.

Objectif :
Image
  ↓
Face Landmarker
  ↓
Landmarks
  ↓
Profil abstrait
  ↓
Avatar

Ce module ne reconnaît pas l'identité
d'une personne.

Il sert uniquement à obtenir des
repères géométriques pour personnaliser
un avatar.

Le moteur MediaPipe doit être chargé
par l'application principale avant
l'initialisation de ce module.
*/

const NEXA_MEDIAPIPE_DETECTOR = {

    landmarker: null,

    initialized: false,

    status: "NOT_INITIALIZED",


    /*
    =================================
    INITIALISATION
    =================================
    */

    init(landmarker) {

        if (!landmarker) {

            this.status =
                "LANDMARKER_MISSING";

            return {

                success: false,

                error:
                    "LANDMARKER_MISSING"

            };

        }


        this.landmarker =
            landmarker;

        this.initialized =
            true;

        this.status =
            "READY";


        return {

            success: true,

            status:
                this.status

        };

    },


    /*
    =================================
    DÉTECTION
    =================================
    */

    async detect(imageSource) {

        if (
            !this.initialized ||
            !this.landmarker
        ) {

            return {

                success: false,

                error:
                    "NOT_INITIALIZED"

            };

        }


        if (!imageSource) {

            return {

                success: false,

                error:
                    "NO_IMAGE"

            };

        }


        try {

            let result = null;


            /*
            Image HTML
            */

            if (
                imageSource
                instanceof
                HTMLImageElement
            ) {

                result =

                    this.landmarker
                    .detect(

                        imageSource

                    );

            }


            /*
            Vidéo HTML
            */

            else if (
                imageSource
                instanceof
                HTMLVideoElement
            ) {

                result =

                    this.landmarker
                    .detectForVideo(

                        imageSource,

                        performance.now()

                    );

            }


            /*
            Canvas
            */

            else if (
                imageSource
                instanceof
                HTMLCanvasElement
            ) {

                result =

                    this.landmarker
                    .detect(

                        imageSource

                    );

            }


            else {

                return {

                    success: false,

                    error:
                        "UNSUPPORTED_IMAGE_SOURCE"

                };

            }


            /*
            Aucun visage trouvé
            */

            if (
                !result ||
                !result.faceLandmarks ||
                !result.faceLandmarks.length
            ) {

                return {

                    success: false,

                    error:
                        "NO_FACE_DETECTED"

                };

            }


            /*
            Premier visage détecté.

            Pour l'avatar,
            nous utilisons uniquement
            les points nécessaires
            au profil visuel.
            */

            const landmarks =

                result
                .faceLandmarks[0];


            return {

                success: true,

                landmarks:

                    landmarks

            };


        } catch (error) {

            console.error(

                "MEDIAPIPE ERROR:",

                error

            );


            return {

                success: false,

                error:
                    "DETECTION_ERROR"

            };

        }

    },


    /*
    =================================
    STATUT
    =================================
    */

    getStatus() {

        return {

            initialized:
                this.initialized,

            status:
                this.status

        };

    },


    /*
    =================================
    RESET
    =================================
    */

    reset() {

        this.landmarker =
            null;

        this.initialized =
            false;

        this.status =
            "NOT_INITIALIZED";

    }

};
