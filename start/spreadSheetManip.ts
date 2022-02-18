const NICKNAME_COL = 'D'

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

const WEEK_CELLS = ['I3', 'Y3', 'AO3', 'BE3', 'BU3']
const MONEY_CELLS = ['M188', 'AC188', 'AS188', 'BI188', 'BY188']
const LD_ROW_RANGE = [5, 14]
const MB_ROW_RANGE = [5, 19]
const B2_ROW_RANGE = [24, 38]
const B1_ROW_RANGE = [43, 62]
const ST_ROW_RANGE = [67, 81]
const PT_ROW_RANGE = [86, 105]
const SJ_ROW_RANGE = [110, 124]
const SP_ROW_RANGE = [129, 143]
const SK_ROW_RANGE = [148, 157]
const PY_ROW_RANGE = [162, 171]
const KY_ROW_RANGE = [176, 185]
const NON_LD_RANGE = {
    MB: MB_ROW_RANGE,
    B2: B2_ROW_RANGE,
    B1: B1_ROW_RANGE,
    ST: ST_ROW_RANGE,
    PT: PT_ROW_RANGE,
    SJ: SJ_ROW_RANGE,
    SP: SP_ROW_RANGE,
    SK: SK_ROW_RANGE,
    PY: PY_ROW_RANGE,
    KY: KY_ROW_RANGE,
}

//  DATA LABELS
//  S BT ATP C On PC CrC CrO 1:1 อร	อท พพช ปก ดว HA SA
const LD_DATA_LABELS = ['S', 'BT', 'ATP', 'C', 'ON', 'PC', 'CrC', 'CrO', 'TTP', 'AR', 'AT', 'PPCH', 'PK', 'DV', 'HA', 'SA']
const MB_DATA_LABELS = ['S', 'BT', 'ATP', 'C', 'ON', 'PC', 'CrC', 'CrO', 'TTP', 'AR', 'AT', 'PPCH', 'PK', 'DV', 'HA', 'SA']
//  S BT ATP C On PC CrC CrO 1:1 อท พพช HA SA
const BL_DATA_LABELS = ['S', 'BT', 'ATP', 'C', 'ON', 'PC', 'CrC', 'CrO', 'TTP', 'AT', 'PPCH', 'HA', 'SA']
//  S BT ATP C On PC CrC CrO 1:1 อท HA SA
const OTHERS_DATA_LABELS = ['S', 'BT', 'ATP', 'C', 'ON', 'PC', 'CrC', 'CrO', 'TTP', 'AT', 'HA', 'SA']

const NON_LD_DATA_LABELS = {
    MB: MB_DATA_LABELS,
    B2: BL_DATA_LABELS,
    B1: BL_DATA_LABELS,
    ST: OTHERS_DATA_LABELS,
    PT: OTHERS_DATA_LABELS,
    SJ: OTHERS_DATA_LABELS,
    SP: OTHERS_DATA_LABELS,
    SK: OTHERS_DATA_LABELS,
    PY: OTHERS_DATA_LABELS,
    KY: OTHERS_DATA_LABELS,
}

const { GoogleSpreadsheet } = require('google-spreadsheet')
const { DateTime } = require('luxon')
const _ = require('lodash')

const creds = require('../raycast-338417-b2d6d7f74d26.json')
const doc = new GoogleSpreadsheet ('1jr5223UCXsGZp10t6KjaMm0Qr2IurKzIUvdJrOVxlTg')

function getLastSundayFormatted(dateFormat) {
    var t = DateTime.now().setZone('Asia/Bangkok')
    t = t.set({ days: t.day - t.weekday })
    return t.toFormat(dateFormat)
}

function getColName(n) {
    var ordA = 'A'.charCodeAt(0)
    var ordZ = 'Z'.charCodeAt(0)
    var len = ordZ - ordA + 1
  
    var s = ""
    while(n >= 0) {
        s = String.fromCharCode(n % len + ordA) + s
        n = Math.floor(n / len) - 1
    }
    return s
}

