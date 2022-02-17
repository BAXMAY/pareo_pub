/* eslint-disable prettier/prettier */

//  DATA CELL LIST OF EACH ENTITY
const LD_DATA_CELLS = 'A5:CJ14'
const NON_LD_DATA_CELLS = 'A5:CJ185'
const MB_DATA_CELLS = 'A5:CJ19'
const B2_DATA_CELLS = 'A24:CG38'
const B1_DATA_CELLS = 'A43:CG62'
const ST_DATA_CELLS = 'A67:CG81'
const PT_DATA_CELLS = 'A86:CG105'
const SJ_DATA_CELLS = 'A110:CG124'
const SP_DATA_CELLS = 'A129:CG143'
const SK_DATA_CELLS = 'A148:CG157'
const PY_DATA_CELLS = 'A162:CG171'
const KY_DATA_CELLS = 'A176:CG185'

//  WEEK 1 2 3 4 5
const LD_WEEKS = ['I:X', 'Y:AN', 'AO:BD', 'BE:BT', 'BU:CJ']
const MB_WEEKS = ['I:X', 'Y:AN', 'AO:BD', 'BE:BT', 'BU:CJ']
const BL_WEEKS = ['I:U', 'Y:AK', 'AO:BA', 'BE:BQ', 'BU:CG']
const OTHERS_WEEKS = ['I:T', 'Y:AJ', 'AO:AZ', 'BE:BP', 'BU:CF']

//  DATA LABELS
//  S BT ATP C On PC CrC CrO 1:1 อร	อท พพช ปก ดว HA SA
const LD_DATA_LABELS = ['S', 'BT', 'ATP', 'C', 'ON', 'PC', 'CrC', 'CrO', 'TTP', 'AR', 'AT', 'PPCH', 'PK', 'DV', 'HA', 'SA']
const MB_DATA_LABELS = ['S', 'BT', 'ATP', 'C', 'ON', 'PC', 'CrC', 'CrO', 'TTP', 'AR', 'AT', 'PPCH', 'PK', 'DV', 'HA', 'SA']
//  S BT ATP C On PC CrC CrO 1:1 อท พพช HA SA
const BL_DATA_LABELS = ['S', 'BT', 'ATP', 'C', 'ON', 'PC', 'CrC', 'CrO', 'TTP', 'AT', 'PPCH', 'HA', 'SA']
//  S BT ATP C On PC CrC CrO 1:1 อท HA SA
const OTHERS_DATA_LABELS = ['S', 'BT', 'ATP', 'C', 'ON', 'PC', 'CrC', 'CrO', 'TTP', 'AT', 'HA', 'SA']

const { GoogleSpreadsheet } = require('google-spreadsheet');

const creds = require('./raycast-338417-b2d6d7f74d26.json')
const doc = new GoogleSpreadsheet ('1jr5223UCXsGZp10t6KjaMm0Qr2IurKzIUvdJrOVxlTg')

