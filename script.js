document.addEventListener("DOMContentLoaded", function () {
    tableau.extensions.initializeAsync().then(() => {
        console.log("Extension Tableau initialisée !");

        document.getElementById("export-btn").addEventListener("click", () => {
            const sheetName = document.getElementById("sheet-name").value;
            if (sheetName) {
                exportToCSV(sheetName);
            } else {
                alert("Veuillez entrer le nom de la feuille.");
            }
        });
    });
});

function exportToCSV(sheetName) {
    const worksheet = tableau.extensions.dashboardContent.dashboard.worksheets.find(sheet => sheet.name === sheetName);

    if (!worksheet) {
        alert(`La feuille "${sheetName}" est introuvable.`);
        return;
    }

    worksheet.getSummaryDataAsync().then(dataTable => {
        const headers = dataTable.columns.map(column => column.fieldName);
        const data = dataTable.data.map(row => row.map(cell => cell.formattedValue));
        
        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += headers.join(',') + '\r\n';
        data.forEach(row => {
            csvContent += row.join(',') + '\r\n';
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);
    });
}
