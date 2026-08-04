/*
NEXA V10
MODULE : APP

Rôle :
Orchestrateur principal de NEXA.

Ce module connecte :

Interface
    ↓
Brain
    ↓
Intent
    ↓
Decision
    ↓
Memory
    ↓
Feedback
    ↓
Progression

Ce fichier ne contient pas le design.
Ce fichier ne contient pas la caméra.
Ce fichier ne contient pas l'IA.

Il coordonne les modules.
*/

const NEXA_APP = {

    version: "10.0.0",

    status: "READY",

    process(input) {

        /*
        1. Vérification
        */

        if (
            !input ||
            !input.trim()
        ) {

            return {

                success: false,

                error:
                    "EMPTY_INPUT"

            };

        }


        /*
        2. Analyse de l'intention
        */

        const intent =
            NEXA_INTENT.analyze(
                input
            );


        /*
        3. Récupération du niveau
        */

        const level =
            NEXA_PROGRESSION
            .getLevel();


        /*
        4. Génération de la décision
        */

        const decision =
            NEXA_DECISIONS.generate(

                intent.type,

                level

            );


        /*
        5. Création de l'entrée mémoire
        */

        const memoryEntry = {

            input:
                input.trim(),

            type:
                intent.type,

            level:
                level,

            title:
                decision.title,

            action:
                decision.action

        };


        /*
        6. Sauvegarde
        */

        const saved =
            NEXA_MEMORY.add(

                memoryEntry

            );


        /*
        7. Résultat final
        */

        return {

            success: true,

            entry:
                saved,

            intent:
                intent,

            decision:
                decision,

            level:
                level

        };

    },


    feedback(

        feedbackType,

        entryId = null

    ) {

        return NEXA_FEEDBACK.submit(

            feedbackType,

            entryId

        );

    },


    getState() {

        return {

            version:
                this.version,

            status:
                this.status,

            level:
                NEXA_PROGRESSION
                .getLevel(),

            memory:
                NEXA_MEMORY
                .getStats()

        };

    }

};