async function loadSpreadSheet() {

    
    // await doc.useServiceAccountAuth({
    //     client_email: 'pareo-bot@raycast-338417.iam.gserviceaccount.com',
    //     private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDS6k418knwXAyN\nX0MnwIa4Fyko8ZsBEsbhr4AiUE6LarRTE8PkCYAT1Wx7etzTEUri+xx9tklalJ9h\noVA4YcLTCwRBTlkQvc83yceAl0B84yUHskm7/IaYnp83FiJGG9mEhTVyzBekE01J\nhJOaqiDaZzCTdUol2eQAKGLHxkXaMf+8QJzwIsDfzluUt8h1OmjZWF/HspdGZpHw\n32eqtuQD5fP98K9kTtr9YNDnrgQJIIH/Hyw01BZFtjqRehH4HHzztSqEI39q4myg\nk0bsti3toIe9Z3yv6Kxl+lLWZprBqsCwhjyIwASakbqFmx84SQIoyuPR/MfL125+\n1cOBzxEFAgMBAAECggEAZXPXExPshPWCBC6ieuic5MgfQFaXHLkPeVeV5uuCHIXD\nH4MOYw4+0UuD1xGOTuiugOgRGFcqiaubzrZtg/FiaWmPLmqlZOwoVMl2cWBP4MLR\n+RXFaetaQudp5nF7IwYaZyg8QW/ynzW5o3dmGKtlCilAsG1msTZR+dFzUm0JBJ7Q\nuicPmdFoEG6Li1auEi1XNbo1/0Xwxe+4uiFM+5h607h9/SNsOLIKbR9xlosGzQQq\nbXFhpwegnOhfDDUOJT074RITKyloDS93IaetnkFqPSTvodnbx/uJBxEUduu55x8W\nP48Kf2q80K28NFTTDvQ6kQFHjsy34KyUCAALDiHysQKBgQDqtMBe4q2CWK7tXbuP\nSp0fNsze97BFlKUmd/6b4CAF9ps6KQonhvd2yUIGg9HlJSLRCb/PrFxOLwgPcSDG\nzbPaaVHX5REJ0TGJHwzaETAN0IfAzMjxw/DmAoSgnraLg1YIpqr4KOb9P8M5HJqt\n47Nlkrq2YJl9hewTeFHIqfOejwKBgQDmDP4JGQvaf0XsXTt9Njc21bHFRmkpF2Q0\nNAee5G8e61HsXLvWNo3nxG2KUS1RVi2C0b1wq1gtqL/OpFwRbKWhF7TahV+MYevX\n1dxyVNtChmn6kMgj72JYFkM4mbhu+xUrsIy9D903mNQu0jTX0RDXLQOJd5cDnGLK\nX4TVA90hKwKBgCARFf9gxQf8CdpQZiHLte/f0tnbyW+YQYAiAN1XH8jwyoCFvudr\nnz/Re33cYL8H9dvNkzFSgUIFVvqVID9JN3ttzErM9yj6NeRgI6dflcstZH7I++Nc\nO/uQ+IHhbVteVFDWRKGnJPgQ0CFrcQ60/3uvMmdch1wJAhoe5D2gSrKtAoGAWVig\nbQ4iMWkO0h7flOCyjwRtt42CGChyjWfLseVMVvjT53WYqjij4mjCll6yuA09PbqR\n1almZM1OOUZST54fsbIQVnJISrBZNYlkxa65PVwQ2vTSFkrJqiZzUw84tzmi3kYC\nUwdPRmF/vvN6/HrBDKD557DfoNJi9/AjGcwXXOMCgYAszI56XADnF1IQx2JNIeWd\npI0YrbsBhNV/G2BQSdM+NaI9LKFib2BIfGiqaOTpgAQscG7Ww0cyxrZy1ThUscqA\n0PY6KH/UW+uzSgz7WU1Jm9EdgoTNJBpbwsWkwYpATocelfNNfcx+sNtASS185B44\n8/hFsyYfZYnKTh3htI47tw==\n-----END PRIVATE KEY-----\n',
    // });


    await doc.useServiceAccountAuth(creds);

    await doc.loadInfo();
    console.log(doc.title);

}

//  Get sheet from care name
async function getSheetByName(sheetName) {
    const sheet = doc.sheetsByTitle[sheetName]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    console.log(sheet.title);

    // const rows = await sheet.getRows();
    // console.log(rows[0]);
    // console.log(rows[1]);
    // console.log(rows[2]);
    // console.log(rows[3]);

    await sheet.loadCells('I5:I8')
    // console.log(cells);
    const sunday = sheet.getCellByA1('I5');
    console.log(sunday.value);
    sunday.value = 1
    await sheet.saveUpdatedCells();
    console.log(sunday.value);


    // -------------------------------------------- //

    //  GET SHEET BY NAME
    const sheet = doc.sheetsByTitle[sheetName];
    console.log(sheet.title);

    //  GET DATA CELLS

    //  CHECK FOR VALUE

    //  CONSTRUCT DICT
}

async function manipulateSpreadsheet(dataDict) {

    //  Get sheetName ( care )
    const sheetName = dataDict.sheetName;

    //  Get is LD data
    const isLD = dataDict.isLD;

    //  Get sheet by name
    const sheet = doc.sheetsByTitle[sheetName];
    console.log(sheet.title);

    //  Load cell range based on type
    if (isLD) {
        await sheet.loadCells(LD_DATA_CELLS)
    } else {
        await sheet.loadCells(NON_LD_DATA_CELLS)
    }

    //  LOOP THROUGH CELL_TO_DATA DICT
    for (const [key, value] of Object.entries(dataDict.cellDict)) {
        console.log(`${key}: ${value}`);

        //  GET CELL (KEY)
        //  SET VALUE OF CELL (VALUE)
        sheet.getCellByA1(key).value = value;
    }

    //  SAVE UPDATE CELLS
    await sheet.saveUpdatedCells();
}

loadSpreadSheet().then( _ => getSheetByName('Shema')).catch(err => console.log(err)); 

