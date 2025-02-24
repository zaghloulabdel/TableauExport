document.addEventListener("DOMContentLoaded", function () {
    tableau.extensions.initializeAsync().then(() => {
        console.log("Extension Tableau initialisée !");
        
        document.getElementById("export-btn").addEventListener("click", () => {
            alert("Export en co urs !");
        });
    });
});