export async function loadSpreadSheet() {

    
    // await doc.useServiceAccountAuth({
    //     client_email: 'pareo-bot@raycast-338417.iam.gserviceaccount.com',
    //     private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDS6k418knwXAyN\nX0MnwIa4Fyko8ZsBEsbhr4AiUE6LarRTE8PkCYAT1Wx7etzTEUri+xx9tklalJ9h\noVA4YcLTCwRBTlkQvc83yceAl0B84yUHskm7/IaYnp83FiJGG9mEhTVyzBekE01J\nhJOaqiDaZzCTdUol2eQAKGLHxkXaMf+8QJzwIsDfzluUt8h1OmjZWF/HspdGZpHw\n32eqtuQD5fP98K9kTtr9YNDnrgQJIIH/Hyw01BZFtjqRehH4HHzztSqEI39q4myg\nk0bsti3toIe9Z3yv6Kxl+lLWZprBqsCwhjyIwASakbqFmx84SQIoyuPR/MfL125+\n1cOBzxEFAgMBAAECggEAZXPXExPshPWCBC6ieuic5MgfQFaXHLkPeVeV5uuCHIXD\nH4MOYw4+0UuD1xGOTuiugOgRGFcqiaubzrZtg/FiaWmPLmqlZOwoVMl2cWBP4MLR\n+RXFaetaQudp5nF7IwYaZyg8QW/ynzW5o3dmGKtlCilAsG1msTZR+dFzUm0JBJ7Q\nuicPmdFoEG6Li1auEi1XNbo1/0Xwxe+4uiFM+5h607h9/SNsOLIKbR9xlosGzQQq\nbXFhpwegnOhfDDUOJT074RITKyloDS93IaetnkFqPSTvodnbx/uJBxEUduu55x8W\nP48Kf2q80K28NFTTDvQ6kQFHjsy34KyUCAALDiHysQKBgQDqtMBe4q2CWK7tXbuP\nSp0fNsze97BFlKUmd/6b4CAF9ps6KQonhvd2yUIGg9HlJSLRCb/PrFxOLwgPcSDG\nzbPaaVHX5REJ0TGJHwzaETAN0IfAzMjxw/DmAoSgnraLg1YIpqr4KOb9P8M5HJqt\n47Nlkrq2YJl9hewTeFHIqfOejwKBgQDmDP4JGQvaf0XsXTt9Njc21bHFRmkpF2Q0\nNAee5G8e61HsXLvWNo3nxG2KUS1RVi2C0b1wq1gtqL/OpFwRbKWhF7TahV+MYevX\n1dxyVNtChmn6kMgj72JYFkM4mbhu+xUrsIy9D903mNQu0jTX0RDXLQOJd5cDnGLK\nX4TVA90hKwKBgCARFf9gxQf8CdpQZiHLte/f0tnbyW+YQYAiAN1XH8jwyoCFvudr\nnz/Re33cYL8H9dvNkzFSgUIFVvqVID9JN3ttzErM9yj6NeRgI6dflcstZH7I++Nc\nO/uQ+IHhbVteVFDWRKGnJPgQ0CFrcQ60/3uvMmdch1wJAhoe5D2gSrKtAoGAWVig\nbQ4iMWkO0h7flOCyjwRtt42CGChyjWfLseVMVvjT53WYqjij4mjCll6yuA09PbqR\n1almZM1OOUZST54fsbIQVnJISrBZNYlkxa65PVwQ2vTSFkrJqiZzUw84tzmi3kYC\nUwdPRmF/vvN6/HrBDKD557DfoNJi9/AjGcwXXOMCgYAszI56XADnF1IQx2JNIeWd\npI0YrbsBhNV/G2BQSdM+NaI9LKFib2BIfGiqaOTpgAQscG7Ww0cyxrZy1ThUscqA\n0PY6KH/UW+uzSgz7WU1Jm9EdgoTNJBpbwsWkwYpATocelfNNfcx+sNtASS185B44\n8/hFsyYfZYnKTh3htI47tw==\n-----END PRIVATE KEY-----\n',
    // })

    await doc.useServiceAccountAuth(creds)

    await doc.loadInfo()
    console.log(doc.title)

}

