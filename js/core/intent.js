/*
NEXA V10
MODULE : CORE / INTENT

Rôle :
Analyse l'intention de l'utilisateur
et identifie la direction principale.

Ce module est indépendant du cerveau.
*/

const NEXA_INTENT = {

    analyze(input) {

        if (!input || !input.trim()) {

            return {
                type: "EMPTY",
                confidence: 0
            };

        }

        const text = input
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        const categories = {

            CAREER: [
                "travail",
                "emploi",
                "job",
                "metier",
                "carriere",
                "salaire",
                "argent",
                "recrutement",
                "candidature"
            ],

            PROJECT: [
                "projet",
                "application",
                "app",
                "business",
                "entreprise",
                "startup",
                "site",
                "creer"
            ],

            LEARNING: [
                "apprendre",
                "etudier",
                "formation",
                "competence",
                "cours",
                "apprentissage",
                "connaitre"
            ],

            BLOCKED: [
                "bloque",
                "blocage",
                "procrastine",
                "peur",
                "stress",
                "perdu",
                "difficile",
                "je ne sais pas"
            ],

            GOAL: [
                "objectif",
                "reussir",
                "changer",
                "ameliorer",
                "progresser",
                "avancer"
            ]

        };

        const scores = {};

        Object.keys(categories).forEach(type => {

            scores[type] = 0;

            categories[type].forEach(word => {

                if (text.includes(word)) {

                    scores[type]++;

                }

            });

        });

        let bestType = "DISCOVERY";
        let bestScore = 0;

        Object.keys(scores).forEach(type => {

            if (scores[type] > bestScore) {

                bestScore = scores[type];
                bestType = type;

            }

        });

        let confidence = "LOW";

        if (bestScore >= 3) {

            confidence = "HIGH";

        } else if (bestScore >= 1) {

            confidence = "MEDIUM";

        }

        return {

            type: bestType,

            confidence: confidence,

            score: bestScore,

            scores: scores,

            originalInput: input.trim()

        };

    }

};
