/*
NEXA V10
MODULE : APP

Rôle :
Orchestrateur principal de NEXA.

Interface
    ↓
App
    ↓
Brain
    ↓
Intent
    ↓
Decision
    ↓
Memory
    ↓
Feedback
    ↓
Progression
*/


const NEXA_APP = {


    version: "10.0.0",

    status: "READY",



    process(input){


        if(
            !input ||
            !input.trim()
        ){

            return {

                success:false,

                error:"EMPTY_INPUT"

            };

        }



        /*
        Utilisation du cerveau central
        */

        const result =

            NEXA_BRAIN.think(

                input

            );



        if(
            !result.success
        ){

            return result;

        }



        /*
        Sauvegarde mémoire
        */

        const entry = {


            input:
                input.trim(),


            type:
                result.output.type,


            level:
                result.output.level,


            title:
                result.output.title,


            action:
                result.output.action


        };



        const saved =

            NEXA_MEMORY.add(

                entry

            );



        return {


            success:true,


            intent:
                result.context.intent,


            decision:
                result.output,


            entry:
                saved,


            level:
                result.output.level


        };


    },




    feedback(
        type,
        id=null
    ){

        return NEXA_FEEDBACK.submit(

            type,

            id

        );

    },




    getState(){


        return {


            version:
                this.version,


            status:
                this.status,


            level:
                NEXA_PROGRESSION.getLevel(),


            memory:
                NEXA_MEMORY.getStats()


        };


    }


};





console.log(
"NEXA APP ONLINE"
);





/*
=================================
CONNEXION INTERFACE
=================================
*/


function connectNEXAInterface(){



    const button =

        document.getElementById(
            "activate"
        );


    const input =

        document.getElementById(
            "input"
        );



    if(
        !button ||
        !input
    ){

        console.error(
            "NEXA : Interface introuvable"
        );


        return;

    }



    console.log(
        "NEXA : Interface connectée"
    );



    button.onclick = function(){



        const result =

            NEXA_APP.process(

                input.value

            );



        console.log(
            "RESULTAT NEXA :",
            result
        );



        if(
            result.success
        ){


            document
            .getElementById("type")
            .textContent =
            result.intent.type;



            document
            .getElementById("title")
            .textContent =
            result.decision.title;



            document
            .getElementById("text")
            .textContent =
            result.decision.action;



            document
            .getElementById("result")
            .style.display =
            "block";


        }



    };



}




/*
=================================
DÉMARRAGE
=================================
*/


window.addEventListener(

    "NEXA_READY",

    ()=>{


        console.log(
            "NEXA READY REÇU"
        );


        connectNEXAInterface();


    }

);





/*
Sécurité :
si NEXA_READY est déjà passé
*/

setTimeout(()=>{


    if(
        !document
        .getElementById("activate")
    ){

        return;

    }


    connectNEXAInterface();


},2000);