//  Get sheet from care name
export async function getSheetByName(sheetName, nickname='undefined') {

    //  GET SHEET BY NAME
    const sheet = doc.sheetsByTitle[sheetName]
    console.log(sheet.title)

    //  GET DATA CELLS
    const isLD = sheetName.includes('LD ')
    if ( isLD ) {
        console.log(typeof nickname);
        
        if ( nickname === 'undefined' ) {
            console.log('yay');
            
            return 'LD must provide nickname.'
        }

        await sheet.loadCells(LD_DATA_CELLS)
    } else {
        await sheet.loadCells(NON_LD_DATA_CELLS)
    }

    //  CHECK FOR WEEK
    await sheet.loadCells('I3:CJ3')
    const dateFormat = isLD ? 'dd-MM-yyyy' : 'dd/MM/yyyy'
    const sunday = getLastSundayFormatted(dateFormat)

    var currentWeekCell

    for (const cellName of WEEK_CELLS) {
        
        const cell = sheet.getCellByA1(cellName)
        const dateStr = cell.formattedValue

        if ( dateStr === sunday ) {
            currentWeekCell = cell
            break
        }
    }

    //  no match date return bc err
    if ( currentWeekCell === undefined ) {
        return 'No Data Match.'
    }

    //  CONSTRUCT DICT
    /*
        dict: {
            sunday: ( str, cellName )
            LD: {
                name1: {
                    S: ( value, cellName ),
                    BT: ( value, cellName ),
                    ...
                },
                name2: {
                    S: ( value, cellName ),
                    BT: ( value, cellName ),
                    ...
                },
            },
            MB: {
                name1: {
                    S: ( value, cellName ),
                    BT: ( value, cellName ),
                    ...
                },
                name2: {
                    S: ( value, cellName ),
                    BT: ( value, cellName ),
                    ...
                },
            },
            ...
        }

    */
    const dataDict = {
        sunday: [ sunday, currentWeekCell.a1Address ],
    }

    //  CHECK FOR VALUE
    if ( isLD ) {

        //  Check for row that has value
        const hasValueRowList = []
        for (const row of _.range(LD_ROW_RANGE[0], LD_ROW_RANGE[1] + 1)) {
            const cellName = NICKNAME_COL + row.toString()
            const cell = sheet.getCellByA1(cellName)
            if (cell.formattedValue === nickname) {
                hasValueRowList.push(row.toString())
                break
            }
        }

        const ldDataDict = new Object()
        // get criteria value of each row
        for (const row of hasValueRowList) {
            
            const cellNameList = []
            for (let i = 0; i < LD_DATA_LABELS.length; i++) {
                const colName = getColName(currentWeekCell.columnIndex + i)
                cellNameList.push(colName + row)
            }
            
            const ldData = new Object()
            for (const [i, cellName] of cellNameList.entries()) {
                ldData[LD_DATA_LABELS[i]] = [ cellName, sheet.getCellByA1(cellName).value ]
            }

            ldDataDict[sheet.getCellByA1(NICKNAME_COL + row).formattedValue] = ldData
        }

        dataDict.LD = ldDataDict
    } else {
        //  Check for row that has value
        const hasValueRowDict = new Object()

        for (const [position, range] of Object.entries(NON_LD_RANGE)) {

            hasValueRowDict[position] = []

            for (const row of _.range(range[0], range[1] + 1)) {
                const cellName = NICKNAME_COL + row.toString()
                const cell = sheet.getCellByA1(cellName)
                if (cell.formattedValue !== null) {
                    hasValueRowDict[position].push(row.toString())
                }
            }
        }

        // get criteria value of each row

        for (const [position, hasValueRowList] of Object.entries(hasValueRowDict)) {

            const nonLdDataDict = new Object()
            const criteriaDict = new Object()

            for (const row of hasValueRowList) {
            
                const criteriaList = []
                for (let i = 0; i < NON_LD_DATA_LABELS[position].length; i++) {
                    const colName = getColName(currentWeekCell.columnIndex + i)
                    criteriaList.push(colName + row)
                }
                
                for (const [i, cellName] of criteriaList.entries()) {
                    criteriaDict[NON_LD_DATA_LABELS[position][i]] = [ cellName, sheet.getCellByA1(cellName).value ]
                }
    
                nonLdDataDict[sheet.getCellByA1(NICKNAME_COL + row).formattedValue] = criteriaDict
                
            }

            if (hasValueRowList.length > 0) {
                dataDict[position] = nonLdDataDict
            }
        }
    }

    //  NOTE: for print the whole object
    // const util = require('util')

    // console.log(util.inspect(dataDict, {showHidden: false, depth: null, colors: true}))

    return dataDict
}

//  Take dataDict and manipulate cell value
//  DataDict must have field => sheetName, isLD, cellDict
export async function manipulateSpreadsheet(dataDict) {

    //  Get sheetName ( care )
    const sheetName = dataDict.sheetName

    //  Get is LD data
    const isLD = dataDict.isLD

    //  Get sheet by name
    const sheet = doc.sheetsByTitle[sheetName]
    console.log(sheet.title)

    //  Load cell range based on type
    if (isLD) {
        await sheet.loadCells(LD_DATA_CELLS)
    } else {
        await sheet.loadCells(NON_LD_DATA_CELLS)
    }

    //  LOOP THROUGH CELL_TO_DATA DICT
    for (const [key, value] of Object.entries(dataDict.cellDict)) {
        console.log(`${key}: ${value}`)

        //  GET CELL (KEY)
        //  SET VALUE OF CELL (VALUE)
        sheet.getCellByA1(key).value = value
    }

    //  SAVE UPDATE CELLS
    await sheet.saveUpdatedCells()
}

