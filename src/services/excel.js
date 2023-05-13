import * as FileSaver from "file-saver";
import * as ExcelJS from "exceljs/dist/exceljs.min.js";
const EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";
function saveAsExcelFile(buffer, fileName) {
    const data = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
}

function getSpreadSheetCellNumber(row, column) {
    let result = "";
    // Get spreadsheet column letter
    let n = column;
    while (n >= 0) {
        result = String.fromCharCode((n % 26) + 65) + result;
        n = Math.floor(n / 26) - 1;
    }

    // Get spreadsheet row number
    result += `${row + 1}`;

    return result;
}

async function exportAsExcelFile(workbookData, excelFileName="Test") {
    const workbook = new ExcelJS.Workbook();

    workbookData.forEach(({ workSheet, rows }) => {
        const sheet = workbook.addWorksheet(workSheet);
        const uniqueHeaders = [
            ...new Set(
                rows.reduce((prev, next) => [...prev, ...Object.keys(next)], [])
            )
        ];
        sheet.columns = rows[0].map((x, j) => {
            sheet.getCell(getSpreadSheetCellNumber(0, j)).border = {
                top: {style:'thin'},
                left: {style:'thin'},
                bottom: {style:'thin'},
                right: {style:'thin'}
            };
            sheet.getCell(getSpreadSheetCellNumber(0, j)).alignment = { vertical: 'middle', horizontal: 'center' };
            return { header: x, key: x }
        });
        rows.slice(1).forEach((jsonRow, i) => {
            let cellValues = { ...jsonRow };
            uniqueHeaders.forEach((header, j) => {
                if (Array.isArray(jsonRow[header])) {
                    cellValues[header] = "";
                }
            });
            sheet.addRow(cellValues);
            uniqueHeaders.forEach((header, j) => {
                if (Array.isArray(jsonRow[header])) {
                    const jsonDropdown = ["None",...jsonRow[header].map(x => x.replaceAll(',',';'))];
                    sheet.getCell(
                        getSpreadSheetCellNumber(i + 1, j)
                    ).dataValidation = {
                        type: "list",
                        formulae: [`"${jsonDropdown.join(",")}"`]
                    };
                } else {
                    sheet.getCell(
                        getSpreadSheetCellNumber(i + 1, j)
                    ).value = jsonRow[header]
                    if(j>0 && i > 10) {
                        sheet.getCell(
                            getSpreadSheetCellNumber(i + 1, j)
                        ).numFmt = '$#,##0.00;[Red]-$#,##0.00'
                    }
                }
                sheet.getCell(getSpreadSheetCellNumber(i + 1, j)).border = {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'}
                };
                sheet.getCell(getSpreadSheetCellNumber(i + 1, j)).alignment = { vertical: 'middle', horizontal: 'center' };
            });
        });
        sheet.getRow(1).font = {bold: true};
        sheet.columns.forEach(function (column, i) {
            var maxLength = 0;
            column["eachCell"]({ includeEmpty: true }, function (cell) {
                var columnLength = cell.value ? cell.value.toString().length : 10;
                if (columnLength > maxLength ) {
                    maxLength = columnLength;
                }
            });
            column.width = maxLength < 10 ? 10 : maxLength;
        });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAsExcelFile(buffer, excelFileName);
}

export async function exportGeneralExcelFile(workbookData, excelFileName="Test"){
    const workbook = new ExcelJS.Workbook();

    workbookData.forEach(({ workSheet, rows, titles }) => {
        const sheet = workbook.addWorksheet(workSheet);
        const uniqueHeaders = [
            ...new Set(
                rows.reduce((prev, next) => [...prev, ...Object.keys(next)], [])
            )
        ];
        sheet.columns = titles.map((x, j) => {
            sheet.getCell(getSpreadSheetCellNumber(0, j)).border = {
                top: {style:'thin'},
                left: {style:'thin'},
                bottom: {style:'thin'},
                right: {style:'thin'}
            };
            sheet.getCell(getSpreadSheetCellNumber(0, j)).alignment = { vertical: 'middle', horizontal: 'center' };
            return { header: x, key: x }
        });
        rows.forEach((jsonRow, i) => {
            let cellValues = { ...jsonRow };
            uniqueHeaders.forEach((header, j) => {
                if (Array.isArray(jsonRow[header])) {
                    cellValues[header] = "";
                }
            });
            sheet.addRow(cellValues);
            uniqueHeaders.forEach((header, j) => {
                sheet.getCell(
                    getSpreadSheetCellNumber(i + 1, j)
                ).value = jsonRow[header]
                sheet.getCell(getSpreadSheetCellNumber(i + 1, j)).border = {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'}
                };
                sheet.getCell(getSpreadSheetCellNumber(i + 1, j)).alignment = { vertical: 'middle', horizontal: 'center' };
            });
        });
        sheet.getRow(1).font = {bold: true};
        sheet.columns.forEach(function (column, i) {
            let maxLength = 0;
            column["eachCell"]({ includeEmpty: true }, function (cell) {
                let columnLength = cell.value ? cell.value.toString().length : 10;
                if (columnLength > maxLength ) {
                    maxLength = columnLength;
                }
            });
            column.width = maxLength < 10 ? 10 : maxLength;
        });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAsExcelFile(buffer, excelFileName);
}

export default exportAsExcelFile;
