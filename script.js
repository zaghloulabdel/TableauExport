document.addEventListener("DOMContentLoaded", function () {
    tableau.extensions.initializeAsync().then(() => {
        console.log("Extension Tableau initialisée !");

        document.getElementById("export-btn").addEventListener("click", () => {
            // Export en cours
            exportToCSV();
        });
    });
});

function exportToCSV() {
    const worksheet = tableau.extensions.dashboardContent.dashboard.worksheets.find(sheet => sheet.name === 'Nom de la feuille');
    
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
