/*
NEXA V10
MODULE : IDENTITY / AVATAR

Rôle :
Gérer la personnalisation de l'avatar NEXA.

Ce module sépare :
- l'identité
- le style
- les paramètres visuels
- la génération future

L'avatar peut être modifié à tout moment.
*/

const NEXA_AVATAR = {

    styles: [

        "NEXA_ORIGINAL",

        "CYBER",

        "FUTURISTIC",

        "ANIME",

        "DIGITAL",

        "MINIMAL",

        "REALISTIC"

    ],


    /*
    =================================
    CONFIGURATION PAR DÉFAUT
    =================================
    */

    getDefaultConfig() {

        return {

            style:
                "NEXA_ORIGINAL",

            futurism:
                50,

            originality:
                50,

            energy:
                50,

            detail:
                50,

            colorIntensity:
                50

        };

    },


    /*
    =================================
    CRÉER UNE CONFIGURATION
    =================================
    */

    createConfig(data = {}) {

        const defaults =

            this.getDefaultConfig();


        return {

            ...defaults,

            ...data,

            futurism:

                this.normalize(
                    data.futurism ??
                    defaults.futurism
                ),

            originality:

                this.normalize(
                    data.originality ??
                    defaults.originality
                ),

            energy:

                this.normalize(
                    data.energy ??
                    defaults.energy
                ),

            detail:

                this.normalize(
                    data.detail ??
                    defaults.detail
                ),

            colorIntensity:

                this.normalize(
                    data.colorIntensity ??
                    defaults.colorIntensity
                )

        };

    },


    /*
    =================================
    NORMALISATION
    =================================
    */

    normalize(value) {

        const number =
            Number(value);


        if (
            Number.isNaN(number)
        ) {

            return 50;

        }


        return Math.max(

            0,

            Math.min(

                100,

                number

            )

        );

    },


    /*
    =================================
    GÉNÉRER UN PROFIL AVATAR
    =================================
    */

    generateProfile(config = {}) {

        const avatarConfig =

            this.createConfig(

                config

            );


        const identity =

            NEXA_IDENTITY
            .load();


        return {

            identityId:

                identity
                    ? identity.id
                    : NEXA_IDENTITY
                        .generateID(),

            config:

                avatarConfig,

            prompt:

                this.buildPrompt(

                    avatarConfig

                ),

            createdAt:

                new Date()
                    .toISOString()

        };

    },


    /*
    =================================
    CONSTRUIRE UNE DESCRIPTION
    =================================
    */

    buildPrompt(config) {

        return [

            "Create a unique digital avatar",

            "style: " +
                config.style,

            "futurism: " +
                config.futurism +
                "%",

            "originality: " +
                config.originality +
                "%",

            "energy: " +
                config.energy +
                "%",

            "detail: " +
                config.detail +
                "%",

            "color intensity: " +
                config.colorIntensity +
                "%",

            "original identity",

            "high quality",

            "unique visual signature"

        ].join(", ");

    },


    /*
    =================================
    SAUVEGARDER
    =================================
    */

    save(config) {

        const avatarConfig =

            this.createConfig(

                config

            );


        NEXA_IDENTITY.update({

            avatarConfig:

                avatarConfig

        });


        return avatarConfig;

    },


    /*
    =================================
    CHARGER
    =================================
    */

    load() {

        const identity =

            NEXA_IDENTITY
            .load();


        if (
            !identity ||
            !identity.avatarConfig
        ) {

            return this
                .getDefaultConfig();

        }


        return this.createConfig(

            identity.avatarConfig

        );

    },


    /*
    =================================
    RÉINITIALISER
    =================================
    */

    reset() {

        const defaults =

            this.getDefaultConfig();


        this.save(

            defaults

        );


        return defaults;

    }

};
