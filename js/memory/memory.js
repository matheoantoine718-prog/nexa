/*
NEXA V10
MODULE : MEMORY

Rôle :
Gérer la mémoire locale de NEXA.

La mémoire reste dans le navigateur
de l'utilisateur via localStorage.

Aucune donnée n'est envoyée à un serveur.
*/

const NEXA_MEMORY = {

    STORAGE_KEY: "NEXA_MEMORY_V10",

    getAll() {

        try {

            const saved =
                localStorage.getItem(
                    this.STORAGE_KEY
                );

            if (!saved) {

                return [];

            }

            const parsed =
                JSON.parse(saved);

            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {

            console.error(
                "NEXA MEMORY ERROR:",
                error
            );

            return [];

        }

    },

    save(memory) {

        try {

            localStorage.setItem(

                this.STORAGE_KEY,

                JSON.stringify(memory)

            );

            return true;

        } catch (error) {

            console.error(
                "NEXA MEMORY SAVE ERROR:",
                error
            );

            return false;

        }

    },

    add(entry) {

        const memory =
            this.getAll();

        const newEntry = {

            id:
                entry.id ||
                Date.now(),

            input:
                entry.input || "",

            type:
                entry.type ||
                "DISCOVERY",

            level:
                entry.level ||
                1,

            title:
                entry.title ||
                "",

            action:
                entry.action ||
                "",

            feedback:
                entry.feedback ||
                null,

            date:
                entry.date ||
                new Date().toISOString()

        };

        memory.push(
            newEntry
        );

        this.save(
            memory
        );

        return newEntry;

    },

    updateFeedback(
        id,
        feedback
    ) {

        const memory =
            this.getAll();

        const index =
            memory.findIndex(

                item =>
                    item.id === id

            );

        if (index === -1) {

            return false;

        }

        memory[index].feedback =
            feedback;

        memory[index].feedbackDate =
            new Date().toISOString();

        this.save(
            memory
        );

        return true;

    },

    getLast() {

        const memory =
            this.getAll();

        if (!memory.length) {

            return null;

        }

        return memory[
            memory.length - 1
        ];

    },

    getStats() {

        const memory =
            this.getAll();

        return {

            total:
                memory.length,

            positive:
                memory.filter(

                    item =>
                        item.feedback ===
                        "like"

                ).length,

            later:
                memory.filter(

                    item =>
                        item.feedback ===
                        "later"

                ).length,

            negative:
                memory.filter(

                    item =>
                        item.feedback ===
                        "no"

                ).length

        };

    },

    clear() {

        localStorage.removeItem(

            this.STORAGE_KEY

        );

    }

};
