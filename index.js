var google = require('googleapis');

function googleSpreadsheetManager(specs) {
    "use strict";
    var auth;
    var sheets = google.sheets('v4');

    function update(specs) {
        var spreadsheetId = specs.spreadsheetId;
        var range = specs.range;
        var values = specs.values;
        return new Promise(function (resolve, reject) {
            sheets.spreadsheets.values.update({
                auth: auth,
                spreadsheetId: spreadsheetId,
                range: range,
                valueInputOption: "RAW",
                resource: {
                    values: values
                }
            }, function (err) {
                if (err) {
                    reject('The API returned an error: ' + err);
                    return;
                }
                resolve();
                return;
            });
        });
    }
    auth = specs.auth;
    return {
        update: update
    };

}

module.exports = {
    googleSpreadsheetManager: googleSpreadsheetManager
};