// //  Test get data
// loadSpreadSheet().then( _ => getSheetByName('LD KN')).catch(err => console.log(err))

// //  Test manipulate data
// const dataDict = {
//     sheetName: 'Shema',
//     isLD: false,
//     cellDict: {
//         'Y15': 1,
//         'Z15': 0,
//         'AA15': 0,
//         'AB15': 0,
//         'AC15': 0,
//         'AD15': 0,
//         'AE15': 1,
//         'AF15': 0,
//         'AG15': 1,
//         'AH15': 1,
//         'AI15': 1,
//         'AJ15': 1,
//         'AK15': 2,
//         'AL15': 1,
//         'AM15': 0,
//         'AN15': 1
//     }
//   }
// loadSpreadSheet().then( _ => manipulateSpreadsheet(dataDict)).catch(err => console.log(err))

//  SAMPLE DATA TO GET
// {
//     sunday: [ '13-02-2022', 'Y3' ],
//     LD: {
//       'A.Mink': {
//         S: [ 'Y5', 1 ],
//         BT: [ 'Z5', 0 ],
//         ATP: [ 'AA5', 0 ],
//         C: [ 'AB5', 0 ],
//         ON: [ 'AC5', 0 ],
//         PC: [ 'AD5', 0 ],
//         CrC: [ 'AE5', 1 ],
//         CrO: [ 'AF5', 0 ],
//         TTP: [ 'AG5', 1 ],
//         AR: [ 'AH5', 1 ],
//         AT: [ 'AI5', 1 ],
//         PPCH: [ 'AJ5', 1 ],
//         PK: [ 'AK5', 2 ],
//         DV: [ 'AL5', 1 ],
//         HA: [ 'AM5', 0 ],
//         SA: [ 'AN5', 1 ]
//       },
//       'ตีตี้': {
//         S: [ 'Y6', 0 ],
//         BT: [ 'Z6', 0 ],
//         ATP: [ 'AA6', 0 ],
//         C: [ 'AB6', 1 ],
//         ON: [ 'AC6', 0 ],
//         PC: [ 'AD6', 0 ],
//         CrC: [ 'AE6', 1 ],
//         CrO: [ 'AF6', 0 ],
//         TTP: [ 'AG6', 1 ],
//         AR: [ 'AH6', 0 ],
//         AT: [ 'AI6', 0 ],
//         PPCH: [ 'AJ6', 0 ],
//         PK: [ 'AK6', 0 ],
//         DV: [ 'AL6', 1 ],
//         HA: [ 'AM6', 0 ],
//         SA: [ 'AN6', 0 ]
//       },
//       'เอิ๊ก': {
//         S: [ 'Y7', 0 ],
//         BT: [ 'Z7', 0 ],
//         ATP: [ 'AA7', 0 ],
//         C: [ 'AB7', 0 ],
//         ON: [ 'AC7', 1 ],
//         PC: [ 'AD7', 0 ],
//         CrC: [ 'AE7', 0 ],
//         CrO: [ 'AF7', 1 ],
//         TTP: [ 'AG7', 1 ],
//         AR: [ 'AH7', 0 ],
//         AT: [ 'AI7', 0 ],
//         PPCH: [ 'AJ7', 0 ],
//         PK: [ 'AK7', 0 ],
//         DV: [ 'AL7', 0 ],
//         HA: [ 'AM7', 0 ],
//         SA: [ 'AN7', 0 ]
//       },
//       'บาส': {
//         S: [ 'Y8', 0 ],
//         BT: [ 'Z8', 0 ],
//         ATP: [ 'AA8', 0 ],
//         C: [ 'AB8', 1 ],
//         ON: [ 'AC8', 0 ],
//         PC: [ 'AD8', 0 ],
//         CrC: [ 'AE8', 1 ],
//         CrO: [ 'AF8', 0 ],
//         TTP: [ 'AG8', 1 ],
//         AR: [ 'AH8', 0 ],
//         AT: [ 'AI8', 0 ],
//         PPCH: [ 'AJ8', 0 ],
//         PK: [ 'AK8', 0 ],
//         DV: [ 'AL8', 0 ],
//         HA: [ 'AM8', 0 ],
//         SA: [ 'AN8', 0 ]
//       }
//     }
//   }