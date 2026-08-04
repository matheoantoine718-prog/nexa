/*
NEXA V10
MODULE : IDENTITY / IDENTITY CONSTRUCT

Rôle :
Gérer l'identité numérique personnalisée
de l'utilisateur.

Ce module stocke uniquement les informations
nécessaires à l'identité NEXA.

Les images restent localement dans le navigateur.
*/

const NEXA_IDENTITY = {

    STORAGE_KEY: "NEXA_IDENTITY_V10",

    create(data = {}) {

        const identity = {

            id:
                data.id ||
                this.generateID(),

            avatar:
                data.avatar ||
                null,

            style:
                data.style ||
                "NEXA_ORIGINAL",

            futurism:
                data.futurism ||
                50,

            originality:
                data.originality ||
                50,

            energy:
                data.energy ||
                50,

            createdAt:
                data.createdAt ||
                new Date().toISOString(),

            updatedAt:
                new Date().toISOString()

        };

        this.save(identity);

        return identity;

    },


    generateID() {

        return (

            "NEXA-" +

            Math.random()
                .toString(36)
                .substring(2, 10)
                .toUpperCase()

        );

    },


    save(identity) {

        try {

            localStorage.setItem(

                this.STORAGE_KEY,

                JSON.stringify(identity)

            );

            return true;

        } catch (error) {

            console.error(

                "NEXA IDENTITY ERROR:",

                error

            );

            return false;

        }

    },


    load() {

        try {

            const saved =

                localStorage.getItem(

                    this.STORAGE_KEY

                );


            if (!saved) {

                return null;

            }


            return JSON.parse(

                saved

            );

        } catch (error) {

            console.error(

                "NEXA IDENTITY LOAD ERROR:",

                error

            );

            return null;

        }

    },


    update(changes = {}) {

        const current =
            this.load() ||
            this.create();


        const updated = {

            ...current,

            ...changes,

            updatedAt:
                new Date().toISOString()

        };


        this.save(

            updated

        );


        return updated;

    },


    setAvatar(avatarData) {

        if (!avatarData) {

            return false;

        }


        this.update({

            avatar:
                avatarData

        });


        return true;

    },


    setStyle(style) {

        this.update({

            style:
                style

        });

    },


    setCustomization(data) {

        this.update({

            futurism:
                data.futurism,

            originality:
                data.originality,

            energy:
                data.energy

        });

    },


    reset() {

        localStorage.removeItem(

            this.STORAGE_KEY

        );

    }

};
