//module
const http = require('http');
const fs = require('fs');
const uuid = require("uuid");

const server = http.createServer((requete, reponse)=>{
    console.log(uuid.v4());

    //Definition de l'en tete
    reponse.setHeader("content-type", "text/html")

    //Def de la reponse selon la demande de la client
    let fichier = "";

    //Route
    if(requete.url==="/acceuil"){
        //reponse.write("<p>Bienvenue dans acceuil</p><a>Boutton</a>");
        fichier = "./IHM/acceuil.html";
    }
    else if(requete.url==="/profil"){
        //reponse.write("Votre profil");
        fichier = "./IHM/profil.html";
    }
    else{
        //reponse.write("error");
        fichier = "./IHM/404.html";
    }

    //Lecture du fichier

    fs.readFile(fichier, (erreur, donnee)=>{
        if(erreur){
            console.log(erreur);
            reponse.end();
        }
        else{
            reponse.end(donnee);
        }
    })
    
});

server.listen(3001, "localhost", ()=>{
    console.log("3001 prêt");
    
});
   