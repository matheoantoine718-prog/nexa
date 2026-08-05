/*
NEXA V11
MODULE : CORE / CONTEXT

Rôle :
Transformer la mémoire brute
en compréhension utilisateur.

Ce module ne décide pas.
Il fournit un contexte au cerveau.
*/


const NEXA_CONTEXT = {


    analyze() {


        const memory =
            NEXA_MEMORY.getAll();



        if (!memory.length) {

            return {

                userStage:
                    "NEW",

                totalActions:
                    0,

                mainDomains:
                    [],

                difficulties:
                    [],

                successfulPatterns:
                    []

            };

        }



        const domains = {};

        const difficulties = [];

        const successes = [];



        memory.forEach(entry => {


            /*
            Analyse des domaines
            */

            if(entry.type){

                domains[entry.type] =
                    (domains[entry.type] || 0) + 1;

            }



            /*
            Analyse des blocages
            */

            if(
                entry.type === "BLOCKED"
            ){

                difficulties.push(
                    entry.input
                );

            }



            /*
            Analyse des réussites
            */

            if(
                entry.feedback === "like"
            ){

                successes.push(
                    entry.input
                );

            }


        });



        const sortedDomains =
            Object.entries(domains)
            .sort(
                (a,b)=>b[1]-a[1]
            )
            .map(
                item=>item[0]
            );



        let stage =
            "BEGINNER";



        if(memory.length >= 10){

            stage =
                "ACTIVE";

        }


        if(
            memory.length >= 30
        ){

            stage =
                "ADVANCED";

        }



        return {


            userStage:
                stage,


            totalActions:
                memory.length,


            mainDomains:
                sortedDomains.slice(0,3),


            difficulties:
                difficulties.slice(-5),


            successfulPatterns:
                successes.slice(-5)

        };


    }



};