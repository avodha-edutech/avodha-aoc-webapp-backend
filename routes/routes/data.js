const express = require('express');
const routes = express.Router();
const {google} = require('googleapis');

var sheetId = "1iNZO38VQsskEwUnNTd7Yu_oKwcgqp5x9dsO4yFrAItU";

const authentication = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: './routes/routes/keys/key.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    });

    const client = await auth.getClient();

    const sheets = await google.sheets({
        version: 'v4',
        auth: client
    });

    return sheets;
};

routes.post('/', async (req, res) => {
    var district = req.body.district;
    if(district != null)
    {
        const sheets = await authentication();
        const rawData = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: 'Data'
        });

        var mainData = rawData.data.values;

        var exportSubArray = new Array();

        for(let i = 1; i < mainData.length; i++)
        {
            var aocCode = mainData[i][0];
            var aocAddress = mainData[i][1];
            var aocLanguage = mainData[i][2];
            var aocCourse = mainData[i][3];
            var aocSeat = mainData[i][4];
            var aocDistrict = mainData[i][5];
            var aocBatch = mainData[i][6];

            var exportData = {
                aocCode: aocCode,
                aocAddress: aocAddress,
                aocLanguage: aocLanguage,
                aocCourse: aocCourse,
                aocSeat: aocSeat,
                aocDistrict: aocDistrict,
                aocBatch: aocBatch
            }

            exportSubArray.push(exportData);
        }

        var exportArray = exportSubArray.filter((value,index)=> {
            return value.aocDistrict === district;
        })

        res.status(200).json(exportArray);

    } else
    {
        var errorResult = {
            status: 'error',
            message: 'district cannot be empty'
        }

        res.json(errorResult).status(200);
    }
});

module.exports = routes;
