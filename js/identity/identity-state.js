/*
NEXA V10
MODULE : IDENTITY / STATE

Rôle :
Centraliser l'état d'Identity Construct.

Permet à l'interface de savoir
exactement ce qui se passe.

États possibles :

IDLE
CAMERA_REQUESTING
CAMERA_ACTIVE
IMAGE_SELECTED
ANALYZING
ANALYZED
AVATAR_READY
ERROR
*/

const NEXA_IDENTITY_STATE = {

    current:
        "IDLE",

    error:
        null,

    data:
        {},


    /*
    =================================
    CHANGER D'ÉTAT
    =================================
    */

    set(state, data = {}) {

        this.current =
            state;

        this.error =
            null;

        this.data =
            data;


        console.log(

            "NEXA IDENTITY STATE:",

            state

        );


        return this.get();

    },


    /*
    =================================
    ERREUR
    =================================
    */

    setError(error) {

        this.current =
            "ERROR";

        this.error =
            error;


        console.error(

            "NEXA IDENTITY ERROR:",

            error

        );


        return this.get();

    },


    /*
    =================================
    OBTENIR L'ÉTAT
    =================================
    */

    get() {

        return {

            state:
                this.current,

            error:
                this.error,

            data:
                this.data

        };

    },


    /*
    =================================
    VÉRIFICATIONS
    =================================
    */

    isIdle() {

        return (

            this.current ===
            "IDLE"

        );

    },


    isCameraActive() {

        return (

            this.current ===
            "CAMERA_ACTIVE"

        );

    },


    isAnalyzing() {

        return (

            this.current ===
            "ANALYZING"

        );

    },


    isReady() {

        return (

            this.current ===
            "AVATAR_READY"

        );

    },


    /*
    =================================
    RESET
    =================================
    */

    reset() {

        this.current =
            "IDLE";

        this.error =
            null;

        this.data =
            {};

    }

};
