/*
NEXA V10
MODULE : IDENTITY / GALLERY

Rôle :
Gérer la sélection d'une image
depuis la galerie de l'utilisateur.

L'image reste localement
dans le navigateur.
*/

const NEXA_GALLERY = {

    MAX_SIZE_MB: 10,

    ALLOWED_TYPES: [

        "image/jpeg",

        "image/png",

        "image/webp"

    ],


    validate(file) {

        if (!file) {

            return {

                valid: false,

                error:
                    "NO_FILE"

            };

        }


        if (
            !this.ALLOWED_TYPES
            .includes(file.type)
        ) {

            return {

                valid: false,

                error:
                    "INVALID_FORMAT"

            };

        }


        const maxBytes =

            this.MAX_SIZE_MB *

            1024 *

            1024;


        if (
            file.size >
            maxBytes
        ) {

            return {

                valid: false,

                error:
                    "FILE_TOO_LARGE"

            };

        }


        return {

            valid: true

        };

    },


    read(file) {

        const validation =

            this.validate(

                file

            );


        if (
            !validation.valid
        ) {

            return Promise.reject(

                validation.error

            );

        }


        return new Promise(

            (resolve, reject) => {

                const reader =
                    new FileReader();


                reader.onload = () => {

                    resolve(

                        reader.result

                    );

                };


                reader.onerror = () => {

                    reject(

                        "READ_ERROR"

                    );

                };


                reader.readAsDataURL(

                    file

                );

            }

        );

    },


    async import(file) {

        try {

            const imageData =

                await this.read(

                    file

                );


            NEXA_IDENTITY
                .setAvatar(

                    imageData

                );


            return {

                success: true,

                image:
                    imageData

            };

        } catch (error) {

            console.error(

                "NEXA GALLERY ERROR:",

                error

            );


            return {

                success: false,

                error:
                    error

            };

        }

    }

};
