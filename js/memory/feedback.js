/*
NEXA V10
MODULE : MEMORY / FEEDBACK

Rôle :
Analyser la réaction de l'utilisateur
et transmettre cette information
à la mémoire et au système de progression.

Réactions :
like  → Intéressé
later → Plus tard
no    → Pas pour moi
*/

const NEXA_FEEDBACK = {

    TYPES: {

        LIKE: "like",

        LATER: "later",

        NO: "no"

    },

    submit(
        feedback,
        entryId = null
    ) {

        if (
            !this.isValid(feedback)
        ) {

            console.warn(
                "NEXA : feedback invalide"
            );

            return {

                success: false,

                feedback: null

            };

        }

        let id = entryId;

        if (!id) {

            const last =
                NEXA_MEMORY.getLast();

            if (last) {

                id = last.id;

            }

        }

        if (id) {

            NEXA_MEMORY.updateFeedback(

                id,

                feedback

            );

        }

        let newLevel = null;

        if (
            typeof NEXA_PROGRESSION
            !== "undefined"
        ) {

            newLevel =
                NEXA_PROGRESSION
                .processFeedback(
                    feedback
                );

        }

        return {

            success: true,

            feedback: feedback,

            level: newLevel,

            timestamp:
                new Date().toISOString()

        };

    },

    isValid(
        feedback
    ) {

        return [

            this.TYPES.LIKE,

            this.TYPES.LATER,

            this.TYPES.NO

        ].includes(
            feedback
        );

    },

    getMeaning(
        feedback
    ) {

        const meanings = {

            like:
                "Cette direction semble intéressante pour l'utilisateur.",

            later:
                "Cette direction pourrait être intéressante plus tard.",

            no:
                "Cette direction ne correspond probablement pas à l'utilisateur."

        };

        return meanings[
            feedback
        ] || "";

    }

};
