const express = require('express')
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();
const morgan = require('morgan');

const optionBd = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'commune'
};

//extraction des données du formulaire
app.use(express.urlencoded({ extended: false }));

//Definition du middleware pour connexion
app.use(myConnection(mysql, optionBd, 'pool'));



//Ressource statique
app.use(express.static("public"));
app.use(morgan("tiny"));
app.set('view engine', 'ejs');
app.set('views', 'IHM');


app.get('/liste', (req, res) => {

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);

        } else {
            connection.query("SELECT id,taille,nom,prenom,telephone,email,datenaiss,lieunaiss,numcin,datecin,domicile,arrondissement,profession,pere,mere,lieucin,numpermis,catpermis,lieupermis,datepermis,numimm,marquevoit,dateemm,datecircul,typevoit,placevoit,couleurvoit,nummoteurvoit,energievoit,puissancevoit,poidvoit,nomass,numass,valabledu,au,dateli,numli FROM voiture", [], (erreur, resultat) => {
                if (erreur) {
                    console.log(erreur);

                } else {
                    connection.query("SELECT COUNT(id) AS nbr FROM voiture", [], (error, result) => {
                        if (error) console.log(error);
                        else
                            res.status(200).render("liste", { resultat, result })
                    })
                }
            })
        }
    });
});

app.get('/recherche', (req, res) => {

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);

        } else {
            connection.query("SELECT * FROM voiture WHERE id = ?", [req.query.id], (erreur, resultat) => {
                if (erreur) {
                    console.log(erreur);

                } else {
                    console.log(req.query.id);

                    res.status(200).render("recherche", { resultat })
                }
            })
        }
    });
});

app.get('/search', (req, res) => {

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);

        } else {
            connection.query("SELECT * FROM voiture WHERE id LIKE '%" + req.query.search + "%' OR nom LIKE '%" + req.query.search + "%' OR prenom LIKE '%" + req.query.search + "%' OR telephone LIKE '%" + req.query.search + "%'", [], (erreur, resultat) => {
                if (erreur) {
                    console.log(erreur);

                } else {
                    res.status(200).render("search", { resultat });
                }
            })
        }
    });
});

