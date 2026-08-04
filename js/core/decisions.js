/*
NEXA V10
MODULE : CORE / DECISIONS

Rôle :
Transformer une intention en une
prochaine action simple et concrète.

Principe NEXA :
Une intention → Une décision → Une action.
*/

const NEXA_DECISIONS = {

    generate(intentType, level = 1) {

        const plans = {

            CAREER: [

                {
                    title: "Définis ta direction.",
                    action: "Écris en une phrase le métier ou le domaine que tu aimerais explorer."
                },

                {
                    title: "Trouve une possibilité réelle.",
                    action: "Cherche aujourd'hui une seule offre ou opportunité qui correspond à ta direction."
                },

                {
                    title: "Teste une piste.",
                    action: "Identifie une personne qui travaille dans ce domaine et découvre comment elle a commencé."
                },

                {
                    title: "Identifie ce qui te manque.",
                    action: "Trouve une seule compétence nécessaire pour avancer vers cette direction."
                },

                {
                    title: "Passe à l'action.",
                    action: "Réalise aujourd'hui une action concrète qui te rapproche de cette opportunité."
                }

            ],

            PROJECT: [

                {
                    title: "Clarifie ton idée.",
                    action: "Résume ton projet en une seule phrase simple."
                },

                {
                    title: "Choisis l'essentiel.",
                    action: "Sélectionne une seule fonctionnalité indispensable à ton projet."
                },

                {
                    title: "Construis le minimum.",
                    action: "Imagine la version la plus simple possible de cette fonctionnalité."
                },

                {
                    title: "Teste ton idée.",
                    action: "Montre ton projet à une personne et demande-lui ce qu'elle en pense."
                },

                {
                    title: "Améliore selon la réalité.",
                    action: "Choisis une amélioration basée sur un retour réel et applique-la."
                }

            ],

            LEARNING: [

                {
                    title: "Choisis une compétence.",
                    action: "Sélectionne une seule compétence que tu veux réellement apprendre."
                },

                {
                    title: "Trouve une ressource.",
                    action: "Trouve une seule ressource gratuite pour commencer."
                },

                {
                    title: "Applique immédiatement.",
                    action: "Fais un exercice simple avec ce que tu viens d'apprendre."
                },

                {
                    title: "Crée quelque chose.",
                    action: "Utilise ta nouvelle compétence pour produire un petit résultat concret."
                },

                {
                    title: "Approfondis.",
                    action: "Identifie le prochain niveau de compétence que tu veux atteindre."
                }

            ],

            BLOCKED: [

                {
                    title: "Réduis le problème.",
                    action: "Transforme ton problème actuel en une seule question simple."
                },

                {
                    title: "Fais cinq minutes.",
                    action: "Choisis l'action la plus facile possible et fais-la pendant seulement cinq minutes."
                },

                {
                    title: "Ajoute un petit pas.",
                    action: "Une fois cette action terminée, choisis une seule petite action supplémentaire."
                },

                {
                    title: "Crée une routine.",
                    action: "Répète cette petite action à la même heure pendant quelques jours."
                },

                {
                    title: "Construis ton système.",
                    action: "Trouve une façon simple de rendre cette action automatique dans ton quotidien."
                }

            ],

            GOAL: [

                {
                    title: "Clarifie ton objectif.",
                    action: "Écris précisément le résultat que tu veux obtenir."
                },

                {
                    title: "Choisis une première victoire.",
                    action: "Définis le plus petit résultat qui te rapprocherait réellement de ton objectif."
                },

                {
                    title: "Passe à l'action.",
                    action: "Réalise aujourd'hui une action qui produit un résultat visible."
                },

                {
                    title: "Mesure ton progrès.",
                    action: "Note ce qui a changé depuis le début."
                },

                {
                    title: "Construis un système.",
                    action: "Crée une routine simple qui te permet de continuer à progresser."
                }

            ],

            DISCOVERY: [

                {
                    title: "Explore une possibilité.",
                    action: "Choisis une seule chose liée à ton idée et découvre quelque chose de nouveau à son sujet."
                },

                {
                    title: "Teste une hypothèse.",
                    action: "Trouve une façon simple de vérifier si ton idée pourrait fonctionner."
                },

                {
                    title: "Expérimente.",
                    action: "Réalise une petite expérience concrète aujourd'hui."
                },

                {
                    title: "Approfondis.",
                    action: "Explore une seule piste qui semble particulièrement intéressante."
                },

                {
                    title: "Choisis une direction.",
                    action: "Décide quelle piste mérite maintenant ton attention."
                }

            ]

        };

        const plan = plans[intentType] || plans.DISCOVERY;

        const safeLevel = Math.max(
            1,
            Math.min(Number(level) || 1, plan.length)
        );

        const decision = plan[safeLevel - 1];

        return {

            type: intentType,

            level: safeLevel,

            title: decision.title,

            action: decision.action,

            createdAt: new Date().toISOString()

        };

    }

};
