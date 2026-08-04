/*
NEXA V10
MODULE : AI / AI BRIDGE

Rôle :
Point de connexion entre NEXA
et un futur Agent IA.

Pour l'instant :
NEXA fonctionne en mode LOCAL.

Plus tard :
Ce module pourra connecter
une véritable IA via une API sécurisée.

IMPORTANT :
Aucune clé API secrète ne doit
être placée directement dans ce fichier.
*/

const NEXA_AI_BRIDGE = {

    status: "LOCAL_ONLY",

    provider: null,

    connected: false,


    /*
    =================================
    INITIALISATION
    =================================
    */

    init() {

        console.log(
            "NEXA AI BRIDGE : mode local actif."
        );

        return {

            success: true,

            status:
                this.status

        };

    },


    /*
    =================================
    CONNEXION FUTURE
    =================================
    */

    connect(provider) {

        if (
            !provider ||
            typeof provider
            !== "object"
        ) {

            return {

                success: false,

                error:
                    "INVALID_PROVIDER"

            };

        }

        this.provider =
            provider;

        this.connected =
            true;

        this.status =
            "AI_CONNECTED";


        return {

            success: true,

            status:
                this.status

        };

    },


    /*
    =================================
    ENVOI D'UNE DEMANDE À L'IA
    =================================
    */

    async request(context) {

        /*
        L'IA n'est pas encore connectée.
        */

        if (
            !this.connected ||
            !this.provider
        ) {

            return {

                success: false,

                mode:
                    "LOCAL",

                message:
                    "Aucun Agent IA connecté."

            };

        }


        /*
        Appel du futur Agent IA.
        */

        try {

            const response =

                await this.provider
                .think(context);


            return {

                success: true,

                mode:
                    "AI",

                response:
                    response

            };

        } catch (error) {

            console.error(

                "NEXA AI BRIDGE ERROR:",

                error

            );


            return {

                success: false,

                error:
                    "AI_REQUEST_FAILED"

            };

        }

    },


    /*
    =================================
    ÉTAT DU SYSTÈME
    =================================
    */

    getStatus() {

        return {

            status:
                this.status,

            connected:
                this.connected,

            provider:
                this.provider
                    ? "CONNECTED"
                    : "NONE"

        };

    }

};