app.post("/add", (req, res) => {

    let id = req.body.id === "" ? null : req.body.id;

    let taille = req.body.taille
    let nom = req.body.nom
    let prenom = req.body.prenom
    let telephone = req.body.telephone
    let email = req.body.email
    let datenaiss = req.body.datenaiss
    let lieunaiss = req.body.lieunaiss
    let numcin = req.body.numcin
    let datecin = req.body.datecin
    let domicile = req.body.domicile
    let arrondissement = req.body.arrondissement
    let profession = req.body.profession
    let pere = req.body.pere
    let mere = req.body.mere
    let lieucin = req.body.lieucin
    let numpermis = req.body.numpermis
    let catpermis = req.body.catpermis
    let lieupermis = req.body.lieupermis
    let datepermis = req.body.datepermis
    let numImm = req.body.numImm
    let marqueVoit = req.body.marqueVoit
    let dateEmm = req.body.dateEmm
    let dateCircul = req.body.dateCircul
    let typeVoit = req.body.typeVoit
    let placeVoit = req.body.placeVoit
    let couleurVoit = req.body.couleurVoit
    let numMoteurVoit = req.body.numMoteurVoit
    let energieVoit = req.body.energieVoit
    let puissanceVoit = req.body.puissanceVoit
    let poidVoit = req.body.poidVoit
    let nomAss = req.body.nomAss
    let numAss = req.body.numAss
    let valabledu = req.body.valabledu
    let au = req.body.au
    let dateli = req.body.dateli
    let numli = req.body.numli

    let reqSql = id === null ? "INSERT INTO voiture(id,taille,nom,prenom,telephone,email,datenaiss,lieunaiss,numcin,datecin,domicile,arrondissement,profession,pere,mere,lieucin,numpermis,catpermis,lieupermis,datepermis,numimm,marquevoit,dateemm,datecircul,typevoit,placevoit,couleurvoit,nummoteurvoit,energievoit,puissancevoit,poidvoit,nomass,numass,valabledu,au,dateli,numli) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        : "UPDATE voiture SET taille = ?,nom = ?,prenom = ?,telephone = ?,email = ?,datenaiss = ?,lieunaiss = ?,numcin = ?,datecin = ?,domicile = ?,arrondissement = ?,profession = ?,pere = ?,mere = ?,lieucin = ?,numpermis = ?,catpermis = ?,lieupermis = ?,datepermis = ?,numimm = ?,marquevoit = ?,dateemm = ?,datecircul = ?,typevoit = ?,placevoit = ?,couleurvoit = ?,nummoteurvoit = ?,energievoit = ?,puissancevoit = ?,poidvoit = ?,nomass = ?,numass = ?,valabledu = ?,au = ?,dateli = ?,numli = ? WHERE id = ?";


    let donnees = id === null ? [null, taille, nom, prenom, telephone, email, datenaiss, lieunaiss, numcin, datecin, domicile, arrondissement, profession, pere, mere, lieucin, numpermis, catpermis, lieupermis, datepermis, numImm, marqueVoit, dateEmm, dateCircul, typeVoit, placeVoit, couleurVoit, numMoteurVoit, energieVoit, puissanceVoit, poidVoit, nomAss, numAss, valabledu, au, dateli, numli] : [taille, nom, prenom, telephone, email, datenaiss, lieunaiss, numcin, datecin, domicile, arrondissement, profession, pere, mere, lieucin, numpermis, catpermis, lieupermis, datepermis, numImm, marqueVoit, dateEmm, dateCircul, typeVoit, placeVoit, couleurVoit, numMoteurVoit, energieVoit, puissanceVoit, poidVoit, nomAss, numAss, valabledu, au, dateli, numli, id]


    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);

        } else {
            connection.query(reqSql,
                donnees, (erreur, resultat) => {
                    if (erreur) {
                        console.log(erreur);

                    } else {
                        res.status(300).redirect("/liste");
                    }
                });
        }
    });
})

app.delete("/add/:id", (req, res) => {
    let id = req.params.id;
    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);
        }
        else {
            connection.query("DELETE FROM voiture WHERE id = ?", [id], (erreur, resultat) => {
                if (erreur) {
                    console.log(erreur);
                }
                else {
                    res.status(200).json({ routeRacine: "/liste" });
                }
            })
        }
    })
})

/*app.get('/acceuil', (req, res)=>{
    res.status(200).sendFile("IHM/acceuil.ejs", {root: __dirname});
});*/
app.get('/', (req, res) => {
    res.status(200).render('acceuil');
});

app.get('/formulaire', (req, res) => {
    res.status(200).render('formulaire');
});


app.get('/dashboard', (req, res) => {
    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);
        }
        else {
            connection.query("SELECT COUNT(id)  as tot FROM voiture", [], (erreur, result) => {
                res.status(200).render('statistique', { result });
            })
        }
    })
});

app.get('/dashboard', (req, res) => {
    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);
        }
        else {
            connection.query("SELECT COUNT(id) as legere FROM voiture LIKE '%" + RENAULT + "%' ", [], (erreur, result) => {
                res.status(200).render('statistique', { result });
            })
        }
    })
});

app.get('/dashboard', (req, res) => {
    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);
        }
        else {
            myObj = LocalDate.now();
            connection.query("SELECT COUNT(id) as today FROM voiture WHERE heure LIKE '%" + myObj + "%'", [], (erreur, result) => {
                res.status(200).render('statistique', { result });
            })
        }
    })
});







app.listen(3001, () => {
    console.log("En attente de la requete au port 3001");

})
console.log("ErrEUR lors de la creation du serveur");
