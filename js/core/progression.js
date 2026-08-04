/*
NEXA V10
MODULE : CORE / PROGRESSION

Rôle :
Gérer le niveau de progression de l'utilisateur.

Niveaux :
1 → Découverte
2 → Exploration
3 → Expérimentation
4 → Construction
5 → Autonomie

Ce module ne gère pas l'interface.
Il gère uniquement la logique de progression.
*/

const NEXA_PROGRESSION = {

    MIN_LEVEL: 1,

    MAX_LEVEL: 5,

    getLevel() {

        const saved =
            localStorage.getItem("NEXA_USER_LEVEL");

        const level =
            Number(saved);

        if (!level || level < this.MIN_LEVEL) {

            return this.MIN_LEVEL;

        }

        return Math.min(
            level,
            this.MAX_LEVEL
        );

    },

    setLevel(level) {

        const safeLevel = Math.max(

            this.MIN_LEVEL,

            Math.min(
                Number(level) || this.MIN_LEVEL,
                this.MAX_LEVEL
            )

        );

        localStorage.setItem(

            "NEXA_USER_LEVEL",

            safeLevel.toString()

        );

        return safeLevel;

    },

    increase() {

        const current =
            this.getLevel();

        return this.setLevel(

            current + 1

        );

    },

    decrease() {

        const current =
            this.getLevel();

        return this.setLevel(

            current - 1

        );

    },

    processFeedback(feedback) {

        const current =
            this.getLevel();

        if (feedback === "like") {

            return this.setLevel(

                current + 1

            );

        }

        if (feedback === "no") {

            return this.setLevel(

                current - 1

            );

        }

        return current;

    },

    getLabel(level = this.getLevel()) {

        const labels = {

            1: "DÉCOUVERTE",

            2: "EXPLORATION",

            3: "EXPÉRIMENTATION",

            4: "CONSTRUCTION",

            5: "AUTONOMIE"

        };

        return labels[level] || labels[1];

    },

    getProgress(level = this.getLevel()) {

        return (

            level /

            this.MAX_LEVEL

        ) * 100;

    }

};
