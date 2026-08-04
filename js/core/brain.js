/*
NEXA V10
MODULE : CORE / BRAIN

Rôle :
Le cerveau central de NEXA.

Responsabilités :
- Recevoir une intention
- Analyser l'intention
- Consulter la mémoire
- Déterminer le niveau
- Générer une décision
- Préparer les données pour l'Agent IA futur

Le cerveau ne gère PAS :
- le HTML
- le CSS
- la caméra
- l'avatar
- l'affichage

Il coordonne uniquement l'intelligence.
*/

const NEXA_BRAIN = {

    version: "10.0.0",

    mode: "LOCAL",

    aiConnected: false,


    /*
    =================================
    PENSÉE PRINCIPALE
    =================================
    */

    think(input) {

        /*
        Vérification
        */

        if (
            !input ||
            !input.trim()
        ) {

            return {

                success: false,

                error:
                    "EMPTY_INPUT",

                message:
                    "Aucune intention reçue."

            };

        }


        /*
        Nettoyage
        */

        const cleanInput =
            input.trim();


        /*
        Analyse de l'intention
        */

        const intent =
            NEXA_INTENT.analyze(

                cleanInput

            );


        /*
        Niveau utilisateur
        */

        const level =
            NEXA_PROGRESSION
            .getLevel();


        /*
        Mémoire existante
        */

        const memory =
            NEXA_MEMORY
            .getAll();


        /*
        Dernières interactions
        */

        const recentMemory =
            memory
            .slice(-5);


        /*
        Génération de décision
        */

        const decision =
            NEXA_DECISIONS.generate(

                intent.type,

                level

            );


        /*
        Création du contexte
        */

        const context = {

            input:
                cleanInput,

            intent:
                intent,

            level:
                level,

            recentMemory:
                recentMemory,

            decision:
                decision

        };


        /*
        Résultat du cerveau
        */

        return {

            success: true,

            engine:
                "NEXA_BRAIN",

            version:
                this.version,

            mode:
                this.mode,

            aiConnected:
                this.aiConnected,

            context:
                context,

            output: {

                title:
                    decision.title,

                action:
                    decision.action,

                type:
                    intent.type,

                level:
                    level

            }

        };

    },


    /*
    =================================
    MÉMOIRE DU CERVEAU
    =================================
    */

    getMemoryContext() {

        const memory =
            NEXA_MEMORY
            .getAll();


        return {

            total:
                memory.length,

            recent:
                memory
                .slice(-10)

        };

    },


    /*
    =================================
    CONNEXION FUTURE À L'AGENT IA
    =================================
    */

    connectAI(agent) {

        if (
            !agent ||
            typeof agent !==
            "object"
        ) {

            console.warn(

                "NEXA : Agent IA invalide."

            );

            return false;

        }


        this.aiConnected = true;

        this.aiAgent = agent;


        return true;

    },


    /*
    =================================
    MODE AGENT IA
    =================================
    */

    async thinkWithAI(input) {

        /*
        Si aucun Agent IA n'est connecté,
        NEXA utilise son cerveau local.
        */

        if (
            !this.aiConnected ||
            !this.aiAgent
        ) {

            return this.think(

                input

            );

        }


        /*
        Préparation du contexte
        */

        const context = {

            input:
                input,

            memory:
                this.getMemoryContext(),

            level:
                NEXA_PROGRESSION
                .getLevel()

        };


        /*
        Appel futur de l'Agent IA
        */

        try {

            const response =

                await this.aiAgent.think(

                    context

                );


            return {

                success: true,

                engine:
                    "AI_AGENT",

                response:
                    response

            };

        } catch (error) {

            console.error(

                "NEXA AI ERROR:",

                error

            );


            /*
            Retour automatique
            au cerveau local
            */

            return this.think(

                input

            );

        }

    }

};
