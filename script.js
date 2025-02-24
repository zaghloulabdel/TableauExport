document.addEventListener("DOMContentLoaded", function () {
    tableau.extensions.initializeAsync().then(() => {
        console.log("Extension Tableau initialisée !");
    }).catch(err => {
        console.error("Erreur lors de l'initialisation :", err);
    });
});
